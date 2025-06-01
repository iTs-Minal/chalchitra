/* eslint-disable @typescript-eslint/no-explicit-any */
import Navbar from '@/components/homePage/navbar';
import MovieActions from '@/components/movie-action';
import ReviewForm from '@/components/review-form';
import ReviewList from '@/components/review-list';
import SeasonEpisodes from '@/components/season-episodes';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function ShowPage({ params }: { params: { slug: string } }) {
  const id = params.slug.split('-').pop();

  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos,images,credits,recommendations,reviews,seasons`
  );
  if (!res.ok) return notFound();
  const show = await res.json();

  console.log(show.credits.cast);

  const providersRes = await fetch(
    `https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=${process.env.TMDB_API_KEY}`
  );
  const providers = await providersRes.json();


  async function getGuestStars(tvId: string, seasons: any[]) {
  const allGuests: Record<number, any> = {};

  for (const season of seasons) {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${tvId}/season/${season.season_number}?api_key=${process.env.TMDB_API_KEY}`
    );
    if (!res.ok) continue;
    const data = await res.json();

    for (const episode of data.episodes || []) {
      for (const guest of episode.guest_stars || []) {
        if (!allGuests[guest.id]) {
          allGuests[guest.id] = guest;
        }
      }
    }
  }

  return Object.values(allGuests);
}

const guestStars = await getGuestStars(show.id, show.seasons);

const mainCast = show.credits?.cast || [];
const combinedCastMap = new Map();

[...mainCast, ...guestStars].forEach((actor: any) => {
  if (!combinedCastMap.has(actor.id)) {
    combinedCastMap.set(actor.id, actor);
  }
});

const combinedCast = Array.from(combinedCastMap.values());

console.log(combinedCast);




  return (
    <main className="w-full min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-[70vh]">
        <Image
          src={`https://image.tmdb.org/t/p/original${show.poster_path}`}
          alt={show.name}
          layout="fill"
          objectFit="cover"
          className="z-0"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/80 to-black/90 z-10" />
        <div className="absolute inset-0 z-20 flex flex-col md:flex-row items-center justify-center gap-10 px-6 md:px-16">
          <Image
            src={`https://image.tmdb.org/t/p/original${show.poster_path}`}
            alt={show.name}
            height={350}
            width={250}
            className="rounded-lg shadow-lg"
          />
          <div className="space-y-4 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold font-lilita">
              {show.name}
            </h1>
            <p className="italic text-gray-300 font-kanit">{show.tagline}</p>
            <p className="font-exo text-sm sm:text-base">
              <strong>Overview:</strong> {show.overview}
            </p>
            <div className="text-sm text-gray-200 font-outfit space-y-1">
              <p><strong>First Air Date:</strong> {show.first_air_date}</p>
              <p><strong>Status:</strong> {show.status}</p>
              <p><strong>Language:</strong> {show.original_language.toUpperCase()}</p>
              <p><strong>Genres:</strong> {show.genres.map((g: any) => g.name).join(', ')}</p>
              <p><strong>Production:</strong> {show.production_companies.map((p: any) => p.name).join(', ')}</p>
            </div>

            <MovieActions tmdbId={show.id} type="tvshows" />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-6 py-12 space-y-20">

        {/* Episodes */}
        {show.seasons?.length > 0 && (
          <div>
            <h2 className="text-3xl font-kanit font-bold mb-4">📺 Episodes</h2>
            <SeasonEpisodes tvId={show.id} seasons={show.seasons} />
          </div>
        )}

        {/* Director & Watch Providers */}
        <div className="flex flex-col md:flex-row gap-10">
          {show.created_by?.length > 0 && (
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold mb-4 font-kanit">🎬 Director</h2>
              <div className="flex gap-6 flex-wrap">
                {show.created_by.map((director: any) => (
                  <div key={director.id} className="text-center space-y-2">
                    <Image
                      src={
                        director.profile_path
                          ? `https://image.tmdb.org/t/p/w300${director.profile_path}`
                          : '/no-avatar.png'
                      }
                      alt={director.name}
                      width={120}
                      height={180}
                      className="rounded-lg mx-auto"
                    />
                    <div>
                      <p className="font-semibold">{director.name}</p>
                      <p className="text-xs text-gray-400">{director.known_for_department}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {providers.results?.US?.flatrate?.length > 0 && (
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold mb-4 font-kanit">📺 Watch On</h2>
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
                    <p className="text-xs text-center mt-2">{provider.provider_name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Cast */}
        {combinedCast.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-4 font-kanit">🎭 Cast</h2>
            <div className="flex overflow-x-auto gap-6 pb-4 scroll-smooth">
              {combinedCast.slice(0, 50).map((actor: any) => (
                <div key={actor.id} className="w-36 flex-shrink-0 text-center space-y-2">
                  <Image
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                        : '/no-avatar.png'
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
        {show.images?.backdrops?.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-4 font-kanit">🖼️ Screenshots</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {show.images.backdrops.slice(6, 12).map((img: any, idx: number) => (
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
        {show.videos?.results?.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-4 font-kanit">🎬 Official Trailer</h2>
            {show.videos.results
              .filter((vid: any) => vid.type === 'Trailer' && vid.site === 'YouTube')
              .slice(0, 1)
              .map((trailer: any) => (
                <div key={trailer.key} className="aspect-video w-full rounded-lg overflow-hidden">
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
          <ReviewForm tmdbId={show.id} />
          <ReviewList tmdbId={show.id} />
        </div>
      </section>
    </main>
  );
}
