/* eslint-disable @typescript-eslint/no-explicit-any */
import {NextResponse} from 'next/server';
import {auth} from "@clerk/nextjs/server";
import {prisma} from "@/lib/prisma";

export async function POST (req:Request){
    const {userId} = await auth();

    if(!userId)return NextResponse.json({error:"Unauthorized"}, {status:401});

    const {tmdbId, action} = await req.json();

    if(action==="add"){

       const exists = await prisma.userShowData.findFirst({
        where:{userId,tmdbId,status:"WATCHLIST"},
    });

    if(exists){
        return NextResponse.json({message:'already added'});
    }

    const result = await prisma.userShowData.create({
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
    await prisma.userShowData.deleteMany({
      where: { userId, tmdbId, status: "WATCHLIST" },
    });
    return NextResponse.json({ message: "WatchList show removed" });
}
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    // 1. Get watchlist show IDs for the user
    const watchlistData = await prisma.userShowData.findMany({
      where: { userId, status: 'WATCHLIST' },
      select: { tmdbId: true, createdAt: true },
    });

     const tmdbIds = watchlistData.map((wli) => wli.tmdbId);
        
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

    // 2. Fetch movie details from TMDB for each watchlist movie
    const shows = await Promise.all(
      watchlistData.map(async (wli: { tmdbId : number;  createdAt : Date}) => {
        const res = await fetch(
          `https://api.themoviedb.org/3/tv/${wli.tmdbId}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
        );
        if (!res.ok) {
          console.error(`Failed to fetch show with tmdbId: ${wli.tmdbId}`);
          return null;
        }
        const show = await res.json();
        return {
          id: show.id,
          tmdbId: wli.tmdbId,
          title: show.name,
          poster_path: show.poster_path,
          release_date: show.first_air_date,
          vote_average: show.vote_average,
          genre: show.genres.map((g: any) => g.name).join(', '),
          added_date: wli.createdAt,
          userRating: reviewMap.get(wli.tmdbId) ?? null,
        };
      })
    );

    // Filter out failed fetches
    const validShows = shows.filter(Boolean);

    return NextResponse.json(validShows);
  } catch (error) {
    console.error('Error fetching watchlist shows:', error);
    return NextResponse.json({ error: 'Failed to fetch watchlist shows' }, { status: 500 });
  }
}

   