"use client";
import {
  Github,
  Instagram,
  Linkedin,
  MoveLeft,
  MoveRight,
  PlayCircle,
  Star,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import SliderSkeleton from "../skeleton/slider-skeleton";
import PlaceSkeleton from "../skeleton/3place-skeleton";
import Link from "next/link";
// import Link from "next/link";

interface Movie {
  id: number;
  title: string;
  name: string;
  vote_average?: number;
  poster_path?: string;
  overview?: string;
  original_language?: string;
  release_date?: string;
  first_air_date?: string;
  media_type: string;
  backdrop_path: string;
}

interface TvShow {
  id: number;
  title: string;
  name: string;
  vote_average?: number;
  poster_path?: string;
  overview?: string;
  original_language?: string;
  first_air_date?: string;
  release_date?: string;
  media_type: string;
  backdrop_path: string;
}

const Header = ({type}:{type:'movies' | 'tvshows'}) => {
  const [trendingAll, setTrendingAll] = useState<(Movie | TvShow)[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);

  const isDragging = useRef(false);
  const startX = useRef(0);

  const nextMovie = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % trendingAll.length);
  };
  const prevMovie = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + trendingAll.length) % trendingAll.length
    );
  };
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - startX.current;
    if (deltaX > 50) prevMovie();
    else if (deltaX < -50) nextMovie();
    isDragging.current = false;
  };

  // const currentMovie = trendingAll[currentIndex];

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
      }));

      const tvShows = tvJson.results.map((tv: TvShow) => ({
        ...tv,
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

  const getPopularMovies = (category: string, type: string) => {
    setLoading(true);
    fetch(`/api/tmdb/${type}/${category}`)
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
    getPopularMovies("popular", "movie");
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-full pt-2 bg-zinc-100 dark:bg-neutral-900 px-2 md:gap-2">
      {/* movie slider */}
      <div
        className="w-full h-auto relative max-w-5xl mx-auto overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {loading ? 
            <SliderSkeleton />
        : 
          trendingAll.map((movie, idx) =>
            idx === currentIndex ? (
              (() => {
                const slug = `${(movie.title || movie.name)
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")}-${movie.id}`;
                return (
                  <React.Fragment key={movie.id}>
                    {/* BACKDROP IMAGE */}
                    <div className="relative w-full h-[500px] sm:h-[450px] xs:h-[350px] rounded-lg overflow-hidden">
                      <Image
                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        alt={movie.title || movie.name || "Title"}
                        fill
                        className="object-cover w-full h-full"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/90" />
                    </div>

                    {/* MOVIE INFO */}
                    <div className="absolute bottom-0 w-full p-6 z-10 text-white bg-gradient-to-t from-black/90 to-transparent flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
                      <div className="flex-shrink-0 hidden sm:block">
                        <Image
                          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                          alt="poster"
                          width={120}
                          height={180}
                          className="rounded-md shadow-md"
                        />
                      </div>
                      {/* Play Icon */}
                      <div className="text-yellow-400 sm:order-none order-first">
                        <Link href={`/${type}/${slug}`}><PlayCircle size={50} className="mx-auto sm:mx-0" /></Link>
                      </div>
                      {/* Text Info */}
                      <div className="flex-grow">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                          {movie.title || movie.name}
                        </h2>
                        <div className="flex flex-wrap items-center gap-3 text-sm mb-2">
                          <span className="flex items-center text-yellow-400">
                            <Star className="mr-1 fill-yellow-500" size={18} />
                            {movie.vote_average?.toFixed(1)}
                          </span>
                          <span className="bg-gray-700 px-2 py-1 rounded">
                            {movie.original_language?.toUpperCase()}
                          </span>
                          <span className="px-2 py-1 rounded bg-gray-700">
                            {movie.media_type === "tv"
                              ? movie.first_air_date?.slice(0, 4)
                              : movie.release_date?.slice(0, 4)}
                          </span>
                        </div>
                        <p className="text-sm line-clamp-3">
                          {movie.overview}
                        </p>
                      </div>
                    </div>

                    {/* Nav Buttons */}
                    <button
                      onClick={prevMovie}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 p-2 rounded-full z-20"
                    >
                      <MoveLeft />
                    </button>
                    <button
                      onClick={nextMovie}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 p-2 rounded-full z-20"
                    >
                      <MoveRight />
                    </button>
                  </React.Fragment>
                );
              })()
            ) : null
          )}
      </div>

      {/* random 3 movies */}
      <div className="w-full md:w-[40%] flex flex-col space-y-6 p-3 cursor-pointer">
        {loading
          ? Array.from({ length: 3 })
              .fill(0)
              .map((_, index) => <PlaceSkeleton key={index} />)
          : popularMovies.map((movie) => {
              const slug = `${movie.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")}-${movie.id}`;
              return (
                <Link href={`/movies/${slug}`} key={movie.id}>
                  <div className="flex p-3 rounded-lg shadow-sm hover:scale-105 transition duration-100 dark:bg-neutral-900">
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
                </Link>
              );
            })}
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
