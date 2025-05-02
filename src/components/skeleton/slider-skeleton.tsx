import React from 'react'

const SliderSkeleton = () => {
  return (
    <div className="w-full md:w-full h-[500px] relative max-w-4xl animate-pulse">
    {/* Image Skeleton */}
    <div className="w-full h-full bg-zinc-800 rounded-lg shadow-lg" />

    {/* Content Skeleton */}
    <div className="flex flex-col justify-start w-full p-6 text-white absolute bottom-0 z-20 bg-gradient-to-b from-zinc-700/90 via-zinc-800/90 to-zinc-950">
      <div className="h-8 bg-zinc-700 w-2/3 rounded mb-4" /> {/* Title */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="h-6 w-12 bg-zinc-700 rounded" /> {/* Rating */}
        <div className="h-6 w-16 bg-zinc-700 rounded" /> 
        <div className="h-6 w-16 bg-zinc-700 rounded" /> {/* Language */}
      </div>
      <div className="h-4 w-full bg-zinc-700 rounded mb-2" />
      <div className="h-4 w-3/4 bg-zinc-700 rounded" />
    </div>
  </div>
  )
}

export default SliderSkeleton
