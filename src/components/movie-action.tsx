/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState,useEffect } from 'react';
import { Heart, Star, Eye, ShoppingCart } from 'lucide-react';

export default function MovieActions({ tmdbId }: { tmdbId: number }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isRated, setIsRated] = useState(false);
  const [isWatched, setIsWatched] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFavorite() {
      try {
        const res = await fetch('/api/movies/favorite');
        if (!res.ok) throw new Error('Failed to fetch favorites');
        const data = await res.json();

        // Check if current movie is in favorites
        const favorited = data.some((fav: any) => fav.tmdbId === tmdbId);
        setIsFavorite(favorited);
      } catch (err) {
        console.error('Error fetching favorites:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchFavorite();
  }, [tmdbId]);

  const handleFavoriteClick = async () => {
    const newStatus = !isFavorite;
    setIsFavorite(newStatus); // Optimistic UI update

    try {
      const res = await fetch('/api/movies/favorite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tmdbId, isFavorite: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to update favorite status');

      const data = await res.json();
      console.log('Favorite status updated:', data);
    } catch (err) {
      console.error('Failed to update favorite status:', err);
      setIsFavorite(!newStatus); // revert UI on error
    }
  };

  if (loading) return <p>Loading...</p>; 


  const baseStyle =
    'w-44 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium shadow-md transition-all duration-200';

  return (
    <div className="flex flex-wrap gap-4 mt-6">
      <button
        onClick={handleFavoriteClick}
        className={`${baseStyle} ${
          isFavorite
            ? 'bg-pink-600 text-white hover:bg-pink-700'
            : 'bg-zinc-800 text-white hover:bg-zinc-700'
        }`}
      >
        <Heart
          className={`w-5 h-5 ${
            isFavorite ? 'fill-white' : 'fill-transparent'
          }`}
        />
        {isFavorite ? 'Favorited' : 'Add Favorite'}
      </button>

      <button
      onClick={() => {
        const el = document.getElementById("rating");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
        setIsRated(true); // Optional: visual toggle
      }}
        className={`${baseStyle} ${
          isRated
            ? 'bg-yellow-400 text-black hover:bg-yellow-500'
            : 'bg-zinc-800 text-white hover:bg-zinc-700'
        }`}
      >
        <Star
          className={`w-5 h-5 ${
            isRated ? 'fill-yellow-300 text-yellow-700' : 'fill-transparent'
          }`}
        />
        {isRated ? 'Rated' : 'Rate'}
      </button>

      <button
        onClick={() => setIsWatched(!isWatched)}
        className={`${baseStyle} ${
          isWatched
            ? 'bg-green-500 text-white hover:bg-green-600'
            : 'bg-zinc-800 text-white hover:bg-zinc-700'
        }`}
      >
        <Eye
          className={`w-5 h-5 ${
            isWatched ? 'fill-white' : 'fill-transparent'
          }`}
        />
        {isWatched ? 'Watched' : 'Mark Watched'}
      </button>

      <button
        onClick={() => setIsInWishlist(!isInWishlist)}
        className={`${baseStyle} ${
          isInWishlist
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-zinc-800 text-white hover:bg-zinc-700'
        }`}
      >
        <ShoppingCart
          className={`w-5 h-5 ${
            isInWishlist ? 'fill-white' : 'fill-transparent'
          }`}
        />
        {isInWishlist ? 'Wishlisted' : 'Add Wishlist'}
      </button>
    </div>
  );
}
