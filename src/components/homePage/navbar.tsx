"use client";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { Menu, Moon, Search, Sun, XCircle } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { LampContainer } from "../ui/lamp";
import { motion } from "motion/react";

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

      if (currentScrollY > lastScrollY || currentScrollY > 10) {
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
      className={`sticky top-0 z-50 flex mx-auto justify-between bg-neutral-200 dark:bg-zinc-900 items-center transition-all duration-300 px-2 ${
        scrolled
          ? "py-1 rounded-full opacity-90 scale-90 w-[70%] top-4 backdrop-blur-lg"
          : "py-1 scale-100 w-[100%]"
      }`}
    >
      <div className="flex justify-center items-center gap-10">
        <div className="flex justify-center items-center gap-6 ml-4">
          <span
            onClick={openMenu}
            className={`${
              hideOnScroll ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <Menu />
          </span>

          {isOpen && (
            <div className={`${scrolled?"hidden" :"flex flex-col absolute items-center left-0 top-0 bottom-0 w-64 z-50 h-screen transition duration-1000"} `}>

            <LampContainer>
            
            <div
              onClick={closeMenu}
              className="p-1 cursor-pointer absolute right-6 top-6 dark:hover:rounded-full dark:hover:bg-slate-900/70 dark:hover:text-white"
            >
              <span><XCircle size={36} className="w-10" /></span>
            </div>
              <motion.h1
                initial={{ opacity: 0.5, y:10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1,
                  duration: 0.1,
                }}
                className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
                >
                Build lamps <br /> the right way
              </motion.h1>
            </LampContainer>
                </div>
          )}

          <Image
            src={isDark ? "/logo-white.png" : "/logo-black.png"}
            alt="chalchitra-logo"
            height={60}
            width={60}
          />
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
