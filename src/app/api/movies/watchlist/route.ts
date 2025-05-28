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
        where:{userId,tmdbId,status:"WATCHLIST"},
    });

    if(exists){
        return NextResponse.json({message:'already added'});
    }

    const result = await prisma.userMovieData.create({
        data:{
            userId,
            tmdbId,
            status:"WATCHLIST", 
            createdAt:new Date(),
        },
    });
    console.log("Created watched entry:", result);
    return NextResponse.json(result);
}  
if(action==="remove"){
    await prisma.userMovieData.deleteMany({
      where: { userId, tmdbId, status: "WATCHLIST" },
    });
    return NextResponse.json({ message: "WatchList movie removed" });
}
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    // 1. Get watchlist movie IDs for the user
    const watchlistData = await prisma.userMovieData.findMany({
      where: { userId, status: 'WATCHLIST' },
      select: { tmdbId: true, createdAt: true },
    });

     const tmdbIds = watchlistData.map((wli) => wli.tmdbId);
        
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

    // 2. Fetch movie details from TMDB for each watchlist movie
    const movies = await Promise.all(
      watchlistData.map(async (wli: { tmdbId : number;  createdAt : Date}) => {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${wli.tmdbId}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
        );
        if (!res.ok) {
          console.error(`Failed to fetch movie with tmdbId: ${wli.tmdbId}`);
          return null;
        }
        const movie = await res.json();
        return {
          tmdbId: wli.tmdbId,
          title: movie.title,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
          genre: movie.genres.map((g: any) => g.name).join(', '),
          added_date: wli.createdAt,
          userRating: reviewMap.get(wli.tmdbId) ?? null,
        };
      })
    );

    // Filter out failed fetches
    const validMovies = movies.filter(Boolean);

    return NextResponse.json(validMovies);
  } catch (error) {
    console.error('Error fetching watchlist movies:', error);
    return NextResponse.json({ error: 'Failed to fetch watchlist movies' }, { status: 500 });
  }
}

   