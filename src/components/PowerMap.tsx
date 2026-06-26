"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import type {
  AffiliationCategory,
  AffiliationEntry,
  BioSegment,
  FilterType,
  Jurisdiction,
} from "@/types/affiliation";

export interface PowerMapPerson {
  id: string;
  name: string;
  shortName: string; // matches AffiliationEntry.person
  title: string;
  photo: string;
  bioParas: BioSegment[][];
}

// A donation edge: a family member → a politician/committee, labeled with $.
export interface PowerMapDonation {
  person: string; // matches PowerMapPerson.shortName
  recipient: string; // politician / committee name
  amount: string; // edge label, e.g. "$100,000"
  period?: string; // when the amount was given, e.g. "2016" or "since 1999"
  jurisdiction: Jurisdiction;
  detail?: string; // optional note shown in the modal
  href?: string;
  photo?: string; // optional headshot for the politician node
}

// Which filter "type" each org category maps to.
const CATEGORY_TYPE: Record<AffiliationCategory, FilterType> = {
  education: "education",
  business: "business",
  cultural: "arts",
  sports: "sports",
  catholic: "civic",
  charity: "civic",
  civic: "civic",
  government: "politician",
};

const TYPE_LABEL: Record<FilterType, string> = {
  politician: "Politicians",
  sports: "Sports",
  arts: "Arts",
  education: "Education",
  business: "Business",
  civic: "Civic",
};

const CATEGORY_COLOR: Record<AffiliationCategory, string> = {
  catholic: "#A855F7",
  education: "#3B82F6",
  business: "#FFD600",
  cultural: "#EC4899",
  sports: "#22C55E",
  civic: "#14B8A6",
  charity: "#F97316",
  government: "#DC2626",
};

// Primary brand color per institution (dominant logo color), used as the circle fill.
// Orgs not listed fall back to their category color.
const BRAND_COLOR: Record<string, string> = {
  "Catholic Diocese of Buffalo": "#3A609F",
  "Diocese of Buffalo – Bishop's Council": "#3A609F",
  "Foundation of Roman Catholic Diocese": "#3A609F",
  "Catholic Health System": "#104DBD",
  "Community Foundation for Greater Buffalo": "#0065A4",
  "Canisius High School": "#0C2340",
  "Canisius University": "#0C2340",
  "D'Youville University": "#B1181E",
  "Buffalo Philharmonic Orchestra": "#EB8236",
  "Buffalo Niagara Partnership": "#003B5E",
  "Invest Buffalo Niagara": "#C4D82E",
  "NAIOP": "#00663C",
  "Frank Lloyd Wright Martin House": "#5E4B3C",
  "Roswell Park Alliance Foundation": "#0055B8",
  "Buffalo Renaissance Foundation": "#EF8903",
  "Catholic Charities": "#8A105E",
  "Amherst Chamber of Commerce": "#004EA3",
  "Thurman Thomas Family Foundation": "#00338D",
  "African American Veterans Monument": "#E4BA42",
  "Law Enforcement Foundation of WNY": "#002866",
  "Buffalo Civic Auto Ramps": "#0971CE",
  "The Buffalo Club": "#2B3D54",
  "Buffalo Tennis & Squash Club": "#1E3A5F",
};

const CATEGORY_LABEL: Record<AffiliationCategory, string> = {
  catholic: "Catholic Church",
  education: "Education",
  business: "Business",
  cultural: "Cultural",
  sports: "Sports & Entertainment",
  civic: "Civic",
  charity: "Philanthropy",
  government: "Government",
};

interface SimNode {
  id: string;
  type: "person" | "org";
  label: string;
  r: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  person?: PowerMapPerson;
  category?: AffiliationCategory;
  faviconDomain?: string;
  logoPath?: string;
  coverImage?: string;
  description?: string;
  href?: string;
  contribution?: string;
  connections?: { person: string; role: string }[];
  degree: number;
  nodeType?: FilterType; // for the type filter (person nodes have none)
  jurisdiction?: Jurisdiction; // for the jurisdiction filter
  donationDetail?: string;
}

interface SimLink {
  source: string;
  target: string;
  category: AffiliationCategory;
  label?: string; // role (affiliation) or $ amount (donation)
  kind: "aff" | "donation";
}

