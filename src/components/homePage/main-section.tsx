import React from "react";
import { TracingBeam } from "../ui/tracing-beam";
import { IconLine } from "@tabler/icons-react";
import { FilmIcon, TvIcon } from "lucide-react";

const MainSection = () => {
  return (
    <main className="flex flex-col items-center justify-center px-2 mt-5">
      <div className="flex flex-col w-full items-center mt-5">
        <p className="text-md font-bold text-black dark:text-white font-kanit">
          Are you looking for the best site for watching movies online? A site
          that is not only free but also safe? If yes, search no more, you are
          at the right place. DopeBox allows users to watch thousands of movies
          and TV shows in HD quality. You are completely safe on the site as we
          do not have any ads or require any registration. Although we are free
          of charge, our quality is on the same par with that of paid streaming
          services. Our content library is huge with dozens of thousands of
          titles and our features are excellent. Only on DopeBox can you watch
          your favorite movies seamlessly with no buffering, lagging, redirects,
          and pop ups. We also update new titles on a daily basis so rest
          assured, fun never ends on DopeBox. Your complete satisfaction is our
          ultimate goal; therefore, do not hesitate to contact us should you
          have any issues, inquiries, or requests regarding the site.
        </p>
      </div>
      <div className="flex flex-col w-full mt-30 px-2">
        <TracingBeam className="flex flex-col w-full h-auto">

          {/* -----trensding section----- */}
          <div className="flex flex-col w-full h-screen cursor-pointer">
            <div className="flex gap-6 items-center">
              <IconLine />
              <span className="font-lilita text-3xl">Trending</span>
              <div className="flex gap-4 items-center">
                <span className="flex items-center text-sm font-kanit gap-2 bg-zinc-800 text-gray-200 p-1 rounded hover:scale-95 transition duation-300">
                  {" "}
                  <span>
                    <FilmIcon />
                  </span>
                  Movies
                </span>
                <span className="flex items-center text-sm font-kanit gap-2 bg-zinc-800 text-gray-200 p-1 rounded hover:scale-95 transition duation-300">
                  <span>
                    <TvIcon />
                  </span>{" "}
                  TV Shows
                </span>
              </div>
            </div>
            <div>Trending movies and tvshow both option goes here</div>
          </div>


{/* -----movies section------- */}
          <div className="flex flex-col w-full h-screen ">
            <div className="flex gap-5 items-center">
              <IconLine />
              <span className="font-lilita text-3xl">Latest Movies</span>
              <FilmIcon />
            </div>
            <div>movie card goes here</div>
          </div>
{/* -----tv show section---- */}
          <div className="flex flex-col w-full h-screen cursor-pointer">
            <div className="flex gap-5 items-center">
              <IconLine />
              <span className="font-lilita text-3xl">Latest Tv Shows</span>
              <TvIcon />
            </div>
            <div>tvshow card goes here</div>
          </div>



{/* ----upcoming section---- */}
          <div className="flex flex-col w-full h-screen cursor-pointer">
            <div className="flex gap-5 items-center">
              <IconLine />
              <span className="font-lilita text-3xl">Upcoming</span>
              <FilmIcon />
            </div>
            <div>upcoming card goes here</div>
          </div>
        </TracingBeam>
      </div>
    </main>
  );
};

export default MainSection;
