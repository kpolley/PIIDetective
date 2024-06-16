import { z } from 'zod';
import config from '@/lib/config';

const TableData = z.object({
    tableName: z.string(),
    datasetId: z.string(),
    columns: z.array(z.string()),
});

export type TableDataType = z.infer<typeof TableData>;

export type DataPlatformType = 'bigquery'; // Add more platforms as needed

export abstract class DataPlatform {
    private static instance: DataPlatform;

    public static getInstance(): DataPlatform {
        if (!DataPlatform.instance) {
            switch (config.DATA_PLATFORM) {
                case 'bigquery':
                    const { BigQueryPlatform } = require('./BigQuery');
                    DataPlatform.instance = new BigQueryPlatform();
                    break;
                default:
                    throw new Error('Unsupported data platform');
            }
        }
        return DataPlatform.instance;
    }
    abstract getDatasets(): Promise<string[]>;
    abstract getDatasetTables(datasetId: string): AsyncGenerator<TableDataType>;
    abstract applyPolicyTag(datasetId: string, tableName: string, columnName: string, policyTagId: string): Promise<void>;
    abstract getSampleData(datasetId: string, tableName: string): Promise<any[]>;
}
