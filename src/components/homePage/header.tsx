"use client";
import {
  Github,
  Instagram,
  Linkedin,
  MoveLeft,
  MoveRight,
  Star,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import SliderSkeleton from "../skeleton/slider-skeleton";
import PlaceSkeleton from "../skeleton/3place-skeleton";

interface Movie {
  id: number;
  title?: string;
  name?: string;
  vote_average?: number;
  poster_path?: string;
  overview?: string;
  original_language?: string;
  release_date?: string;
  first_air_date?: string;
  media_type: string;
}

interface TvShow {
  id: number;
  title?: string;
  name?: string;
  vote_average?: number;
  poster_path?: string;
  overview?: string;
  original_language?: string;
  first_air_date?: string;
  release_date?: string;
  media_type: string;
}

const Header = () => {
  const [trendingAll, setTrendingAll] = useState<(Movie | TvShow)[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);
  const nextMovie = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % trendingAll.length);
  };
  const prevMovie = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + trendingAll.length) % trendingAll.length
    );
  };

  ///-----------------------fetching combined movies for slider-----------------

  const getTrendingAll = async () => {
    setLoading(true);
    try {
      const [moviesRes, tvRes] = await Promise.all([
        fetch("/api/movies/trending"),
        fetch("/api/tvshows/trending?category=trending"),
      ]);

      const moviesJson = await moviesRes.json();
      const tvJson = await tvRes.json();

      const movies = moviesJson.results.map((movie: Movie) => ({
        ...movie,
        media_type: "movie",
      }));

      const tvShows = tvJson.results.map((tv: TvShow) => ({
        id: tv.id,
        title: tv.name,
        vote_average: tv.vote_average,
        poster_path: tv.poster_path,
        overview: tv.overview,
        original_language: tv.original_language,
        first_air_date: tv.first_air_date,
        media_type: "tv",
      }));

      // Combine and optionally sort
      const combined = [...movies, ...tvShows].sort(
        (a, b) =>
          new Date(b.first_air_date).getTime() -
          new Date(a.first_air_date).getTime()
      );

      setTimeout(() => {
        setTrendingAll(combined);
        setLoading(false);
      }, 3000);
    } catch (error) {
      console.error("Error fetching combined media:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getTrendingAll();
  }, []);

  //-------------------------------for those 3 movies----------------------------------

  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);

  const getPopularMovies = (category: string) => {
    setLoading(true);
    fetch(`/api/movies/${category}`)
      .then((res) => res.json())
      .then((json) => {
        let results = [];

        if (category === "latest" && json.title) {
          results = [json];
        } else if (Array.isArray(json.results)) {
          results = json.results.slice(6, 9);
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
    getPopularMovies("popular");
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-full pt-2 bg-zinc-100 dark:bg-neutral-900 px-2 md:gap-2">
      {/* movie slider */}
      <div className="w-full md:w-full h-[500px] relative max-w-4xl">
        {loading ? (
          <SliderSkeleton />
        ) : (
          trendingAll.length > 0 && (
            <Image
              src={`https://image.tmdb.org/t/p/original${trendingAll[currentIndex].poster_path}`}
              alt={
                trendingAll[currentIndex].title ||
                trendingAll[currentIndex].name ||
                "Title"
              }
              fill
              priority
              className="w-full h-[500px] inset-0 absolute aspect-square max-w-4xl object-cover mx-auto shadow-lg "
            />
          )
        )}
        {trendingAll.length > 0 && (
          <div className="flex flex-col justify-start w-full h-auto top-82 p-6 text-white shadow-lg relative z-20 bg-gradient-to-b from via-neutral-900/95 to-zinc-950 ">
            <h2 className="text-4xl font-bold text-left">
              {trendingAll[currentIndex].title || trendingAll[currentIndex].name || "Title"}
            </h2>
            <div className="flex items-center space-x-2 mt-4 gap-5">
              <span className="text-yellow-400 flex items-center">
                <Star className="mr-1 text-yellow-400 fill-yellow-500" />
                {trendingAll[currentIndex].vote_average?.toFixed(1)}
              </span>
              <span className="bg-gray-700 px-2 py-1 rounded">
                {trendingAll[currentIndex].original_language?.toUpperCase()}
              </span>
              <span className="px-2 py-1 rounded font-kanit">
                {trendingAll[currentIndex].media_type === "tv"
                  ? trendingAll[currentIndex].first_air_date?.slice(0, 4)
                  : trendingAll[currentIndex].release_date?.slice(0, 4)}
              </span>
            </div>
            <p className="mt-4 text-sm text-white line-clamp-1 text-left">
              {trendingAll[currentIndex].overview}
            </p>
          </div>
        )}

        <button
          onClick={prevMovie}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-gray-800 p-2 rounded hover:opacity-60"
        >
          <MoveLeft />
        </button>
        <button
          onClick={nextMovie}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-gray-800 p-2 rounded hover:opacity-60"
        >
          <MoveRight />
        </button>
      </div>

      {/* random 3 movies */}
      <div className="w-full md:w-[40%] flex flex-col space-y-6 p-3 cursor-pointer">
        {loading
          ? Array.from({ length: 3 })
              .fill(0)
              .map((_, index) => <PlaceSkeleton key={index} />)
          : popularMovies.map((movie) => (
              <div
                className="flex p-3 rounded-lg shadow-sm hover:scale-105 transition duration-100 dark:bg-zinc-900"
                key={movie.id}
              >
                <Image
                  className="w-24 h-30 object-cover"
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  // TMDB image URL
                  alt={movie.title || "Movie title"}
                  width={80}
                  height={150}
                />
                <div className="ml-4 text-black dark:text-white">
                  <div className="flex items-center space-x-2 gap-3">
                    <span className="text-yellow-400 flex items-center">
                      <Star className="mr-1 fill-yellow-500 text-yellow-500" />{" "}
                      {movie.vote_average?.toFixed(1) || `N/A`}
                    </span>
                    <span className="bg-zinc-800 px-2 py-1 rounded text-white">
                      {movie.original_language?.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-[18px] font-semibold mt-1 line-clamp-1">
                    {movie.title || "Movie Title"}
                  </h3>
                  <p className="text-[13px] text-gray-900 dark:text-white line-clamp-2">
                    {movie.overview}
                  </p>
                </div>
              </div>
            ))}
      </div>

      {/* social */}

      <div className="w-full md:w-[10%] flex flex-row border-l-1 justify-center md:flex-col md:items-center gap-6 p-4 text-black dark:text-white">
        {[
          { icon: Twitter, name: "Twitter" },
          { icon: Instagram, name: "Instagram" },
          { icon: Github, name: "GitHub" },
          { icon: Linkedin, name: "LinkedIn" },
        ].map((social, index) => (
          <button
            key={index}
            className="flex items-center flex-row  p-2 rounded"
          >
            <social.icon className="text-4xl hover:scale-125 transition duration-100" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Header;
