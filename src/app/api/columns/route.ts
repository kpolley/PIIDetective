import { prisma } from "@/lib/utils";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const columnsWithoutPolicyTag = await prisma.columnClassification.findMany({
      where: {
        PolicyTagDecision: {
          none: {},
        },
      },
      include: {
        column: true,
      },
    });

    return new Response(JSON.stringify(columnsWithoutPolicyTag), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching columns without policy tags:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
