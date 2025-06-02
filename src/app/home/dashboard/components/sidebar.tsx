'use client';

import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import Image from 'next/image';

export function Sidebar() {
  const { user } = useUser();
  const [bio, setBio] = useState('This is your bio. You can edit it.');

  return (
    <aside className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 rounded-xl shadow-lg p-6 max-w-md w-full mx-auto sm:mx-0
      flex flex-col items-center
      border border-transparent
      transition-shadow duration-300
      hover:shadow-xl
      h-full
    ">
      {/* Profile Image */}
      <div className="relative group mb-6">
        <Image
          src={user?.imageUrl ?? '/default-user.png'}
          alt="User profile picture"
          className="w-36 h-36 sm:w-40 sm:h-40 rounded-full border-4 border-indigo-600 shadow-lg transition-transform duration-300 group-hover:scale-105"
          width={160}
          height={160}
          priority
        />
        <div className="absolute inset-0 rounded-full bg-black/10 group-hover:bg-black/20 transition-opacity duration-300" />
      </div>

      {/* User Name */}
      <h2 className="text-2xl font-extrabold text-center mb-4 tracking-tight text-indigo-600 dark:text-indigo-400">
        {user?.fullName ?? 'Anonymous User'}
      </h2>

      {/* Bio Section */}
      <div className="w-full">
        <label
          htmlFor="bio"
          className="block mb-2 text-sm font-semibold text-center text-zinc-600 dark:text-zinc-400"
        >
          Bio
        </label>
        <textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Write something about yourself..."
          className="w-full min-h-[120px] rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800
          p-4 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 resize-none
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
          transition-shadow duration-200
          shadow-sm
          "
        />
      </div>
    </aside>
  );
}
