/* eslint-disable @typescript-eslint/no-explicit-any */

import {NextResponse} from 'next/server';
import {auth} from "@clerk/nextjs/server";
import {prisma} from "@/lib/prisma";

export async function POST (req:Request){
    const {userId} = await auth();

    if(!userId)return NextResponse.json({error:"Unauthorized"}, {status:401});

    const {tmdbId, action} = await req.json();

    if(action==="add"){

       const exists = await prisma.userMovieData.findFirst({
        where:{userId,tmdbId,status:"WATCHED"},
    });

    if(exists){
        return NextResponse.json({message:'already added'});
    }

    const result = await prisma.userMovieData.create({
        data:{
            userId,
            tmdbId,
            status:"WATCHED", 
            createdAt:new Date(),
        },
    });
    console.log("Created watched entry:", result);
    return NextResponse.json(result);
}  
if(action==="remove"){
    await prisma.userMovieData.deleteMany({
      where: { userId, tmdbId, status: "WATCHED" },
    });
    return NextResponse.json({ message: "Watched movie removed" });
}
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    // 1. Get watched movie IDs for the user
    const watchedData = await prisma.userMovieData.findMany({
      where: { userId, status: 'WATCHED' },
      select: { tmdbId: true, createdAt: true },
    });

    const tmdbIds = watchedData.map((wat) => wat.tmdbId);
    
        // Step 2: Get reviews for these tmdbIds by the same user
        const userReviews = await prisma.userReview.findMany({
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

    // 2. Fetch movie details from TMDB for each watched movie
    const movies = await Promise.all(
      watchedData.map(async (wat: { tmdbId : number;  createdAt : Date}) => {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${wat.tmdbId}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
        );
        if (!res.ok) {
          console.error(`Failed to fetch movie with tmdbId: ${wat.tmdbId}`);
          return null;
        }
        const movie = await res.json();
        return {
          tmdbId: wat.tmdbId,
          title: movie.title,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
          genre: movie.genres.map((g: any) => g.name).join(', '),
          added_date: wat.createdAt,
          userRating: reviewMap.get(wat.tmdbId) ?? null,
        };
      })
    );

    // Filter out failed fetches
    const validMovies = movies.filter(Boolean);

    return NextResponse.json(validMovies);
  } catch (error) {
    console.error('Error fetching watched movies:', error);
    return NextResponse.json({ error: 'Failed to fetch watched movies' }, { status: 500 });
  }
}

   