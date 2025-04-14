"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className="bg-zinc-100 dark:bg-black text-black dark:text-white border-t border-neutral-200 dark:border-neutral-800 mt-1">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center md:items-start gap-10">
        {/* Logo */}
        <div className="flex-shrink-0">
          {mounted && (
            <Image
              src={isDark ? "/logo-white.png" : "/logo-black.png"}
              alt="Chalchitra Logo"
              height={80}
              width={80}
              className="transition-all"
            />
          )}
        </div>

        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-10 text-center sm:text-left">
          {/* Options */}
          <div>
            <h2 className="text-xl font-semibold text-orange-500 mb-2">
              Explore
            </h2>
            <ul className="space-y-1 text-sm">
              <li className="hover:text-orange-400 transition cursor-pointer">Home</li>
              <li className="hover:text-orange-400 transition cursor-pointer">Movies</li>
              <li className="hover:text-orange-400 transition cursor-pointer">TV Shows</li>
              <li className="hover:text-orange-400 transition cursor-pointer">Top IMDb</li>
              <li className="hover:text-orange-400 transition cursor-pointer">Upcoming</li>
              <li className="hover:text-orange-400 transition cursor-pointer">Trending</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h2 className="text-xl font-semibold text-blue-500 mb-2">
              Connect
            </h2>
            <ul className="space-y-1 text-sm">
              <li className="hover:text-blue-400 transition cursor-pointer">Facebook</li>
              <li className="hover:text-blue-400 transition cursor-pointer">Twitter</li>
              <li className="hover:text-blue-400 transition cursor-pointer">Instagram</li>
              <li className="hover:text-blue-400 transition cursor-pointer">LinkedIn</li>
              <li className="hover:text-blue-400 transition cursor-pointer">GitHub</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-neutral-300 dark:border-neutral-700 text-sm py-4 text-center">
        <p>© {new Date().getFullYear()} <strong>Chalchitra</strong>. All rights reserved.</p>
        <p className="mt-1 text-neutral-500 dark:text-neutral-400">
          Made with ❤️ by Minal Pudasainee
        </p>
      </div>
    </footer>
  );
};

export default Footer;
