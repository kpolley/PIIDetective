import config from "@/lib/config";
import { DataPlatform } from "@/dataplatforms/DataPlatform";

const DATA_PLATFORM: DataPlatform = DataPlatform.getInstance();

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const datasetId = params.get("datasetId");
  const tableName = params.get("tableName");

  if (!tableName || !datasetId) {
    return new Response(
      JSON.stringify({ error: "tableName and datasetId is required" }),
      { status: 400 },
    );
  }

  try {
    const sampleData = await DATA_PLATFORM.getSampleData(datasetId, tableName);
    return new Response(JSON.stringify(sampleData), { status: 200 });
  } catch (error) {
    const errorMessage = (error as Error).message;
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
    });
  }
}
