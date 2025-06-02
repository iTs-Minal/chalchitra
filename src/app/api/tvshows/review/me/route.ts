import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const { userId } = await auth();
  const tmdbId = Number(searchParams.get('tmdbId'));

  if (!userId || !tmdbId) {
    return NextResponse.json(null, { status: 400 });
  }

  const review = await prisma.showReview.findFirst({
    where: {
      userId,
      tmdbId,
    },
  });

  return NextResponse.json(review);
}
