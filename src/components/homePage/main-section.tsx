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
  name: string;
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

  // ---------------------Fetching trending movies from TMDB API-------------------------
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);

  const getTrendingMovies = (category: string, type: string) => {
    setLoading(true);
    fetch(`/api/tmdb/${type}/${category}`)
      .then((res) => res.json())
      .then((json) => {
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
    getTrendingMovies("trending", "movie");
  }, []);

  //---------------- Fetching trending shows from TMDB API-----------------------
  const [trendingShows, setTrendingShows] = useState<TvShow[]>([]);

  const getTrendingShows = (category: string, type: string) => {
    setLoading(true);
    fetch(`/api/tmdb/${type}/${category}`)
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
        console.error(`Error fetching ${category} shows:`, error)
      );
  };
  useEffect(() => {
    getTrendingShows("trending", "tv");
  }, []);

  // -----------------Fetching popular movies from TMDB API----------------------------
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);

  const getPopularMovies = (category: string, type: string) => {
    setLoading(true);
    fetch(`/api/tmdb/${type}/${category}`)
      .then((res) => res.json())
      .then((json) => {
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
          setPopularMovies(moviesData);
          setLoading(false); // Or use state based on the category
        }, 3000);
      })
      .catch((error) =>
        console.error(`Error fetching ${category} movies:`, error)
      );
  };
  useEffect(() => {
    getPopularMovies("popular", "movie"); // Set loading to false after fetching
  }, []);

  // -----------------Fetching onair from TMDB API---------------------------
  const [onairShows, setonairShows] = useState<TvShow[]>([]);

  const getonairShows = (category: string, type: string) => {
    setLoading(true);
    fetch(`/api/tmdb/${type}/${category}`)
      .then((res) => res.json())
      .then((json) => {
       const results = Array.isArray(json.results) ? json.results : [json];

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
    getonairShows("on_the_air", "tv");
  }, []);

  //---------------------- Fetching upcoming movies from TMDb api---------------------
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);

  const getUpcomingMovies = (category: string, type: string) => {
    setLoading(true);
    fetch(`/api/tmdb/${type}/${category}`)
      .then((res) => res.json())
      .then((json) => {
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
          setUpcomingMovies(moviesData);
          setLoading(false); // Or use state based on the category
        }, 3000);
      })
      .catch((error) =>
        console.error(`Error fetching ${category} movies:`, error)
      );
  };
  useEffect(() => {
    getUpcomingMovies("upcoming", "movie");
  }, []);


  const [selectedType, setSelectedType] = useState("movies");

  return (
    <div className="flex flex-col items-center justify-center px-2 mt-5 h-full bg-neutral-100 dark:bg-zinc-950">
      <div className="flex flex-col w-full items-center mt-5 dark:bg-zinc-950">
        <p className="text-md font-bold text-black dark:text-white font-kanit">
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
          {/* -----trending section----- */}
          <div className="flex flex-col w-full h-auto cursor-pointer mt-10 bg-zinc-100 dark:bg-zinc-950">
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
                        release_date={movie.release_date}
                        media_type={movie.media_type}
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
          <div className="flex flex-col w-full h-auto mt-20 cursor-pointer bg-zinc-100 dark:bg-zinc-950 px-4 md:px-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <IconLine />
              <span className="font-lilita text-2xl sm:text-3xl">
                Latest Movies
              </span>
              <FilmIcon />
            </div>

            {/* Movie Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {loading
                ? Array.from({ length: 20 }).map((_, i) => (
                    <MovieSkeleton key={i} />
                  ))
                : popularMovies.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      title={movie.title}
                      vote_average={movie.vote_average}
                      poster_path={movie.poster_path}
                      id={movie.id}
                      release_date={movie.release_date}
                      media_type={movie.media_type}
                    />
                  ))}
            </div>
          </div>
          {/* -------tv show section----- */}
          <div className="flex flex-col mt-20 w-full h-auto cursor-pointer bg-zinc-100 dark:bg-zinc-950">
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
          {/* ------upcoming section------ */}
          <div className="flex flex-col w-full h-auto cursor-pointer mt-20 mb-10 bg-zinc-100 dark:bg-zinc-950">
            <div className="flex gap-5 items-center">
              <IconLine />
              <span className="font-lilita text-3xl">Upcoming</span>
              <div className="flex gap-4 items-center">
                <span
                  className={`flex items-center text-sm font-kanit gap-2 text-gray-200 p-1 rounded hover:scale-95 transition duation-300 
                    bg-yellow-500
                  `}
                >
                  {" "}
                  <span>
                    <FilmIcon />
                  </span>
                  Movies
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center cursor-pointer ml-5">
              {loading
                ? Array.from({ length: 20 }).map((_, i) => (
                    <MovieSkeleton key={i} />
                  ))
                : upcomingMovies.map((movie) => (
                    <div key={movie.id}>
                      <MovieCard
                        title={movie.title}
                        vote_average={movie.vote_average}
                        poster_path={movie.poster_path}
                        id={movie.id}
                        release_date={movie.release_date}
                        media_type={movie.media_type}
                      />
                    </div>
                  ))}
            </div>
          </div>
        </TracingBeam>
      </div>
    </div>
  );
};

export default MainSection;
