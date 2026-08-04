import React from "react";
import { SwipeCarousel } from "@/components/SwipeCarousel";
import { getPress } from "@/lib/payload";

const fmtDate = (iso: string): string => {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ""
    : new Intl.DateTimeFormat("en-US", {
        month: "short",
        year: "numeric",
      }).format(d);
};

// "In the News" — press coverage on a black band, swipeable like the On the
// Ground photo strip. Self-fetches from the CMS and renders nothing when there
// are no articles.
export const PressSection = async () => {
  const articles = await getPress();
  if (!articles?.length) return null;

  return (
    <section className="bg-black text-white py-12 md:py-16">
      <div className="px-6 md:px-10 mb-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-black text-2xl md:text-3xl uppercase tracking-wide">
            In the News
          </h2>
        </div>
      </div>

      <SwipeCarousel tone="light" gapClassName="gap-4" ariaLabel="Press coverage">
        {articles.map((a) => (
          <a
            key={a.url}
            href={a.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 snap-start w-72 md:w-80 bg-white text-black border-2 border-black hover:border-[#DC2626] transition-colors p-5 flex flex-col cursor-pointer"
          >
            {a.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={a.logo}
                alt={a.outlet}
                className="h-8 md:h-10 w-auto object-contain self-start mb-4"
              />
            ) : (
              <p className="font-black uppercase tracking-wide text-base mb-4">
                {a.outlet}
              </p>
            )}
            <h3 className="font-black text-lg leading-tight mb-3">
              {a.headline}
            </h3>
            <p className="mt-auto text-xs uppercase tracking-wide text-black/60">
              {a.outlet}
              {fmtDate(a.date) ? ` · ${fmtDate(a.date)}` : ""}
            </p>
          </a>
        ))}
      </SwipeCarousel>
    </section>
  );
};
