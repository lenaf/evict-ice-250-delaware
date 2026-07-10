"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Section, type SectionVariant } from "@/components/Section";
import { FactsReadNext } from "@/components/FactsReadNext";
import { SectionHeading } from "@/components/SectionHeading";
import { WealthHero } from "@/components/WealthHero";
import { PowerMap, type AreaInfo } from "@/components/PowerMap";
import { LexicalRenderer, type SerializedRichText } from "@/components/LexicalRenderer";
import type { FamilyData } from "@/lib/payload";
import type { FilterType } from "@/types/affiliation";

// Loosely-typed section block (shapes come from the Pages collection / payload-types).
interface SectionBlock {
  blockType: string;
  id?: string;
  sectionVariant?: SectionVariant;
  hero?: boolean;
  borderTop?: boolean;
  content?: SerializedRichText;
  // imageBlock
  heading?: string;
  body?: SerializedRichText;
  image?: { url?: string; alt?: string; width?: number; height?: number } | string | null;
  caption?: string;
  sourceLabel?: string;
  sourceHref?: string;
  // factsReadNextBlock
  title?: string;
  description?: string;
  href?: string;
  // ctaButtonsBlock
  intro?: SerializedRichText | string;
  buttons?: { id?: string; label: string; href: string; style?: "primary" | "outline" }[];
  // wealthHeroBlock / powerMapBlock
  question?: string;
  familyName?: string;
  familyKey?: string;
  lede?: SerializedRichText;
  areas?: Partial<Record<FilterType, SerializedRichText>>;
}

const borderClass = (on?: boolean) => (on ? "border-t border-white/10" : "");

export function RenderSections({
  sections,
  familyData,
}: {
  sections: SectionBlock[];
  familyData?: Partial<Record<string, FamilyData>>;
}) {
  return (
    <>
      {sections.map((s, i) => {
        const key = s.id ?? i;
        switch (s.blockType) {
          case "richTextSection":
            return (
              <Section
                key={key}
                variant={s.sectionVariant ?? "black"}
                hero={s.hero}
                className={borderClass(s.borderTop)}
              >
                <LexicalRenderer content={s.content} />
              </Section>
            );

          case "imageBlock":
            return (
              <Section
                key={key}
                variant={s.sectionVariant ?? "blue"}
                className={borderClass(s.borderTop)}
              >
                {s.heading && <h2 className="type-section mb-6">{s.heading}</h2>}
                <div className="md:flex md:gap-14 md:items-start">
                  <div className="md:flex-1">
                    <LexicalRenderer content={s.body} />
                  </div>
                  {s.image && typeof s.image === "object" && s.image.url && (
                    <div className="mt-8 md:mt-0 md:w-[260px] lg:w-[300px] shrink-0">
                      <div className="bg-white p-3 border-2 border-white">
                        <Image
                          src={s.image.url}
                          alt={s.image.alt ?? ""}
                          width={s.image.width ?? 680}
                          height={s.image.height ?? 400}
                          className="w-full h-auto"
                        />
                      </div>
                      {s.caption && (
                        <p className="font-light text-xs mt-2 leading-snug opacity-90">
                          {s.caption}
                        </p>
                      )}
                    </div>
                  )}
                </div>
                {s.sourceHref && (
                  <p className="font-light text-xs opacity-50 mt-4">
                    Source:{" "}
                    <a
                      href={s.sourceHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-[#DC2626] transition"
                    >
                      {s.sourceLabel ?? s.sourceHref}
                    </a>
                  </p>
                )}
              </Section>
            );

          case "ctaButtonsBlock":
            return (
              <Section
                key={key}
                variant={s.sectionVariant ?? "black"}
                className={borderClass(s.borderTop)}
              >
                {s.heading && (
                  <h2 className="text-3xl md:text-4xl lg:text-5xl normal-case mb-3">
                    {s.heading}
                  </h2>
                )}
                {typeof s.intro === "string" && s.intro && (
                  <p className="text-base md:text-lg mb-8">{s.intro}</p>
                )}
                {s.buttons && s.buttons.length > 0 && (
                  <div className="flex flex-col sm:flex-row gap-4">
                    {s.buttons.map((b, bi) => {
                      const cls = `font-black text-sm uppercase tracking-wider px-8 py-4 border-2 hover:opacity-80 transition cursor-pointer text-center ${
                        b.style === "outline"
                          ? "bg-transparent text-white border-white"
                          : "bg-[#DC2626] text-white border-[#DC2626]"
                      }`;
                      // Absolute URLs (e.g. the Action Network petition) open in a new tab.
                      return b.href.startsWith("http") ? (
                        <a
                          key={b.id ?? bi}
                          href={b.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cls}
                        >
                          {b.label}
                        </a>
                      ) : (
                        <Link key={b.id ?? bi} href={b.href} className={cls}>
                          {b.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </Section>
            );

          case "wealthHeroBlock": {
            const fd = familyData?.[s.familyKey ?? ""];
            return (
              <Section key={key} variant="black" hero>
                <WealthHero
                  question={s.question ?? ""}
                  family={s.familyName ?? ""}
                  lede={<LexicalRenderer content={s.lede} />}
                  people={fd?.heroPeople ?? []}
                />
              </Section>
            );
          }

          case "powerMapBlock": {
            const fd = familyData?.[s.familyKey ?? ""];
            const areas: Partial<Record<FilterType, AreaInfo>> = {};
            if (s.areas) {
              (Object.keys(s.areas) as FilterType[]).forEach((k) => {
                const rt = s.areas?.[k];
                if (rt?.root?.children?.length) {
                  areas[k] = { summary: <LexicalRenderer content={rt} /> };
                }
              });
            }
            return (
              <Section
                key={key}
                variant={s.sectionVariant ?? "black"}
                className={borderClass(s.borderTop)}
              >
                {s.heading && <SectionHeading>{s.heading}</SectionHeading>}
                <div className="mb-8">
                  <LexicalRenderer content={s.intro as SerializedRichText} />
                </div>
                {fd && (
                  <PowerMap
                    people={fd.people}
                    affiliations={fd.affiliations}
                    donations={fd.donations}
                    areas={areas}
                  />
                )}
              </Section>
            );
          }

          case "factsReadNextBlock":
            return (
              <FactsReadNext
                key={key}
                title={s.title ?? ""}
                description={s.description ?? ""}
                href={s.href ?? "#"}
              />
            );

          default:
            return null;
        }
      })}
    </>
  );
}
