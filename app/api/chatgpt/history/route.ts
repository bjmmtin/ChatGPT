require("dotenv").config();
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";



export async function GET(req: NextRequest) {
    if (req.method === 'GET') {
        const searchParams = req.nextUrl.searchParams
        console.log(searchParams);
        const email = searchParams.get('email')
        // Extract the email from the query parameters

        if (!email || typeof email !== 'string') {
            return NextResponse.json({ error: "Invalid email" }, { status: 400 });
        }
        try {
            const user = await prisma.user.findUnique({
                where: { email: email },
            });

            if (!user) {
                return NextResponse.json({ error: 'User not found' }, { status: 404 });
            }
            // Step 2: Fetch all messages associated with this user
            const histories = await prisma.history.findMany({
                where: { userId: user.id }, // Filter messages by userId
                include: {
                    user: true, // Include user info if needed
                },
            });
            return NextResponse.json({ histories }, { status: 200 });
        } catch (error) {
            console.error('Error fetching messages:', error);
            return NextResponse.json({ error: 'Error fetching messages' }, { status: 500 });
        }
    } else {
        return NextResponse.json({ error: `Method ${req.method} Not Allowed` }, { status: 405 });
    }
}

export async function POST(request: NextRequest) {
    try {

        const body = await request.json();
        const { name, userEmail } = body;

        // Validate the name and userEmail
        if (!name || !userEmail) {
            return NextResponse.json({ error: "Invalid input" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email: userEmail },
        });

        if (!user) {
            console.log(`User not found with email: ${userEmail}`);
        } else {
            // Step 2: Create a new message linked to the user
            const newHistory = await prisma.history.create({
                data: {
                    userId: user.id,
                    name: name
                },
            });
            console.log("Message saved:", newHistory);
            return NextResponse.json({ newHistory }, { status: 201 });
        }
    }
    catch (error) {
        console.error("Error calling OpenAI:", error);
        return NextResponse.json(
            { error: `Failed to generate response from OpenAI: ${error}` },
            { status: 500 },
        );
    }
}
