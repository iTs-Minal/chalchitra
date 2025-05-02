"use client";
import React from "react";
import { BackgroundBeams } from "../ui/background-beams";
import { Button } from "../ui/moving-border";
import { ArrowRight, Search } from "lucide-react";
import { motion } from 'motion/react';
import Link from "next/link";
import { useRouter } from "next/navigation";

export function HeroSection() {

   const [query,setQuery]=React.useState("");
   const router = useRouter();

   const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search/${encodeURIComponent(query)}/page/1`);
      setQuery('');
    }
  };



  return (
    <div className="h-[50rem] w-100% bg-neutral-100 dark:bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4 flex flex-col items-center justify-center h-full relative z-10">
        <motion.h1 initial={{y:-100 ,opacity:1}} whileInView={{y:0 , opacity:1}} transition={{duration:0.5}} className="relative z-10 text-lg md:text-7xl font-outfit  bg-clip-text text-transparent bg-black/70 dark:bg-gradient-to-b from-neutral-100 to-neutral-600   text-center font-sans font-bold">
          Discover, Rate & Track Your Favorite Movies
        </motion.h1>
        <p></p>
        <motion.p initial={{y:-50 ,opacity:1}} whileInView={{y:0 , opacity:1}} transition={{duration:0.5}} className="dark:text-neutral-300 font-exo text-black max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          Join Chalchitra — your personal movie companion. Explore trending
          films, add them to your watchlist, and share your ratings with the
          world.
        </motion.p>
        <form onSubmit={handleSearch} className="flex items-center justify-center w-full rounded-full">
          <input
            type="text"
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            placeholder="Search for movies..."
            className="rounded-l-lg w-full relative text-white dark:text-black z-10 mt-4 p-2.5 dark:bg-white/90 bg-neutral-950 placeholder:text-white dark:placeholder:text-zinc-600 focus:placeholder:opacity-0 focus:outline-none"
          />
          <span className="relative flex items-center justify-center dark:bg-white/70 bg-neutral-800 p-2.5 top-2 rounded-r-lg z-10">
            <Search className="flex items-center justify-center text-white dark:text-black" />
          </span>
        </form>
        <Link href="/home">
        <Button
          borderRadius="1.75rem"
          className="bg-white/60 dark:bg-zinc-900 text-black text-xl dark:text-white border-neutral-200 relative gap-2"
        >
          Get Started
          <span className="flex items-center">
            <ArrowRight className="flex items-center h-16 text-black dark:text-white font-bold" />
          </span>{" "}
        </Button>
        </Link>
      </div>
      <BackgroundBeams />
    </div>
  );
}
