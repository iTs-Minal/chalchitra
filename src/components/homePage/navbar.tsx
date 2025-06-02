"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Menu, Moon, Search, Star, Sun, XCircle } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  
  const toggleMenu=()=>{
    setIsOpen(prev=>!prev)
  };

  const handleCloseMenu=()=>{
    setIsOpen(false);
  }


  const [query,setQuery]=useState("");
  interface Suggestion {
    id: string;
    title?: string;
    name?: string;
    first_air_date?: string;
    poster_path?:string
    vote_average?:number;
    original_language?:string;
    release_date?:string;
    media_type?: string;
  }

  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const router = useRouter();

  useEffect(()=>{
    const delayDebounce = setTimeout(()=>{
      if (query.length>1){
        fetch(`/api/search?query=${query}`)
        .then(res=>res.json())
        .then(data=>{
          setSuggestions(data.results.slice(0,5));
        });
      }else{
        setSuggestions([]);
      }
    },300);
    return()=> clearTimeout(delayDebounce);
  },[query])

 const handleSelect = (name:string)=>{
    router.push(`/search/${encodeURIComponent(name)}/page/1`);
    setSuggestions([]);
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      handleSelect(query);
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
        {/* ------------------------browse menu and logo------------------------------------ */}
        <div className="flex justify-center items-center gap-6 ml-4">
          <span
            onClick={toggleMenu}
            className={`${
              hideOnScroll ? "opacity-100" : "opacity-100"
            }`}
          >
            <Menu />
          </span>

          {isOpen && (
              <div className={`${
                scrolled
                  ? "flex absolute  items-center justify-center left-0 top-20 px-3 py-3 bg-neutral-200 dark:bg-zinc-900 h-20 bottom-0 w-auto z-50 transition duration-1000 rounded-full"
                  : "fixed items-center left-0 top-0 px-3 py-4 bg-neutral-200 dark:bg-zinc-900 bottom-0 w-70 z-50 h-screen transition ease-in duration-1000"
              } `}>
                <div
                  onClick={handleCloseMenu}
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
                    <li onClick={handleCloseMenu} className="p-4 hover:scale-110 hover:text-yellow-400 transition duration-200 cursor-pointer rounded-lg">
                      Home
                    </li></Link>
                    <Link href="/home/movies"> <li onClick={handleCloseMenu} className="p-4 hover:scale-110 hover:text-yellow-400 transition duration-200 cursor-pointer rounded-lg">
                      Movies
                    </li></Link>
                    <Link href="/home/tvshows">  <li onClick={handleCloseMenu} className="p-4 hover:scale-110 hover:text-yellow-400 transition duration-200 cursor-pointer rounded-lg">
                      TV Shows
                    </li></Link>
                    <Link href="/home/topimdb">   <li onClick={handleCloseMenu} className="p-4 hover:scale-110 hover:text-yellow-400 transition duration-200 cursor-pointer rounded-lg">
                      Top ImDB
                    </li></Link>
                    <li onClick={handleCloseMenu} className="p-4 hover:scale-110 hover:text-yellow-400 transition duration-200 cursor-pointer rounded-lg">
                      Andriod App
                    </li>
                    <Link href="/home/dashboard">   <li onClick={handleCloseMenu} className="p-4 hover:scale-110 hover:text-yellow-400 transition duration-200 cursor-pointer rounded-lg">
                      Dashboard
                    </li></Link>
                  </ul>
                </div>
              </div>
          )}

          {mounted && (
         <Link href="/home">   <Image
              src={isDark ? "/logo-white.png" : "/logo-black.png"}
              alt="chalchitra-logo"
              loading="lazy"
              height={60}
              width={60}
            /></Link>
          )}
        </div>

        {/* ----------------------------input and suggestion section----------------------------- */}
        <form onSubmit={handleSubmit}
          className={`hidden lg:flex items-center ml-10 transition-all duration-300 ${
            hideOnScroll ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <input
            type="text"
            placeholder="Search Keywords..."
            value={query}
            onChange={e => {
              const value = e.target.value;
              setQuery(value);
              if (value.trim() === '') {
                setSuggestions([]); // clear instantly
              }
            }}
            className="w-140 px-4 p-2 rounded-l-full border-solid-black bg-zinc-700 placeholder:text-white  text-white dark:bg-white/90 dark:text-black dark:placeholder:text-zinc-800 focus:placeholder:opacity-0 focus:outline-none"
          />
          <span onClick={() => handleSubmit(new Event('submit') as unknown as React.FormEvent<HTMLFormElement>)} className="bg-zinc-950 p-2 rounded-r-full text-white">
            <Search />
          </span>
        </form>
        {suggestions.length > 0 && (
        <ul className={`${scrolled?"hidden":" absolute z-10 bg-white top-13 left-53 mt-1 rounded shadow text-black w-140"}`}>
          {suggestions.map((item) => {
            const title = item.title || item.name || 'Unknown Title';

            const rating = item.vote_average?.toFixed(1) || 'N/A';
            const language = item.original_language?.toUpperCase() || 'N/A';
            const date = item.release_date?.slice(0, 4) || item.first_air_date?.slice(0, 4) || 'N/A';
            const media_type = item.media_type;
            return(
            <li
              key={item.id}
              className="p-2 hover:bg-gray-300  cursor-pointer"
              onClick={() =>
                handleSelect(item.title || item.name || 'unknown')
              }
            >
          <div className="flex flex-row gap-6 py-1 border-b-1 border-black">

                <div className="flex-1 gap-2 ">
                  <p className="font-medium font-kanit">{title}</p>
                  <div className="text-sm text-gray-600 mt-1 flex items-center">
                    <span className="pr-4 font-exo flex flex-row items-center gap-1 "><Star className="fill-yellow-500"/> {rating} </span> 
                    <div className="flex flex-row items-center gap-2">
                     <span className="bg-gray-700 text-white font-exo p-1 rounded-lg text-sm">{language}</span>
                      <span className="bg-gray-700 text-white font-exo p-1 rounded-lg text-sm">{media_type}</span> 
                      </div>
                      <span className="px-4 font-exo">{date}</span>
                  </div>
                </div> 
          </div>
            </li>
          )})}
        </ul>
      )}
      </div>

        {/* ---------------------light and dark mode and user button-------------------- */}
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
        <SignedOut>
        <SignInButton>
          <button className="btn-primary">Sign In</button>
        </SignInButton>
      </SignedOut>
      </div>
    </nav>
  );
};

export default Navbar;
