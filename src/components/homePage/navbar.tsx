"use client";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { Menu, Moon, Search, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";


  const [hideOnScroll, setHideOnScroll] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(window.scrollY > 10);

      if (currentScrollY > lastScrollY && currentScrollY > 10) {
        setHideOnScroll(true);
      } else {
        setHideOnScroll(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`fixed top-0 z-50 flex mx-auto justify-between bg-white/90 dark:bg-zinc-900 items-center transition-all duration-300 shadow-md ${scrolled? "py-1 rounded-full scale-90 w-[70%] top-4 backdrop-blur-md" : "py-1 scale-100 w-[100%]"}`}>
      <div className="flex justify-center items-center gap-10">
        <div className="flex justify-center items-center gap-6 ml-4">
          <span className={`${hideOnScroll? "opacity-0 pointer-events-none":"opacity-100"}`}>
            <Menu />
          </span>
          <Image
            src="/logo-white.png"
            alt="logo-white"
            height={60}
            width={60}
          />
        </div>
        <form className={`hidden lg:flex items-center ml-10 transition-all duration-300 ${
            hideOnScroll ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}>
          <input
            type="text"
            placeholder="Search Keywords..."
            className="w-120 px-4 p-2 rounded-l-full border-solid-black bg-zinc-700 placeholder:text-white  text-white dark:bg-white/90 dark:text-black dark:placeholder:text-zinc-800 focus:placeholder:opacity-0 focus:outline-none"
          />
          <span className="bg-zinc-950 p-2 rounded-r-full text-white">
            <Search />
          </span>
        </form>
      </div>

      <div className="flex justify-center items-center gap-10 mr-10">
        <div
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