const W = 1000;
const H = 720; // wider-than-tall field keeps the map from dominating vertically
const PAD = 70; // viewBox breathing room so edge node labels aren't clipped
const PEOPLE_Y = 130; // horizontal row for the people nodes, near the top

// Deterministic pseudo-random so layout is stable across runs
function seeded(i: number) {
  const x = Math.sin(i * 99.13) * 43758.5453;
  return x - Math.floor(x);
}

function buildGraph(
  people: PowerMapPerson[],
  affs: AffiliationEntry[],
  donations: PowerMapDonation[] = []
) {
  const orgMap = new Map<string, SimNode>();
  const links: SimLink[] = [];

  for (const aff of affs) {
    if (!orgMap.has(aff.org)) {
      orgMap.set(aff.org, {
        id: `org:${aff.org}`,
        type: "org",
        label: aff.org,
        r: 0,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        category: aff.category,
        faviconDomain: aff.faviconDomain,
        logoPath: aff.logoPath,
        coverImage: aff.coverImage,
        description: aff.description,
        href: aff.href,
        contribution: aff.contribution,
        connections: [],
        degree: 0,
        nodeType: CATEGORY_TYPE[aff.category],
        jurisdiction: aff.jurisdiction ?? "local",
      });
    }
    const node = orgMap.get(aff.org)!;
    if (!node.logoPath && aff.logoPath) node.logoPath = aff.logoPath;
    if (!node.coverImage && aff.coverImage) node.coverImage = aff.coverImage;
    if (!node.description && aff.description) node.description = aff.description;
    if (!node.href && aff.href) node.href = aff.href;
    if (!node.contribution && aff.contribution) node.contribution = aff.contribution;
    if (aff.jurisdiction) node.jurisdiction = aff.jurisdiction;
    node.connections!.push({ person: aff.person, role: aff.role });
    node.degree += 1;
    links.push({
      source: `person:${aff.person}`,
      target: node.id,
      category: aff.category,
      label: aff.role,
      kind: "aff",
    });
  }

  // Donation edges → politician/committee nodes
  for (const d of donations) {
    const id = `pol:${d.recipient}`;
    if (!orgMap.has(id)) {
      orgMap.set(id, {
        id,
        type: "org",
        label: d.recipient,
        r: 0,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        category: "government",
        coverImage: d.photo,
        description: d.detail,
        href: d.href,
        donationDetail: d.detail,
        connections: [],
        degree: 0,
        nodeType: "politician",
        jurisdiction: d.jurisdiction,
      });
    }
    const node = orgMap.get(id)!;
    if (!node.coverImage && d.photo) node.coverImage = d.photo;
    const amountWithPeriod = d.period ? `${d.amount} (${d.period})` : d.amount;
    node.connections!.push({ person: d.person, role: `${amountWithPeriod} in donations` });
    node.degree += 1;
    links.push({
      source: `person:${d.person}`,
      target: id,
      category: "government",
      label: amountWithPeriod,
      kind: "donation",
    });
  }

  const personNodes: SimNode[] = people.map((p) => ({
    id: `person:${p.shortName}`,
    type: "person",
    label: p.shortName,
    r: 0,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    person: p,
    degree:
      affs.filter((a) => a.person === p.shortName).length +
      donations.filter((d) => d.person === p.shortName).length,
  }));

  const orgNodes = Array.from(orgMap.values());
  const nodes = [...personNodes, ...orgNodes];

  // Size by degree
  for (const n of nodes) {
    if (n.type === "person") {
      n.r = 38 + n.degree * 2.6;
    } else {
      n.r = 15 + n.degree * 11;
    }
  }

  // Initial positions: people in a horizontal row near the top, orgs scattered below
  const pc = personNodes.length;
  const rowSpacing = 200;
  personNodes.forEach((n, i) => {
    n.x = W / 2 + (i - (pc - 1) / 2) * rowSpacing;
    n.y = PEOPLE_Y;
  });
  orgNodes.forEach((n, i) => {
    const a = seeded(i + 1) * Math.PI * 2;
    const rad = 220 + seeded(i + 50) * 220;
    n.x = W / 2 + Math.cos(a) * rad;
    n.y = H / 2 + Math.sin(a) * rad;
  });

  return { nodes, links };
}

