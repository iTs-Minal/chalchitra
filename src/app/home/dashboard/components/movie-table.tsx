'use client';

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import {
  Heart,
  Star,
  Eye,
  ShoppingCart,
} from 'lucide-react';

interface Movie {
  id: string;
  title: string;
  release_date: string;
  added_date: string;
  genre: string;
  vote_average: number; // Assume rating is stored with movie
}

const ITEMS_PER_PAGE = 10;

export function MovieTable() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("favorite");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/movies/${filter}`);
      const data = await res.json();

      const sorted = data.sort((a:Movie, b:Movie)=> new Date(b.added_date).getTime()- new Date(a.added_date).getTime())

      setMovies(sorted);
    } catch (err) {
      console.log("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [filter]);

  const dropdownOptions = [
  { label: "Favorites", value: "favorite", icon: <Heart className="w-4 h-4 text-pink-500" /> },
  { label: "Rated", value: "rated", icon: <Star className="w-4 h-4 text-yellow-500" /> },
  { label: "Watched", value: "watched", icon: <Eye className="w-4 h-4 text-green-500" /> },
  { label: "Wishlist", value: "wishlist", icon: <ShoppingCart className="w-4 h-4 text-blue-500" /> },
];

  const paginated = movies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(movies.length / ITEMS_PER_PAGE);

  const handleRemove = (id: string) => {
    // Implement actual remove logic (API call, etc.)
    setMovies((prev) => prev.filter((m) => m.id !== id));
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="bg-white dark:bg-zinc-900 text-sm rounded-lg shadow overflow-x-auto p-4">
      {/* Filter Dropdown */}
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
    <select
      value={filter}
      onChange={(e) => {
        setFilter(e.target.value);
        setCurrentPage(1);
      }}
      className="appearance-none pr-8 pl-3 py-2 bg-gray-100 dark:bg-zinc-800 border dark:border-zinc-700 rounded text-sm text-gray-800 dark:text-white"
    >
      {dropdownOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <div className="pointer-events-none absolute right-2 top-2.5 text-gray-500 dark:text-gray-400">
      {dropdownOptions.find((o) => o.value === filter)?.icon}
    </div>
  </div>
  <p className="text-xs text-gray-500 dark:text-gray-400">
    Showing {paginated.length} of {movies.length}
  </p>
      </div>

      <table className="w-full text-left">
        <thead className="bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300">
          <tr>
            <th className="p-2">Name</th>
            <th>Release Year</th>
            <th>Added Date</th>
            <th>Genre</th>
            <th>Rating</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-800 dark:text-white">
          {paginated.map((movie) => (
            <tr key={movie.id} className="border-t dark:border-zinc-700">
              <td className="p-2">{movie.title}</td>
              <td>{movie.release_date?.slice(0, 4)}</td>
              <td>{movie.added_date?.slice(0,10)}</td>
              <td>{movie.genre?.split(",")[0].trim()}</td>
              <td>{movie.vote_average?.toFixed(1)}</td>
              <td>
                <button
                  onClick={() => handleRemove(movie.id)}
                  className="text-red-500 hover:text-red-700 flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-4 py-1 bg-gray-200 dark:bg-zinc-700 rounded text-sm disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-600 dark:text-gray-400 text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-4 py-1 bg-gray-200 dark:bg-zinc-700 rounded text-sm disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
