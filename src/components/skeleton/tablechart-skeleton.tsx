
import React from 'react'

const DashboardTableSkeleton = () => {
  return (
   <div className="space-y-10 p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-lg max-w-7xl mx-auto animate-pulse">
  {/* Filter Dropdown Skeleton */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div className="w-full sm:w-64 h-12 bg-gray-300 dark:bg-zinc-700 rounded-lg"></div>
    <div className="w-32 h-5 bg-gray-300 dark:bg-zinc-700 rounded-md"></div>
  </div>

  {/* Table Skeleton */}
  <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-zinc-700 shadow-sm">
    <table className="min-w-full text-left text-sm">
      <thead className="bg-gray-200 dark:bg-zinc-700">
        <tr>
          {[...Array(6)].map((_, i) => (
            <th key={i} className="p-3">
              <div className="h-4 w-20 bg-gray-300 dark:bg-zinc-700 rounded-md"></div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...Array(5)].map((_, i) => (
          <tr key={i} className="border-t border-gray-200 dark:border-zinc-700">
            {[...Array(6)].map((_, j) => (
              <td key={j} className="p-3">
                <div className="h-4 bg-gray-300 dark:bg-zinc-700 rounded-md max-w-[90%]"></div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Pagination Skeleton */}
  <div className="flex justify-center items-center gap-5 mt-6">
    <div className="h-10 w-24 bg-gray-300 dark:bg-zinc-700 rounded-lg"></div>
    <div className="h-6 w-24 bg-gray-300 dark:bg-zinc-700 rounded-md"></div>
    <div className="h-10 w-24 bg-gray-300 dark:bg-zinc-700 rounded-lg"></div>
  </div>

  {/* Spacer */}
  <div className="my-10"></div>

  {/* Charts Skeleton */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <section className="bg-gray-200 dark:bg-zinc-700 p-6 rounded-xl shadow-md h-[350px]"></section>
    <section className="bg-gray-200 dark:bg-zinc-700 p-6 rounded-xl shadow-md h-[350px]"></section>
  </div>
</div>

  )
}

export default DashboardTableSkeleton
