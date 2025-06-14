import prisma from "@/lib/prisma";

export async function GET() {
    const notes = await prisma.notes.findMany({
        orderBy: { createdAt: 'desc' },
    });
    return Response.json(notes);
}