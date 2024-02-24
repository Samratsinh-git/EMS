import prisma from "@/app/libs/prismadb";
import { useAmp } from "next/amp";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

export const GET = async () => {
  const template = await prisma.template.findMany({
    cacheStrategy: { ttl: 60 },
  });

  return NextResponse.json({
    template,
  });
};

export const POST = async (req) => {
  const { data } = await req.json();
  try {
    await prisma.template.create({
      data: data,
      cacheStrategy: { ttl: 60 },
    });
    return NextResponse.json({
      success: true,
      message: "template saved succesfully",
    });
  } catch (err) {
    return NextResponse.json({
      error: err,
    });
  }
};

export const DELETE = async (req) => {
  const url = new URL(req.url).searchParams;
  const id = Number(url.get("id")) || 0;

  const template = await prisma.template.delete({
    where: {
      id: id,
    },
    cacheStrategy: { ttl: 60 },
  });

  if (!template) {
    return NextResponse.json(
      {
        message: "Error",
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json({});
};

export const PUT = async (req) => {
  const { data } = await req.json();

  const template = await prisma.template.update({
    where: {
      id: Number(id),
    },
    data: data,
    cacheStrategy: { ttl: 60 },
  });

  return NextResponse.json({
    template,
  });
};
