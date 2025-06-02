"use client";
import { Sidebar } from "./components/sidebar";
import { StatsHeader } from "./components/statsheader";
// import { MovieTable } from './components/movie-table';
// import { Charts } from './components/charts';
import Navbar from "@/components/homePage/navbar";
import TableChart from "./components/table-chart";
import { useState } from "react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"movies" | "tvshows">("movies");

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-neutral-950 text-gray-900 dark:text-white">
      <div className="flex flex-col items-center justify-center w-full">
        <Navbar />
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white dark:bg-zinc-800 border-r dark:border-zinc-700 overflow-y-auto h-auto">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <section className="flex-1 p-4 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-zinc-800 shadow-md p-4 rounded-xl border dark:border-zinc-700">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setActiveTab("movies")}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                  activeTab === "movies"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-zinc-700 dark:text-white"
                }`}
              >
                Movies
              </button>
              <button
                onClick={() => setActiveTab("tvshows")}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                  activeTab === "tvshows"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-zinc-700 dark:text-white"
                }`}
              >
                TV Shows
              </button>
            </div>
          </div>
          <StatsHeader type={activeTab} />
          {/* Replace '12345' with the actual tmdbId you want to use */}
          <TableChart type={activeTab} />
        </section>
      </div>
    </main>
  );
}
