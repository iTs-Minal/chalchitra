"use client";
import React from "react";
import { BackgroundBeams } from "../ui/background-beams";
import { Button } from "../ui/moving-border";
import { ArrowRight, Search } from "lucide-react";

export function HeroSection() {
  return (
    <div className="h-[40rem] top-10 w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4 flex flex-col items-center justify-center h-full relative z-10">
        <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-600  text-center font-sans font-bold">
          Discover, Rate & Track Your Favorite Movies
        </h1>
        <p></p>
        <p className="text-neutral-300 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          Join Chalchitra — your personal movie companion. Explore trending
          films, add them to your watchlist, and share your ratings with the
          world.
        </p>
        <div className="flex items-center justify-center w-full rounded-full">
          <input
            type="text"
            placeholder="Search for movies..."
            className="rounded-l-lg border border-neutral-800 w-full relative z-10 mt-4 p-2 bg-neutral-950 placeholder:text-zinc-400 focus:placeholder:opacity-0"
          />
          <span className="relative flex items-center justify-center bg-neutral-800 p-2.5 top-2 rounded-r-lg z-10">
            <Search className="flex items-center justify-center" />
          </span>
        </div>
        <Button
          borderRadius="1.75rem"
          className="bg-white dark:bg-zinc-900 text-black text-xl dark:text-white border-neutral-200 relative gap-2"
        >
          Get Started
          <span className="flex items-center">
            <ArrowRight className="flex items-center h-16 text-white font-bold" />
          </span>{" "}
        </Button>
      </div>
      <BackgroundBeams />
    </div>
  );
}
