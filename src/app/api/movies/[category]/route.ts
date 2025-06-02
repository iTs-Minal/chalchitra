import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ category: string }> }) {
  const awaitedParams = await params;
    const { category } = awaitedParams;

    const allowedEndpoints: Record<string, string> = {
        trending: "https://api.themoviedb.org/3/trending/movie/week",
        top_rated: "https://api.themoviedb.org/3/movie/top_rated",
        upcoming: "https://api.themoviedb.org/3/movie/upcoming",
        now_playing: "https://api.themoviedb.org/3/movie/now_playing",
        popular: "https://api.themoviedb.org/3/movie/popular",
        latest: "https://api.themoviedb.org/3/movie/latest",
      };
    
      const url = allowedEndpoints[category];
    
      if (!url) {
        return NextResponse.json({ error: "Invalid category" }, { status: 400 });
      }
    
      try {
        const response = await fetch(`${url}?api_key=${process.env.TMDB_API_KEY}`);
        const data = await response.json();
        return NextResponse.json(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
      }
}