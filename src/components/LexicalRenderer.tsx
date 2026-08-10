import React from "react";
import Image from "next/image";
import { MoneyTree, type MoneySource } from "@/components/MoneyTree";

/**
 * Renders Payload Lexical rich-text JSON into React, styled to match the
 * facts-page typography. Supports the two editorial features we care about:
 *  - inline LINKS (rendered like the old SourceLink)
 *  - inline HIGHLIGHTS via TextStateFeature color marks (node.$.color):
 *      yellow  → text-[#FFD600]
 *      red     → text-[#DC2626]
 *      section → .highlight (auto-matches the Section variant)
 */

// Lexical text-format bitmask
const IS_BOLD = 1;
const IS_ITALIC = 2;

// Matches Section.tsx's variant palette — used by the inline dividerBlock.
const dividerColor = {
  black: "bg-black",
  blue: "bg-[#1E3A8A]",
  yellow: "bg-[#FFD600]",
  white: "bg-white",
  red: "bg-[#DC2626]",
};

// richButton/richImage: full-width in the flow by default, or a floated side
// column with text wrapping around it at a chosen fraction of the width.
const columnWidthClass: Record<string, string> = {
  "25%": "md:w-1/4",
  "33%": "md:w-1/3",
  "50%": "md:w-1/2",
  "66%": "md:w-2/3",
};

function embedWrapClass(layout?: string, columnWidth?: string): string {
  if (layout !== "column") return "";
  return `w-full md:float-right md:ml-10 md:mb-4 ${columnWidthClass[columnWidth ?? "33%"] ?? "md:w-1/3"}`;
}

interface LexNode {
  type: string;
  text?: string;
  format?: number | string;
  tag?: string;
  listType?: string;
  url?: string;
  fields?: { url?: string; newTab?: boolean; [k: string]: unknown };
  $?: { color?: string };
  children?: LexNode[];
  [k: string]: unknown;
}

export interface SerializedRichText {
  root?: { children?: LexNode[] };
}

function renderText(node: LexNode, key: number): React.ReactNode {
  let el: React.ReactNode = node.text ?? "";
  const fmt = typeof node.format === "number" ? node.format : 0;
  if (fmt & IS_ITALIC) el = <em>{el}</em>;

  const color = node.$?.color;
  let className = "";
  if (color === "yellow") className = "text-[#FFD600] font-bold";
  else if (color === "red") className = "text-[#DC2626] font-bold";
  else if (color === "section") className = "highlight";
  else if (fmt & IS_BOLD) className = "font-bold";

  if (className) el = <strong className={className}>{el}</strong>;
  return <React.Fragment key={key}>{el}</React.Fragment>;
}

function renderChildren(children?: LexNode[]): React.ReactNode {
  return children?.map((c, i) => renderNode(c, i));
}

