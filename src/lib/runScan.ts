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
): Promise<boolean> {
  const existing = await prisma.column.findFirst({
    where: {
      tableName: tableName,
      datasetId: datasetId,
    },
  });

  return existing !== null;
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
      if (await isAlreadyProcessed(table.tableName, table.datasetId)) {
        continue;
      }
      const formattedTable: string = formatTable(table);

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
        console.error("No column classifications where found in response");
        continue;
      }

      for (const columnClassification of columnClassifications.columns) {
        const column = await prisma.column.create({
          data: {
            name: columnClassification.columnName,
            tableName: columnClassification.tableName,
            datasetId: columnClassification.datasetId,
          },
        });

        await prisma.columnClassification.create({
          data: {
            columnId: column.id,
            classification: columnClassification.classification,
            confidenceScore: columnClassification.confidenceScore,
          },
        });
      }
    }
  }
}
