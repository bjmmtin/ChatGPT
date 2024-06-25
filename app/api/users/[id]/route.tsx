import { NextRequest, NextResponse } from "next/server";

import schema from "../schema";
import prisma from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  //fetch data from a db
  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  //if not found return 404 not found
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  // else return data

  return NextResponse.json(user);
}

//put for replacing , PATCH for updating one or more properties
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  //validate the request body
  const validation = schema.safeParse(body);

  //if invalid - return 400
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  //fetch user with the given id
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  //if user doesnt exist return , 404
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  //update the user
  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      name: body.name,
      email: body.email,
    },
  });

  //return updated user
  return NextResponse.json(updatedUser, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  //fetch user from db
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  //if not found return 404
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  // delete the user
  const deletedUser = await prisma.user.delete({
    where: {
      id: parseInt(params.id),
    },
  });

  //return 200 response
  return NextResponse.json(deletedUser, { status: 200 });
}
