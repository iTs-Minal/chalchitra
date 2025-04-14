"use client"
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Footer = () => {

  const {theme}=useTheme();
  const isDark= theme==="dark";

    const [mounted, setMounted] = useState(false);
  
    useEffect(() => {
      setMounted(true);
    }, []);
  

  return (
    <>
      <footer className="flex justify-between mx-8 p-5">
        <div>
         {mounted &&(
<Image
            src={isDark?"/logo-white.png":"/logo-black.png"}
            alt="logo"
            height={100}
            width={100}
            className="relative top-7"
          />
         )} 
         
        </div>
        <div className="flex flex-row gap-20">
          <div className="flex flex-col  items-center justify-center cursor-pointer">
            <h1 className="font-bold text-xl mb-1 text-orange-500">Options</h1>
            <p className="hover:text-orange-200">Home</p>
            <p className="hover:text-orange-200">Movies</p>
            <p className="hover:text-orange-200">Tv Shows</p>
            <p className="hover:text-orange-200">Top Imdb</p>
            <p className="hover:text-orange-200">Upcoming</p>
            <p className="hover:text-orange-200">Trending</p>
          </div>

          <div className="flex flex-col  items-center cursor-pointer">
            <h1 className="font-bold text-xl mb-1 text-blue-500">
              Social Media
            </h1>
            <div className="flex flex-col items-center justify-center">
              <span className="hover:text-blue-200">Facebook</span>
              <span className="hover:text-blue-200">Twitter</span>
              <span className="hover:text-blue-200">Instagram</span>
              <span className="hover:text-blue-200">LinkedIn</span>
              <span className="hover:text-blue-200">Github</span>
            </div>
          </div>
        </div>
      </footer>

      <h2 className="flex items-center justify-center">Chalchitra.com</h2>
      <p className="flex items-center justify-center">
        {new Date().getFullYear()} All rights reserved.
      </p>
      <p className="flex items-center justify-center">Created by Minal Pudasainee</p>
    </>
  );
};

export default Footer;
