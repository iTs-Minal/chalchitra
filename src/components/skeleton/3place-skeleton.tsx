import React from 'react'

const PlaceSkeleton = () => {
  return (
<div className="flex p-3 rounded-lg shadow-sm animate-pulse dark:bg-zinc-900">
  {/* Image skeleton */}
  <div className="w-24 h-30 bg-zinc-700 rounded-md" />

  {/* Text skeletons */}
  <div className="ml-4 flex flex-col space-y-2 w-full">
    {/* Rating and language badges */}
    <div className="flex items-center space-x-3">
      <div className="h-4 w-12 bg-zinc-700 rounded" />
      <div className="h-4 w-8 bg-zinc-700 rounded" />
    </div>

    {/* Title */}
    <div className="h-5 w-2/3 bg-zinc-700 rounded" />

    {/* Description */}
    <div className="h-4 w-full bg-zinc-700 rounded" />
    <div className="h-4 w-5/6 bg-zinc-700 rounded" />
  </div>
</div>

  )
}

export default PlaceSkeleton;
