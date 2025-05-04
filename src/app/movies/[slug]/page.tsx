import Navbar from '@/components/homePage/navbar';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function MoviePage({ params }: { params: { slug: string } }) {
  const id = params.slug?.split('-').pop();
  
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`);
  if (!res.ok) return notFound();

  const movie = await res.json();

  return (
    <main className='flex flex-col justify-center w-full h-auto'>
      <nav>
        <Navbar/>
      </nav>

         {/* ---------- for image -------- */}
      <div className='relative w-full'>

       {/* --------------image----------- */}
       <Image src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
    alt="Background"
    height={500}
    width={500}
    priority
    className="w-full h-auto object-cover" />
      {/* -----------for bg gradient over image-------------- */}
    <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-black/80 via-black/80 to-black/80" />

          {/* ---------------content over image------------- */}

      

      </div>
      
    </main>
  );
}
