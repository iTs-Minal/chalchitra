// app/api/movies/review/[tmdbId]/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function GET(_: Request, { params }: { params: { tmdbId: string } }) {
  const { userId } = await auth();
  const tmdbId = parseInt(params.tmdbId);

  const reviews = await prisma.userReview.findMany({
    where: { tmdbId },
    orderBy: { updatedAt: 'desc' }
  });

  const withCurrentFlag = reviews.map(r => ({
    ...r,
    isCurrentUser: r.userId === userId,
  }));

  return NextResponse.json(withCurrentFlag);
}
