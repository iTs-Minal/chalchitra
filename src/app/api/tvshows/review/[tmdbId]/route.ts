/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/shows/review/[tmdbId]/route.ts
import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function GET(_: Request, { params }: { params: Promise<{ tmdbId: string }> }) {
  const awaitedParams = await params;
  const tmdbId = parseInt(awaitedParams.tmdbId);

  const reviews = await prisma.showReview.findMany({
    where: { tmdbId },
    orderBy: { updatedAt: 'desc' }
  });

  const userIds = reviews.map((r: { userId: any; }) => r.userId);
  const client = await clerkClient();
  const users = await client.users.getUserList({ userId: userIds });

  const enrichedReviews = reviews.map((review: { userId: any; }) => {
    const user = users.data.find((u: { id: any; }) => u.id === review.userId);
    return {
      ...review,
      username: user?.username || user?.firstName || 'Anonymous',
      imageUrl: user?.imageUrl || '',
      isCurrentUser: review.userId === user?.id,
    };
  });

  return NextResponse.json(enrichedReviews);
}
