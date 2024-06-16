import { DataPlatformType } from '@/dataplatforms/DataPlatform';

class Config {
    private requiredEnvVars = [
        'GCP_PROJECT_ID',
        'DATABASE_URL',
        'PII_POLICY_TAG_ID',
        'OPENAI_API_KEY',
    ];

    // Right now we only support BigQuery. In the future, we can add more platforms
    // and allow the user to select which platform they want to use via an environment variable
    public DATA_PLATFORM: DataPlatformType = 'bigquery';

    public GCP_PROJECT_ID: string;
    public DATABASE_URL: string;
    public PII_POLICY_TAG_ID: string;
    public EXCLUDE_DATASET_NAMES: string[] = [];
    public INCLUDE_DATASET_NAMES: string[] = [];

    constructor() {
        this.checkRequiredEnvVars();

        this.GCP_PROJECT_ID = process.env.GCP_PROJECT_ID!;
        this.DATABASE_URL = process.env.DATABASE_URL!;
        this.PII_POLICY_TAG_ID = process.env.PII_POLICY_TAG_ID!;
        this.EXCLUDE_DATASET_NAMES = process.env.EXCLUDE_DATASET_NAMES ? process.env.EXCLUDE_DATASET_NAMES.split(',') : [];
        this.INCLUDE_DATASET_NAMES = process.env.INCLUDE_DATASET_NAMES ? process.env.INCLUDE_DATASET_NAMES.split(',') : [];
    }

    private checkRequiredEnvVars() {
        this.requiredEnvVars.forEach((envVar) => {
            if (!process.env[envVar]) {
                throw new Error(`Environment variable ${envVar} is missing`);
            }
        });
    }

    public get(envVar: string): string {
        const value = process.env[envVar];
        if (value || value === '') {
            return value;
        } else {
            throw new Error(`Environment variable ${envVar} is not set`);
        }
        
    }
}

const config = new Config();
export default config;