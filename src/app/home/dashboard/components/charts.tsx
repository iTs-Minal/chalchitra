"use client";

import { useState, useEffect } from "react";
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
import { Heart, Star, Eye, ShoppingCart } from "lucide-react";

const COLORS = ["#f472b6", "#facc15", "#34d399", "#60a5fa"];

const dummyData = {
  Favorites: {
    genreData: [
      { name: "Thriller", value: 5 },
      { name: "Romance", value: 3 },
      { name: "Sci-Fi", value: 2 },
    ],
    yearData: [
      { year: "2021", count: 2 },
      { year: "2022", count: 1 },
      { year: "2023", count: 4 },
      { year: "2024", count: 2 },
      { year: "2025", count: 3 },
    ],
  },
  Rated: {
    genreData: [
      { name: "Thriller", value: 5 },
      { name: "Romance", value: 3 },
      { name: "Sci-Fi", value: 2 },
    ],
    yearData: [
      { year: "2021", count: 2 },
      { year: "2022", count: 1 },
      { year: "2023", count: 4 },
      { year: "2024", count: 2 },
      { year: "2025", count: 3 },
    ],
  },
  Watched: {
    genreData: [
      { name: "Horror", value: 3 },
      { name: "Adventure", value: 6 },
    ],
    yearData: [
      { year: "2021", count: 0 },
      { year: "2022", count: 3 },
      { year: "2023", count: 2 },
      { year: "2024", count: 4 },
      { year: "2025", count: 1 },
    ],
  },
  WishList: {
    genreData: [
      { name: "Fantasy", value: 4 },
      { name: "Mystery", value: 5 },
    ],
    yearData: [
      { year: "2021", count: 1 },
      { year: "2022", count: 2 },
      { year: "2023", count: 2 },
      { year: "2024", count: 5 },
      { year: "2025", count: 3 },
    ],
  },
};

type ChartKey = keyof typeof dummyData;

export function Charts() {
  const dropdownOptions = [
    {
      label: "Favorites",
      value: "favorite",
      icon: <Heart className="w-4 h-4 text-pink-500" />,
    },
    {
      label: "Rated",
      value: "rated",
      icon: <Star className="w-4 h-4 text-yellow-500" />,
    },
    {
      label: "Watched",
      value: "watched",
      icon: <Eye className="w-4 h-4 text-green-500" />,
    },
    {
      label: "Wishlist",
      value: "wishlist",
      icon: <ShoppingCart className="w-4 h-4 text-blue-500" />,
    },
  ];

  const filterToChartMap: Record<FilterType, ChartKey> = {
    favorite: "Favorites",
    rated: "Rated",
    watched: "Watched",
    wishlist: "WishList",
  };

  type FilterType = "favorite" | "rated" | "watched" | "wishlist";
  const [selectedChart, setSelectedChart] = useState<ChartKey>("Favorites");
  const [filter, setFilter] = useState<FilterType>("favorite");

  const [favorites, setFavorites] = useState<{
    genreData: { name: string; value: number }[];
    yearData: { year: string; count: number }[];
  }>({
    genreData: [],
    yearData: [],
  });

  useEffect(() => {
    if (selectedChart == "Favorites") {
      async function fetchFavorite() {
        try {
          const res = await fetch("/api/movies/favorite");
          const rawData = await res.json();

          console.log(rawData);

          // Aggregate genre counts
          const genreCount: Record<string, number> = {};
          const monthCount: Record<string, number> = {};

          rawData.forEach((item: { genre: string; added_date: string }) => {
            // Fix genre: split by comma
            const firstGenre =
              typeof item.genre === "string"
                ? item.genre.split(",")[0].trim()
                : "";

            const date = new Date(item.added_date);
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, "0"); // month from 0-11, so +1
            const yearMonth = `${year}-${month}`;

            if (firstGenre) {
              genreCount[firstGenre] = (genreCount[firstGenre] || 0) + 1;
            }

            if (!isNaN(year) && !isNaN(date.getMonth())) {
              monthCount[yearMonth] = (monthCount[yearMonth] || 0) + 1;
            }
          });

          const genreData = Object.entries(genreCount).map(([name, value]) => ({
            name,
            value,
          }));

          const yearData = Object.entries(monthCount)
            .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
            .map(([month, count]) => ({ year: month, count }));

          setFavorites({ genreData, yearData });
        } catch (error) {
          console.log("error fetching data:", error);
        }
      }
      fetchFavorite();
    }
  }, [selectedChart]);

  const chartData =
    selectedChart === "Favorites" ? favorites : dummyData[selectedChart];

  return (
    <div className="space-y-6">
      <div className="flex justify-start mb-4">
        <div className="relative">
          <select
            value={filter}
            onChange={(e) => {
              const selectedFilter = e.target.value as FilterType;
              setFilter(selectedFilter);
              setSelectedChart(filterToChartMap[selectedFilter]);
            }}
            className={`appearance-none pr-8 pl-3 py-2 border dark:border-zinc-700 rounded text-sm text-gray-800 dark:text-white dark:bg-gray-700`}
          >
            {dropdownOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-2 top-2.5 text-black dark:text-black">
            {dropdownOptions.find((o) => o.value === filter)?.icon}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Genre Pie Chart */}
        <div className="bg-white dark:bg-zinc-900 p-4 rounded shadow">
          <h3 className="text-center mb-2 text-zinc-800 dark:text-white">
            Genre Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData.genreData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label
              >
                {chartData.genreData.map((_, index) => (
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

        {/* Year Line Chart */}
        <div className="bg-white dark:bg-zinc-900 p-4 rounded shadow">
          <h3 className="text-center mb-2 text-zinc-800 dark:text-white">
            Movies Per Year
          </h3>
         <ResponsiveContainer width="100%" height={300}>
  <LineChart data={chartData.yearData}>
    <XAxis 
      dataKey="year" 
      stroke="#ccc" 
      tickFormatter={(tick) => {
        // Format "YYYY-MM" to "MMM YY" for display, e.g. "2025-05" -> "May 25"
        const [year, month] = tick.split("-");
        const date = new Date(Number(year), Number(month) - 1);
        return date.toLocaleString('default', { month: 'short', year: '2-digit' });
      }}
      interval={0} // show all ticks
      angle={-45}
      textAnchor="end"
      height={60}
    />
    <YAxis stroke="#ccc" />
    <Tooltip
      labelFormatter={(label) => {
        const [year, month] = label.split("-");
        const date = new Date(Number(year), Number(month) - 1);
        return date.toLocaleString('default', { month: 'long', year: 'numeric' });
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