function renderNode(node: LexNode, key: number): React.ReactNode {
  switch (node.type) {
    case "text":
      return renderText(node, key);

    case "linebreak":
      return <br key={key} />;

    case "link": {
      const url = node.fields?.url ?? node.url ?? "#";
      const newTab = node.fields?.newTab ?? true;
      return (
        <a
          key={key}
          href={url}
          {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="underline hover:text-[#DC2626] transition"
        >
          {renderChildren(node.children)}
        </a>
      );
    }

    case "heading": {
      const tag = (node.tag as "h1" | "h2" | "h3") || "h2";
      if (tag === "h1")
        return <h1 key={key} className="type-hero mb-6">{renderChildren(node.children)}</h1>;
      if (tag === "h3")
        return (
          <h3 key={key} className="text-base md:text-lg tracking-wider font-black mb-3">
            {renderChildren(node.children)}
          </h3>
        );
      return <h2 key={key} className="type-section mb-6">{renderChildren(node.children)}</h2>;
    }

    case "list": {
      const Tag = node.listType === "number" ? "ol" : "ul";
      return (
        <Tag key={key} className="space-y-3 text-base md:text-lg leading-relaxed mb-8 pl-4">
          {renderChildren(node.children)}
        </Tag>
      );
    }

    case "listitem":
      return (
        <li key={key} className="flex gap-3 items-start">
          <span
            className="inline-block w-2 h-2 shrink-0 mt-[0.5em]"
            style={{ backgroundColor: "var(--section-highlight)" }}
            aria-hidden="true"
          />
          <span>{renderChildren(node.children)}</span>
        </li>
      );

    case "block": {
      const fields = (node.fields as {
        blockType?: string;
        sources?: Array<{
          amount?: string;
          label?: string;
          payer?: string;
          bags?: number;
          recurring?: boolean;
          sourceLabel?: string;
          sourceHref?: string;
        }>;
        label?: string;
        href?: string;
        style?: "primary" | "outline";
        image?: { url?: string; alt?: string; width?: number; height?: number } | string;
        caption?: string;
        sourceLabel?: string;
        sourceHref?: string;
        layout?: "inline" | "column";
        columnWidth?: string;
        color?: keyof typeof dividerColor;
      }) || {};

      if (fields.blockType === "richButton") {
        const cls = `inline-block font-black text-sm uppercase tracking-wider px-8 py-4 border-2 hover:opacity-80 transition cursor-pointer text-center ${
          fields.style === "outline"
            ? "bg-transparent text-white border-white"
            : "bg-[#DC2626] text-white border-[#DC2626]"
        }`;
        const href = fields.href ?? "#";
        const external = /^https?:\/\//.test(href);
        return (
          <div key={key} className={`my-6 ${embedWrapClass(fields.layout, fields.columnWidth)}`}>
            <a
              href={href}
              className={cls}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {fields.label}
            </a>
          </div>
        );
      }

      if (fields.blockType === "richImage") {
        const image = fields.image;
        if (!image || typeof image !== "object" || !image.url) return null;
        const isColumn = fields.layout === "column";
        return (
          <div
            key={key}
            className={`my-8 ${isColumn ? "" : "max-w-md"} ${embedWrapClass(fields.layout, fields.columnWidth)}`}
          >
            <div className="bg-white p-3 border-2 border-white">
              <Image
                src={image.url}
                alt={image.alt ?? ""}
                width={image.width ?? 680}
                height={image.height ?? 400}
                className="w-full h-auto"
              />
            </div>
            {fields.caption && (
              <p className="font-light text-xs mt-2 leading-snug opacity-90">{fields.caption}</p>
            )}
            {fields.sourceHref && (
              <p className="font-light text-xs opacity-50 mt-2">
                Source:{" "}
                <a
                  href={fields.sourceHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-[#DC2626] transition"
                >
                  {fields.sourceLabel ?? fields.sourceHref}
                </a>
              </p>
            )}
          </div>
        );
      }

      if (fields.blockType === "dividerBlock") {
        return (
          <div
            key={key}
            aria-hidden="true"
            className={`my-6 h-[.5px] ${dividerColor[fields.color ?? "red"]}`}
          />
        );
      }

      if (fields.blockType === "moneyBags") {
        const sources: MoneySource[] = (fields.sources ?? []).map((s) => ({
          amount: s.amount ?? "",
          label: s.label ?? "",
          payer: s.payer ?? "",
          bags: s.bags ?? 1,
          recurring: s.recurring,
          source: s.sourceHref
            ? { href: s.sourceHref, label: s.sourceLabel ?? s.sourceHref }
            : undefined,
        }));
        return (
          <div key={key} className="my-8">
            <MoneyTree sources={sources} />
          </div>
        );
      }
      return null;
    }

    case "quote":
      return (
        <blockquote key={key} className="font-black text-lg md:text-xl leading-relaxed mb-6">
          {renderChildren(node.children)}
        </blockquote>
      );

    case "paragraph": {
      const children = node.children;
      if (!children || children.length === 0) return null;
      return (
        <p key={key} className="text-base md:text-lg leading-relaxed mb-4">
          {renderChildren(children)}
        </p>
      );
    }

    default:
      // Unknown / not-yet-supported node types (e.g. inline blocks added later)
      return node.children ? <React.Fragment key={key}>{renderChildren(node.children)}</React.Fragment> : null;
  }
}

export function LexicalRenderer({
  content,
}: {
  content: SerializedRichText | null | undefined;
}) {
  const children = content?.root?.children;
  if (!children?.length) return null;
  return <>{children.map((n, i) => renderNode(n, i))}</>;
}
