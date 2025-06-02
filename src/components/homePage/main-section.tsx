/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { TracingBeam } from "../ui/tracing-beam";
import { IconLine } from "@tabler/icons-react";
import { FilmIcon, TvIcon } from "lucide-react";
import MovieCard from "../card/movie-card";
import MovieSkeleton from "../skeleton/movie-skeleton";
import ShowCard from "../card/tvshow-card";
import ShowSkeleton from "../skeleton/show-skeleton";

interface Movie {
  id: number;
  title: string;
  name?: string;
  vote_average?: number;
  poster_path?: string;
  overview: string;
  original_language: string;
  release_date: string;
  media_type: string;
}

interface TvShow {
  id: number;
  name: string;
  vote_average?: number;
  poster_path?: string;
  overview: string;
  original_language: string;
  first_air_date: string;
  media_type: string;
}

const MainSection = () => {
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("movies");

  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [trendingShows, setTrendingShows] = useState<TvShow[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [onairShows, setOnairShows] = useState<TvShow[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);

  const fetchData = async (
    category: string,
    type: string,
    setter: (data: any[]) => void,
    mapFn: (item: any) => any
  ) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/tmdb/${type}/${category}`);
      const json = await res.json();
      const results = Array.isArray(json.results) ? json.results : [json];
      const data = results.map(mapFn);
      setTimeout(() => {
        setter(data);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error(`Error fetching ${category} ${type}:`, error);
    }
  };

  useEffect(() => {
    fetchData("trending", "movie", setTrendingMovies, (movie) => ({
      id: movie.id,
      title: movie.title || "Movie Title",
      vote_average: movie.vote_average,
      poster_path: movie.poster_path,
      overview: movie.overview,
      original_language: movie.original_language,
      release_date: movie.release_date,
      media_type: movie.media_type,
    }));

    fetchData("trending", "tv", setTrendingShows, (show) => ({
      id: show.id,
      name: show.name || "Show Title",
      vote_average: show.vote_average,
      poster_path: show.poster_path,
      overview: show.overview,
      original_language: show.original_language,
      first_air_date: show.first_air_date,
      media_type: show.media_type,
    }));

    fetchData("popular", "movie", setPopularMovies, (movie) => ({
      id: movie.id,
      title: movie.title || "Movie Title",
      vote_average: movie.vote_average,
      poster_path: movie.poster_path,
      overview: movie.overview,
      original_language: movie.original_language,
      release_date: movie.release_date,
      media_type: "movie",
    }));

    fetchData("on_the_air", "tv", setOnairShows, (show) => ({
      id: show.id,
      name: show.name || "Show Title",
      vote_average: show.vote_average,
      poster_path: show.poster_path,
      overview: show.overview,
      original_language: show.original_language,
      first_air_date: show.first_air_date,
      media_type: "tv",
    }));

    fetchData("upcoming", "movie", setUpcomingMovies, (movie) => ({
      id: movie.id,
      title: movie.title || "Movie Title",
      vote_average: movie.vote_average,
      poster_path: movie.poster_path,
      overview: movie.overview,
      original_language: movie.original_language,
      release_date: movie.release_date,
      media_type: "movie",
    }));
  }, []);

  // const renderSection = (
  //   title: string,
  //   items: any[],
  //   SkeletonComponent: React.FC,
  //   CardComponent: React.FC<any>,
  //   keyName: string = "id"
  // ) => (
  //   <div className="flex flex-wrap items-center cursor-pointer ml-5">
  //     {loading
  //       ? Array.from({ length: 20 }).map((_, i) => (
  //           <SkeletonComponent key={i} />
  //         ))
  //       : items.map((item) => (
  //           <div key={item[keyName]}>
  //             <CardComponent {...item} />
  //           </div>
  //         ))}
  //   </div>
  // );

  return (
    <div className="flex flex-col items-center justify-center px-2 mt-5 h-full bg-neutral-100 dark:bg-zinc-950">
      <div className="flex flex-col w-full max-w-7xl items-center mt-5 px-4 md:px-8">
        <p className="text-sm sm:text-base md:text-lg font-medium text-black dark:text-white font-kanit leading-relaxed text-justify">
          Are you looking for the best site for watching movies online? A site
          that is not only free but also safe? If yes, search no more, you are
          at the right place. Chalchitra allows users to watch thousands of
          movies and TV shows in HD quality. You are completely safe on the site
          as we do not have any ads or require any registration. Although we are
          free of charge, our quality is on the same par with that of paid
          streaming services. Our content library is huge with dozens of
          thousands of titles and our features are excellent. Only on Chalchitra
          can you watch your favorite movies seamlessly with no buffering,
          lagging, redirects, and pop ups. We also update new titles on a daily
          basis so rest assured, fun never ends on Chalchitra. Your complete
          satisfaction is our ultimate goal; therefore, do not hesitate to
          contact us should you have any issues, inquiries, or requests
          regarding the site.
        </p>
      </div>

      <div className="flex flex-col w-full mt-20 px-2 h-auto bg-zinc-100 dark:bg-neutral-950">
        <TracingBeam className="flex flex-col w-full h-auto">
          {/* Trending Section */}  
          <div className="flex flex-col w-full h-auto cursor-pointer mt-10 bg-zinc-100 dark:bg-zinc-950 px-4 md:px-8">
            <div className="flex gap-6 items-center mb-6">
              <IconLine />
              <span className="font-lilita text-3xl">Popular This Week</span>
              <div className="flex gap-4 items-center">
                <span
                  onClick={() => setSelectedType("movies")}
                  className={`flex items-center text-sm font-kanit gap-2 text-gray-200 px-2 py-1 rounded hover:scale-95 transition duration-300 ${
                    selectedType === "movies" ? "bg-yellow-500" : "bg-zinc-800"
                  }`}
                >
                  <FilmIcon /> Movies
                </span>
                <span
                  onClick={() => setSelectedType("tvShows")}
                  className={`flex items-center text-sm font-kanit gap-2 text-gray-200 px-2 py-1 rounded hover:scale-95 transition duration-300 ${
                    selectedType === "tvShows" ? "bg-yellow-500" : "bg-zinc-800"
                  }`}
                >
                  <TvIcon /> TV
                </span>
              </div>
            </div>

            {/* Grid Wrapper for Trending Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {selectedType === "movies"
                ? loading
                  ? Array.from({ length: 20 }).map((_, i) => (
                      <MovieSkeleton key={i} />
                    ))
                  : trendingMovies.map((movie) => (
                      <MovieCard key={movie.id} {...movie} />
                    ))
                : loading
                ? Array.from({ length: 20 }).map((_, i) => (
                    <ShowSkeleton key={i} />
                  ))
                : trendingShows.map((show) => (
                    <ShowCard key={show.id} {...show} />
                  ))}
            </div>
          </div>
          {/* Latest Movies */}
          <div className="flex flex-col w-full h-auto mt-20 cursor-pointer bg-zinc-100 dark:bg-zinc-950 px-4 md:px-8">
            <div className="flex items-center gap-3 mb-6">
              <IconLine />
              <span className="font-lilita text-2xl sm:text-3xl">
                Latest Movies
              </span>
              <FilmIcon />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {loading
                ? Array.from({ length: 20 }).map((_, i) => (
                    <MovieSkeleton key={i} />
                  ))
                : popularMovies.map((movie) => (
                    <MovieCard key={movie.id} {...movie} />
                  ))}
            </div>
          </div>

          {/* Latest TV Shows */}
          <div className="flex flex-col w-full h-auto mt-20 cursor-pointer bg-zinc-100 dark:bg-zinc-950 px-4 md:px-8">
            <div className="flex items-center gap-3 mb-6">
              <IconLine />
              <span className="font-lilita text-2xl sm:text-3xl">Latest TV Shows</span>
              <TvIcon />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {loading
                ? Array.from({ length: 20 }).map((_, i) => (
                    <MovieSkeleton key={i} />
                  ))
                : onairShows.map((show) => (
                    <ShowCard key={show.id} {...show} />
                  ))}
            </div>
          </div>

          {/* Upcoming Movies */}
          <div className="flex flex-col w-full h-auto mt-20 cursor-pointer bg-zinc-100 dark:bg-zinc-950 px-4 md:px-8">
            <div className="flex items-center gap-3 mb-6">
              <IconLine />
              <span className="font-lilita text-2xl sm:text-3xl">Upcoming</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {loading
                ? Array.from({ length: 20 }).map((_, i) => (
                    <MovieSkeleton key={i} />
                  ))
                : upcomingMovies.map((movie) => (
                    <MovieCard key={movie.id} {...movie} />
                  ))}
            </div>
          </div>
        </TracingBeam>
      </div>
    </div>
  );
};

export default MainSection;
