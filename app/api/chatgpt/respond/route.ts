require("dotenv").config();
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import prisma from "@/prisma/client";
import { Prisma } from "@prisma/client";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  if (request.method !== "POST") {
    return NextResponse.json(
      { error: `Method ${request.method} Not Allowed` },
      { status: 405 },
    );
  }

  try {
    const body = await request.json();
    const { message, userEmail, history } = body;

    console.log(userEmail);

    // Validate the message and userEmail
    if (!message || !userEmail) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // Call OpenAI API
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    const botResponse = chatCompletion.choices[0].message.content;
    console.log("OpenAI Response:", botResponse);

    // If the user is not a 'Guest', save the message in the database
    if (userEmail !== "Guest") {
      try {
        const newMessage = await prisma.message.create({
          data: {
            historyId: history,
            botMessage: botResponse ?? Prisma.JsonNull,
            chatPrompt: message,
          },
        });
        console.log("Message saved:", newMessage);
      } catch (error) {
        console.error("Error saving message to database:", error);
      }
    }

    // Return the bot response to the client
    return NextResponse.json({ botResponse }, { status: 201 });
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    return NextResponse.json(
      { error: `Failed to generate response from OpenAI: ${error}` },
      { status: 500 },
    );
  }
}
