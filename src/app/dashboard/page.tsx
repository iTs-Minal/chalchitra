"use client"
import Image from 'next/image';
import { useEffect, useState } from 'react';

type FavoriteMovie = {
  tmdbId: number;
  title: string;
  poster_path: string;
  // add any other properties you want to show
};

export default function Dashboard() {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFavorites() {
      try {
        // Step 1: fetch favorites from your backend
        const res = await fetch('/api/movies/favorite');
        if (!res.ok) throw new Error('Failed to fetch favorites');
        const favoriteData = await res.json();


        setFavorites(favoriteData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchFavorites();
  }, []);

  if (loading) return <p>Loading favorites...</p>;

  return (
    <div>
      <h2>Your Favorite Movies</h2>
      <ul>
        {favorites.map((movie) => (
          <li key={movie.tmdbId} className="flex items-center gap-4 mb-4">
            <Image
              src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
              alt={movie.title}
              width={50}
              height={75}
            />
            <span>{movie.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
