import prisma from "@/app/libs/prismadb";
import { useAmp } from "next/amp";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import getCurrentUser from "@/app/actions/getCurrentUser";

export const GET = async () => {
  const event = await prisma.event.findMany({
    cacheStrategy: { ttl: 60 },
  });

  return NextResponse.json({
    event,
  });
};

export const POST = async (req) => {
  const { data } = await req.json();
  const user = await getCurrentUser();
  data.organizationId = user.id
  try {
    await prisma.event.create({
      data: data,
      cacheStrategy: { ttl: 60 },
    });
    return NextResponse.json({
      success: true,
      message: "Event created successfully",
    });
  } catch (err) {
    console.log(err)
    return NextResponse.json({
      error: err,
    });
  }
};

export const DELETE = async (req) => {
  const url = new URL(req.url).searchParams;
  const id = Number(url.get("id")) || 0;

  const event = await prisma.event.delete({
    where: {
      id: id,
    },
    cacheStrategy: { ttl: 60 },
  });

  if (!event) {
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

  const event = await prisma.event.update({
    where: {
      id: Number(id),
    },
    data: data,
    cacheStrategy: { ttl: 60 },
  });

  return NextResponse.json({
    event,
  });
};
