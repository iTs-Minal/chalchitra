/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { tmdbId, rating, content } = await req.json();

  if (!tmdbId || !rating || !content) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const existing = await prisma.showReview.findFirst({
    where: {
      userId,
      tmdbId,
    },
  });

  if (existing) {
    return NextResponse.json({ error: 'Review already exists. Use PUT to edit.' }, { status: 409 });
  }

  const review = await prisma.showReview.create({
    data: {
      userId,
      tmdbId,
      rating,
      content,
    },
  });

  return NextResponse.json(review);
}

export async function PUT(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { tmdbId, rating, content } = await req.json();

  if (!tmdbId || !rating || !content) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const updated = await prisma.showReview.update({
    where: {
      userId_tmdbId: {
        userId,
        tmdbId,
      },
    },
    data: {
      rating,
      content,
      updatedAt: new Date(),
    },
  });

  return NextResponse.json(updated);
}


// export async function DELETE(req: Request) {
//   const { userId } = await auth();

//   if (!userId) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//   }

//   const { tmdbId } = await req.json();

//   if (!tmdbId) {
//     return NextResponse.json({ error: 'Missing tmdbId' }, { status: 400 });
//   }

//   try {
//     await prisma.showReview.delete({
//       where: {
//         userId_tmdbId: {
//           userId,
//           tmdbId,
//         },
//       },
//     });

//     return NextResponse.json({ message: 'Review deleted successfully' });
//   } catch (error) {
//     return NextResponse.json({ error: 'Review not found or already deleted' }, { status: 404 });
//   }
// }