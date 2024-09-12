require("dotenv").config();
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(req: NextRequest) {
  if (req.method !== "GET") {
    return NextResponse.json(
      { error: `Method ${req.method} Not Allowed` },
      { status: 405 },
    );
  }

  const searchParams = req.nextUrl.searchParams;
  const email = searchParams.get("email");

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Fetch histories associated with this user
    const histories = await prisma.history.findMany({
      where: { userId: user.id },
      include: { user: true }, // Include user info if needed
    });

    return NextResponse.json({ histories }, { status: 200 });
  } catch (error) {
    console.error("Error fetching histories:", error);
    return NextResponse.json(
      { error: "Error fetching histories" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { error: `Method ${req.method} Not Allowed` },
      { status: 405 },
    );
  }

  try {
    const body = await req.json();
    const { name, userEmail } = body;

    // Validate the input
    if (!name || !userEmail) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      return NextResponse.json(
        { error: `User not found with email: ${userEmail}` },
        { status: 404 },
      );
    }

    // Create a new history linked to the user
    const newHistory = await prisma.history.create({
      data: {
        userId: user.id,
        name,
      },
    });

    return NextResponse.json({ newHistory }, { status: 201 });
  } catch (error) {
    console.error("Error creating new history:", error);
    return NextResponse.json(
      { error: "Error creating new history" },
      { status: 500 },
    );
  }
}
