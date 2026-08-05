import React from "react";
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

// "In the News" — press coverage as a divided list (publication logo, headline,
// date), each row linking out. Self-fetches from the CMS and renders nothing
// when there are no articles.
export const PressSection = async () => {
  const articles = await getPress();
  if (!articles?.length) return null;

  return (
    <section className="bg-white text-black py-12 md:py-16">
      <div className="px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-black text-2xl md:text-3xl uppercase tracking-wide mb-6">
            In the News
          </h2>
          <ul className="max-w-3xl border-t border-black">
            {articles.map((a) => (
              <li key={a.url}>
                <a
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 py-4 border-b border-black cursor-pointer"
                >
                  {a.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={a.logo}
                      alt={a.outlet}
                      className="h-12 w-12 md:h-14 md:w-14 object-contain shrink-0"
                    />
                  ) : (
                    <span className="w-12 md:w-14 shrink-0 flex items-center font-black uppercase text-[10px] leading-tight">
                      {a.outlet}
                    </span>
                  )}
                  <span className="flex-1 min-w-0">
                    <span className="block font-semibold leading-snug group-hover:text-[#DC2626] transition-colors">
                      {a.headline}
                    </span>
                    {fmtDate(a.date) && (
                      <span className="block text-xs uppercase tracking-wide text-black/50 mt-1">
                        {fmtDate(a.date)}
                      </span>
                    )}
                  </span>
                  <span className="shrink-0 flex items-center gap-1 font-bold text-xs md:text-sm uppercase tracking-wide text-black/55 group-hover:text-[#DC2626] transition-colors">
                    <span className="hidden sm:inline">Read</span>
                    <span aria-hidden="true" className="text-base leading-none">
                      &#8599;
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
