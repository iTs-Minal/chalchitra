"use client";
import React, { useEffect, useState } from "react";
import { TracingBeam } from "../ui/tracing-beam";
import { IconLine } from "@tabler/icons-react";
import { FilmIcon, TvIcon } from "lucide-react";
import MovieCard from "../movie-card";
import MovieSkeleton from "../movie-skeleton";
import ShowCard from "../tvshow-card";
import ShowSkeleton from "../show-skeleton";

interface Movie {
  id: number;
  title?: string;
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
  title?: string;
  name?: string;
  vote_average?: number;
  poster_path?: string;
  overview: string;
  original_language: string;
  first_air_date: string;
  media_type: string;
}

const MainSection = () => {
  const [loading, setLoading] = useState(true);

  // Fetching trending movies from TMDB API

  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);

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
          media_type: movie.media_type,
        }));
        setTimeout(() => {
          setTrendingMovies(moviesData);
          setLoading(false); // Or use state based on the category
        }, 3000);
      })
      .catch((error) =>
        console.error(`Error fetching ${category} movies:`, error)
      );
  };

  useEffect(() => {
    getTrendingMovies("trending");
  }, []);

  // Fetching trending shows from TMDB API
  const [trendingShows, setTrendingShows] = useState<TvShow[]>([]);

  const getTrendingShows = (category: string) => {
    setLoading(true);
    fetch(`/api/tvshows/${category}`)
      .then((res) => res.json())
      .then((json) => {
        // Adjust for "latest" (it returns a single object)
        const results = Array.isArray(json.results) ? json.results : [json];

        const showsData = results.map((show: TvShow) => ({
          id: show.id,
          name: show.name || "Show Title",
          vote_average: show.vote_average,
          poster_path: show.poster_path,
          overview: show.overview,
          original_language: show.original_language,
          first_air_date: show.first_air_date,
          media_type: show.media_type,
        }));
        setTimeout(() => {
          setTrendingShows(showsData);
          setLoading(false); // Or use state based on the category
        }, 3000);
      })
      .catch((error) =>
        console.error(`Error fetching ${category} movies:`, error)
      );
  };

  useEffect(() => {
    getTrendingShows("trending");
  }, []);

  // Fetching latest movies from TMDB API
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);

  const getPopularMovies = (category: string) => {
    setLoading(true);
    fetch(`/api/movies/${category}`)
      .then((res) => res.json())
      .then((json) => {
        // Adjust for "popular" (it returns a single object)
        let results = []; // If category is "latest", the response may not be an array, so handle that case
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
          setPopularMovies(moviesData);
          setLoading(false); // Or use state based on the category
        }, 3000);
      })
      .catch((error) =>
        console.error(`Error fetching ${category} movies:`, error)
      );
  };

  useEffect(() => {
    getPopularMovies("popular"); // Set loading to false after fetching
  }, []);

  // Fetching latest shows from TMDB API
  const [onairShows, setonairShows] = useState<TvShow[]>([]);

  const getonairShows = (category: string) => {
    setLoading(true);
    fetch(`/api/tvshows/${category}`)
      .then((res) => res.json())
      .then((json) => {
        // Adjust for "popular" (it returns a single object)
        let results = [];

        // If category is "latest", the response may not be an array, so handle that case
        if (category === "latest" && json.title) {
          // Latest returns a single movie, so put it in an array
          results = [json];
        } else if (Array.isArray(json.results)) {
          // Other categories return an array
          results = json.results;
        }

        const showsData = results.map((show: TvShow) => ({
          id: show.id,
          name: show.name || "Movie Title",
          vote_average: show.vote_average,
          poster_path: show.poster_path,
          overview: show.overview,
          original_language: show.original_language,
          first_air_date: show.first_air_date,
        }));
        setTimeout(() => {
          setonairShows(showsData);
          setLoading(false); // Or use state based on the category
        }, 3000);
      })
      .catch((error) =>
        console.error(`Error fetching ${category} movies:`, error)
      );
  };

  useEffect(() => {
    getonairShows("on_the_air");
  }, []);

  const [selectedType, setSelectedType] = useState("movies");

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
                <span
                  onClick={() => setSelectedType("movies")}
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
                  onClick={() => setSelectedType("tvShows")}
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
                : selectedType === "movies"
                ? trendingMovies.map((movie) => (
                    <div key={movie.id}>
                      <MovieCard
                        title={movie.title}
                        vote_average={movie.vote_average}
                        poster_path={movie.poster_path}
                        id={movie.id}
                      />
                    </div>
                  ))
                : trendingShows.map((show) => (
                    <div key={show.id}>
                      <ShowCard
                        name={show.name}
                        vote_average={show.vote_average}
                        poster_path={show.poster_path}
                        id={show.id}
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
                ? Array.from({ length: 20 }).map((_, i) => (
                    <MovieSkeleton key={i} />
                  ))
                : popularMovies.map((movie) => (
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
          <div className="flex flex-col mt-20 w-full h-auto cursor-pointer">
            <div className="flex gap-5 items-center">
              <IconLine />
              <span className="font-lilita text-3xl">Latest Tv Shows</span>
              <TvIcon />
            </div>
            <div className="flex flex-wrap items-center cursor-pointer ml-5">
              {loading
                ? Array.from({ length: 20 }).map((_, i) => (
                    <ShowSkeleton key={i} />
                  ))
                : onairShows.map((show) => (
                    <div key={show.id}>
                      <ShowCard
                        name={show.name}
                        vote_average={show.vote_average}
                        poster_path={show.poster_path}
                        id={show.id}
                      />
                    </div>
                  ))}
            </div>
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
