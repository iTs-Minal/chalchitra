/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from 'react';

export default function ReviewList({ tmdbId }: { tmdbId: number }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`/api/movies/review/${tmdbId}`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, [tmdbId]);

  return (
    <div className="mt-8 w-full max-w-3xl space-y-4">
      {reviews.length === 0 ? (
        <p className="text-gray-400 text-center">No reviews yet.</p>
      ) : (
        reviews.map((r: any) => (
          <div key={r.id} className="bg-zinc-800 p-4 rounded shadow text-white">
            <div className="flex justify-between items-center mb-2">
              <div className="text-yellow-400 text-lg">{"★".repeat(r.rating)}</div>
              <div className="flex gap-2 text-sm text-gray-400">
                <span>👍 {r.likes}</span>
                <span>👎 {r.dislikes}</span>
              </div>
            </div>
            <p>{r.content}</p>
          </div>
        ))
      )}
    </div>
  );
}
