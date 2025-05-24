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
  rated: number;
  watched: number;
  wishlist: number;
};

const cardStyles = {
  favorites: "bg-pink-300 dark:bg-pink-300 text-black dark:text-black",
  rated: "bg-yellow-300 dark:bg-yellow-300 text-black dark:text-black",
  watched: "bg-green-300 dark:bg-green-300 text-black dark:text-black",
  wishlist: "bg-blue-300 dark:bg-blue-300 text-black dark:text-black",
};

const iconMap = {
  favorites: <Heart className="w-6 h-6" />,
  rated: <Star className="w-6 h-6" />,
  watched: <Eye className="w-6 h-6" />,
  wishlist: <ShoppingCart className="w-6 h-6" />,
};

export function StatsHeader() {
  const [stats, setStats] = useState<Stats>({
    favorites: 0,
    rated: 0,
    watched: 0,
    wishlist: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/movies/stats");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
      {[
        { label: 'Favorites', key: 'favorites' },
        { label: 'Rated', key: 'rated' },
        { label: 'Watched', key: 'watched' },
        { label: 'Wishlist', key: 'wishlist' },
      ].map((item) => (
        <div
          key={item.key}
          className={`${cardStyles[item.key as keyof Stats]} p-4 rounded-xl shadow flex flex-col items-center justify-center space-y-2`}
        >
          <div>{iconMap[item.key as keyof Stats]}</div>
          <h3 className="text-base font-semibold">{item.label}</h3>
          <p className="text-2xl font-bold">{stats[item.key as keyof Stats]}</p>
        </div>
      ))}
    </div>
  );
}
