import type { StackSeries, StackDatum } from "@/components/StackedBars";

export const JACOBS_GIVING_SERIES: StackSeries[] = [
  { key: "dem", label: "Democratic", color: "#1E3A8A" },
  { key: "rep", label: "Republican", color: "#DC2626" },
  { key: "other", label: "Other / PACs", color: "#6B7280" },
];

export const JACOBS_GIVING_DATA: StackDatum[] = [
  { period: "2004–07", values: { dem: 24100, rep: 5500, other: 9349 }, detail: [{ label: "State / local", amount: 38949 }, { label: "Spitzer Paterson 2006", amount: 21900 }, { label: "Nys Senate Republican Campaign Committee (Nyss", amount: 5500 }, { label: "Jacobs for State Senate", amount: 2000 }, { label: "NYS Democratic Assembly Campaign Committee", amount: 2000 }] },
  { period: "2008–11", values: { dem: 176289, rep: 41250, other: 39300 }, detail: [{ label: "Federal", amount: 83000 }, { label: "State / local", amount: 173839 }, { label: "Andrew Cuomo for New York Inc.", amount: 104689 }, { label: "Friends Of Chris Jacobs", amount: 30000 }, { label: "New York State Democratic Committee", amount: 24400 }, { label: "HILLARY CLINTON FOR PRESIDENT", amount: 10000 }] },
  { period: "2012–14", values: { dem: 96285, rep: 221398, other: 213163 }, detail: [{ label: "Federal", amount: 474646 }, { label: "State / local", amount: 56200 }, { label: "ROMNEY VICTORY INC", amount: 83000 }, { label: "REPUBLICAN NATIONAL COMMITTEE", amount: 49250 }, { label: "Andrew Cuomo for New York Inc.", amount: 43500 }, { label: "DELAWARE NORTH COMPANIES, INC. POLITICAL ACTIO", amount: 40000 }] },
  { period: "2016–19", values: { dem: 43900, rep: 240157, other: 146399 }, detail: [{ label: "Federal", amount: 356456 }, { label: "State / local", amount: 74000 }, { label: "TRUMP VICTORY", amount: 100000 }, { label: "DELAWARE NORTH COMPANIES, INC. POLITICAL ACTIO", amount: 80000 }, { label: "REPUBLICAN NATIONAL COMMITTEE", amount: 33400 }, { label: "NYS Democratic Senate Campaign Committee", amount: 22500 }] },
  { period: "2020–23", values: { dem: 92021, rep: 59400, other: 25500 }, detail: [{ label: "Federal", amount: 130100 }, { label: "State / local", amount: 46821 }, { label: "JACOBS FOR CONGRESS", amount: 59400 }, { label: "FRIENDS OF SCHUMER", amount: 29000 }, { label: "Brown For Buffalo", amount: 28000 }, { label: "Kennedy For Senate", amount: 15321 }] },
  { period: "2024–26", values: { dem: 269300, rep: 8000, other: 33500 }, detail: [{ label: "Federal", amount: 106300 }, { label: "State / local", amount: 204500 }, { label: "Friends for Kathy Hochul", amount: 180000 }, { label: "JEFFRIES FOR CONGRESS", amount: 37300 }, { label: "DELAWARE NORTH COMPANIES, INC. POLITICAL ACTIO", amount: 15000 }, { label: "KENNEDY FOR CONGRESS", amount: 15000 }] },
];
