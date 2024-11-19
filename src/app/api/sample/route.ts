import { DataPlatform } from "@/dataplatforms/DataPlatform";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const DATA_PLATFORM: DataPlatform = DataPlatform.getInstance();

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
