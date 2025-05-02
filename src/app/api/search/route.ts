import { NextResponse } from "next/server";

export async function GET(req:Request){
    const {searchParams} = new URL(req.url);
    const query = searchParams.get("query");
    const page = searchParams.get("page")||"1";
    
    if (!query) return NextResponse.json({results:[]});
    
    const res = await fetch(`https://api.themoviedb.org/3/search/multi?query=${query}&page=${page}&api_key=${process.env.TMDB_API_KEY}`);

    const data = await res.json();
    return NextResponse.json(data);

}