function simulate(nodes: SimNode[], links: SimLink[], sep = 26) {
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const TICKS = 320;
  for (let t = 0; t < TICKS; t++) {
    const alpha = 1 - t / TICKS;

    // Repulsion
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 0.01;
        const minDist = a.r + b.r + sep;
        const force = (78000 / (dist * dist)) * alpha;
        let push = force;
        if (dist < minDist) push += (minDist - dist) * 0.5; // hard separation
        const ux = dx / dist;
        const uy = dy / dist;
        a.vx -= ux * push;
        a.vy -= uy * push;
        b.vx += ux * push;
        b.vy += uy * push;
      }
    }

    // Link springs
    for (const l of links) {
      const s = byId.get(l.source);
      const tg = byId.get(l.target);
      if (!s || !tg) continue;
      const dx = tg.x - s.x;
      const dy = tg.y - s.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 0.01;
      const target = s.r + tg.r + 55;
      const k = (dist - target) * 0.05 * alpha;
      const ux = dx / dist;
      const uy = dy / dist;
      s.vx += ux * k;
      s.vy += uy * k;
      tg.vx -= ux * k;
      tg.vy -= uy * k;
    }

    // Gravity to center + integrate
    for (const n of nodes) {
      const gx = (W / 2 - n.x) * 0.02 * alpha;
      const gy = (H / 2 - n.y) * 0.02 * alpha;
      n.vx += gx;
      n.vy += gy;
      // Keep people aligned on a horizontal row near the top
      if (n.type === "person") {
        n.vy += (PEOPLE_Y - n.y) * 0.14 * alpha;
      }
      n.vx *= 0.82;
      n.vy *= 0.82;
      n.x += n.vx;
      n.y += n.vy;
      // keep inside bounds
      n.x = Math.max(n.r + 8, Math.min(W - n.r - 8, n.x));
      n.y = Math.max(n.r + 8, Math.min(H - n.r - 8, n.y));
    }
  }
  return nodes;
}

// Per-area editorial content: a summary shown above the map when that area
// is focused.
export interface AreaInfo {
  summary?: React.ReactNode;
}

interface PowerMapProps {
  people: PowerMapPerson[];
  affiliations: AffiliationEntry[];
  donations?: PowerMapDonation[];
  areas?: Partial<Record<FilterType, AreaInfo>>;
}

