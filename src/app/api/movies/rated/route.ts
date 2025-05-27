import {NextResponse} from 'next/server';
import {auth} from "@clerk/nextjs/server";
import {prisma} from "@/lib/prisma";

export async function POST (req: Request){
    const {userId}=await auth();

    if(!userId){
        return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const {rating, tmdbId} = await req.json();

if(!tmdbId || !rating){
        return NextResponse.json({error: 'Invalid input'}, {status: 400});
    }

    const existing= await prisma.userMovieData.findFirst({
        where: {
            userId,
            tmdbId
        }
    });

    let result;
    if(existing){
        result= await prisma.userMovieData.update({
            where: {
                id: existing.id
            },
            data: {
                rating
            }
        });
    }else{
        result= await prisma.userMovieData.create({
            data:{
                userId,tmdbId,rating,status: 'WATCHED'
            }
        })
    }

    return NextResponse.json(result);

}