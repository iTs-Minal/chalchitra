/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse, NextRequest } from 'next/server';
import { clerkClient, getAuth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: Promise<{ tmdbId: string }> }) {
  const {userId: currentUserId}= getAuth(req);
  const awaitedParams = await params;
  const tmdbId = parseInt(awaitedParams.tmdbId);

  const reviews = await prisma.movieReview.findMany({
    where: { tmdbId },
    orderBy: { updatedAt: 'desc' },
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
      isCurrentUser: review.userId === currentUserId, 
    };
  });

  return NextResponse.json(enrichedReviews);
}

export async function DELETE(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const reviewId  = req.nextUrl.searchParams.get('reviewId');

  if (!reviewId) {
    return NextResponse.json({ error: 'Missing reviewId' }, { status: 400 });
  }

  const review = await prisma.movieReview.findUnique({
    where: { id: reviewId },
  });

  if (!review || review.userId !== userId) {
    return NextResponse.json({ error: 'Review not found or unauthorized' }, { status: 404 });
  }

  await prisma.movieReview.delete({
    where: { id: reviewId },
  });

  return NextResponse.json({ message: 'Review deleted successfully' });
}
