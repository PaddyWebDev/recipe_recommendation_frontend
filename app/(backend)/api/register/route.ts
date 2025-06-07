import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { getUserByEmail } from "@/hooks/user-hooks";
import { generateVerificationToken } from "@/lib/verification-token";
import { sendVerificationEmail } from "@/hooks/mail-hooks";
import db from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, phoneNumber, gender } = await request.json();
    const existingUser = await db.user.findFirst({
      where: {
        OR: [{ email }, { phoneNumber }],
      },
    });

    if (existingUser) {
      const field = existingUser.email === email ? "email" : "phoneNumber";
      const message = `${
        field === "email" ? "Email" : "Phone number"
      } already in use`;

      return NextResponse.json({ field, message }, { status: 409 });
    }
    const hashPassword = await bcryptjs.hash(password, 10);
    await db?.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        phoneNumber: phoneNumber,
        gender,
      },
    });

    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return new NextResponse("Confirmation Email Sent", { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
