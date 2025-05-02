import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";
import { GlowingEffect } from "../ui/glowing-effect";

interface TvShow {
  id:number;
    name?: string;
    vote_average?: number;
    poster_path?: string;
  }

const ShowCard = ({name,vote_average,poster_path}: TvShow) => {
  return (
    <div className="flex flex-col items-center justify-center w-[185px] h-90 bg-neutral-300 dark:bg-zinc-900 mt-5 mx-2">
        <div className="relative flex items-center justify-center w-full h-full object-contain">
        <GlowingEffect
          spread={60}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
          <Image
            src={`https://image.tmdb.org/t/p/original${poster_path}`}
            alt={name || "Movie poster"}
            width={500}
  height={750}
            className="w-full h-full object-cover hover:brightness-40"
          />
          <span className="absolute top-1 left-1 flex items-center gap-1 text-yellow-500 font-bold font-kanit">
            <Star className="fill-amber-400"/> {vote_average?.toFixed(1)}
          </span>
        </div>
        <div>
          <div className=" flex flex-col items-center justify-center w-full h-full gap-1">
            <span className="font-outfit text-md p-1 line-clamp-1">{name}</span>
            <button className="p-2 mb-1 hover:scale-95 bg-zinc-50 dark:text-white dark:bg-zinc-950 flex items-center justify-center rounded-md text-sm">
              View Details
            </button>
          </div>
        </div>
      </div>
  );
};

export default ShowCard;
