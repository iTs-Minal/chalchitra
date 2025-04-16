import Image from "next/image";
import React from "react";
import { Timeline } from "@/components/ui/timeline";

export function TimelineSection() {
  const data = [
    {
      title: "2024",
      content: (
        <div>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/dune-2.jpg"
              alt="startup template"
              width={500}
              height={500}
              loading="lazy"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] hover:scale-105 transition duration-150"
            />
            <Image
              src="/furiosa.jpg"
              alt="startup template"
              width={500}
              height={500}
              loading="lazy"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] hover:scale-105 transition duration-150"
            />
            <Image
              src="/civil-war.jpg"
              alt="startup template"
              width={500}
              height={500}
              loading="lazy"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] hover:scale-105 transition duration-150"
            />
            <Image
              src="/wild-robot.jpg"
              alt="startup template"
              width={500}
              height={500}
              loading="lazy"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] hover:scale-105 transition duration-150"
            />
          </div>
          <p className="text-neutral-800 font-outfit dark:text-neutral-200 text-xs md:text-sm font-normal mb-8 mt-8">
            2024 raised the bar with stunning visuals, deeper narratives, and
            massive box office returns. Sequels expanded beloved universes while
            original stories held their own. Audiences leaned into emotionally
            rich content, epic sci-fi adventures, and diverse voices from around
            the world.
          </p>
          <p className="text-neutral-800 font-outfit dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Big-budget blockbusters returned stronger, blending stunning visuals
            with emotionally resonant storytelling. Sequels expanded on iconic
            narratives, while filmmakers pushed boundaries with diverse,
            inclusive storytelling. Audiences embraced immersive
            experiences—from powerful sci-fi epics to thought-provoking social
            dramas—both in theaters and on streaming platforms.
          </p>
        </div>
      ),
    },
    {
      title: "2023",
      content: (
        <div>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/oppenheimer.jpg"
              alt="hero template"
              width={500}
              height={500}
              loading="lazy"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] hover:scale-105 transition duration-150"
            />
            <Image
              src="/barbie.jpg"
              alt="feature template"
              width={500}
              height={500}
              loading="lazy"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] hover:scale-105 transition duration-150"
            />
            <Image
              src="/creator.jpg"
              alt="bento template"
              width={500}
              height={500}
              loading="lazy"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] hover:scale-105 transition duration-150"
            />
            <Image
              src="/flower-moon.jpg"
              alt="cards template"
              width={500}
              height={500}
              loading="lazy"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] hover:scale-105 transition duration-150"
            />
          </div>
          <p className="text-neutral-800 font-outfit dark:text-neutral-200 text-xs md:text-sm font-normal mb-8 mt-8">
            2023 was all about unexpected hits and the rise of fresh
            storytelling. From breakout indie successes to bold biopics and
            franchise reboots, the year reignited audience excitement in
            theaters. Streaming also played a huge role, making global cinema
            more accessible than ever.
          </p>
          <p className="text-neutral-800 font-outfit dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            While legacy franchises continued to draw crowds, it was the
            original stories, genre-bending thrillers, and emotional indie
            dramas that truly captured attention. Streaming platforms
            flourished, bringing global cinema into living rooms and expanding
            the reach of international films.
          </p>
        </div>
      ),
    },
    {
      title: "Most Watched Recently",
      content: (
        <div>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/dune-2b.jpg"
              alt="hero template"
              width={500}
              height={500}
              loading="lazy"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] hover:scale-105 transition duration-150"
            />
            <Image
              src="/sucession.jpg"
              alt="feature template"
              width={500}
              height={500}
              loading="lazy"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] hover:scale-105 transition duration-150"
            />
            <Image
              src="/eternal-sunshine.jpg"
              alt="bento template"
              width={500}
              height={500}
              loading="lazy"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] hover:scale-105 transition duration-150"
            />
            <Image
              src="/intersteller.jpg"
              alt="cards template"
              width={500}
              height={500}
              loading="lazy"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] hover:scale-105 transition duration-150"
            />
          </div>
          <p className="text-neutral-800 font-outfit dark:text-neutral-200 text-sm md:text-sm font-normal mb-4 mt-8">
            Over these two years, the global audience leaned into stories that
            offered both scale and heart. Films that explored emotional depth,
            character growth, and relatable struggles were among the most
            watched. Meanwhile, high-stakes action, fantasy world-building, and
            well-known franchises maintained a stronghold in theaters.
          </p>
          <p className="text-neutral-800 font-outfit  dark:text-neutral-200 text-sm md:text-sm font-normal mb-4">
            Animated films continued to dominate family viewing, while
            international cinema—particularly from South Asia and East Asia—saw
            a surge in worldwide popularity, bringing new narratives to global
            attention. Additionally, socially reflective dramas and
            thought-provoking thrillers gained traction, especially on streaming
            platforms, indicating a more curious and emotionally invested
            audience than ever before.
          </p>
        </div>
      ),
    },
  ];
  return (
    <div className="w-100%">
      <Timeline data={data} />
    </div>
  );
}
