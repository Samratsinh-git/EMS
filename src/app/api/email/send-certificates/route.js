import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

//required data: {id, message} id = eventid; message to send(better in html);
export const POST = async (req, context) => {
  const { data } = await req.json();

  const event = await prisma.event.findFirst({
    where: {
      id: data.id,
    },
    cacheStrategy: { ttl: 60 },
  });

  const userDetails = JSON.parse(event.filledDataJson);
  const certificateTemplate = event.certificateTemplate;
  userDetails.array.forEach(async (element) => {
    await sendMail(userDetails.email, data.message);
  });
  return NextResponse.json({ template });
};

const sendMail = async (email, message) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASS,
    },
  });
  var mailOptions = {
    from: process.env.EMAIL_ID,
    to: email,
    subject: "Message from e",
    text: "Hello guys, this is message from your registerd email",
    html: message,
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
