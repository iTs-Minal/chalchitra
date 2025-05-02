export async function fetchFromTMDB(endpoint: string, page: number = 1) {
  try {
    const res = await fetch(`${endpoint}?page=${page}`);
    if (!res.ok) throw new Error("Failed to fetch data from TMDB");
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

  