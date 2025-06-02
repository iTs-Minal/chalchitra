import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ category: string }> }) {
  const awaitedParams = await params;
    const { category } = awaitedParams;

    const allowedEndpoints: Record<string, string> = {
        trending: "https://api.themoviedb.org/3/trending/tv/week",
        top_rated: "https://api.themoviedb.org/3/tv/top_rated",
        upcoming: "https://api.themoviedb.org/3/tv/upcoming",
        on_the_air: "https://api.themoviedb.org/3/tv/on_the_air",
        popular: "https://api.themoviedb.org/3/tv/popular",
        latest: "https://api.themoviedb.org/3/tv/latest",
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