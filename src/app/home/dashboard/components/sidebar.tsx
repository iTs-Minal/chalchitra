'use client';

import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import Image from 'next/image';

export function Sidebar() {
  const { user } = useUser();
  const [bio, setBio] = useState('This is your bio. You can edit it.');

  return (
    <div className="bg-white dark:bg-zinc-900 dark:text-white shadow-lg rounded-xl p-6 space-y-6 h-full">
      {/* Profile section */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative group">
          <Image
            src={user?.imageUrl ?? '/default-user.png'}
            alt="User"
            className="w-40 h-40 rounded-full border-4 border-indigo-500 shadow-md transition-transform group-hover:scale-105 duration-300"
            width={160}
            height={160}
          />
          <div className="absolute inset-0 rounded-full bg-black/10 group-hover:bg-black/20 transition-opacity duration-300" />
        </div>
        <h2 className="text-2xl font-bold text-center text-zinc-800 dark:text-white">
          {user?.fullName ?? 'User'}
        </h2>
      </div>

      {/* Bio section */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-center text-zinc-700 dark:text-zinc-300">
          Bio
        </label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Write something about yourself..."
          className="w-full min-h-[100px] bg-zinc-50 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-400 border border-zinc-300 dark:border-zinc-700 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>
    </div>
  );
}
