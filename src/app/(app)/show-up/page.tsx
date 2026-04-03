import type { Metadata } from "next";
import { ShowUp } from "./ShowUp";

export const metadata: Metadata = {
  title: "Show Up — Volunteer Slots",
  description:
    "Sign up for volunteer shifts at 250 Delaware Ave. We need people on the ground — show up and make a difference.",
};

export default function ShowUpPage() {
  return <ShowUp />;
}
