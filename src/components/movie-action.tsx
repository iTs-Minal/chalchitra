/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { Heart, Star, Eye, ShoppingCart } from "lucide-react";
import ActionButtonSkeleton from "./skeleton/actionbutton-skeleton";

export default function MovieActions({ tmdbId, type }: { tmdbId: number; type: "movies" | "tvshows" }) {

  const [isFavorite, setIsFavorite] = useState(false);
  const [isRated, setIsRated] = useState(false);
  const [isWatched, setIsWatched] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);


  const [loading, setLoading] = useState(true);

  //for fetching favorite movies

  useEffect(() => {
    async function fetchFavorite() {
      try {
        const res = await fetch(`/api/${type}/favorite`);
        if (!res.ok) throw new Error("Failed to fetch favorites");
        const data = await res.json();

        // Check if current movie is in favorites
        const favorited = data.some((fav: any) => fav.tmdbId === tmdbId);
        setIsFavorite(favorited);
      } catch (err) {
        console.error("Error fetching favorites:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchFavorite();
  }, [tmdbId, type]);

  const handleFavoriteClick = async () => {
    const newStatus = !isFavorite;
    setIsFavorite(newStatus); // Optimistic UI update
    try {
      const res = await fetch(`/api/${type}/favorite`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tmdbId, action: isFavorite ? "remove" : "add" }),
      });

      if (!res.ok) throw new Error("Failed to update favorite status");

      const data = await res.json();
      console.log("Favorite status updated:", data);
    } catch (err) {
      console.error("Failed to update favorite status:", err);
      setIsFavorite(!newStatus); // revert UI on error
    }
  };

  //for fetching watched movies
  useEffect(() => {
    async function fetchWatched() {
      try {
        const res = await fetch(`/api/${type}/watched`);
        if (!res.ok) throw new Error("Failed to fetch watched");
        const data = await res.json();

        // Check if current is in watched
        const watched = data.some((wat: any) => wat.tmdbId === tmdbId);
        setIsWatched(watched);
      } catch (err) {
        console.error("Error fetching favorites:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchWatched();
  }, [tmdbId, type]);

  const handleWatchedClick = async () => {
    const newStatus = !isWatched;
    setIsWatched(newStatus); // Optimistic UI update
    try {
      const res = await fetch(`/api/${type}/watched`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tmdbId, action: isWatched ? "remove" : "add" }),
      });

      if (!res.ok) throw new Error("Failed to update watched status");

      const data = await res.json();
      console.log("Watched status updated:", data);
    } catch (err) {
      console.error("Failed to update watched status:", err);
      setIsWatched(!newStatus); // revert UI on error
    }
  };

  //for fetching watchlist movies
  useEffect(() => {
    async function fetchWatchlist() {
      try {
        const res = await fetch(`/api/${type}/watchlist`);
        if (!res.ok) throw new Error("Failed to fetch watchlist");
        const data = await res.json();

        // Check if current is in watchlist
        const watchlisted = data.some((wli: any) => wli.tmdbId === tmdbId);
        setIsInWatchlist(watchlisted);
      } catch (err) {
        console.error("Error fetching favorites:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchWatchlist();
  }, [tmdbId, type]);

  const handleWatchlistClick = async () => {
    const newStatus = !isInWatchlist;
    setIsInWatchlist(newStatus); // Optimistic UI update
    try {
      const res = await fetch(`/api/${type}/watchlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tmdbId,
          action: isInWatchlist ? "remove" : "add",
        }),
      });

      if (!res.ok) throw new Error("Failed to update watchlist status");

      const data = await res.json();
      console.log("Watchlist status updated:", data);
    } catch (err) {
      console.error("Failed to update watchlist status:", err);
      setIsInWatchlist(!newStatus); // revert UI on error
    }
  };

  //for rated movies

  useEffect(() => {
    async function checkRated() {
      const res = await fetch(`/api/movies/review/${tmdbId}`);
      const reviews = await res.json();

      const userReview = reviews.find((r: any) => r.isCurrentUser);
      if (userReview && userReview.rating) {
        setIsRated(true);
      }
    }
    checkRated();
  }, [tmdbId]);

  if (loading)
    return (
      <div className="flex flex-wrap gap-4 mt-6">
        <ActionButtonSkeleton />
      </div>
    );

  const baseStyle =
    "w-44 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium shadow-md transition-all duration-200";

  return (
    <div className="flex flex-wrap gap-4 mt-6">
      <button
        onClick={()=>handleFavoriteClick()}
        className={`${baseStyle} ${
          isFavorite
            ? "bg-pink-600 text-white hover:bg-pink-700"
            : "bg-zinc-800 text-white hover:bg-zinc-700"
        }`}
      >
        <Heart
          className={`w-5 h-5 ${
            isFavorite ? "fill-white" : "fill-transparent"
          }`}
        />
        {isFavorite ? "Favorited" : "Add Favorite"}
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
            ? "bg-yellow-400 text-black hover:bg-yellow-500"
            : "bg-zinc-800 text-white hover:bg-zinc-700"
        }`}
      >
        <Star
          className={`w-5 h-5 ${
            isRated ? "fill-yellow-300 text-yellow-700" : "fill-transparent"
          }`}
        />
        {isRated ? "Rated" : "Rate"}
      </button>

      <button
        onClick={() => handleWatchedClick()}
        className={`${baseStyle} ${
          isWatched
            ? "bg-green-500 text-white hover:bg-green-600"
            : "bg-zinc-800 text-white hover:bg-zinc-700"
        }`}
      >
        <Eye
          className={`w-5 h-5 ${isWatched ? "fill-white" : "fill-transparent"}`}
        />
        {isWatched ? "Watched" : "Mark Watched"}
      </button>

      <button
        onClick={() => handleWatchlistClick()}
        className={`${baseStyle} ${
          isInWatchlist
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-zinc-800 text-white hover:bg-zinc-700"
        }`}
      >
        <ShoppingCart
          className={`w-5 h-5 ${
            isInWatchlist ? "fill-white" : "fill-transparent"
          }`}
        />
        {isInWatchlist ? "Watchlisted" : "Add Watchlist"}
      </button>
    </div>
  );
}
