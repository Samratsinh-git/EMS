import prisma from "@/app/libs/prismadb";
import { useAmp } from "next/amp";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

export const POST = async (req) => {
    try {
        const body = await req.json();

        const form = await prisma.form.findFirst({
            where: {
                eventId: body.eventId
            }
        })
        return NextResponse.json({
            success: true,
            form
        });
    } catch (e) {
        console.log(e)
        return NextResponse.json({
            error: e
        });
    }
};
export const PUT = async (req) => {
    try {
        const r = await req.json();

        const form = await prisma.form.update({
            where: {
                id: r.id
            },
            data: {
                formResponses: {
                    push: r.data
                }
            }
        });
        return NextResponse.json({
            success: true,
        });
    } catch (e) {
        console.log(e)
        return NextResponse.json({
            error: e
        });
    }
};


