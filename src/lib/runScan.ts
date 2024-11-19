import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import { Classification, ConfidenceScore } from "@prisma/client";
import { prisma } from "@/lib/utils";
import { DataPlatform, TableDataType } from "@/dataplatforms/DataPlatform";

export const dynamic = "force-dynamic";

const JSON_RESPONSE = z.object({
  columns: z.array(
    z.object({
      columnName: z.string(),
      tableName: z.string(),
      datasetId: z.string(),
      classification: z.nativeEnum(Classification),
      confidenceScore: z.nativeEnum(ConfidenceScore),
    }),
  ),
});

const SYSTEM_PROMPT = `Identify any potential Personal Identifiable Information (PII) in the following table schema.
Try to discover any columns that may contain PII and classify them accordingly, even if they are not explicitly labeled as PII.
Do not classify columns that are not likely related to an individual, such as names or addresses for businesses or public entities.`;

const EXCLUDE_DATASET_NAMES: string[] =
  process.env.EXCLUDE_DATASET_NAMES?.split(",") || [];
const INCLUDE_DATASET_NAMES: string[] =
  process.env.INCLUDE_DATASET_NAMES?.split(",") || [];
function formatTable(table: TableDataType): string {
  const docTemplate = `
          Table Name: <tableName>
          Dataset ID: <datasetId>
  
          Schema:
          <columns>
      `;

  return docTemplate
    .replace("<tableName>", table.tableName)
    .replace("<datasetId>", table.datasetId)
    .replace("<columns>", table.columns.join("\n"));
}

async function isAlreadyProcessed(
  tableName: string,
  datasetId: string,
  lastModifiedTime: Date,
): Promise<boolean> {

  const existing = await prisma.tableHistory.findFirst({
    where: {
      tableName,
      datasetId,
    },
  });

  if (!existing) {
    return false;
  }

  return existing.lastScanTimestamp >= lastModifiedTime;
}

export async function runScan() {
  const DATA_PLATFORM = DataPlatform.getInstance();
  const OPENAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
  });

  const datasets: string[] = await DATA_PLATFORM.getDatasets();
  for (const datasetId of datasets) {
    if (
      !datasetId ||
      (EXCLUDE_DATASET_NAMES.length > 0 &&
        EXCLUDE_DATASET_NAMES.includes(datasetId)) ||
      (INCLUDE_DATASET_NAMES.length > 0 &&
        !INCLUDE_DATASET_NAMES.includes(datasetId))
    ) {
      continue;
    }

    for await (const table of DATA_PLATFORM.getDatasetTables(datasetId)) {
      if (await isAlreadyProcessed(table.tableName, table.datasetId, table.lastModifiedTime)) {
        continue;
      }
      const formattedTable: string = formatTable(table);

      console.log(`Scanning table ${table.tableName}`);
      const completion = await OPENAI.beta.chat.completions.parse({
        model: "gpt-4o-2024-08-06",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: formattedTable },
        ],
        response_format: zodResponseFormat(JSON_RESPONSE, "columns"),
      });

      const columnClassifications = completion.choices[0].message.parsed;
      if (!columnClassifications) {
        console.error(`Failed to parse response for table ${table.tableName}`);
        continue;
      }

      for (const columnClassification of columnClassifications.columns) {
        const column = await prisma.column.upsert({
          where: {
            name_tableName_datasetId: {
              name: columnClassification.columnName,
              tableName: table.tableName,
              datasetId: table.datasetId,
            },
          },
          update: {},
          create: {
            name: columnClassification.columnName,
            tableName: table.tableName,
            datasetId: table.datasetId,
          },
        });

        await prisma.columnClassification.upsert({
          where: {
            columnId: column.id,
          },
          update: {
            classification: columnClassification.classification,
            confidenceScore: columnClassification.confidenceScore,
          },
          create: {
            classification: columnClassification.classification,
            confidenceScore: columnClassification.confidenceScore,
            columnId: column.id,
          },
        });

        await prisma.tableHistory.upsert({
          where: {
            tableName_datasetId: {
              tableName: table.tableName,
              datasetId: table.datasetId,
            },
          },
          update: {
            lastScanTimestamp: new Date(),
          },
          create: {
            tableName: table.tableName,
            datasetId: table.datasetId,
            lastScanTimestamp: new Date(),
          },
        });
      }
    }
  }
}
