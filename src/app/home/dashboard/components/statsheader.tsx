'use client';

import { useEffect, useState } from "react";
import {
  Heart,
  Star,
  Eye,
  ShoppingCart,
} from 'lucide-react';

type Stats = {
  favorites: number;
  ratedCount: number;
  watched: number;
  watchlist: number;
};

const cardStyles = {
  favorites: "bg-pink-300 dark:bg-pink-300 text-black dark:text-black",
  ratedCount: "bg-yellow-300 dark:bg-yellow-300 text-black dark:text-black",
  watched: "bg-green-300 dark:bg-green-300 text-black dark:text-black",
  watchlist: "bg-blue-300 dark:bg-blue-300 text-black dark:text-black",
};

const iconMap = {
  favorites: <Heart className="w-6 h-6" />,
  ratedCount: <Star className="w-6 h-6" />,
  watched: <Eye className="w-6 h-6" />,
  watchlist: <ShoppingCart className="w-6 h-6" />,
};

export function StatsHeader({ type }: { type: 'movies' | 'tvshows' }) {
  const [stats, setStats] = useState<Stats>({
    favorites: 0,
    ratedCount: 0,
    watched: 0,
    watchlist: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch(`/api/${type}/stats`);
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    }
    fetchStats();
  }, [type]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full">
      {[
        { label: 'Favorites', key: 'favorites' },
        { label: 'Rated', key: 'ratedCount' },
        { label: 'Watched', key: 'watched' },
        { label: 'Watchlist', key: 'watchlist' },
      ].map((item) => (
        <div
          key={item.key}
          className={`${cardStyles[item.key as keyof Stats]} p-3 sm:p-4 rounded-xl shadow flex flex-col items-center justify-center space-y-2 transition-transform hover:scale-[1.02]`}
        >
          <div>{iconMap[item.key as keyof Stats]}</div>
          <h3 className="text-base sm:text-xl font-kanit">{item.label}</h3>
          <p className="text-lg sm:text-2xl font-bold">{stats[item.key as keyof Stats] || "0"}</p>
        </div>
      ))}
    </div>
  );
}
