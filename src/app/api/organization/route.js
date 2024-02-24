import prisma from "@/app/libs/prismadb";
import { useAmp } from "next/amp";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

export const GET = async () => {
  const organization = await prisma.organization.findMany({
    cacheStrategy: { ttl: 60 },
  });

  return NextResponse.json({
    organization,
  });
};

export const POST = async (req) => {
  const { data } = await req.json();
  const email = data.email;
  const username = data.username;
  try {
    const organizationExisting = await prisma.organization.findFirst({
      where: {
        OR: [
          {
            email: {
              equals: email,
            },
          },
          {
            username: {
              equals: username,
            },
          },
        ],
      },
      cacheStrategy: { ttl: 60 },
    });
    if (organizationExisting) {
      return NextResponse.json({
        message: "email already exist",
      });
    }
    const uniquestring = randString() + email;
    data.uniquestring = uniquestring;

    const saltRounds = 5;
    bcrypt.hash(data.password, saltRounds, async (err, hash) => {
      if (err) throw new Error("Internal Server Error");
      data.password = hash;
    });

    await sendMail(data.email, data.uniquestring);

    await prisma.organization.create({
      data: data,
      cacheStrategy: { ttl: 60 },
    });
    return NextResponse.json({
      success: true,
      message: "email sent successfully",
    });
  } catch (err) {
    return NextResponse.json({
      error: err,
    });
  }
};

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function randString() {
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < 50; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const sendMail = async (email, uniqueString) => {
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
    subject: "Please Verify your email",
    text: "Hello, this is email for your email verification",
    html: `
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f0f0f0;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    padding: 20px;
                }
                .content {
                    font-size: 16px;
                    line-height: 1.5;
                    color: #333333;
                }
                .button {
                    display: inline-block;
                    background-color: violet;
                    color: white;
                    border-radius:10px;
                    padding: 10px 20px;
                    text-decoration: none;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="content">
                    <h1>Welcome!</h1>
                    <p>Thank you for signing up with us. To complete your registration, please verify your email address by clicking the button below.</p>
                    <p><a href=${process.env.NEXT_PUBLIC_HOST_URL}api/auth/verify/${uniqueString} class="button">Verify Email</a></p>
                    <p>If you did not sign up with us, please ignore this email.</p><br>
                    <p>If you found any trouble in verfication, try copy and paste below link in browser.</p>
                    <p>${process.env.NEXT_PUBLIC_HOST_URL}api/auth/verify/${uniqueString}</p>
                    <br>
                    <p>Feel free to contact us on our <a href="mailto:${process.env.EMAIL_ID}?subject=Feedback">email</a>
                     if you have any questions.</p>
                    <p>Best regards,</p>
                    <p>Dev Critique Team</p>
                </div>
            </div>
        </body>
        </html>
        `,
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

export const DELETE = async (req) => {
  const url = new URL(req.url).searchParams;
  const id = Number(url.get("id")) || 0;

  const organization = await prisma.organization.delete({
    where: {
      id: id,
    },
    cacheStrategy: { ttl: 60 },
  });

  if (!organization) {
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

  const organization = await prisma.organization.update({
    where: {
      id: Number(id),
    },
    data: data,
    cacheStrategy: { ttl: 60 },
  });

  return NextResponse.json({
    organization,
  });
};
