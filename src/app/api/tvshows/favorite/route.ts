/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from 'next/server';
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { tmdbId, action } = await req.json();

  if (action === "add") {

    const exists = await prisma.userShowData.findFirst({
      where: { userId, tmdbId, status: "FAVORITE" },
    });

    if (exists) {
      return NextResponse.json({ message: 'already added' });
    }

    const result = await prisma.userShowData.create({
      data: {
        userId, tmdbId, status: "FAVORITE", createdAt: new Date(),
      },
    });
    console.log("Created favorite entry:", result);
    return NextResponse.json(result);
  } if (action === "remove") {
    await prisma.userShowData.deleteMany({
      where: { userId, tmdbId, status: "FAVORITE" },
    });
    return NextResponse.json({ message: "Favorite removed" });
  }
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    // 1. Get favorite show IDs for the user
    const favoriteData = await prisma.userShowData.findMany({
      where: { userId, status: 'FAVORITE' },
      select: { tmdbId: true, createdAt: true },
    });

    const tmdbIds = favoriteData.map((fav) => fav.tmdbId);

    // Step 2: Get reviews for these tmdbIds by the same user
    const userReviews = await prisma.showReview.findMany({
      where: {
        userId,
        tmdbId: { in: tmdbIds },
      },
      select: {
        tmdbId: true,
        rating: true,
      },
    });

    const reviewMap = new Map(userReviews.map((r) => [r.tmdbId, r.rating]));

    // 2. Fetch show details from TMDB for each favorite
    const shows = await Promise.all(
      favoriteData.map(async (fav: { tmdbId: number; createdAt: Date }) => {
        const res = await fetch(
          `https://api.themoviedb.org/3/tv/${fav.tmdbId}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
        );
        if (!res.ok) {
          console.error(`Failed to fetch show with tmdbId: ${fav.tmdbId}`);
          return null;
        }
        const show = await res.json();
        return {
          id: show.id,
          tmdbId: fav.tmdbId,
          name: show.name,
          poster_path: show.poster_path,
          first_air_date: show.first_air_date,
          vote_average: show.vote_average,
          genre: show.genres.map((g: any) => g.name).join(', '),
          added_date: fav.createdAt,
          userRating: reviewMap.get(fav.tmdbId) ?? null,
          // You can replace this with the actual added date if available
          // add any other fields you want here
        };
      })
    );

    // Filter out failed fetches
    const validShows = shows.filter(Boolean);

    return NextResponse.json(validShows);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return NextResponse.json({ error: 'Failed to fetch favorites' }, { status: 500 });
  }
}

