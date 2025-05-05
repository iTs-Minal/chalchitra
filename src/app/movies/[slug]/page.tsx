/* eslint-disable @typescript-eslint/no-explicit-any */


import Navbar from "@/components/homePage/navbar";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function MoviePage({
  params,
}: {
  params: { slug: string };
}) {
  const id = params.slug?.split("-").pop();

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos,images`
  );
  if (!res.ok) return notFound();

  const movie = await res.json();




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
          <div className="flex flex-row justify-center pt-10 px-10 w-full gap-25">
            <div className=" hidden md:block">
              <Image
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
                height={350}
                width={350}
                priority
              />
            </div>
            <div className="max-w-3xl space-y-4">
              <h1 className="text-6xl font-bold font-lilita">{movie.title}</h1>
              <p className="text-gray-300 font-kanit">{movie.tagline}</p>
              <p className="w-120 font-exo text-sm">
                <strong>Overview:</strong> {movie.overview}
              </p>

              <div className="text-md text-gray-200 space-y-2 font-outfit">
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

              <div className="flex gap-4 mt-4">
  <button className="bg-red-600 px-4 py-2 rounded hover:bg-red-700">
    ❤️ Add to Favorites
  </button>
  <a href="#rating"
    className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600"
  >
    ⭐ Rate Movie
  </a>
</div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto w-full px-6 py-10 space-y-16 mt-10">
            {/* Screenshots */}
            {movie.images?.backdrops?.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold mb-6 font-kanit">Screenshots:</h2>
                <div className="flex flex-col gap-6">
                  {movie.images.backdrops
                    .slice(0, 5)
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
  <h2 className="text-3xl font-semibold mb-2">💬 Leave a Comment</h2>
  
  <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4">
    <textarea
      className="w-full resize-none rounded-md p-3 text-black dark:text-white bg-white dark:bg-zinc-900 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      rows={4}
      placeholder="Share your thoughts..."
    />
    <div className="mt-3 flex justify-between items-center">
      <span className="text-sm text-gray-500 dark:text-gray-400">Be respectful and stay on topic.</span>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
        🚀 Post Comment
      </button>
    </div>
  </div>
</div>

          </div>
        </div>
      </div>
    </main>
  );
}
