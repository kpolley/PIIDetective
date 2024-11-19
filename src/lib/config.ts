import { DataPlatformType } from "@/dataplatforms/DataPlatform";

class Config {
  private requiredEnvVars = [
    "DATA_PLATFORM",
    "DATABASE_URL",
    "PII_POLICY_TAG_ID",
    "OPENAI_API_KEY",
  ];

  // general
  public DATA_PLATFORM: DataPlatformType;
  public DATABASE_URL: string;
  public PII_POLICY_TAG_ID: string;
  public EXCLUDE_DATASET_NAMES: string[] = [];
  public INCLUDE_DATASET_NAMES: string[] = [];

  // snowflake
  public SNOWFLAKE_ACCOUNT: string | undefined;
  public SNOWFLAKE_USERNAME: string | undefined;
  public SNOWFLAKE_PASSWORD: string | undefined;

  // bigquery
  public GCP_PROJECT_ID: string | undefined;

  constructor() {
    this.checkRequiredEnvVars();

    // General
    this.DATA_PLATFORM = process.env.DATA_PLATFORM as DataPlatformType;
    this.DATABASE_URL = process.env.DATABASE_URL!;
    this.PII_POLICY_TAG_ID = process.env.PII_POLICY_TAG_ID!;
    this.EXCLUDE_DATASET_NAMES = process.env.EXCLUDE_DATASET_NAMES
      ? process.env.EXCLUDE_DATASET_NAMES.split(",")
      : [];
    this.INCLUDE_DATASET_NAMES = process.env.INCLUDE_DATASET_NAMES
      ? process.env.INCLUDE_DATASET_NAMES.split(",")
      : [];

    // BigQuery
    this.GCP_PROJECT_ID = process.env.GCP_PROJECT_ID;

    // Snowflake
    this.SNOWFLAKE_ACCOUNT = process.env.SNOWFLAKE_ACCOUNT;
    this.SNOWFLAKE_USERNAME = process.env.SNOWFLAKE_USERNAME;
    this.SNOWFLAKE_PASSWORD = process.env.SNOWFLAKE_PASSWORD;
  }

  private checkRequiredEnvVars() {
    this.requiredEnvVars.forEach((envVar) => {
      if (!process.env[envVar]) {
        throw new Error(`Environment variable ${envVar} is missing`);
      }
    });
  }
}

const config = new Config();
export default config;
