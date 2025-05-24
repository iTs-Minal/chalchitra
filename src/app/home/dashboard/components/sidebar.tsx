'use client';

import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import Image from 'next/image';

export function Sidebar() {
  const { user } = useUser();
  const [bio, setBio] = useState('This is your bio. You can edit it.');

  return (
    <div className=" bg-white dark:bg-zinc-900 dark:text-white shadow p-6 space-y-6 h-full">
      <div className="flex flex-col items-center space-y-3">
        <Image
          src={user?.imageUrl ?? '/default-user.png'}
          alt="User"
          className="w-40 h-40 rounded-full border-4 border-indigo-500 shadow-md"
          width={160}
          height={160}
        />
        <h2 className="text-xl font-semibold text-center">{user?.fullName ?? 'User'}</h2>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-zinc-600 dark:text-zinc-300 text-center">
          Bio
        </label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Write something about yourself..."
          className="w-full min-h-[100px] bg-zinc-100 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-400 border border-zinc-300 dark:border-zinc-700 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
}
