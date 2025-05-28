/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

export default function ReviewList({ tmdbId }: { tmdbId: number }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`/api/movies/review/${tmdbId}`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, [tmdbId]);

  return (
    <div className="mt-10 w-full max-w-3xl space-y-6">
      {reviews.length === 0 ? (
        <p className="text-gray-400 text-center">No reviews yet.</p>
      ) : (
        reviews.map((r: any) => (
          <div key={r.id} className="bg-zinc-800 p-5 rounded-xl shadow-md text-white flex gap-4 items-start">
            <Image
              src={r.imageUrl}
              alt="user"
              width={48}
              height={48}
              className="rounded-full object-cover border border-zinc-700"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white">{r.username}</div>
                  <div className="text-yellow-400">Rating: {r.rating}★</div>
                </div>
              </div>
              <p className="mt-2 text-gray-300">{r.content}</p>
              <div className="flex gap-4 mt-3 text-gray-500">
                <button className="flex items-center gap-1 hover:text-green-400 transition">
                  <ThumbsUp size={16} /> <span className="text-sm">Like</span>
                </button>
                <button className="flex items-center gap-1 hover:text-red-400 transition">
                  <ThumbsDown size={16} /> <span className="text-sm">Dislike</span>
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
