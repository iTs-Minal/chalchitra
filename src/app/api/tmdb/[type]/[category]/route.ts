import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { type: string; category: string } }
) {
  const { type, category } = params;
  const page = request.nextUrl.searchParams.get("page") || "1";

  const allowedEndpoints: Record<string, Record<string, string>> = {
    movie: {
      popular: "https://api.themoviedb.org/3/movie/popular",
      top_rated: "https://api.themoviedb.org/3/movie/top_rated",
      upcoming: "https://api.themoviedb.org/3/movie/upcoming",
      now_playing: "https://api.themoviedb.org/3/movie/now_playing",
      latest: "https://api.themoviedb.org/3/movie/latest",
    },
    tv: {
      popular: "https://api.themoviedb.org/3/tv/popular",
      top_rated: "https://api.themoviedb.org/3/tv/top_rated",
      airing_today: "https://api.themoviedb.org/3/tv/airing_today",
      on_the_air: "https://api.themoviedb.org/3/tv/on_the_air",
      latest: "https://api.themoviedb.org/3/tv/latest",
    },
  };

  if (!allowedEndpoints[type] || !allowedEndpoints[type][category]) {
    return NextResponse.json({ error: "Invalid type or category" }, { status: 400 });
  }

  const url = allowedEndpoints[type][category];

  try {
    const response = await fetch(`${url}?api_key=${process.env.TMDB_API_KEY}&page=${page}`);
    if (!response.ok) throw new Error("Failed to fetch from TMDB");

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
