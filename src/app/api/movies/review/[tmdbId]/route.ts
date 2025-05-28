// app/api/movies/review/[tmdbId]/route.ts
import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function GET(_: Request, { params }: { params: { tmdbId: string } }) {
  const tmdbId = parseInt(params.tmdbId);

  const reviews = await prisma.userReview.findMany({
    where: { tmdbId },
    orderBy: { updatedAt: 'desc' }
  });

  const userIds = reviews.map(r => r.userId);
  const client = await clerkClient();
  const users = await client.users.getUserList({ userId: userIds });


    const enrichedReviews = reviews.map(review => {
    const user = users.data.find(u => u.id === review.userId);
    return {
      ...review,
      username: user?.username || user?.firstName || 'Anonymous',
      imageUrl: user?.imageUrl || '',
    };
  });

  return NextResponse.json(enrichedReviews);
}
