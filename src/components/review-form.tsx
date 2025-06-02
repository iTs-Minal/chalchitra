'use client';

import { useEffect, useRef, useState } from 'react';
import { Star } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ReviewForm({
  tmdbId,
  mediaType,
}: {
  tmdbId: number;
  mediaType: 'movie' | 'tv';
}) {
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

    const apiUrl =
      mediaType === 'movie'
        ? '/api/movies/review/me'
        : '/api/tvshows/review/me';

    fetch(`${apiUrl}?tmdbId=${tmdbId}`)
      .then((res) => res.json())
      .then((userReview) => {
        if (userReview) {
          setRating(userReview.rating);
          setContent(userReview.content);
          setExisting(true);
          existingRef.current = true;
        }
      });
  }, [tmdbId, mediaType]);

  const handleSubmit = async () => {
    if (rating <= 0) {
toast.error('Please select a rating');
      return;
    }

    const apiUrl =
      mediaType === 'movie' ? '/api/movies/review' : '/api/tvshows/review';
    const res = await fetch(apiUrl, {
      method: existingRef.current ? 'PUT' : 'POST',
      body: JSON.stringify({ tmdbId, rating, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      toast.error('Error submitting review');
      return;
    }

   toast.success(existing ? 'Review updated' : 'Review submitted');
  };

 const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      const full = i;
      const half = i - 0.5;
      const value = hoverRating ?? rating;

      let fillType: 'empty' | 'half' | 'full' = 'empty';
      if (value >= full) fillType = 'full';
      else if (value >= half) fillType = 'half';

      stars.push(
        <button
          key={i}
          onClick={(e) => {
            const { left, width } = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - left;
            const selected = x < width / 2 ? i - 0.5 : i;
            setRating(selected);
          }}
          onMouseMove={(e) => {
            const { left, width } = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - left;
            const hover = x < width / 2 ? i - 0.5 : i;
            setHoverRating(hover);
          }}
          onMouseLeave={() => setHoverRating(null)}
          className="relative w-10 h-10 text-5xl cursor-pointer"
        >
          {fillType === 'full' && (
            <Star className="text-yellow-400 fill-yellow-400 w-full h-full" />
          )}
          {fillType === 'half' && (
            <div className="relative w-full h-full">
              <Star className="absolute text-yellow-400 fill-yellow-400 w-full h-full clip-half-left" />
              <Star className="absolute text-gray-600 w-full h-full" />
            </div>
          )}
          {fillType === 'empty' && (
            <Star className="text-gray-600 w-full h-full" />
          )}
        </button>
      );
    }

    return (
      <div className="flex gap-2 mb-4">
        {stars}
        <style jsx>{`
          .clip-half-left {
            clip-path: inset(0 50% 0 0);
          }
        `}</style>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 p-8 rounded-2xl shadow-2xl w-full max-w-3xl text-white">
      <h3 className="text-3xl font-bold mb-6 text-center">Leave Your Review</h3>

      <div className="flex flex-col items-center mb-4">{renderStars()}</div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full rounded-lg p-4 bg-zinc-800 text-white border border-zinc-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
        placeholder="What did you think about it?"
        rows={5}
      />

      <button
        onClick={handleSubmit}
        className="mt-6 bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl text-white text-lg font-semibold shadow-lg hover:scale-105 transition-transform w-full"
      >
        {existing ? 'Update Review' : 'Submit Review'}
      </button>
    </div>
  );
}
