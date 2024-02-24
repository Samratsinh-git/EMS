import prisma from "@/app/libs/prismadb";
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
    return new NextResponse(
      `
          <h1>Email verified succesfully</h1>
          <h2>feel free to login and explore now..</h2>
      `,
      { status: 410, headers: { "content-type": "text/html" } }
    );
  }
  return NextResponse.json({ organization });
};
