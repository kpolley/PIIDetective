import { DataPlatform, TableDataType } from "./DataPlatform";
import {
  Connection,
  createConnection,
  RowStatement,
  FileAndStageBindStatement,
} from "snowflake-sdk";
import config from "@/lib/config";

interface ConnectionConfig {
  account: string;
  username: string;
  password: string;
}

class SnowflakeService {
  private readonly connectionConfig: ConnectionConfig;
  connection: Connection;

  constructor(connectionConfig: ConnectionConfig) {
    this.connectionConfig = connectionConfig;
    this.connection = createConnection(this.connectionConfig);
  }

  connectAsync = () =>
    new Promise((resolve, reject): void => {
      this.connection.connect((err, conn) => {
        if (err) reject(err.message);
        resolve(conn);
      });
    });

  executeAsync = async ({
    bindings,
    sqlText,
  }: {
    sqlText: string;
    bindings: string[];
  }): Promise<{
    stmt: RowStatement | FileAndStageBindStatement;
    results: any[];
  }> => {
    if ((await this.connection.isValidAsync()) === false) {
      await this.connectAsync();
    }

    return new Promise((resolve, reject) => {
      this.connection.execute({
        binds: bindings,
        sqlText: sqlText,
        complete(err, stmt, rows): void {
          if (err) reject(err.message);
          const results = rows || [];

          resolve({ stmt, results });
        },
      });
    });
  };
}

const snowflakeClient = new SnowflakeService({
  account: config.SNOWFLAKE_ACCOUNT!,
  username: config.SNOWFLAKE_USERNAME!,
  password: config.SNOWFLAKE_PASSWORD!,
});

export class SnowflakePlatform extends DataPlatform {
  async getDatasets(): Promise<string[]> {
    const { results: datasets } = await snowflakeClient.executeAsync({
      sqlText: `SHOW DATABASES;`,
      bindings: [],
    });
    return datasets.map((dataset) => dataset.name);
  }

  async *getDatasetTables(datasetId: string): AsyncGenerator<TableDataType> {
    // Use the dataset
    await snowflakeClient.executeAsync({
      sqlText: `USE DATABASE ${datasetId};`,
      bindings: [],
    });

    // Get the tables in the dataset
    const { results: tables } = await snowflakeClient.executeAsync({
      sqlText: `SHOW TABLES IN DATABASE ${datasetId};`,
      bindings: [],
    });

    // for each table, get the columns
    for (const table of tables) {
      const { results: columns } = await snowflakeClient.executeAsync({
        sqlText: `DESCRIBE TABLE ${table.name};`,
        bindings: [],
      });
      yield {
        tableName: table.name,
        datasetId: datasetId,
        columns: columns.map((column) => column.name),
      };
    }
  }

  async applyPolicyTag(
    datasetId: string,
    tableName: string,
    columnName: string,
    policyTagId: string,
  ): Promise<void> {
    await snowflakeClient.executeAsync({
      sqlText: `USE DATABASE ${datasetId};`,
      bindings: [],
    });
    const query = `ALTER TABLE IF EXISTS ${tableName} MODIFY COLUMN ${columnName} SET MASKING POLICY ${policyTagId};`;
    await snowflakeClient.executeAsync({ sqlText: query, bindings: [] });
  }

  async getSampleData(datasetId: string, tableName: string): Promise<any[]> {
    await snowflakeClient.executeAsync({
      sqlText: `USE DATABASE ${datasetId};`,
      bindings: [],
    });
    const { results: data } = await snowflakeClient.executeAsync({
      sqlText: `SELECT * FROM ${tableName} LIMIT 10;`,
      bindings: [],
    });
    return data;
  }
}
