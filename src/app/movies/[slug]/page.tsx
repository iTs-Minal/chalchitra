/* eslint-disable @typescript-eslint/no-explicit-any */

import Navbar from "@/components/homePage/navbar";
import MovieActions from "@/components/movie-action";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function MoviePage({
  params,
}: {
  params: { slug: string };
}) {
  const id = params.slug.split("-").pop();

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos,images,credits,recommendations,reviews`
  );
  if (!res.ok) return notFound();

  const movie = await res.json();

  const providersRes = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${process.env.TMDB_API_KEY}`
  );
  const providers = await providersRes.json();

  return (
    <main className="flex flex-col justify-center w-full h-auto">
      <nav>
        <Navbar />
      </nav>

      {/* ---------- for image -------- */}
      <div className="relative w-full">
        {/* --------------image----------- */}
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt="Background"
          height={500}
          width={500}
          priority
          className="w-full h-auto object-cover"
        />

        {/* -----------for bg gradient over image-------------- */}
        <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-black/80 via-black/80 to-black/80" />

        {/* ---------------content over image------------- */}

        <div className="absolute inset-0 h-auto w-full flex flex-col">
          <div className="flex flex-col md:flex-row justify-center items-center gap-10 pt-10 px-4 md:px-10 w-full">
            {/* Movie Poster */}
            <div className="w-full md:w-auto">
              <Image
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
                height={350}
                width={350}
                priority
                className="rounded-lg w-full md:w-[300px] h-auto object-cover mx-auto"
              />
            </div>

            {/* Movie Details */}
            <div className="w-full max-w-3xl space-y-4 text-white">
              <h1 className="text-3xl sm:text-5xl md:text-4xl lg:text-5xl font-bold font-lilita leading-tight">
                {movie.title}
              </h1>
              <p className="text-gray-300 font-kanit text-sm sm:text-base">
                {movie.tagline}
              </p>
              <p className="font-exo text-sm sm:text-base">
                <strong>Overview:</strong> {movie.overview}
              </p>

              <div className="text-sm sm:text-md text-gray-200 space-y-2 font-outfit">
                <p>
                  <strong>Release Date:</strong> {movie.release_date}
                </p>
                <p>
                  <strong>Runtime:</strong> {movie.runtime} mins
                </p>
                <p>
                  <strong>Status:</strong> {movie.status}
                </p>
                <p>
                  <strong>Original Language:</strong>{" "}
                  {movie.original_language.toUpperCase()}
                </p>
                <p>
                  <strong>Genres:</strong>{" "}
                  {movie.genres.map((g: any) => g.name).join(", ")}
                </p>
                <p>
                  <strong>Production:</strong>{" "}
                  {movie.production_companies
                    .map((p: any) => p.name)
                    .join(", ")}
                </p>
                <p>
                  <strong>Budget:</strong> ${movie.budget.toLocaleString()}
                </p>
                <p>
                  <strong>Revenue:</strong> ${movie.revenue.toLocaleString()}
                </p>
              </div>

              <div>
                <MovieActions tmdbId={movie.id} />
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto w-full px-6 py-10 space-y-16 mt-10">
            {/* Director Info and Watch Providers */}
            <div className="max-w-6xl mx-auto w-full px-6 py-10 flex justify-between items-start">
              {/* Director Info */}
              {movie.credits?.crew?.length > 0 && (
                <div className="w-1/2 pr-6">
                  <h2 className="text-4xl font-bold mb-6 font-kanit">
                    Director:
                  </h2>
                  <div className="flex items-center gap-6">
                    {movie.credits.crew
                      .filter((person: any) => person.job === "Director")
                      .map((director: any) => (
                        <div
                          key={director.id}
                          className="flex flex-col items-center space-y-4"
                        >
                          <Image
                            src={
                              director.profile_path
                                ? `https://image.tmdb.org/t/p/w300${director.profile_path}`
                                : "/no-avatar.png"
                            }
                            alt={director.name}
                            width={150}
                            height={225}
                            className="rounded-sm"
                          />
                          <div className="text-white">
                            <h3 className="font-medium">{director.name}</h3>
                            <p className="text-xs text-gray-400">
                              {director.known_for_department}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Watch Providers */}
              {providers.results?.US?.rent?.length > 0 && (
                <div className="w-1/2 pl-6">
                  <h2 className="text-4xl font-bold mb-6">
                    Available on OTT Platforms:
                  </h2>
                  <div className="flex flex-wrap gap-6">
                    {providers.results.US.rent.map((provider: any) => (
                      <div
                        key={provider.provider_id}
                        className="w-24 flex flex-col items-center p-3 rounded-2xl bg-white shadow hover:shadow-lg transition duration-300 ease-in-out"
                      >
                        <div className="w-[75px] h-[75px] overflow-hidden rounded-full border border-gray-200 bg-gray-100">
                          <Image
                            src={`https://image.tmdb.org/t/p/w200${provider.logo_path}`}
                            alt={provider.provider_name}
                            width={75}
                            height={75}
                            className="object-contain"
                          />
                        </div>
                        <p className="text-xs mt-2 text-center font-medium text-gray-700">
                          {provider.provider_name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Cast Section */}
            {movie.credits?.cast?.length > 0 && (
              <div>
                <h2 className="text-4xl font-bold mb-6 font-kanit">Cast:</h2>
                <div className="flex overflow-x-auto gap-6 pb-4 scroll-smooth">
                  {movie.credits.cast.slice(0, 15).map((actor: any) => (
                    <div
                      key={actor.id}
                      className="flex-shrink-0 w-40 text-center space-y-2"
                    >
                      <Image
                        src={
                          actor.profile_path
                            ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                            : "/no-avatar.png"
                        }
                        alt={actor.name}
                        width={150}
                        height={225}
                        className="rounded-lg mx-auto"
                      />
                      <div className="text-sm font-medium text-white">
                        {actor.name}
                      </div>
                      <div className="text-xs text-gray-400">
                        {actor.character}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Screenshots */}
            {movie.images?.backdrops?.length > 0 && (
              <div>
                <h2 className="text-4xl font-bold mb-6 font-kanit">
                  Screenshots:
                </h2>
                <div className="flex flex-col gap-6">
                  {movie.images.backdrops
                    .slice(6, 12)
                    .map((img: any, idx: number) => (
                      <Image
                        key={idx}
                        src={`https://image.tmdb.org/t/p/original${img.file_path}`}
                        alt={`Screenshot ${idx}`}
                        width={1200}
                        height={700}
                        className="rounded-lg w-full object-cover"
                      />
                    ))}
                </div>
              </div>
            )}

            {/* Trailer */}
            {movie.videos?.results?.length > 0 && (
              <div>
                <h2 className="text-3xl font-semibold mb-6">
                  Official Trailer
                </h2>
                {movie.videos.results
                  .filter(
                    (vid: any) =>
                      vid.type === "Trailer" && vid.site === "YouTube"
                  )
                  .slice(0, 1)
                  .map((trailer: any) => (
                    <div key={trailer.key} className="w-full aspect-video">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${trailer.key}`}
                        allowFullScreen
                        className="rounded-lg"
                      ></iframe>
                    </div>
                  ))}
              </div>
            )}

            {/* Rating */}
            <div id="rating" className="max-w-6xl mx-auto mt-16 space-y-6">
              <h2 className="text-3xl font-semibold">⭐ Rate This Movie</h2>
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="relative">
                    <input
                      type="radio"
                      name="rating"
                      id={`star-${i + 1}`}
                      className="sr-only peer"
                    />
                    <label
                      htmlFor={`star-${i + 1}`}
                      className="text-3xl cursor-pointer text-gray-400 transition hover:text-yellow-400 peer-checked:text-yellow-400"
                    >
                      ★
                    </label>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Hover and click to rate. You can only rate once.
              </p>
            </div>

            {/* Comments */}
            <div className="max-w-6xl mx-auto mt-16 space-y-6">
              <h2 className="text-3xl font-semibold mb-2">
                💬 Leave a Comment
              </h2>

              <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4">
                <textarea
                  className="w-full resize-none rounded-md p-3 text-black dark:text-white bg-white dark:bg-zinc-900 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Share your thoughts..."
                />
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Be respectful and stay on topic.
                  </span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                    🚀 Post Comment
                  </button>
                </div>
              </div>
            </div>

            {/* User Reviews */}
            {movie.reviews?.results?.length > 0 && (
              <div className="max-w-6xl mx-auto mt-16 px-4 md:px-6 space-y-8">
                <h2 className="text-4xl font-bold font-kanit text-white">
                  📝 User Reviews
                </h2>
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
                  {movie.reviews.results.map((review: any) => (
                    <div
                      key={review.id}
                      className="bg-zinc-900 text-white p-6 rounded-xl shadow-lg border border-zinc-700 hover:border-blue-500 transition-all duration-200"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg uppercase">
                          {review.author[0]}
                        </div>
                        <h3 className="font-semibold text-lg">
                          {review.author}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed line-clamp-6">
                        {review.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
