// pages/api/getMessagesByEmail.ts

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma/client'; // Assuming you have Prisma client set up
import { NextRequest, NextResponse } from 'next/server';

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
      // Step 1: Find the user by email
      const user = await prisma.user.findUnique({
        where: { email: email },
      });

      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      // Step 2: Fetch all messages associated with this user
      const messages = await prisma.message.findMany({
        where: { userId: user.id }, // Filter messages by userId
        include: {
          user: true, // Include user info if needed
        },
      });

      return NextResponse.json({ messages }, { status: 200 });

    } catch (error) {
      console.error('Error fetching messages:', error);
      return NextResponse.json({ error: 'Error fetching messages' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: `Method ${req.method} Not Allowed` }, { status: 405 });
  }
}
