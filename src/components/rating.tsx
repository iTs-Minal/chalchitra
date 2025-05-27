'use client';
import { useState } from 'react';

const starLabels = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

export default function Rating({ tmdbId }: { tmdbId: number }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const handleRating = async (value: number) => {
    setSelected(value);
    // API call to save rating
    await fetch('/api/movies/rated', {
      method: 'POST',
      body: JSON.stringify({ tmdbId, rating: value }),
      headers: { 'Content-Type': 'application/json' },
    });
  };

  return (
    <div className="flex items-center gap-2 select-none">
      {[...Array(5)].map((_, i) => {
        const starValue = i + 1;
        const isActive = selected !== null ? starValue <= selected : false;
        const isHovered = hovered !== null ? starValue <= hovered : false;

        return (
          <div key={starValue} className="relative group">
            <input
              type="radio"
              name="rating"
              id={`star-${starValue}`}
              className="sr-only"
              onChange={() => handleRating(starValue)}
            />
            <label
              htmlFor={`star-${starValue}`}
              onMouseEnter={() => setHovered(starValue)}
              onMouseLeave={() => setHovered(null)}
              className={`
                cursor-pointer
                text-4xl
                transition-colors duration-300 ease-in-out
                ${
                  isHovered
                    ? 'text-yellow-400 scale-110'
                    : isActive
                    ? 'text-yellow-500'
                    : 'text-gray-400 hover:text-yellow-300'
                }
                transform
                origin-center
                group-focus-visible:outline-none
                group-focus-visible:ring-2
                group-focus-visible:ring-yellow-400
                group-focus-visible:ring-offset-1
                `}
              style={{ userSelect: 'none' }}
              title={starLabels[i]}
            >
              ★
            </label>
          </div>
        );
      })}
      {selected && (
        <span className="ml-3 text-yellow-500 font-semibold select-none">
          {starLabels[selected - 1]}
        </span>
      )}
    </div>
  );
}
