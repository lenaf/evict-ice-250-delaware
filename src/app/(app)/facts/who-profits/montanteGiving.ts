import type { StackSeries, StackDatum } from "@/components/StackedBars";

export const MONTANTE_GIVING_SERIES: StackSeries[] = [
  { key: "dem", label: "Democratic", color: "#1E3A8A" },
  { key: "rep", label: "Republican", color: "#DC2626" },
  { key: "other", label: "Other / PACs", color: "#6B7280" },
];

export const MONTANTE_GIVING_DATA: StackDatum[] = [
  { period: "2004–07", values: { dem: 35455, rep: 35900, other: 8030 }, detail: [{ label: "Federal", amount: 23355 }, { label: "State / local", amount: 56030 }, { label: "Friends Of Pataki", amount: 25000 }, { label: "Spitzer Paterson 2006", amount: 22250 }, { label: "BRIAN HIGGINS FOR CONGRESS", amount: 8105 }, { label: "REYNOLDS FOR CONGRESS", amount: 7500 }] },
  { period: "2008–11", values: { dem: 49400, rep: 17750, other: 6015 }, detail: [{ label: "Federal", amount: 21300 }, { label: "State / local", amount: 51865 }, { label: "Paterson For Governor Inc.", amount: 35000 }, { label: "CHRIS LEE FOR CONGRESS", amount: 9200 }, { label: "REYNOLDS FOR CONGRESS", amount: 5100 }, { label: "Andrew Cuomo for New York Inc.", amount: 5000 }] },
  { period: "2012–15", values: { dem: 36200, rep: 14600, other: 15909 }, detail: [{ label: "Federal", amount: 24200 }, { label: "State / local", amount: 42509 }, { label: "Andrew Cuomo for New York Inc.", amount: 20500 }, { label: "Committee for Economic Growth", amount: 10000 }, { label: "KATHY HOCHUL FOR CONGRESS", amount: 8500 }, { label: "Friends for Kathy Hochul", amount: 5500 }] },
  { period: "2016–19", values: { dem: 8400, rep: 3900, other: 10250 }, detail: [{ label: "Federal", amount: 12850 }, { label: "State / local", amount: 9700 }, { label: "FRIENDS OF SCHUMER", amount: 5400 }, { label: "Committee for Economic Growth", amount: 5000 }, { label: "TOM REED FOR CONGRESS", amount: 3700 }, { label: "Friends for Kathy Hochul", amount: 2750 }] },
  { period: "2020–23", values: { dem: 8600, rep: 13350, other: 1180 }, detail: [{ label: "Federal", amount: 15850 }, { label: "State / local", amount: 7280 }, { label: "JACOBS FOR CONGRESS", amount: 6800 }, { label: "TOM REED FOR CONGRESS", amount: 3800 }, { label: "Friends for Kathy Hochul", amount: 2500 }, { label: "BRIAN HIGGINS FOR CONGRESS", amount: 2000 }] },
  { period: "2024–26", values: { dem: 17000, rep: 9625, other: 3275 }, detail: [{ label: "Federal", amount: 12775 }, { label: "State / local", amount: 17125 }, { label: "Friends for Kathy Hochul", amount: 11000 }, { label: "LANGWORTHY FOR CONGRESS", amount: 8600 }, { label: "Friends Of Crystal D Peoples (Focp)", amount: 3500 }, { label: "KENNEDY FOR CONGRESS", amount: 2500 }] },
];
