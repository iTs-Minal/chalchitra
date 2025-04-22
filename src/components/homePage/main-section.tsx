"use client";
import React, { useEffect, useState } from "react";
import { TracingBeam } from "../ui/tracing-beam";
import { IconLine } from "@tabler/icons-react";
import { FilmIcon, TvIcon } from "lucide-react";
import MovieCard from "../movie-card";
import MovieSkeleton from "../movie-skeleton";

interface Movie {
  id: number;
  title?: string;
  name?: string;
  vote_average?: number;
  poster_path?: string;
  overview: string;
  original_language: string;
  release_date: string;
}

const MainSection = () => {
  // Fetching trending movies from TMDB API
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const getTrendingMovies = (category: string) => {
    setLoading(true);
    fetch(`/api/movies/${category}`)
      .then((res) => res.json())
      .then((json) => {
        // Adjust for "latest" (it returns a single object)
        const results = Array.isArray(json.results) ? json.results : [json];

        const moviesData = results.map((movie: Movie) => ({
          id: movie.id,
          title: movie.title || "Movie Title",
          vote_average: movie.vote_average,
          poster_path: movie.poster_path,
          overview: movie.overview,
          original_language: movie.original_language,
          release_date: movie.release_date,
        }));
        setTimeout(() => {
          setTrendingMovies(moviesData);
          setLoading(false); // Or use state based on the category
        }, 2000);
      })
      .catch((error) =>
        console.error(`Error fetching ${category} movies:`, error)
      );
  };

  useEffect(() => {
    getTrendingMovies("trending");
    // setLoading(false); // Removed this line to avoid setting loading to false prematurely
    // try "trending", "upcoming", etc.
  }, []);

  // Fetching latest movies from TMDB API
  const [latestMovies, setLatestMovies] = useState<Movie[]>([]);

  const getLatestMovies = (category: string) => {
    setLoading(true);
    fetch(`/api/movies/${category}`)
      .then((res) => res.json())
      .then((json) => {
        // Adjust for "latest" (it returns a single object)
        let results = [];

      // If category is "latest", the response may not be an array, so handle that case
      if (category === "latest" && json.title) {
        // Latest returns a single movie, so put it in an array
        results = [json];
      } else if (Array.isArray(json.results)) {
        // Other categories return an array
        results = json.results;
      }

        const moviesData = results.map((movie: Movie) => ({
          id: movie.id,
          title: movie.title || "Movie Title",
          vote_average: movie.vote_average,
          poster_path: movie.poster_path,
          overview: movie.overview,
          original_language: movie.original_language,
          release_date: movie.release_date,
        }));
        setTimeout(() => {
          setLatestMovies(moviesData);
          setLoading(false); // Or use state based on the category
        }, 2000);
      })
      .catch((error) =>
        console.error(`Error fetching ${category} movies:`, error)
      );
  };

  useEffect(() => {
    getLatestMovies("popular"); // Set loading to false after fetching
    // try "trending", "upcoming", etc.
  }, []);

  return (
    <main className="flex flex-col items-center justify-center px-2 mt-5">
      <div className="flex flex-col w-full items-center mt-5">
        <p className="text-md font-bold text-black dark:text-white font-kanit">
          Are you looking for the best site for watching movies online? A site
          that is not only free but also safe? If yes, search no more, you are
          at the right place. DopeBox allows users to watch thousands of movies
          and TV shows in HD quality. You are completely safe on the site as we
          do not have any ads or require any registration. Although we are free
          of charge, our quality is on the same par with that of paid streaming
          services. Our content library is huge with dozens of thousands of
          titles and our features are excellent. Only on DopeBox can you watch
          your favorite movies seamlessly with no buffering, lagging, redirects,
          and pop ups. We also update new titles on a daily basis so rest
          assured, fun never ends on DopeBox. Your complete satisfaction is our
          ultimate goal; therefore, do not hesitate to contact us should you
          have any issues, inquiries, or requests regarding the site.
        </p>
      </div>
      <div className="flex flex-col w-full mt-20 px-2">
        <TracingBeam className="flex flex-col w-full h-auto">
          {/* -----trending section----- */}
          <div className="flex flex-col w-full h-auto cursor-pointer mt-10">
            <div className="flex gap-6 items-center">
              <IconLine />
              <span className="font-lilita text-3xl">Trending</span>
              <div className="flex gap-4 items-center">
                <span className="flex items-center text-sm font-kanit gap-2 bg-zinc-800 text-gray-200 p-1 rounded hover:scale-95 transition duation-300">
                  {" "}
                  <span>
                    <FilmIcon />
                  </span>
                  Movies
                </span>
                <span className="flex items-center text-sm font-kanit gap-2 bg-zinc-800 text-gray-200 p-1 rounded hover:scale-95 transition duation-300">
                  <span>
                    <TvIcon />
                  </span>{" "}
                  TV Shows
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center cursor-pointer ml-5">
              {loading
                ? Array.from({ length: 18 }).map((_, i) => (
                    <MovieSkeleton key={i} />
                  ))
                : trendingMovies.map((movie) => (
                    <div key={movie.id}>
                      <MovieCard
                        title={movie.title}
                        vote_average={movie.vote_average}
                        poster_path={movie.poster_path}
                        id={movie.id}
                      />
                    </div>
                  ))}
            </div>
          </div>

          {/* -----movies section------- */}
          <div className="flex flex-col w-full h-auto mt-20 cursor-pointer">
            <div className="flex gap-5 items-center">
              <IconLine />
              <span className="font-lilita text-3xl">Latest Movies</span>
              <FilmIcon />
            </div>
            <div className="flex flex-wrap items-center cursor-pointer ml-5">
              {loading
                ? Array.from({ length: 18 }).map((_, i) => (
                    <MovieSkeleton key={i} />
                  ))
                : latestMovies.map((movie) => (
                    <div key={movie.id}>
                      <MovieCard
                        title={movie.title}
                        vote_average={movie.vote_average}
                        poster_path={movie.poster_path}
                        id={movie.id}
                      />
                    </div>
                  ))}
            </div>
          </div>
          {/* -----tv show section---- */}
          <div className="flex flex-col w-full h-screen cursor-pointer">
            <div className="flex gap-5 items-center">
              <IconLine />
              <span className="font-lilita text-3xl">Latest Tv Shows</span>
              <TvIcon />
            </div>
            <div>tvshow card goes here</div>
          </div>

          {/* ----upcoming section---- */}
          <div className="flex flex-col w-full h-screen cursor-pointer">
            <div className="flex gap-5 items-center">
              <IconLine />
              <span className="font-lilita text-3xl">Upcoming</span>
              <FilmIcon />
            </div>
            <div>upcoming card goes here</div>
          </div>
        </TracingBeam>
      </div>
    </main>
  );
};

export default MainSection;
