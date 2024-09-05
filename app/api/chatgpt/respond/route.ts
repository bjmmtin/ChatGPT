require("dotenv").config();
import { NextRequest, NextResponse } from "next/server";
const { OpenAI } = require("openai");
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
  });
  export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { message }  = body;
        console.log("MESSAGE: ", message);
        
        //if invalid - return 400
        if (!message)
          return NextResponse.json({ status: 400 });
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }],
          });
        console.log("PASSED");
        console.log("OpenAI Response:", chatCompletion.choices[0].message.content);
        // Send the ChatGPT response back to the client
        return NextResponse.json({ botResponse: chatCompletion.choices[0].message.content },{ status: 201 });
    } catch (error) {
        console.error("Error calling OpenAI:", error);
        return NextResponse.json({ error: "Failed to generate response from OpenAI" },{ status: 400 });
    }
  
  }
  