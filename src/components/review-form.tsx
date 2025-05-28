/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useRef, useState } from 'react';

export default function ReviewForm({ tmdbId}: { tmdbId: number; }) {
  const [rating, setRating] = useState<number>(0);
  const [content, setContent] = useState('');
  const [existing, setExisting] = useState(false);
  const existingRef= useRef(false);

  useEffect(() => {
    fetch(`/api/movies/review/${tmdbId}`)
      .then(res => res.json())
      .then(reviews => {
        const userReview = reviews.find((r: any) => r.isCurrentUser);
        if (userReview) {
          setRating(userReview.rating);
          setContent(userReview.content);
          setExisting(true);
          existingRef.current = true;
        }
      });
  }, [tmdbId]);

  const handleSubmit = async () => {
    console.log(existing);
    const res = await fetch('/api/movies/review', {
      method: existingRef.current ? 'PUT' : 'POST',
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
    <div className="bg-zinc-900 p-6 rounded-xl shadow-xl w-full max-w-2xl text-white">
      <h3 className="text-2xl font-bold mb-4">Your Review</h3>
      <div className="flex gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <button
            key={i}
            onClick={() => setRating(i)}
            className={`text-3xl transition-transform duration-200 ${i <= rating ? 'text-yellow-400' : 'text-gray-600'} hover:scale-125`}
          >
            ★
          </button>
        ))}
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full rounded-md p-3 bg-zinc-800 text-white border border-zinc-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Write something cool..."
        rows={4}
      />
      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white font-semibold shadow hover:scale-105 transition-transform"
      >
        {existing ? 'Update Review' : 'Submit Review'}
      </button>
    </div>
  );
}
