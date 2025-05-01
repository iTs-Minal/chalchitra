"use client";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { Menu, Moon, Search, Sun, XCircle } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

// import { motion } from "motion/react";

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [hideOnScroll, setHideOnScroll] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(window.scrollY > 1);

      if (currentScrollY > lastScrollY || currentScrollY > 1) {
        setHideOnScroll(true);
      } else {
        setHideOnScroll(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const sideMenuRef = useRef<HTMLUListElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => {
    setIsOpen(true);
    if (sideMenuRef.current) {
      sideMenuRef.current.style.transform = "translateX(-16rem)";
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    if (sideMenuRef.current) {
      sideMenuRef.current.style.transform = "translateX(16rem)";
    }
  };

  return (
    <nav
      className={`absolute md:sticky top-0 z-50 flex mx-auto justify-between bg-neutral-200 dark:bg-neutral-800 items-center transition-all duration-300 px-2 ${
        scrolled
          ? "md:py-1 rounded-full opacity-90 md:scale-90 md:w-[80%] md:top-4 backdrop-blur-lg"
          : "py-1 scale-100 w-[100%]"
      }`}
    >
      <div className="flex justify-center items-center gap-10">
        <div className="flex justify-center items-center gap-6 ml-4">
          <span
            onClick={openMenu}
            className={`${
              hideOnScroll ? "opacity-100" : "opacity-100"
            }`}
          >
            <Menu />
          </span>

          {isOpen && (
              <div className={`${
                scrolled
                  ? "flex absolute  items-center justify-center left-0 top-20 px-3 py-3 bg-neutral-200 dark:bg-zinc-900 h-20 bottom-0 w-130 z-50 transition duration-1000 rounded-full"
                  : "fixed items-center left-0 top-0 px-3 py-4 bg-neutral-200 dark:bg-zinc-900 bottom-0 w-70 z-50 h-screen transition ease-in duration-1000"
              } `}>
                <div
                  onClick={closeMenu}
                  className={`${scrolled?"top-0":"p-1 cursor-pointer left-50 absolute dark:hover:rounded-full dark:hover:text-white"}`}
                >
                  <span>
                    <XCircle size={28} className="w-10 hover:scale-110" />
                  </span>
                </div>
                <div className="flex items-center w-full h-full">
                  <ul
                    ref={sideMenuRef}
                    className={`${scrolled?"flex flex-row items-center justify-center w-full h-20":"flex flex-col items-center relative top-10 w-full h-full text-black dark:text-white transition-transform duration-500"}`}
                  >
                    <Link href="/home">
                    <li onClick={closeMenu} className="p-4 hover:scale-110 hover:text-yellow-400 transition duration-200 cursor-pointer rounded-lg">
                      Home
                    </li></Link>
                    <Link href="/home/movies"> <li onClick={closeMenu} className="p-4 hover:scale-110 hover:text-yellow-400 transition duration-200 cursor-pointer rounded-lg">
                      Movies
                    </li></Link>
                    <Link href="/home/tvshows">  <li onClick={closeMenu} className="p-4 hover:scale-110 hover:text-yellow-400 transition duration-200 cursor-pointer rounded-lg">
                      TV Shows
                    </li></Link>
                    <Link href="/home/topimdb">   <li onClick={closeMenu} className="p-4 hover:scale-110 hover:text-yellow-400 transition duration-200 cursor-pointer rounded-lg">
                      Top ImDB
                    </li></Link>
                    <li onClick={closeMenu} className="p-4 hover:scale-110 hover:text-yellow-400 transition duration-200 cursor-pointer rounded-lg">
                      Andriod App
                    </li>
                  </ul>
                </div>
              </div>
          )}

          {mounted && (
            <Image
              src={isDark ? "/logo-white.png" : "/logo-black.png"}
              alt="chalchitra-logo"
              loading="lazy"
              height={60}
              width={60}
            />
          )}
        </div>
        <form
          className={`hidden lg:flex items-center ml-10 transition-all duration-300 ${
            hideOnScroll ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <input
            type="text"
            placeholder="Search Keywords..."
            className="w-130 px-4 p-2 rounded-l-full border-solid-black bg-zinc-700 placeholder:text-white  text-white dark:bg-white/90 dark:text-black dark:placeholder:text-zinc-800 focus:placeholder:opacity-0 focus:outline-none"
          />
          <span className="bg-zinc-950 p-2 rounded-r-full text-white">
            <Search />
          </span>
        </form>
      </div>

      <div className="flex justify-center items-center gap-10 mr-10">
        {mounted&&(<div
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className={`flex items-center cursor-pointer transition-transform duration-500 ${
            isDark ? "rotate-180" : "rotate-0"
          }`}
        >
          {isDark ? (
            <Sun className="h-7 w-7 text-yellow-500 rotate-0 transition-all" />
          ) : (
            <Moon className="h-7 w-7 text-blue-500 rotate-0 transition-all" />
          )}
        </div>
      )}

        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-20 h-20",
                userButtonPopoverCard: "shadow-xl",
                userPreviewMainIdentifier: "font-semibold",
              },
            }}
          />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
