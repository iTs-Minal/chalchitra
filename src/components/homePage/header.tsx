import { Github, Instagram, Linkedin, Star, Twitter } from "lucide-react";
import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row w-full pt-2 bg-zinc-100 dark:bg-zinc-900 px-2 md:gap-2">
      {/* movie slider */}
      <div className="w-full md:w-full h-[500px] relative max-w-4xl">
        <Image
          src="/dune-2b.jpg"
          alt="Dune 2"
          width={400}
          height={100}
          className="w-full h-[500px] inset-0 absolute aspect-square max-w-4xl object-cover mx-auto shadow-lg "
        />
        <div className="flex flex-col justify-start w-full top-82 p-6 text-white relative z-20 bg-gradient-to-b from-zinc-700/95 via-zinc-800/95 to-zinc-950 ">
          <h2 className="text-4xl font-bold text-left">{"Movie Title"}</h2>
          <div className="flex items-center space-x-2 mt-4 gap-6">
            <span className="text-yellow-400 flex items-center">
              <Star className="mr-1 text-yellow-400" />
              {10}
            </span>
            <span className="bg-gray-700 px-2 py-1 rounded">{`NP`}</span>
          </div>
          <p className="mt-4 text-sm text-white line-clamp-2 text-left">
            {`first rule of fight club is that you don't talk about fight club`}
          </p>
        </div>
      </div>

      {/* random 3 movies */}
      <div className="w-full md:w-[40%] flex flex-col space-y-6 p-3 cursor-pointer">
        <div className="flex p-3 rounded-lg shadow-md hover:scale-105 transition duration-100 dark:bg-zinc-800">
          <Image
            className="w-20 h-24 object-cover rounded"
            src="/dune-2.jpg"
            // TMDB image URL
            alt={"Movie title"}
            width={80}
            height={120}
          />
          <div className="ml-4 text-black dark:text-white">
            <div className="flex items-center space-x-2">
              <span className="text-yellow-400 flex items-center">
                <Star className="mr-1" /> {`10`}
              </span>
              <span className="bg-gray-700 px-2 py-1 rounded text-white">
                {"NP"}
              </span>
            </div>
            <h3 className="text-[18px] font-semibold mt-1 line-clamp-1">
              {"Movie Title"}
            </h3>
            <p className="text-[13px] text-gray-900 dark:text-white line-clamp-2">
              {`first ule of fight club is that you dont talk about fight club`}
            </p>
          </div>
        </div>

        <div className="flex p-3 rounded-lg shadow-md hover:scale-105 transition duration-100 dark:bg-zinc-800">
          <Image
            className="w-20 h-24 object-cover rounded"
            src="/dune-2.jpg"
            // TMDB image URL
            alt={"Movie title"}
            width={80}
            height={120}
          />
          <div className="ml-4 text-black dark:text-white">
            <div className="flex items-center space-x-2">
              <span className="text-yellow-400 flex items-center">
                <Star className="mr-1" /> {`10`}
              </span>
              <span className="bg-gray-700 px-2 py-1 rounded text-white">
                {"NP"}
              </span>
            </div>
            <h3 className="text-[18px] font-semibold mt-1 line-clamp-1">
              {"Movie Title"}
            </h3>
            <p className="text-[13px] text-gray-900 dark:text-white line-clamp-2">
              {`first ule of fight club is that you dont talk about fight club`}
            </p>
          </div>
        </div>

        <div className="flex p-3 rounded-lg shadow-md hover:scale-105 transition duration-100 dark:bg-zinc-800">
          <Image
            className="w-20 h-24 object-cover rounded"
            src="/dune-2.jpg"
            // TMDB image URL
            alt={"Movie title"}
            width={80}
            height={120}
          />
          <div className="ml-4 text-black dark:text-white">
            <div className="flex items-center space-x-2">
              <span className="text-yellow-400 flex items-center">
                <Star className="mr-1" /> {`10`}
              </span>
              <span className="bg-gray-700 px-2 py-1 rounded text-white">
                {"NP"}
              </span>
            </div>
            <h3 className="text-[18px] font-semibold mt-1 line-clamp-1">
              {"Movie Title"}
            </h3>
            <p className="text-[13px] text-gray-900 dark:text-white line-clamp-2">
              {`first ule of fight club is that you dont talk about fight club`}
            </p>
          </div>
        </div>
      </div>

      {/* social */}

      <div className="w-full md:w-[10%] flex flex-row justify-center md:flex-col md:items-center gap-6 p-4 text-black dark:text-white">
        {[
          { icon: Twitter, name: "Twitter" },
          { icon: Instagram, name: "Instagram" },
          { icon: Github, name: "GitHub" },
          { icon: Linkedin, name: "LinkedIn" },
        ].map((social, index) => (
          <button
            key={index}
            className="flex items-center flex-row  p-2 rounded"
          >
            <social.icon className="text-4xl hover:scale-125 transition duration-100" />
          </button>
        ))}
      </div>
      </div>
  );
};

export default Header;
