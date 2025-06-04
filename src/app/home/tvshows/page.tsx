"use client";

export const dynamic = 'force-dynamic';

import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation';

import Navbar from '@/components/homePage/navbar';
import { fetchFromTMDB } from '@/lib/tmdb';
import { IconLine } from '@tabler/icons-react';
import { FilmIcon } from 'lucide-react';
import { TracingBeam } from '@/components/ui/tracing-beam';
import ShowSkeleton from '@/components/skeleton/show-skeleton';
import ShowCard from '@/components/card/tvshow-card';
import Footer from '@/components/homePage/footer';



interface TvShow{
  name:string;
  id?:number;
  vote_average?:number;
  poster_path?:string;
  first_air_date?: string;
  media_type: string;
}



export default function MoviesPage() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{ results: TvShow[]; total_pages: number } | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchedData = await fetchFromTMDB('/api/tmdb/tv/popular', page);
      setData(fetchedData);
      setLoading(false);
    };

    fetchData();
  }, [page]);

  const totalPages = data?.total_pages || 0;

  return (
    <main className='flex flex-col justify-center w-full h-auto'>
      <div className='flex flex-col items-center justify-center w-full'>
        <Navbar/>
      </div>
    
      <div className="flex flex-col w-full h-auto mt-20 px-2 cursor-pointer bg-zinc-100 dark:bg-zinc-950">
      <TracingBeam className="flex flex-col w-full h-auto">
            <div className="flex gap-5 items-center mb-4">
              <IconLine />
              <span className="font-lilita text-3xl">Popular Tv Shows</span>
              <FilmIcon />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {loading
                ? Array.from({ length: 20 }).map((_, i) => (
                    <ShowSkeleton key={i} />
                  ))
                : data?.results?.map((show:TvShow) => (
                    <div key={show.id}>
                      <ShowCard
                        name={show.name}
                        vote_average={show.vote_average}
                        poster_path={show.poster_path}
                        id={show.id ?? 0}
                        media_type={show.media_type}
                        first_air_date={show.first_air_date}
                      />
                    </div>
                  ))}
            </div>
      </TracingBeam>
          </div>

      <div className='flex flex-col items-center justify-center mb-8'>
      <Pagination currentPage={page} totalPages={totalPages} />
      </div>
      <div className='flex flex-col w-full justify-center'>
        <Footer/>
      </div>
    </main>
  );
}

function Pagination({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter((p) => p >= currentPage - 2 && p <= currentPage + 2);

  return (
    <div className="mt-6 flex gap-2 items-center">
      {currentPage > 1 && <a href={`?page=${currentPage - 1}`} className="px-3 py-1 border rounded">Prev</a>}
      
      {pageNumbers.map((p) => (
        <a
          key={p}
          href={`?page=${p}`}
          className={`px-3 py-1 border rounded ${
            p === currentPage ? 'bg-blue-500 text-black' : 'bg-gray-900 text-white'
          }`}
        >
          {p}
        </a>
      ))}

      {currentPage < totalPages && <a href={`?page=${currentPage + 1}`} className="px-3 py-1 border rounded">Next</a>}
    </div>
  );

}