// Wrap a long org name onto up to two lines for the node label
function labelLines(s: string): string[] {
  if (s.length <= 16) return [s];
  const words = s.split(" ");
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > 18 && cur) {
      lines.push(cur);
      cur = w;
    } else {
      cur = (cur + " " + w).trim();
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

// Monogram for orgs without a cover image: keep existing acronyms, else build initials
const MONOGRAM_STOP = new Set(["of", "for", "the", "and", "a", "to", "at", "in", "&"]);
function initials(s: string): string {
  const first = s.split(" ")[0];
  if (/^[A-Z]{2,6}$/.test(first)) return first;
  return s
    .split(/[\s–-]+/)
    .filter((w) => w && !MONOGRAM_STOP.has(w.toLowerCase()))
    .map((w) => w[0].toUpperCase())
    .slice(0, 4)
    .join("");
}

const HALO = {
  stroke: "#000",
  strokeWidth: 4,
  paintOrder: "stroke" as const,
  style: { fontFamily: "Inter, sans-serif" as const },
};

// Hover lift: scale a node up slightly around its own center
function hoverProps(cx: number, cy: number, onClick: () => void) {
  return {
    onClick,
    className:
      "cursor-pointer transition-transform duration-150 ease-out hover:[transform:scale(1.12)]",
    style: { transformOrigin: `${cx}px ${cy}px` } as React.CSSProperties,
  };
}

function PersonNodeG({ n, onClick }: { n: SimNode; onClick: () => void }) {
  const r = n.r;
  const cid = `clip-${n.id.replace(/[^a-zA-Z0-9]/g, "-")}`;
  return (
    <g {...hoverProps(n.x, n.y, onClick)}>
      <clipPath id={cid}>
        <circle cx={n.x} cy={n.y} r={r - 3} />
      </clipPath>
      <circle cx={n.x} cy={n.y} r={r} fill="#111" />
      <image
        href={n.person!.photo}
        x={n.x - (r - 3)}
        y={n.y - (r - 3)}
        width={(r - 3) * 2}
        height={(r - 3) * 2}
        clipPath={`url(#${cid})`}
        preserveAspectRatio="xMidYMid slice"
      />
      <text
        x={n.x}
        y={n.y + r + 20}
        textAnchor="middle"
        fontSize={18}
        fontWeight={900}
        fill="#fff"
        {...HALO}
      >
        {n.label}
      </text>
    </g>
  );
}

function OrgNodeG({ n, onClick }: { n: SimNode; onClick: () => void }) {
  const color = CATEGORY_COLOR[n.category!];
  const bg = BRAND_COLOR[n.label] ?? color;
  const r = n.r;
  const lines = labelLines(n.label);
  const cid = `clip-${n.id.replace(/[^a-zA-Z0-9]/g, "-")}`;

  if (n.coverImage) {
    return (
      <g {...hoverProps(n.x, n.y, onClick)}>
        <clipPath id={cid}>
          <circle cx={n.x} cy={n.y} r={r} />
        </clipPath>
        <circle cx={n.x} cy={n.y} r={r} fill={bg} />
        <image
          href={n.coverImage}
          x={n.x - r}
          y={n.y - r}
          width={r * 2}
          height={r * 2}
          clipPath={`url(#${cid})`}
          preserveAspectRatio="xMidYMid slice"
        />
        <text
          textAnchor="middle"
          fontSize={12.5}
          fontWeight={700}
          fill="#fff"
          stroke="#000"
          strokeWidth={4}
          paintOrder="stroke"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {lines.map((line, i) => (
            <tspan key={i} x={n.x} y={n.y + r + 15 + i * 13}>
              {line}
            </tspan>
          ))}
        </text>
      </g>
    );
  }

  const monogram = initials(n.label);
  return (
    <g {...hoverProps(n.x, n.y, onClick)}>
      <circle cx={n.x} cy={n.y} r={r} fill={bg} />
      <text
        x={n.x}
        y={n.y}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={r * (monogram.length > 2 ? 0.62 : monogram.length > 1 ? 0.78 : 1.05)}
        fontWeight={900}
        fill="#fff"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {monogram}
      </text>
      <text
        textAnchor="middle"
        fontSize={12.5}
        fontWeight={700}
        fill="#fff"
        stroke="#000"
        strokeWidth={4}
        paintOrder="stroke"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {lines.map((line, i) => (
          <tspan key={i} x={n.x} y={n.y + r + 15 + i * 13}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
}

export const PowerMap: React.FC<PowerMapProps> = ({
  people,
  affiliations,
  donations,
  areas,
}) => {
  const graph = useMemo(
    () => buildGraph(people, affiliations, donations),
    [people, affiliations, donations]
  );
  const [laidOut, setLaidOut] = useState<SimNode[] | null>(null);
  const [selected, setSelected] = useState<SimNode | null>(null);
  const [types, setTypes] = useState<Set<FilterType>>(new Set());
  const ran = useRef(false);

  // Which filter chips are present in this graph (so we don't show empty ones).
  const presentTypes = useMemo(() => {
    const s = new Set<FilterType>();
    graph.nodes.forEach((n) => n.nodeType && s.add(n.nodeType));
    return s;
  }, [graph]);

  // A node passes the filter if it matches the active area (people always pass).
  const nodeVisible = (n: SimNode): boolean => {
    if (n.type === "person") return true;
    if (types.size && !(n.nodeType && types.has(n.nodeType))) return false;
    return true;
  };

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    const result = simulate(
      graph.nodes.map((n) => ({ ...n })),
      graph.links
    );
    setLaidOut(result);
  }, [graph]);

  // When an area is focused, re-run the layout on just the visible subset so
  // the remaining nodes spread out and fill the space instead of leaving the
  // gaps where the (now hidden) off-area nodes used to sit.
  const focusedLayout = useMemo(() => {
    if (!laidOut || types.size === 0) return null;
    const visible = laidOut
      .filter((n) => n.type === "person" || (n.nodeType && types.has(n.nodeType)))
      .map((n) => ({ ...n, vx: 0, vy: 0 }));
    const visIds = new Set(visible.map((n) => n.id));
    const subLinks = graph.links.filter(
      (l) => visIds.has(l.source) && visIds.has(l.target)
    );
    const persons = visible.filter((n) => n.type === "person");
    const orgs = visible.filter((n) => n.type === "org");
    const pc = persons.length;
    persons.forEach((n, i) => {
      n.x = W / 2 + (i - (pc - 1) / 2) * 200;
      n.y = PEOPLE_Y;
    });
    orgs.forEach((n, i) => {
      const a = seeded(i + 1) * Math.PI * 2;
      const rad = 200 + seeded(i + 50) * 220;
      n.x = W / 2 + Math.cos(a) * rad;
      n.y = H / 2 + Math.sin(a) * rad;
    });
    // More separation in the focused view: fewer nodes, so give names room.
    return simulate(visible, subLinks, 90);
  }, [laidOut, types, graph.links]);

  const nodes = focusedLayout ?? laidOut ?? graph.nodes;
  const byId = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);

  // Resolve edge-label positions so they don't overlap each other or the nodes.
  // Each visible label starts at its curve anchor, then a few relaxation passes
  // push overlapping boxes apart (along the least-overlap axis) and out of nodes.
  const labelPos = useMemo(() => {
    const FS = 8.5;
    const items: {
      i: number;
      x: number;
      y: number;
      hw: number;
      hh: number;
    }[] = [];
    graph.links.forEach((l, i) => {
      if (!l.label) return;
      const s = byId.get(l.source);
      const t = byId.get(l.target);
      if (!s || !t) return;
      if (t.type !== "person" && types.size && !(t.nodeType && types.has(t.nodeType)))
        return; // matches nodeVisible(t)
      const dx = t.x - s.x;
      const dy = t.y - s.y;
      const len = Math.hypot(dx, dy) || 1;
      const k = 0.13 * len * (i % 2 === 0 ? 1 : -1);
      const cx = (s.x + t.x) / 2 + (-dy / len) * k;
      const cy = (s.y + t.y) / 2 + (dx / len) * k;
      items.push({
        i,
        x: 0.25 * s.x + 0.5 * cx + 0.25 * t.x,
        y: 0.25 * s.y + 0.5 * cy + 0.25 * t.y,
        hw: (l.label.length * FS * 0.55) / 2 + 5,
        hh: FS / 2 + 6,
      });
    });

    const visNodes = nodes.filter((n) => n.type === "person" || nodeVisible(n));

    // Bounding boxes for each node's NAME text (sits below the circle), so edge
    // labels avoid the names too — not just the circles.
    const nameBoxes = visNodes.map((n) => {
      if (n.type === "person") {
        const w = n.label.length * 18 * 0.55;
        return { cx: n.x, cy: n.y + n.r + 11, hw: w / 2 + 3, hh: 11 };
      }
      const lines = labelLines(n.label);
      const maxLen = Math.max(...lines.map((l) => l.length));
      const top = n.y + n.r + 2.5;
      const bottom = n.y + n.r + 15 + (lines.length - 1) * 13;
      return {
        cx: n.x,
        cy: (top + bottom) / 2,
        hw: (maxLen * 12.5 * 0.55) / 2 + 3,
        hh: (bottom - top) / 2 + 3,
      };
    });

    for (let pass = 0; pass < 80; pass++) {
      // label ↔ label
      for (let a = 0; a < items.length; a++) {
        for (let b = a + 1; b < items.length; b++) {
          const A = items[a];
          const B = items[b];
          const ox = A.hw + B.hw - Math.abs(A.x - B.x);
          const oy = A.hh + B.hh - Math.abs(A.y - B.y);
          if (ox > 0 && oy > 0) {
            if (oy < ox) {
              const p = (oy / 2 + 0.4) * (A.y <= B.y ? 1 : -1);
              A.y -= p;
              B.y += p;
            } else {
              const p = (ox / 2 + 0.4) * (A.x <= B.x ? 1 : -1);
              A.x -= p;
              B.x += p;
            }
          }
        }
      }
      // label ↔ node (push label clear of node circles)
      for (const A of items) {
        for (const n of visNodes) {
          const dx = A.x - n.x;
          const dy = A.y - n.y;
          const d = Math.hypot(dx, dy) || 0.01;
          const min = n.r + A.hh + 4;
          if (d < min) {
            const push = (min - d) * 0.5;
            A.x += (dx / d) * push;
            A.y += (dy / d) * push;
          }
        }
        // label ↔ node-name box (AABB push, label moves only)
        for (const ob of nameBoxes) {
          const ox = A.hw + ob.hw - Math.abs(A.x - ob.cx);
          const oy = A.hh + ob.hh - Math.abs(A.y - ob.cy);
          if (ox > 0 && oy > 0) {
            if (oy < ox) A.y += (A.y <= ob.cy ? -1 : 1) * (oy + 0.5);
            else A.x += (A.x <= ob.cx ? -1 : 1) * (ox + 0.5);
          }
        }
      }
    }
    const map = new Map<number, { x: number; y: number }>();
    items.forEach((it) => map.set(it.i, { x: it.x, y: it.y }));
    return map;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [byId, graph.links, nodes, types]);

  // The focused area (when exactly one type is selected) and its summary copy.
  const activeArea = types.size === 1 ? [...types][0] : null;
  const activeSummary = activeArea ? areas?.[activeArea]?.summary : undefined;
  const areaOptions = (Object.keys(TYPE_LABEL) as FilterType[]).filter((t) =>
    presentTypes.has(t)
  );
  const selectArea = (t: FilterType) =>
    setTypes((prev) => (prev.has(t) && prev.size === 1 ? new Set() : new Set([t])));

  // Render the graph only after the client-side simulation has run, so SSR and
  // first client render stay identical (avoids hydration mismatch).
  if (!laidOut) {
    return <div className="relative w-full" style={{ aspectRatio: `${W} / ${H}` }} aria-hidden="true" />;
  }

  return (
    <div>
      {/* Area selector — a row of toggle buttons above the map */}
      <p className="mb-3 text-xs font-black uppercase tracking-widest text-white/40">
        Click an area to focus the network
      </p>
      <div className="flex flex-wrap gap-2 mb-6">
        {(() => {
          const chip = (active: boolean) =>
            `text-sm font-black uppercase tracking-wider px-4 py-2 border-2 transition cursor-pointer ${
              active
                ? "bg-[#FFD600] text-black border-[#FFD600]"
                : "bg-transparent text-white/70 border-white/25 hover:border-white/60"
            }`;
          return (
            <>
              <button onClick={() => setTypes(new Set())} className={chip(types.size === 0)}>
                All
              </button>
              {areaOptions.map((t) => (
                <button key={t} onClick={() => selectArea(t)} className={chip(types.has(t))}>
                  {TYPE_LABEL[t]}
                </button>
              ))}
            </>
          );
        })()}
      </div>

      {/* Focused-area summary, shown above the map */}
      {activeArea && activeSummary && (
        <div className="mb-6 text-lg md:text-xl leading-relaxed text-white/80">
          {activeSummary}
        </div>
      )}

      <div
        className={`relative w-full ${selected ? "invisible" : ""}`}
        style={{ aspectRatio: `${W} / ${H}` }}
      >
        <svg
          viewBox={`${-PAD} ${-PAD} ${W + 2 * PAD} ${H + 2 * PAD}`}
          className="w-full h-full block"
          role="img"
          aria-label="Power map"
        >
          {/* Links — curved, dashed, with a relationship / $ label at the midpoint */}
          <g>
            {graph.links.map((l, i) => {
              const s = byId.get(l.source);
              const t = byId.get(l.target);
              if (!s || !t) return null;
              const visible = nodeVisible(t);
              if (!visible) return null;
              const dx = t.x - s.x;
              const dy = t.y - s.y;
              const len = Math.hypot(dx, dy) || 1;
              const k = 0.13 * len * (i % 2 === 0 ? 1 : -1);
              const cx = (s.x + t.x) / 2 + (-dy / len) * k;
              const cy = (s.y + t.y) / 2 + (dx / len) * k;
              const lx = 0.25 * s.x + 0.5 * cx + 0.25 * t.x;
              const ly = 0.25 * s.y + 0.5 * cy + 0.25 * t.y;
              return (
                <g key={i} opacity={visible ? 1 : 0.06}>
                  <path
                    d={`M${s.x},${s.y} Q${cx},${cy} ${t.x},${t.y}`}
                    fill="none"
                    stroke="#fff"
                    strokeOpacity={0.22}
                    strokeWidth={1.5}
                    strokeDasharray="5 4"
                  />
                  {l.label && visible && types.size > 0 && (() => {
                    const lp = labelPos.get(i) ?? { x: lx, y: ly };
                    const moved = Math.hypot(lp.x - lx, lp.y - ly) > 3;
                    return (
                      <>
                        {moved && (
                          <>
                            <line
                              x1={lx}
                              y1={ly}
                              x2={lp.x}
                              y2={lp.y}
                              stroke="#fff"
                              strokeOpacity={0.4}
                              strokeWidth={0.75}
                            />
                            <circle cx={lx} cy={ly} r={1.6} fill="#fff" fillOpacity={0.5} />
                          </>
                        )}
                        <text
                          x={lp.x}
                          y={lp.y}
                          textAnchor="middle"
                          dominantBaseline="central"
                          fontSize={8.5}
                          fontWeight={400}
                          fill="#fff"
                          fillOpacity={0.8}
                          stroke="#000"
                          strokeWidth={2.5}
                          paintOrder="stroke"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          {l.label}
                        </text>
                      </>
                    );
                  })()}
                </g>
              );
            })}
          </g>

          {/* Nodes */}
          {nodes.map((n) => {
            if (!nodeVisible(n)) return null;
            return (
              <g key={n.id}>
                {n.type === "person" ? (
                  <PersonNodeG n={n} onClick={() => setSelected(n)} />
                ) : (
                  <OrgNodeG n={n} onClick={() => setSelected(n)} />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white max-w-2xl w-full max-h-[85vh] overflow-y-auto border-2 border-black"
            onClick={(e) => e.stopPropagation()}
          >
            {selected.type === "person" ? (
              <PersonModalBody node={selected} onClose={() => setSelected(null)} />
            ) : (
              <OrgModalBody node={selected} onClose={() => setSelected(null)} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

function ModalHeader({
  title,
  subtitle,
  accent,
  onClose,
}: {
  title: string;
  subtitle?: string;
  accent: string;
  onClose: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 p-6 border-b-2 border-black">
      <div>
        {subtitle && (
          <div
            className="text-xs font-black uppercase tracking-widest mb-1"
            style={{ color: accent }}
          >
            {subtitle}
          </div>
        )}
        <h3 className="font-black text-2xl leading-tight text-black">{title}</h3>
      </div>
      <button
        onClick={onClose}
        aria-label="Close"
        className="shrink-0 font-black text-xl leading-none px-3 py-1 border-2 border-black bg-black text-white hover:bg-[#DC2626] hover:border-[#DC2626] cursor-pointer transition"
      >
        ✕
      </button>
    </div>
  );
}

function PersonModalBody({ node, onClose }: { node: SimNode; onClose: () => void }) {
  const p = node.person!;
  return (
    <>
      <ModalHeader title={p.name} subtitle={p.title} accent="#DC2626" onClose={onClose} />
      <div className="p-6 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.photo}
            alt={p.name}
            className="w-20 h-20 object-cover border-2 border-black shrink-0"
          />
          <div className="text-sm font-black uppercase tracking-widest text-black/50">
            {node.degree} institutional ties
          </div>
        </div>
        {p.bioParas.map((para, i) => (
          <p key={i} className="text-sm md:text-base leading-relaxed text-black/80">
            {para.map((seg, j) => (
              <span key={j} className={seg.highlight ? "font-black text-black" : undefined}>
                {seg.text}
              </span>
            ))}
          </p>
        ))}
      </div>
    </>
  );
}

function OrgModalBody({ node, onClose }: { node: SimNode; onClose: () => void }) {
  return (
    <>
      <ModalHeader
        title={node.label}
        subtitle={CATEGORY_LABEL[node.category!]}
        accent={CATEGORY_COLOR[node.category!]}
        onClose={onClose}
      />
      <div className="p-6 flex flex-col gap-4">
        {node.contribution && (
          <div className="bg-black text-white p-4">
            <div className="text-[10px] font-black uppercase tracking-widest text-[#FFD600] mb-1">
              What the family gives
            </div>
            <div className="font-black text-lg leading-snug">{node.contribution}</div>
          </div>
        )}
        <div className="space-y-2">
          {node.connections!.map((c, i) => (
            <div key={i} className="flex gap-3 text-sm">
              <span className="font-black uppercase tracking-wider shrink-0 w-20 text-black/50">
                {c.person}
              </span>
              <span className="text-black/80 leading-snug">{c.role}</span>
            </div>
          ))}
        </div>
        {node.description && (
          <p className="text-sm md:text-base leading-relaxed text-black/70 border-t-2 border-black pt-4">
            {node.description}
          </p>
        )}
        {node.href && (
          <a
            href={node.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[11px] text-black/40 underline underline-offset-2 hover:text-black transition cursor-pointer"
          >
            Source &rarr;
          </a>
        )}
      </div>
    </>
  );
}
