import type { Metadata } from "next";
import { ShowUp } from "./ShowUp";

export const metadata: Metadata = {
  title: "Show Up — Volunteer Slots",
  description:
    "Join us for our weekly pickets and community events to help evict ICE from 250 Delaware.",
};

export default function ShowUpPage() {
  return <ShowUp />;
}
