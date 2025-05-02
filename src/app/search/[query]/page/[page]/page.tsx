import Image from "next/image";
import {notFound} from "next/navigation";

type Params={
    params:{query:string;
        page:string;
    };
}

export default async function SearchResultsPage({params}:Params){
    const {query, page}=params;

    const res = await fetch(`https://api.themoviedb.org/3/search/multi?query=${query}&page=${page}&api_key=${process.env.TMDB_API_KEY}`,
        {cache:"no-store"}
    );

    if(!res.ok) return notFound();

    const data = await res.json();

    return (
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">
            Results for: {decodeURIComponent(query)}
          </h1>
    
          {data.results?.length === 0 && <p>No results found.</p>}
    
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.results?.map((item: { id: number; title: string; name: string; poster_path?: string; backdrop_path?: string }) => (
              <div key={item.id} className="border rounded p-2">
                <Image
                  src={`https://image.tmdb.org/t/p/w300${item.poster_path || item.backdrop_path}`}
                  alt={item.title || item.name}
                  className="rounded mb-2"
                  width={300}
                  height={450}
                />
                <p>{item.title || item.name}</p>
              </div>
            ))}
          </div>
    
          {/* Pagination */}
          <div className="flex justify-between mt-6">
            {+page > 1 && (
              <a
                href={`/search/${query}/page/${+page - 1}`}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Prev
              </a>
            )}
            {+page < data.total_pages && (
              <a
                href={`/search/${query}/page/${+page + 1}`}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Next
              </a>
            )}
          </div>
        </div>
      );

}