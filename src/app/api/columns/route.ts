import { Prisma } from '@/lib/utils';

const PRISMA = Prisma.getClient();

export async function GET() {
    try {
        const columnsWithoutPolicyTag = await PRISMA.columnClassification.findMany({
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
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching columns without policy tags:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    } finally {
        await PRISMA.$disconnect();
    }
}