/* eslint-disable @typescript-eslint/no-unused-vars */
// pages/api/seasons.ts

import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tvId = searchParams.get('tvId');
  const seasonNumber = searchParams.get('seasonNumber');

 
  if (!tvId || !seasonNumber) {
    return new Response(JSON.stringify({ error: 'Missing parameters' }), { status: 400 });
  }

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNumber}?api_key=${process.env.TMDB_API_KEY}`
    );

    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), { status: 500 });
  }
}
