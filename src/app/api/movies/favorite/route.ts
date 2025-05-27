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
        where:{userId,tmdbId,status:"FAVORITE"},
    });

    if(exists){
        return NextResponse.json({message:'already added'});
    }

    const result = await prisma.userMovieData.create({
        data:{
            userId,tmdbId,status:"FAVORITE",createdAt:new Date(),
        },
    });
    console.log("Created favorite entry:", result);
    return NextResponse.json(result);
}  if(action==="remove"){
    await prisma.userMovieData.deleteMany({
      where: { userId, tmdbId, status: "FAVORITE" },
    });
    return NextResponse.json({ message: "Favorite removed" });
}
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    // 1. Get favorite movie IDs for the user
    const favoriteData = await prisma.userMovieData.findMany({
      where: { userId, status: 'FAVORITE' },
      select: { tmdbId: true, createdAt: true },
    });

    // 2. Fetch movie details from TMDB for each favorite
    const movies = await Promise.all(
      favoriteData.map(async (fav:{tmdbId:number; createdAt:Date}) => {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${fav.tmdbId}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
        );
        if (!res.ok) {
          console.error(`Failed to fetch movie with tmdbId: ${fav.tmdbId}`);
          return null;
        }
        const movie = await res.json();
        return {
          tmdbId: fav.tmdbId,
          title: movie.title,
          poster_path: movie.poster_path,
          release_date:movie.release_date,
          vote_average:movie.vote_average,
          genre:movie.genres.map((g:any) => g.name).join(', '),
          added_date: fav.createdAt,
           // You can replace this with the actual added date if available
          // add any other fields you want here
        };
      })
    );

    // Filter out failed fetches
    const validMovies = movies.filter(Boolean);

    return NextResponse.json(validMovies);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return NextResponse.json({ error: 'Failed to fetch favorites' }, { status: 500 });
  }
}

   