export async function fetchFromTMDB(endpoint: string, page: number = 1) {

    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    if (!apiKey) throw new Error('TMDB API key not found in environment');

    const res = await fetch(
      `https://api.themoviedb.org/3/${endpoint}?api_key=${apiKey}&page=${page}`,
      { cache: 'no-store' }
    );
  
    if (!res.ok) throw new Error('Failed to fetch data from TMDB');
    const data = await res.json(); // includes { results, page, total_pages }
    return data; // returning the fetched data
  }
  