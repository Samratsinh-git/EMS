import prisma from "@/app/libs/prismadb";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export const GET = async (req, context) => {
  const uniquestring = context.params.uniquestring;
  const organization = await prisma.organization.findFirst({
    where: {
      uniquestring: uniquestring,
    },
    cacheStrategy: { ttl: 60 },
  });
  if (organization) {
    organization.isVerified = true;
    redirect()
  }
  return NextResponse.json({ organization });
};
