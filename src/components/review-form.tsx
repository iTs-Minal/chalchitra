/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useRef, useState } from 'react';

export default function ReviewForm({ tmdbId, mediaType }: { tmdbId: number, mediaType: 'movie' | 'tv' }) {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [content, setContent] = useState('');
  const [existing, setExisting] = useState(false);
  const existingRef = useRef(false);

useEffect(() => {
setRating(0);
  setContent('');
  setExisting(false);
  existingRef.current = false;

  const apiUrl = mediaType === 'movie' ? '/api/movies/review/me' : '/api/shows/review/me';
  fetch(`${apiUrl}?tmdbId=${tmdbId}`)
    .then(res => res.json())
    .then(userReview => {
      if (userReview) {
        setRating(userReview.rating);
        setContent(userReview.content);
        setExisting(true);
        existingRef.current = true;
      }
    });
}, [tmdbId, mediaType]);

const handleSubmit = async () => {
if(rating <= 0) {
  alert('Please select a rating');
  return; 
}

  const apiUrl = mediaType === 'movie' ? '/api/movies/review' : '/api/shows/review';
  const res = await fetch(apiUrl, {
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

  const handleStarClick = (value: number) => {
    setRating(value);
  };


  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      const fullValue = i;
      const halfValue = i - 0.5;

      stars.push(
        <span key={halfValue} className="relative group">
          {/* Half Star */}
          <button
            onClick={() => handleStarClick(halfValue)}
            onMouseEnter={() => setHoverRating(halfValue)}
            onMouseLeave={() => setHoverRating(null)}
            className={`text-2xl absolute left-0 w-1/2 z-10 h-full ${
              (hoverRating ?? rating) >= halfValue ? 'text-yellow-400' : 'text-gray-600'
            }`}
          >
            ★
          </button>

          {/* Full Star */}
          <button
            onClick={() => handleStarClick(fullValue)}
            onMouseEnter={() => setHoverRating(fullValue)}
            onMouseLeave={() => setHoverRating(null)}
            className={`text-2xl w-full ${
              (hoverRating ?? rating) >= fullValue ? 'text-yellow-400' : 'text-gray-600'
            }`}
          >
            ★
          </button>
        </span>
      );
    }

    return <div className="flex gap-1 mb-4">{stars}</div>;
  };

  return (
    <div className="bg-zinc-900 p-6 rounded-xl shadow-xl w-full max-w-2xl text-white">
      <h3 className="text-2xl font-bold mb-4">Your Review</h3>

      {renderStars()}

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
