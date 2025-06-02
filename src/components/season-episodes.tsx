/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface SeasonEpisodesProps {
  tvId: number; 
  seasons: any[];
}

const SeasonEpisodes = ({ tvId, seasons }: SeasonEpisodesProps) => {
  const [selectedSeason, setSelectedSeason] = useState(seasons[0]?.season_number || 1);
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchSeason = async () => {
      setLoading(true);

      try {
        const res = await fetch(`/api/season?tvId=${tvId}&seasonNumber=${selectedSeason}`);
        const data = await res.json();
        if (res.ok) {
          setEpisodes(data.episodes || []);
        } else {
          console.error('Error fetching season data', data);
        }
      } catch (error) {
        console.error('Failed to fetch season data', error);
      }

      setLoading(false);
    };

    fetchSeason();
  }, [selectedSeason, tvId]);

  return (
    <div className="text-white space-y-6">
      {/* Dropdown */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Select Season:</label>
        <select
          className="bg-zinc-800 text-white px-4 py-2 rounded-md border border-zinc-600"
          value={selectedSeason}
          onChange={(e) => setSelectedSeason(Number(e.target.value))}
        >
          {seasons.map((season) => (
            <option key={season.id} value={season.season_number}>
              {season.name}
            </option>
          ))}
        </select>
      </div>

      {/* Loading State */}
      {loading && <div>Loading...</div>}

      {/* Episodes */}
      <div className="overflow-x-auto flex gap-6 pb-4">
        {episodes.map((episode) => (
          <div key={episode.id} className="w-[200px] flex-shrink-0 space-y-2">
            <Image
              src={
                episode.still_path
                  ? `https://image.tmdb.org/t/p/w300${episode.still_path}`
                  : '/no-image.jpg'
              }
              alt={episode.name}
              width={200}
              height={112}
              className="rounded-lg"
            />
            <h3 className="text-sm font-medium text-center">{episode.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeasonEpisodes;
