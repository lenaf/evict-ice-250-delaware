import type { PersonData } from "@/types/affiliation";
import type { PowerMapPerson } from "@/components/PowerMap";
import type { HeroPerson } from "@/components/WealthHero";

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

// Family PersonData[] → WealthHero faces (just name, title, photo).
export function toHeroPeople(people: PersonData[]): HeroPerson[] {
  return people.map((p) => ({
    name: p.name,
    title: p.title,
    photo: p.photo,
  }));
}
