import React from 'react'

const ActionButtonSkeleton = () => {
  return (
    <div className="flex flex-wrap gap-4 mt-6">
  {Array(4)
    .fill(0)
    .map((_, i) => (
      <div
        key={i}
        className="flex items-center gap-2 px-4 py-2 w-[150px] h-10 bg-zinc-200 dark:bg-zinc-700 rounded-lg animate-pulse"
      >
        <div className="w-5 h-5 bg-zinc-300 dark:bg-zinc-600 rounded" />
        <div className="flex-1 h-3 bg-zinc-300 dark:bg-zinc-600 rounded" />
      </div>
    ))}
</div>

  )
}

export default ActionButtonSkeleton
