"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GlowingEffect } from "../ui/glowing-effect";
import React from "react";

interface Movie {
  id: number;
  title: string;
  vote_average?: number;
  poster_path?: string;
  release_date?: string;
  media_type: string;
}

const MovieCard = ({ id, title, vote_average, poster_path, media_type, release_date }: Movie) => {
  const slug = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${id}`;

  return (
     <div className="bg-neutral-200 dark:bg-zinc-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 group">
          {/* Poster */}
          <div className="relative w-full aspect-[2/3]">
            <GlowingEffect
              spread={60}
              glow
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
            />
            <Image
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={title || "movie poster"}
              fill
              className="object-cover group-hover:brightness-50 transition duration-300"
              sizes="(max-width: 768px) 100vw, 200px"
            />
            <span className="absolute top-2 left-2 flex items-center gap-1 bg-black/60 text-yellow-400 px-2 py-1 rounded-md text-xs sm:text-sm font-kanit z-10">
              <Star className="w-4 h-4 fill-amber-400" /> {vote_average?.toFixed(1)}
            </span>
          </div>
    
          {/* Info Section */}
          <div className="flex flex-col justify-between px-3 py-3 h-[110px]">
            {/* Release date & media type */}
            <div className="text-sm text-left text-gray-600 dark:text-gray-300 font-kanit mb-1 flex gap-4">
              {media_type && <span className="capitalize">{media_type}</span>}
              {release_date && <span>  {release_date?.slice(0,4)}</span>}
            </div>
    
            {/* Title */}
            <p className="font-outfit text-sm sm:text-base font-semibold text-center line-clamp-1 text-black dark:text-white">
              {title}
            </p>
    
            {/* Button */}
            <Link href={`/movies/${slug}`}>
              <button className="mt-2 w-full py-1.5 text-xs sm:text-sm font-kanit bg-white dark:bg-zinc-800 text-black dark:text-white rounded hover:bg-yellow-500 hover:text-black transition duration-300 hover:scale-95">
                View Details
              </button>
            </Link>
          </div>
        </div>
  );
};

export default MovieCard;
