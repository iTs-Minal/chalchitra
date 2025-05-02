import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function MoviePage({ params }: { params: { slug: string } }) {
  const id = params.slug.split('-').pop();
  
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`);
  if (!res.ok) return notFound();

  const movie = await res.json();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{movie.title}</h1>
      <p className="mt-2">{movie.overview}</p>
      <Image
        className="mt-4 rounded-lg"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        width={200}
        height={400}
      />
    </div>
  );
}
