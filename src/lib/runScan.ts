import { OpenAI } from "@langchain/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { Classification, ConfidenceScore} from '@prisma/client'
import { Prisma } from '@/lib/utils';
import PQueue from 'p-queue';
import * as z from "zod"
import config from '@/lib/config';
import { DataPlatform, TableDataType } from '@/dataplatforms/DataPlatform';

const PRISMA = Prisma.getClient();

const LLM = new OpenAI({
    modelName: "gpt-4o",
    verbose: true,
});

const PROMPT = `Identify any potential Personal Identifiable Information (PII) in the following table schema.
Try to discover any columns that may contain PII and classify them accordingly, even if they are not explicitly labeled as PII.
Do not classify columns that are not likely related to an individual, such as names or addresses for businesses or public entities.

{format_instructions}

{content}`;

const JSON_RESPONSE = z.array(
    z.object({
        columnName: z.string(),
        tableName: z.string(),
        datasetId: z.string(),
        classification: z.nativeEnum(Classification),
        confidenceScore: z.nativeEnum(ConfidenceScore)
    })
);

type JsonResponseType = z.infer<typeof JSON_RESPONSE>;

const PARSER = StructuredOutputParser.fromZodSchema(JSON_RESPONSE);

const PROMPT_TEMPLATE = new PromptTemplate({
    template: PROMPT,
    inputVariables: ['content'],
    partialVariables: {
        format_instructions: PARSER.getFormatInstructions()
      },
});

const CHAIN = PROMPT_TEMPLATE.pipe(LLM).pipe(PARSER);

const QUEUE = new PQueue({
    interval: 60000, // 60 seconds
    intervalCap: 60, // 60 invocations per interval
});

function formatTable(table: TableDataType): string {
    const docTemplate = `
        Table Name: <tableName>
        Dataset ID: <datasetId>

        Schema:
        <pageContent>
    `;

    return docTemplate
        .replace('<tableName>', table.tableName)
        .replace('<datasetId>', table.datasetId)
        .replace('<pageContent>', table.columns.join('\n'));
}

async function isAlreadyProcessed(tableName: string, datasetId: string): Promise<boolean> {
    const existing = await PRISMA.column.findFirst({
        where: {
            tableName: tableName,
            datasetId: datasetId,
        }
    });

    return existing !== null;
}

export async function runScan() {
    const dataPlatform = DataPlatform.getInstance();
    const datasets: string[] = await dataPlatform.getDatasets();

    for (const datasetId of datasets) {
        if (
            !datasetId || 
            (config.EXCLUDE_DATASET_NAMES.length > 0 && config.EXCLUDE_DATASET_NAMES.includes(datasetId)) ||
            (config.INCLUDE_DATASET_NAMES.length > 0 && !config.INCLUDE_DATASET_NAMES.includes(datasetId))
        ) {
            continue;
        }

        for await (const table of dataPlatform.getDatasetTables(datasetId)) {
            if(await isAlreadyProcessed(table.tableName, table.datasetId)) {
                continue;
            }

            const formattedTable: string = formatTable(table);
            const columnClassifications: JsonResponseType = await QUEUE.add(() => CHAIN.invoke({ content: formattedTable })) as JsonResponseType;

            // Save the results to the database
            for (const columnClassification of columnClassifications) {
                const column = await PRISMA.column.create({
                    data: {
                        name: columnClassification.columnName,
                        tableName: table.tableName,
                        datasetId: table.datasetId,
                    }
                });
            
                await PRISMA.columnClassification.create({
                    data: {
                        columnId: column.id,
                        classification: columnClassification.classification,
                        confidenceScore: columnClassification.confidenceScore,
                    }
                });
            }
        }
    }
}