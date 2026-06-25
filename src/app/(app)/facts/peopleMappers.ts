import type { PersonData, WealthRef } from "@/types/affiliation";
import type { PowerMapPerson } from "@/components/PowerMap";
import type { WealthPerson } from "@/components/WealthHero";

// Family PersonData[] → PowerMap node people (tagged with the short name).
export function toPowerMapPeople(
  people: PersonData[],
  shortNames: string[]
): PowerMapPerson[] {
  return people.map((p, i) => ({
    id: p.id,
    name: p.name,
    shortName: shortNames[i],
    title: p.title,
    photo: p.photo,
    bioParas: p.bioParas,
  }));
}

// Family PersonData[] → WealthHero faces (tagged with the wealth reference).
export function toWealthPeople(
  people: PersonData[],
  shortNames: string[],
  wealth: Record<string, WealthRef>
): WealthPerson[] {
  return people.map((p, i) => ({
    name: p.name,
    title: p.title,
    photo: p.photo,
    wealth: wealth[shortNames[i]],
  }));
}
