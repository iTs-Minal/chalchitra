

/* eslint-disable @typescript-eslint/no-explicit-any */
import MovieCard from "@/components/card/movie-card";
import Navbar from "@/components/homePage/navbar";
import MovieActions from "@/components/movie-action";
import ReviewForm from "@/components/review-form";
import ReviewList from "@/components/review-list";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ShowPage({
  params,
}: {
  params: { slug: string };
}) {
  const id = params.slug.split("-").pop();

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos,images,credits,recommendations`
  );
  if (!res.ok) return notFound();
  const movie = await res.json();

  const providersRes = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${process.env.TMDB_API_KEY}`
  );
  const providers = await providersRes.json();


  return (
    <main className="w-full min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] pt-20 md:pt-5">
        <Image
          src={`https://image.tmdb.org/t/p/original${
            movie.backdrop_path || movie.poster_path
          }`}
          alt={movie.name}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0 opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/95 z-10" />

        <div className="relative z-20 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 px-6 md:px-10">
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={movie.name}
            width={300}
            height={500}
            className="rounded-xl shadow-2xl"
          />
          <div className="text-white space-y-4 max-w-2xl text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold font-lilita">
              {movie.title}
            </h1>
            <p className="italic text-gray-300 font-kanit">{movie.tagline}</p>
            <p className="text-sm sm:text-base font-exo text-gray-200">
              <strong>Overview:</strong> {movie.overview}
            </p>

            <div className="text-sm text-gray-200 font-outfit space-y-1">
              <p><strong>Release:</strong> {movie.release_date}</p>
              <p><strong>Runtime:</strong> {movie.runtime} mins</p>
              <p><strong>Status:</strong> {movie.status}</p>
              <p><strong>Language:</strong> {movie.original_language.toUpperCase()}</p>
              <p><strong>Genres:</strong> {movie.genres.map((g: any) => g.name).join(", ")}</p>
              <p><strong>Budget:</strong> ${movie.budget.toLocaleString()}</p>
              <p><strong>Revenue:</strong> ${movie.revenue.toLocaleString()}</p>
              <p><strong>Production:</strong> {movie.production_companies.map((p: any) => p.name).join(", ")}</p>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
              <MovieActions tmdbId={movie.id} type="movies" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-6 py-12 space-y-20">

        {/* Director & Watch Providers */}
        <div className="flex flex-col md:flex-row gap-10">
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

          {providers.results?.US?.flatrate?.length > 0 && (
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold mb-4 font-kanit">
                📺 Watch On
              </h2>
              <div className="flex flex-wrap gap-4">
                {providers.results.US.flatrate.map((provider: any) => (
                  <div
                    key={provider.provider_id}
                    className="w-24 flex flex-col items-center p-3 rounded-xl bg-white text-black shadow-md"
                  >
                    <Image
                      src={`https://image.tmdb.org/t/p/w200${provider.logo_path}`}
                      alt={provider.provider_name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <p className="text-xs text-center mt-2">
                      {provider.provider_name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Cast */}
        {movie.credits?.cast?.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-4 font-kanit">🎭 Cast</h2>
            <div className="flex overflow-x-auto gap-6 pb-4 scroll-smooth">
              {movie.credits.cast.slice(0, 15).map((actor: any) => (
                <div
                  key={actor.id}
                  className="w-36 flex-shrink-0 text-center space-y-2"
                >
                  <Image
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                        : "/no-avatar.png"
                    }
                    alt={actor.name}
                    width={120}
                    height={180}
                    className="rounded-lg mx-auto"
                  />
                  <p className="text-sm font-medium">{actor.name}</p>
                  <p className="text-xs text-gray-400">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Screenshots */}
        {movie.images?.backdrops?.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-4 font-kanit">
              🖼️ Screenshots
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
            <h2 className="text-3xl font-bold mb-4 font-kanit">
              🎬 Official Trailer
            </h2>
            {movie.videos.results
              .filter(
                (vid: any) => vid.type === "Trailer" && vid.site === "YouTube"
              )
              .slice(0, 1)
              .map((trailer: any) => (
                <div
                  key={trailer.key}
                  className="aspect-video w-full rounded-lg overflow-hidden"
                >
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

        {/* Reviews */}
        <div id="rating" className="space-y-6">
          <h2 className="text-3xl font-bold font-kanit">⭐ Rate & Review</h2>
          <ReviewForm tmdbId={movie.id} />
          <ReviewList tmdbId={movie.id} />
        </div>

        {movie.recommendations?.results?.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-4 font-kanit">
              🎯 You May Also Like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {movie.recommendations.results.slice(0, 10).map((rec: any) => (
                <MovieCard 
                key={rec.id} 
                title={rec.title}
                vote_average={rec.vote_average}
                poster_path={rec.poster_path}
                id={rec.id} 
                media_type="Movie"
                release_date={rec.release_date}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
