import { DataPlatform, TableDataType } from "./DataPlatform";
import { BigQuery } from "@google-cloud/bigquery";
import {
  GetTablesResponse,
  TableMetadata,
  TableSchema,
  TableField,
} from "@google-cloud/bigquery";

export const bigQueryClient = new BigQuery({
  projectId: process.env.GCP_PROJECT_ID,
});

  // Helper function to flatten RECORD fields
  function flattenFields(fields: TableField[], prefix = ''): string[] {
    return fields.flatMap(field => {
      const fieldType = field.type;
      if (fieldType === 'RECORD') {
        const recordFields = field.fields || [];
        return flattenFields(recordFields, `${prefix}${field.name}.`);
      } else {
        return [`${prefix}${field.name}`];
      }
    });
  }

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
      const [metadata]: TableMetadata[] = await table.getMetadata();
      const schema: TableSchema | undefined = metadata.schema;
      const lastModifiedTime = metadata.lastModifiedTime;

      
      
      if (!table?.id || !schema?.fields || !lastModifiedTime) {
        continue;
      }      

      yield {
        tableName: table.id,
        datasetId: datasetId,
        columns: flattenFields(schema.fields),
        lastModifiedTime: new Date(+lastModifiedTime),
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

    const resp = await tableRef.setMetadata({ schema: { fields: newSchema } });
    if (!resp || resp.statusCode !== 200) {
      throw new Error("Failed to apply policy tag");
    }
  }

  async getSampleData(datasetId: string, tableName: string): Promise<any[]> {
    const [rows] = await bigQueryClient.query({
      query: `SELECT * FROM ${datasetId}.${tableName} LIMIT 10`,
    });

    return rows;
  }
}
