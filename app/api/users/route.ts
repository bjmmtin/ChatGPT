import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/prisma/client";
import schema from "./schema";

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  //validate
  const validation = schema.safeParse(body);

  //if invalid - return 400
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  //check if user exists
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (user)
    return NextResponse.json(
      { error: "User with this email already exists" },
      { status: 400 }
    );

  //create a new user + hash password
  const hashedPassword = await bcrypt.hash(body.password, 10);

  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      hashedPassword: hashedPassword,
    },
  });

  //else return data
  return NextResponse.json({ email: newUser.email }, { status: 201 });
}
