import { prisma } from "@/lib/utils";
export const dynamic = 'force-dynamic';

export async function GET() {
  const scanStatus = await prisma.scanStatus.findFirst({
    orderBy: { scanStart: "desc" },
  });

  if (!scanStatus) {
    return Response.json({});
  }

  return Response.json(scanStatus);
}
