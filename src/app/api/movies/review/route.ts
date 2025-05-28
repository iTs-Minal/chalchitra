import { NextResponse } from 'next/server';
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { tmdbId, rating, content } = await req.json();

    if (!tmdbId || !rating || !content) {
        return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }


const review = await prisma.userReview.upsert({
  where: { 
    userId_tmdbId: {
      userId,
      tmdbId,
    },
  },
  update: {
    rating,
    content,
  },
  create: {
    userId,
    tmdbId,
    rating,
    content,
  },
});
return NextResponse.json(review);



}