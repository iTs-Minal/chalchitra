"use client";
import React, { useState,useEffect } from "react";

import Navbar from "@/components/homePage/navbar";
import { fetchFromTMDB } from "@/lib/tmdb";
import { IconLine } from "@tabler/icons-react";
import { FilmIcon, TvIcon } from "lucide-react";
import MovieCard from "@/components/movie-card";
import ShowCard from "@/components/tvshow-card";
import MovieSkeleton from "@/components/movie-skeleton";
import { TracingBeam } from "@/components/ui/tracing-beam";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

interface Movie {
  title?: string;
  id?: number;
  vote_average?: number;
  poster_path?: string;
}
interface TvShow {
name?: string;
    id?: number;
    vote_average?: number;
    poster_path?: string;
  }

export default function MoviesPage() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
  
    const page = parseInt(searchParams.get("page") || "1", 10);
    const typeParam = searchParams.get("type") || "movies";
  
    const [selectedType, setSelectedType] = useState(typeParam);
    const [loading, setLoading] = useState(true);
  
    const [movieData, setMovieData] = useState<{ results: Movie[]; total_pages: number } | null>(null);
    const [showData, setShowData] = useState<{ results: TvShow[]; total_pages: number } | null>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        if (selectedType === "movies") {
          const fetchedMovieData = await fetchFromTMDB("movie/top_rated", page);
          setMovieData(fetchedMovieData);
        } else {
          const fetchedShowData = await fetchFromTMDB("tv/top_rated", page);
          setShowData(fetchedShowData);
        }
        setLoading(false);
      };
      fetchData();
    }, [page, selectedType]);
  
    // Update URL when switching type
    const handleTypeChange = (type: string) => {
      setSelectedType(type);
      router.push(`${pathname}?page=${page}&type=${type}`);
    };
  
    const totalPages =
      selectedType === "movies"
        ? movieData?.total_pages || 0
        : showData?.total_pages || 0;

  return (
    <main className="flex flex-col justify-center w-full h-auto">
      <div className="flex flex-col items-center justify-center w-full">
        <Navbar />
      </div>

      <div className="flex flex-col w-full h-auto mt-20 px-2 cursor-pointer bg-zinc-100 dark:bg-zinc-950">
        <TracingBeam className="flex flex-col w-full h-auto">
          <div className="flex gap-5 items-center">
            <IconLine />
            <span className="font-lilita text-3xl">Top IMDB</span>
            <div className="flex gap-4 items-center">
              <span
                onClick={() => handleTypeChange("movies")}
                className={`flex items-center text-sm font-kanit gap-2 text-gray-200 p-1 rounded hover:scale-95 transition duation-300 ${
                  selectedType === "movies" ? "bg-yellow-500" : "bg-zinc-800"
                }`}
              >
                {" "}
                <span>
                  <FilmIcon />
                </span>
                Movies
              </span>
              <span
                onClick={() => handleTypeChange("tvShows")}
                className={`flex items-center text-sm font-kanit gap-2 text-gray-200 p-1 rounded hover:scale-95 transition duation-300 ${
                  selectedType === "tvShows" ? "bg-yellow-500" : "bg-zinc-800"
                }`}
              >
                <span>
                  <TvIcon />
                </span>{" "}
                TV Shows
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center cursor-pointer ml-5">
            {loading
              ? Array.from({ length: 20 }).map((_, i) => (
                  <MovieSkeleton key={i} />
                ))
              : selectedType==="movies" ? 
              movieData?.results?.map((movie: Movie) => (
                  <div key={movie.id}>
                    <MovieCard
                      title={movie.title}
                      vote_average={movie.vote_average}
                      poster_path={movie.poster_path}
                      id={movie.id ?? 0}
                    />
                  </div>
                ))
            : showData?.results?.map((show: TvShow) => (
                <div key={show.id}>
                  <ShowCard
                    name={show.name}
                    vote_average={show.vote_average}
                    poster_path={show.poster_path}
                    id={show.id ?? 0}
                  />
                </div>
              ))
            }
          </div>
        </TracingBeam>
      </div>

      <div className="flex flex-col items-center justify-center mb-8">
        <Pagination currentPage={page} totalPages={totalPages} type={selectedType} />
      </div>
    </main>
  );
}

function Pagination({
    currentPage,
    totalPages,
    type,
  }: {
    currentPage: number;
    totalPages: number;
    type: string;
  }) {
    const pathname = usePathname();
  
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
      .filter((p) => p >= currentPage - 2 && p <= currentPage + 2);
  
    return (
      <div className="mt-6 flex gap-2 items-center">
        {currentPage > 1 && (
          <a href={`${pathname}?page=${currentPage - 1}&type=${type}`} className="px-3 py-1 border rounded">
            Prev
          </a>
        )}
  
        {pageNumbers.map((p) => (
          <a
            key={p}
            href={`${pathname}?page=${p}&type=${type}`}
            className={`px-3 py-1 border rounded ${
              p === currentPage ? "bg-blue-500 text-black" : "bg-gray-900 text-white"
            }`}
          >
            {p}
          </a>
        ))}
  
        {currentPage < totalPages && (
          <a href={`${pathname}?page=${currentPage + 1}&type=${type}`} className="px-3 py-1 border rounded">
            Next
          </a>
        )}
      </div>
    );
}
