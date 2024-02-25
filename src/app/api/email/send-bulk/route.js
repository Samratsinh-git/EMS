import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer"
//required data: {id, message} id = eventid; message to send(better in html);
export const POST = async (req, context) => {
  const data = await req.json();
  const { formResponses } = await prisma.form.findFirst({
    where: {
      eventId: data.eventId,
    },
    select: {
      formResponses: true
    },
    cacheStrategy: { ttl: 60 },
  });

  formResponses.forEach(async (element) => {
    const resp = JSON.parse(element);
    await sendMail(resp.email, data.message);
  });
  return NextResponse.json({ success: true });
};

const sendMail = async (email, message) => {
  const transporter = await nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASS,
    },
  });
  var mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Message from e",
    text: message,
    // html: message,
  };
  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error, responce) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve("Email sent: " + responce.response);
      }
    });
  });
};
