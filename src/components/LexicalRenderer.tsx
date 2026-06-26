import React from "react";
import { DollarBill } from "@/components/MoneyTree";

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
          <h3 key={key} className="text-base md:text-lg uppercase tracking-wider font-black mb-3">
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
      const fields = (node.fields as { blockType?: string; count?: number; note?: string }) || {};
      if (fields.blockType === "moneyBags") {
        const count = Math.max(1, Math.min(200, fields.count ?? 1));
        return (
          <div key={key} className="my-6">
            <div className="flex flex-wrap gap-1.5 max-w-2xl">
              {Array.from({ length: count }).map((_, idx) => (
                <span key={idx} className="w-7 md:w-8">
                  <DollarBill />
                </span>
              ))}
            </div>
            {fields.note && (
              <p className="text-xs opacity-60 mt-2">{fields.note}</p>
            )}
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
