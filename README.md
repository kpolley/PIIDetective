# BigQuery PII Detective

## Overview
PII Detective is a web application designed to identify, classify, and protect Personally Identifiable Information (PII) in BigQuery datasets. It leverages LLMs to identify PII column names, and with human-in-the-loop validation, uses [BigQuery Column-Level Data Masking](https://cloud.google.com/bigquery/docs/column-data-masking-intro) to enforce Access Control Limits (ACLs). 

![Diagram](public/diagram.png)

## Why?
Data masking is an extremely powerful and user-friendly way to protect sensitive such as PII. SHA256 encryption lets data scientists interact with PII data (filtering, aggregations, relational JOINs, etc.) without having to view the raw PII data. BigQuery has a very easy way to set up data masking, however, knowing _where_ PII columns are can be a massive challenge, especially if BigQuery is used heavily across multiple functions in your organization.

GCP has a Sensitive Data Protection service which promises similar functionality, but it [can become extremely costly](https://cloud.google.com/sensitive-data-protection/pricing#risk_analysis) since it scans the actual contents of the table, not just the table metadata. For comparison, using BigQuery PII Detective you can scan 2000+ tables for less than $5 of OpenAI credits. 

## Demo
https://github.com/kpolley/BigQueryPIIDetector/assets/13952270/b7395cb9-3bfa-4d1f-ae16-5b41abe7462c





## Prerequisites

### BigQuery Policy Tag
[Follow these steps](https://cloud.google.com/bigquery/docs/column-data-masking) to create a BigQuery Data Catalog Taxonomy and Policy Tag. While policy tags can get rather granular and detailed, I'd suggest starting off with a single tag `PII` which masks data with SHA256 encryption

The application will also need access to the following roles:
* `BigQuery Admin`
* `BigQuery Metadata Viewer`
* `BigQuery Masked Data Viewer`

### Postgres DB
This application uses Postgres to keep track of detected columns and other various functions. To run a postgres instance locally with Docker, run `npm run db`

### Set env variables
If running locally, these can be stored in `.env.local`

| Environment Variable             | Description                                       | Example                          |
|----------------------------------|-------------------------------------------------- |----------------------------------|
| `GOOGLE_CLOUD_PROJECT`           | The Google Cloud project ID (required)            | `my-gcp-project`                 |
| `DATABASE_URL`                   | Postgres database URL (required)                  | `postgres://user:password@host:port/dbname` |
| `OPENAI_API_KEY`                 | API key for accessing OpenAI services (required)  | `sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxx`|
| `PII_POLICY_TAG_ID`              | The policy tag ID for PII data masking (required) | `projects/my-gcp-project/locations/us/taxonomies/1234567890/policyTags/0987654321` |
| `INCLUDE_DATASET_NAMES`          | BigQuery datasets to scan (optional)              | `dataset1,dataset2`              |
| `EXCLUDE_DATASET_NAMES`          | BigQuery datasets to ignore (optional)            | `dataset3,dataset4`              |
| `GOOGLE_APPLICATION_CREDENTIALS` | Path to the GCP Service Account Credentials JSON file (optional) | `/path/to/your/credentials.json` |

## Run!
`npm run dev` to kick it off 
