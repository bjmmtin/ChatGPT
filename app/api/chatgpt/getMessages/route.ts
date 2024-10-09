// pages/api/getMessagesByEmail.ts

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma/client'; // Assuming you have Prisma client set up
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  if (req.method === 'GET') {
      const searchParams = req.nextUrl.searchParams
      console.log(searchParams);
      const history = searchParams.get('history')
    // Extract the email from the query parameters
    
    if (!history ) {
      return NextResponse.json({ error: "Invalid history" }, { status: 400 });
    }

    try {

      const messages = await prisma.message.findMany({
        where: { historyId: parseInt(history,10) }, // Filter messages by userId
        include: {
          history: true, // Include history info if needed
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
