import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function ShowPage({ params }: { params: { slug: string } }) {
  const id = params.slug.split('-').pop();
  
  const res = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_API_KEY}`);
  if (!res.ok) return notFound();

  const show = await res.json();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{show.name}</h1>
      <p className="mt-2">{show.overview}</p>
      <Image
        className="mt-4 rounded-lg"
        src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
        alt={show.name}
        width={200}
        height={400}
      />
    </div>
  );
}
