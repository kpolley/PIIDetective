import { DataPlatform, TableDataType } from "./DataPlatform";
import { BigQuery } from "@google-cloud/bigquery";
import {
  GetTablesResponse,
  TableMetadata,
  TableSchema,
  TableField,
} from "@google-cloud/bigquery";
import config from "@/lib/config";

export const bigQueryClient = new BigQuery({
  projectId: config.GCP_PROJECT_ID,
});

export class BigQueryPlatform extends DataPlatform {
  async getDatasets(): Promise<string[]> {
    const [datasets] = await bigQueryClient.getDatasets();

    return datasets
      .map((dataset) => dataset.id)
      .filter((id): id is string => id !== undefined);
  }

  async *getDatasetTables(datasetId: string): AsyncGenerator<TableDataType> {
    const [tables]: GetTablesResponse = await bigQueryClient
      .dataset(datasetId)
      .getTables();

    for (const table of tables) {
      const schema: TableSchema | undefined = await table
        .getMetadata()
        .then(([data]: TableMetadata[]) => data.schema);

      if (!table?.id || !schema?.fields) {
        continue;
      }

      yield {
        tableName: table.id,
        datasetId: datasetId,
        columns: schema.fields
          .filter(
            (field): field is { name: string } => field.name !== undefined,
          )
          .map((field) => field.name),
      };
    }
  }

  async applyPolicyTag(
    datasetId: string,
    tableName: string,
    columnName: string,
    policyTagId: string,
  ): Promise<void> {
    const dataset = bigQueryClient.dataset(datasetId);
    const [tableRef] = await dataset.table(tableName).get();
    const schema: TableSchema = await tableRef
      .getMetadata()
      .then(([data]: TableMetadata[]) => data.schema);

    if (!tableRef?.id || !schema?.fields) {
      throw new Error("Table or schema not found");
    }

    const newSchema = schema.fields.map((field: TableField) => {
      if (field.name === columnName) {
        return {
          ...field,
          policyTags: {
            names: [policyTagId],
          },
        };
      }
      return field;
    });

    tableRef.setMetadata({ schema: { fields: newSchema } });
  }

  async getSampleData(datasetId: string, tableName: string): Promise<any[]> {
    const [rows] = await bigQueryClient.query({
      query: `SELECT * FROM ${datasetId}.${tableName} LIMIT 10`,
    });

    return rows;
  }
}
