import Footer from "@/components/homePage/footer";
import Navbar from "@/components/homePage/navbar";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { IconLine } from "@tabler/icons-react";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = {
  params: { query: string; page: string };
};

export default async function SearchResultsPage({ params }: Params) {
  const { query, page } = params;

  const res = await fetch(
    `https://api.themoviedb.org/3/search/multi?query=${query}&page=${page}&api_key=${process.env.TMDB_API_KEY}`,
    { cache: "no-store" }
  );

  if (!res.ok) return notFound();

  const data = await res.json();



  return (
    <main className="flex flex-col justify-center w-full h-auto">

       {/* --------------------navbar------------------- */}
      <div className="flex flex-col items-center justify-center w-full">
        <Navbar />
      </div>

      {data.results?.length === 0 && <p>No results found.</p>}

      <div className="flex flex-col w-full h-auto mt-20 cursor-pointer bg-zinc-100 dark:bg-zinc-950 px-4 md:px-8">
        <TracingBeam className="flex flex-col w-full h-auto">
          <div className="flex items-center gap-3 mb-6">
            <IconLine />
            <span className="font-lilita text-2xl sm:text-3xl">
              Results for: {decodeURIComponent(query)}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {data?.results?.map(
              (item: {
                id?: number;
                title: string;
                name: string;
                poster_path?: string;
                backdrop_path?: string;
                vote_average?: number;
                release_date?:string;
                first_air_date?:string;
                media_type:string;
              }) => {
                  const title=item.title||item.name;
                  const date= item.release_date || item.first_air_date;
                  const slug = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${item.id}`;
              
                return(
               <div key={item.id} className="bg-neutral-200 dark:bg-zinc-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 group">
          {/* Poster */}
          <div className="relative w-full aspect-[2/3]">
            <GlowingEffect
              spread={60}
              glow
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
            />
            <Image
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={title || "poster"}
              fill
              className="object-cover group-hover:brightness-50 transition duration-300"
              sizes="(max-width: 768px) 100vw, 200px"
            />
            <span className="absolute top-2 left-2 flex items-center gap-1 bg-black/60 text-yellow-400 px-2 py-1 rounded-md text-xs sm:text-sm font-kanit z-10">
              <Star className="w-4 h-4 fill-amber-400" /> {item.vote_average?.toFixed(1)}
            </span>
          </div>
    
          {/* Info Section */}
          <div className="flex flex-col justify-between px-3 py-3 h-[110px]">
            {/* Release date & media type */}
            <div className="text-sm text-left text-gray-600 dark:text-gray-300 font-kanit mb-1 flex gap-4">
              {item.media_type && <span className="capitalize">{item.media_type}</span>}
              {date && <span>  {date?.slice(0,4)}</span>}
            </div>
    
            {/* Title */}
            <p className="font-outfit text-sm sm:text-base font-semibold text-center line-clamp-1 text-black dark:text-white">
              {title}
            </p>
    
            {/* Button */}
            <Link href={`/movies/${slug}`}>
              <button className="mt-2 w-full py-1.5 text-xs sm:text-sm font-kanit bg-white dark:bg-zinc-800 text-black dark:text-white rounded hover:bg-yellow-500 hover:text-black transition duration-300 hover:scale-95">
                View Details
              </button>
            </Link>
          </div>
        </div>
        );
            }
            )}
          </div>
        </TracingBeam>
      </div>

      {/* ---------Pagination------  */}
      <div className="flex items-center justify-center m-6 space-x-2">
        {+page > 1 && (
          <a
            href={`/search/${query}/page/${+page - 1}`}
            className="px-3 py-1 bg-gray-300 text-black rounded"
          >
            Prev
          </a>
        )}

        {[...Array(3)].map((_, i) => {
          const pageNumber = +page - 1 + i;
          if (pageNumber < 1 || pageNumber > data.total_pages) return null;

          return (
            <a
              key={pageNumber}
              href={`/search/${query}/page/${pageNumber}`}
              className={`px-3 py-1 rounded ${
                pageNumber === +page
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {pageNumber}
            </a>
          );
        })}

        {+page < data.total_pages && (
          <a
            href={`/search/${query}/page/${+page + 1}`}
            className="px-3 py-1 bg-blue-300 rounded"
          >
            Next
          </a>
        )}
      </div>

      {/* ------footer----- */}
      <div>
        <Footer />
      </div>
    </main>
  );
}
