import React from "react";
import Image from "next/image";
import type { PressItem } from "@/lib/payload";
import { formatPressDate } from "@/lib/format";

interface PressCardProps {
  item: PressItem;
}

// The card view of a press item: photo thumbnail, outlet and date, headline,
// optional subheading, and a "Read" button. Used for featured articles on the
// homepage and for every item on /news. Without a photo, the thumbnail shows
// the outlet logo (or name), or a red "Press release" panel for our releases.
export const PressCard: React.FC<PressCardProps> = ({ item }) => {
  const date = formatPressDate(item.date);
  const isRelease = item.kind === "release";
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group grid md:grid-cols-[13rem_minmax(0,1fr)] md:items-center gap-4 md:gap-5 p-4 bg-white text-black border-2 border-black cursor-pointer"
    >
      <div
        className={`relative aspect-[2/1] md:aspect-[3/2] border-2 border-black ${isRelease ? "bg-[#DC2626]" : "bg-white"}`}
      >
        {item.image ? (
          <>
            <Image
              src={item.image}
              alt={item.imageAlt}
              fill
              sizes="(min-width: 768px) 208px, 100vw"
              className="object-cover object-center"
            />
            {item.imageCredit && (
              <span className="absolute bottom-0 right-0 bg-black/70 text-white/90 text-[9px] leading-none px-1 py-0.5">
                {item.imageCredit}
              </span>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-4">
            {item.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.logo}
                alt={item.outlet}
                loading="lazy"
                decoding="async"
                className="max-h-full max-w-full object-contain"
              />
            ) : (
              <span
                className={`font-black uppercase text-lg leading-tight text-center ${isRelease ? "text-white" : "text-black"}`}
              >
                {item.outlet}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <p className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-black/55">
          <span className="font-black text-[#DC2626]">{item.outlet}</span>
          {date && <span aria-hidden="true">·</span>}
          {date && <span>{date}</span>}
        </p>
        <h3 className="mt-2 font-black text-xl md:text-2xl leading-[1.05] uppercase group-hover:text-[#DC2626] transition-colors">
          {item.headline}
        </h3>
        {item.subheading && (
          <p className="mt-3 text-sm md:text-base leading-snug text-black/75">
            {item.subheading}
          </p>
        )}
        <span className="mt-4 self-start inline-flex items-center gap-1 bg-[#DC2626] group-hover:bg-black text-white font-black text-xs uppercase tracking-wider px-4 py-2 border-2 border-black transition">
          {isRelease ? "Read the release" : "Read the story"}
          <span aria-hidden="true" className="text-sm leading-none">
            &#8599;
          </span>
        </span>
      </div>
    </a>
  );
};
