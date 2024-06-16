import { Prisma } from '@/lib/utils';

const PRISMA = Prisma.getClient();

export async function GET() {
    const scanStatus = await PRISMA.scanStatus.findFirst({
        orderBy: { scanStart: 'desc' }
    });

    if (!scanStatus) {
        return Response.json({});
    }

    return Response.json(scanStatus);
}