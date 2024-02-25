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
