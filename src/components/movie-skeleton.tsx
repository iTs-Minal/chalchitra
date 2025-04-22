const MovieSkeleton = () => (
    <div className="w-[185px] h-90 bg-zinc-800 animate-pulse mt-5 mx-2 rounded-lg">
      <div className="w-full h-[260px] bg-zinc-700 rounded-t-lg" />
      <div className="p-2 flex  items-center justify-center flex-col gap-2">
        <div className="h-4 bg-zinc-600 rounded w-1/2 mb-1 mt-2" />
        <div className="h-3 bg-zinc-600 rounded w-3/4" />
      </div>
    </div>
  );

  export default MovieSkeleton;