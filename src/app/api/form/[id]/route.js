import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export const GET = async (req, context) => {
    const id = Number(context.params.id || 0);

    const form = await prisma.form.findUnique({
        where: {
            id: id,
        },
        include: {
            event: true
        },
        cacheStrategy: { ttl: 60 },
    });

    return NextResponse.json({ form });
};
