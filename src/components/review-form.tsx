/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from 'react';

export default function ReviewForm({ tmdbId }: { tmdbId: number }) {
  const [rating, setRating] = useState<number>(0);
  const [content, setContent] = useState('');
  const [existing, setExisting] = useState(false);

  useEffect(() => {
    fetch(`/api/movies/review/${tmdbId}`)
      .then(res => res.json())
      .then(reviews => {
        const userReview = reviews.find((r: any) => r.isCurrentUser);
        if (userReview) {
          setRating(userReview.rating);
          setContent(userReview.content);
          setExisting(true);
        }
      });
  }, [tmdbId]);

  const handleSubmit = async () => {
    const res = await fetch('/api/movies/review', {
      method: 'POST',
      body: JSON.stringify({ tmdbId, rating, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      alert('Error submitting review');
      return;
    }

    alert(existing ? 'Review updated' : 'Review submitted');
  };

  return (
    <div className="bg-zinc-900 p-4 rounded-xl shadow-lg w-full max-w-2xl text-white">
      <h3 className="text-2xl font-bold mb-3">Your Review</h3>
      <div className="flex gap-1 mb-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <button
            key={i}
            className={`text-2xl transition ${
              i <= rating ? 'text-yellow-400' : 'text-gray-600'
            } hover:scale-110`}
            onClick={() => setRating(i)}
          >
            ★
          </button>
        ))}
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full rounded p-2 bg-zinc-800 text-white border border-zinc-700"
        placeholder="Write something cool..."
        rows={4}
      />
      <button
        onClick={handleSubmit}
        className="mt-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
      >
        {existing ? 'Update Review' : 'Submit Review'}
      </button>
    </div>
  );
}
