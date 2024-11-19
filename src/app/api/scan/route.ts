import { ScanStatusType } from "@prisma/client";
import { runScan } from "@/lib/runScan";
import { prisma } from "@/lib/utils";
export const dynamic = 'force-dynamic';


export async function GET() {
  // Check if there is a scan in progress
  const scanInProgress = await prisma.scanStatus.findFirst({
    where: {
      status: ScanStatusType.InProgress,
    },
  });

  if (scanInProgress) {
    return Response.json({ message: "Scan in progress" });
  }

  // Create new scan status
  const scanStatus = await prisma.scanStatus.create({
    data: {
      status: ScanStatusType.InProgress,
    },
  });

  // Run the scan and update the status
  runScan()
    .then(async () => {
      await prisma.scanStatus.update({
        where: { id: scanStatus.id },
        data: {
          status: ScanStatusType.Completed,
        },
      });
    })
    .catch(async (error) => {
      console.error("Error running scan:", error);

      await prisma.scanStatus.update({
        where: { id: scanStatus.id },
        data: {
          status: ScanStatusType.Failed,
        },
      });
    });

  return Response.json({ scanStatus });
}
