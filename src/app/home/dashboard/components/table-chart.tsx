/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Trash2, Heart, Eye, ShoppingCart } from "lucide-react";
import DashboardTableSkeleton from "@/components/skeleton/tablechart-skeleton";
import { toast } from "react-hot-toast";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import Link from "next/link";

const COLORS = ["#f472b6", "#facc15", "#34d399", "#60a5fa"];

interface Movie {
  id: number;
  title: string;
  name: string;
  first_air_date: string;
  release_date: string;
  added_date: string;
  genre: string;
  vote_average: number;
  poster_path: string;
  userRating: number;
}


const ITEMS_PER_PAGE = 10;

type FilterType = "favorite" | "watched" | "watchlist";

const dropdownOptions = [
  {
    label: "Favorites",
    value: "favorite",
    icon: <Heart className="w-4 h-4 text-pink-500" />,
  },
  {
    label: "Watched",
    value: "watched",
    icon: <Eye className="w-4 h-4 text-green-500" />,
  },
  {
    label: "Watchlist",
    value: "watchlist",
    icon: <ShoppingCart className="w-4 h-4 text-blue-500" />,
  },
];

const filterToChartMap: Record<FilterType, string> = {
  favorite: "Favorites",
  watched: "Watched",
  watchlist: "Watchlist",
};

export default function TableChart({type}: { type: "movies" | "tvshows" }) {
  const [filter, setFilter] = useState<FilterType>("favorite");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Chart data
  const [genreData, setGenreData] = useState<{ name: string; value: number }[]>(
    []
  );
  const [yearData, setYearData] = useState<{ year: string; count: number }[]>(
    []
  );

  // Fetch movies when filter changes
  const fetchMovies = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/${type}/${filter}`);
      const data = await res.json();

      // Sort by added_date desc
      const sorted = data.sort(
        (a: any, b: any) =>
          new Date(b.added_date).getTime() - new Date(a.added_date).getTime()
      );
      setMovies(sorted);

      // Prepare chart data from movies:
      const genreCount: Record<string, number> = {};
      const monthCount: Record<string, number> = {};

      data.forEach((item: any) => {
        const firstGenre = item.genre?.split(",")[0].trim() || "";

        if (firstGenre) {
          genreCount[firstGenre] = (genreCount[firstGenre] || 0) + 1;
        }

        const date = new Date(item.added_date);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // month from 0-11, so +1
        const yearMonth = `${year}-${month}`;
        monthCount[yearMonth] = (monthCount[yearMonth] || 0) + 1;
      });

      setGenreData(
        Object.entries(genreCount).map(([name, value]) => ({
          name,
          value,
        }))
      );

      setYearData(
        Object.entries(monthCount)
          .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
          .map(([month, count]) => ({ year: month, count }))
      );
    } catch (err) {
      toast.error("Failed to fetch data.");
      console.error("Failed to fetch movies:", err);
      setMovies([]);
      setGenreData([]);
      setYearData([]);
    } finally {
      setLoading(false);
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, type]);

  // Pagination
  const paginated = movies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(movies.length / ITEMS_PER_PAGE);

  // Remove movie from UI (implement API delete here as well)
  const handleRemove = async (tmdbId: number) => {
    const loadingToast = toast.loading("Removing...");

     try {
      const res = await fetch(`/api/${type}/${filter}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tmdbId,
          status: filter,
          action: "remove",
        }),
      });

      if (res.ok) {
        toast.success("Removed successfully", { id: loadingToast });
        fetchMovies();
      } else {
        throw new Error("Failed to remove");
      }
    } catch (err) {
      toast.error("Error removing item", { id: loadingToast });
    }
  };

  if (loading)
    return (
      <div className="p-4">
        <DashboardTableSkeleton />
      </div>
    );

  return (
     <div className="space-y-8 p-4 bg-white dark:bg-zinc-900 rounded shadow">
      {/* Filter Dropdown */}
      <div className="flex justify-start items-center gap-4">
        <div className="relative">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as FilterType)}
            className="appearance-none pr-8 pl-3 py-2 font-exo bg-gray-100 dark:bg-zinc-800 border dark:border-zinc-700 rounded text-sm text-gray-800 dark:text-white"
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
          Showing {paginated.length} of {movies.length} items
        </p>
      </div>

      {/* Table */}
      <div className="overflow-auto w-full">
      <table className="w-full min-w-[600px] sm:min-w-full text-sm text-gray-800 dark:text-white border-separate border-spacing-y-1">
        <thead className="bg-gray-200 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 rounded">
          <tr>
            <th className="p-3 text-left font-kanit">Name</th>
            <th className="p-3 text-center font-kanit">Release Year</th>
            <th className="p-3 text-center font-kanit">Added Date</th>
            <th className="p-3 text-center font-kanit">Genre</th>
            <th className="p-3 text-center font-kanit">Rating (own)</th>
            <th className="p-3 text-center font-kanit">Rating</th>
            <th className="p-3 text-center font-kanit">Action</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((item, index) => {
            const slug = `${item.title || item.name}`
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-") + `-${item.id}`;

            return (
              <tr
                key={item.id}
                className={`rounded transition-all duration-150 hover:bg-gray-100 dark:hover:bg-zinc-700 ${
                  index % 2 === 0
                    ? "bg-white dark:bg-zinc-900"
                    : "bg-gray-50 dark:bg-zinc-800"
                }`}
              >
                <td className="p-3 text-left font-medium font-outfit">
                  <span className="text-gray-500 dark:text-gray-400 mr-2">
                    {index + 1}.
                  </span>
                  <Link href={`/${type}/${slug}`}>{item.title || item.name}</Link>
                </td>
                <td className="p-3 text-center text-blue-600 font-exo">
                  {item.release_date?.slice(0, 4) ||
                    item.first_air_date?.slice(0, 4)}
                </td>
                <td className="p-3 text-center font-outfit">
                  {item.added_date?.slice(0, 10)}
                </td>
                <td className="p-3 text-center font-exo">
                  {item.genre?.split(",")[0].trim()}
                </td>
                <td className="p-3 text-center ">
                  {item.userRating ? (
                    <span className="inline-flex items-center gap-1 text-yellow-600 dark:text-yellow-400 font-semibold">
                      ⭐ {item.userRating.toFixed(1)}
                    </span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
                <td className="p-3 text-center ">
                  <span className="inline-flex items-center gap-1 text-yellow-600 dark:text-yellow-400 font-semibold">
                    ⭐ {item.vote_average?.toFixed(1)}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 hover:text-red-700 flex items-center gap-1 justify-center font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>

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

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white dark:bg-zinc-900 p-4 rounded shadow">
          <h3 className="text-center mb-2 text-zinc-800 dark:text-white font-kanit">
            Genre Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={genreData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={(entry) => entry.name}
              >
                {genreData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-4 rounded shadow">
          <h3 className="text-center mb-2 text-zinc-800 dark:text-white font-kanit">
            {filterToChartMap[filter]} {type} Added Over Time
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={yearData}>
              <XAxis
                dataKey="year"
                stroke="#ccc"
                tickFormatter={(tick) => {
                  const [year, month] = tick.split("-");
                  const date = new Date(Number(year), Number(month) - 1);
                  return date.toLocaleString("default", {
                    month: "short",
                    year: "2-digit",
                  });
                }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis stroke="#ccc" />
              <Tooltip
                labelFormatter={(label) => {
                  const [year, month] = label.split("-");
                  const date = new Date(Number(year), Number(month) - 1);
                  return date.toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  });
                }}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
