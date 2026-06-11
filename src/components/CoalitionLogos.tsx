import React from "react";
import Image from "next/image";
import { SwipeCarousel } from "@/components/SwipeCarousel";

interface Sponsor {
  src: string;
  name: string;
  href: string;
  // Aspect hint so logos read at a consistent visual weight: square marks get a
  // taller cap, wide wordmarks a shorter one, and `large` a small bump.
  square?: boolean;
  large?: boolean;
}

const sponsors: Sponsor[] = [
  { src: "/sponsors/buffalo-united.png", name: "Buffalo Coalition United", href: "https://www.buffalounitedcoalition.org/", square: true },
  { src: "/sponsors/lwvbn.png", name: "League of Women Voters of Buffalo-Niagara", href: "https://www.lwvbn.org/" },
  { src: "/sponsors/burning-books.jpeg", name: "Burning Books", href: "https://www.burningbooks.com/", square: true },
  { src: "/sponsors/jfmf.webp", name: "Justice for Migrant Families WNY", href: "https://www.justiceformigrantfamilies.org/", square: true },
  { src: "/sponsors/justice-for-geraldine-martin.png", name: "Justice for Geraldine and Martin", href: "https://www.instagram.com/justiceforgeraldineandmartin/", square: true },
  { src: "/sponsors/liberate-buffalo-state.png", name: "Liberate Buffalo State", href: "https://www.instagram.com/liberate.buff.state/", square: true },
  { src: "/sponsors/ocb.png", name: "Our City Buffalo", href: "https://www.ourcitybuffalo.com/" },
  { src: "/sponsors/ocab.png", name: "Our City Action Buffalo", href: "https://www.ourcityactionbuffalo.com/" },
  { src: "/sponsors/ppg.png", name: "Partnership for the Public Good", href: "https://ppgbuffalo.org/", square: true },
  { src: "/sponsors/rootsaction.png", name: "RootsAction", href: "https://rootsaction.org/" },
  { src: "/sponsors/rose-jade.png", name: "Rose Jade Consulting", href: "https://www.rosejadeconsulting.com/" },
  { src: "/sponsors/surj-buffalo.png", name: "SURJ Buffalo", href: "https://surj.org/chapter/surj-buffalo/", square: true },
  { src: "/sponsors/ujima.png", name: "Ujima Company", href: "https://www.ujimacoinc.org/" },
  { src: "/sponsors/wny-peace-center.jpeg", name: "WNY Peace Center", href: "https://wnypeace.org/", square: true, large: true },
  { src: "/sponsors/wnycosh.jpeg", name: "WNYCOSH", href: "https://wnycosh.org/" },
  { src: "/sponsors/wny-bridge-brigade.png", name: "WNY Bridge Brigade", href: "https://wnybb.org/" },
  { src: "/sponsors/buffalo-dsa.webp", name: "Buffalo DSA", href: "https://buffalodsa.org/" },
  { src: "/sponsors/buffalo-niagara-lgbtq-history.png", name: "Buffalo Niagara LGBTQ History Project", href: "https://bflolgbtqhistoryproject.org/", square: true },
  { src: "/sponsors/colored-girls-bike-too.webp", name: "Colored Girls Bike Too", href: "https://www.instagram.com/coloredgirlsbiketoo/", square: true },
  { src: "/sponsors/nyic.png", name: "NYIC", href: "https://www.nyic.org/" },
  { src: "/sponsors/u-belong-coalition.png", name: "U-Belong Coalition", href: "https://www.instagram.com/ubelongcoalition/", large: true },
  { src: "/sponsors/buffalo-latino-village.png", name: "Buffalo Latino Village", href: "https://buffalolatinovillage.com/" },
  { src: "/sponsors/push-buffalo.png", name: "PUSH Buffalo", href: "https://www.pushbuffalo.org/", square: true },
  { src: "/sponsors/suny-buffalo-bds.jpeg", name: "SUNY Buffalo BDS", href: "https://www.instagram.com/sunybds_ub/", square: true },
  { src: "/sponsors/cooperation-buffalo.jpg", name: "Cooperation Buffalo", href: "https://www.cooperationbuffalo.org/", square: true },
  { src: "/sponsors/breadhive.jpg", name: "BreadHive", href: "https://www.breadhive.com/", large: true },
  { src: "/sponsors/little-peoples-victory.webp", name: "Little People's Victory", href: "https://www.littlepeoplesvictory.com/", square: true },
  { src: "/sponsors/king-urban-life-center.webp", name: "King Urban Life Center", href: "https://www.kingurbanlifecenter.org/" },
  { src: "/sponsors/jonathan-rivera.png", name: "Assemblymember Jon D. Rivera", href: "https://nyassembly.gov/mem/Jonathan-Rivera" },
  { src: "/sponsors/fitz-books.png", name: "Fitz Books & Waffles", href: "https://www.fitzbooks.net/", large: true },
  { src: "/sponsors/wnyea.jpg", name: "WNY Environmental Alliance", href: "https://www.wnyea.org/" },
  { src: "/sponsors/rights-of-nature-wny.png", name: "Rights of Nature WNY", href: "https://www.wnyea.org/rights-of-nature.html" },
  { src: "/sponsors/panys.webp", name: "Peace Action New York State", href: "https://www.panys.org/" },
];

// A swipeable row of partner logos. Layout/scroll/arrows come from SwipeCarousel.
export const CoalitionLogos: React.FC = () => (
  <SwipeCarousel tone="dark" ariaLabel="Coalition partners">
    {sponsors.map((sponsor) => (
      <a
        key={sponsor.name}
        href={sponsor.href}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 snap-start flex items-center justify-center h-20 md:h-24 hover:opacity-70 transition-opacity"
        title={sponsor.name}
      >
        <Image
          src={sponsor.src}
          alt={sponsor.name}
          width={140}
          height={140}
          className={`w-auto object-contain ${sponsor.large ? "max-h-14 md:max-h-16" : sponsor.square ? "max-h-12 md:max-h-14" : "max-h-9 md:max-h-11"}`}
        />
      </a>
    ))}
  </SwipeCarousel>
);
