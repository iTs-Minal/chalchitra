/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function GET(_: Request, { params }: { params: { tmdbId: string } }) {
  const tmdbId = parseInt(params.tmdbId);

  const reviews = await prisma.movieReview.findMany({
    where: { tmdbId },
    orderBy: { updatedAt: 'desc' },
  });

  const userIds = reviews.map((r: { userId: any; }) => r.userId);
  const client= await clerkClient();
  const users = await client.users.getUserList({ userId: userIds });

  const enrichedReviews = reviews.map((review: { userId: any; }) => {
    const user = users.data.find((u: { id: any; }) => u.id === review.userId);
    return {
      ...review,
      username: user?.username || user?.firstName || 'Anonymous',
      imageUrl: user?.imageUrl || '',
      // `isCurrentUser` should be compared to currently authenticated user, 
      // but Clerk doesn't give user from the client here, so consider removing or fetching userId from auth if needed
      isCurrentUser: false, 
    };
  });

  return NextResponse.json(enrichedReviews);
}
