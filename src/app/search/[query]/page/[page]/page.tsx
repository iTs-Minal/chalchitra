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
      <div className="flex flex-col items-center justify-center w-full">
        <Navbar />
      </div>

      {data.results?.length === 0 && <p>No results found.</p>}

      <div className="flex flex-col w-full h-auto mt-20 px-2 cursor-pointer bg-zinc-100 dark:bg-zinc-950">
        <TracingBeam className="flex flex-col w-full h-auto">
          <div className="flex gap-5 items-center">
            <IconLine />
            <span className="font-lilita text-3xl">
              Results for: {decodeURIComponent(query)}
            </span>
          </div>
          <div className="flex flex-wrap items-center cursor-pointer ml-5">
            {data?.results?.map(
              (item: {
                id?: number;
                title: string;
                name: string;
                poster_path?: string;
                backdrop_path?: string;
                vote_average?: number;
                media_type?:string;
              }) => {
                  const title=item.title||item.name;
                  const slug = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${item.id}`;
              
                return(
                <div
                  key={item.id}
                  className="flex flex-col items-center justify-center w-[185px] h-90  bg-neutral-300 dark:bg-zinc-900 mt-5 mx-2"
                >
                  <div className="relative flex items-center justify-center w-full h-full object-contain">
                    <GlowingEffect
                      spread={60}
                      glow={true}
                      disabled={false}
                      proximity={64}
                      inactiveZone={0.01}
                    />
                    <Image
                      src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                      alt={item.title || "Movie poster"}
                      width={500}
                      height={750}
                      className="w-full h-full object-cover hover:brightness-40"
                    />
                    <span className="absolute top-1 left-1 flex items-center gap-1 text-yellow-500 font-bold font-kanit">
                      <Star className="fill-amber-400" />{" "}
                      {item.vote_average?.toFixed(1)}
                    </span>
                  </div>
                  <div>
                    <div className=" flex flex-col items-center justify-center w-full h-full gap-1">
                      <span className="font-outfit text-md p-1 line-clamp-1">
                        {item.title || item.name}
                      </span>
                     <Link href={item.media_type==="movie"?`/movies/${slug}`:`/tvshows/${slug}`}> <button className="p-2 mb-1 hover:scale-95 bg-zinc-50 dark:text-white dark:bg-zinc-950 flex items-center justify-center rounded-md text-sm">
                        View Details
                      </button></Link>
                    </div>
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
