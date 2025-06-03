import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth } from '@clerk/nextjs/server';

const prisma = new PrismaClient();


export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { reviewId, isLike } = await request.json();
    
    if (!reviewId || typeof isLike !== 'boolean') {
      return NextResponse.json(
        { error: 'reviewId and isLike (boolean) are required' }, 
        { status: 400 }
      );
    }

    // Check if review exists
    const review = await prisma.showReview.findUnique({
      where: { id: reviewId }
    });

    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    // Prevent users from reacting to their own reviews
    if (review.userId === userId) {
      return NextResponse.json({ error: 'Cannot react to your own review' }, { status: 403 });
    }

    // Check if user already reacted to this review
    const existingReaction = await prisma.showReviewReaction.findUnique({
      where: {
        userId_reviewId: {
          userId,
          reviewId
        }
      }
    });

    if (existingReaction) {
      // If same reaction, remove it (toggle off)
      if (existingReaction.isLike === isLike) {
        await prisma.showReviewReaction.delete({
          where: { id: existingReaction.id }
        });
        
        return NextResponse.json({ 
          message: 'Reaction removed',
          action: 'removed'
        });
      } else {
        // Update to opposite reaction
        const updatedReaction = await prisma.showReviewReaction.update({
          where: { id: existingReaction.id },
          data: { isLike }
        });
        
        return NextResponse.json({ 
          message: 'Reaction updated',
          reaction: updatedReaction,
          action: 'updated'
        });
      }
    } else {
      // Create new reaction
      const newReaction = await prisma.showReviewReaction.create({
        data: {
          userId,
          reviewId,
          isLike
        }
      });
      
      return NextResponse.json({ 
        message: 'Reaction added',
        reaction: newReaction,
        action: 'added'
      });
    }

  } catch (error) {
    console.error('Error handling movie review reaction:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}

// GET endpoint to fetch reaction counts and user's reaction
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    const { searchParams } = new URL(request.url);
    const reviewId = searchParams.get('reviewId');

    if (!reviewId) {
      return NextResponse.json(
        { error: 'reviewId is required' }, 
        { status: 400 }
      );
    }

    // Get reaction counts
    const [likeCount, dislikeCount] = await Promise.all([
      prisma.movieReviewReaction.count({
        where: { reviewId, isLike: true }
      }),
      prisma.movieReviewReaction.count({
        where: { reviewId, isLike: false }
      })
    ]);

    // Get user's reaction if authenticated
    let userReaction = null;
    if (userId) {
      userReaction = await prisma.showReviewReaction.findUnique({
        where: {
          userId_reviewId: {
            userId,
            reviewId
          }
        }
      });
    }

    return NextResponse.json({
      likeCount,
      dislikeCount,
      userReaction: userReaction ? {
        isLike: userReaction.isLike,
        createdAt: userReaction.createdAt
      } : null
    });

  } catch (error) {
    console.error('Error fetching movie review reactions:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}