import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";

import {prisma} from "@/lib/prisma";

export async function GET(){
    const {userId} = await auth();

    if(!userId){
        return NextResponse.json({error:'Unauthorized'},{status:401});
    }

    const [favorites, watched, watchlist] = await Promise.all([
        prisma.userShowData.count({where:{userId, status:"FAVORITE"}}),
        prisma.userShowData.count({where:{userId, status:"WATCHED"}}),
        prisma.userShowData.count({where:{userId, status:"WATCHLIST"}}),

    ]);
    const ratedCount =await prisma.movieReview.count({ where: {
      userId,
      rating: {
        gt: 0, // only count rated shows
      },
    },})

    return NextResponse.json({
        favorites,
        watched,
        watchlist,
        ratedCount
    });

}