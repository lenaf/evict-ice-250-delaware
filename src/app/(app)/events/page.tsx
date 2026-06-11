import type { Metadata } from "next";
import { EventsCalendar } from "@/components/EventsCalendar";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Join us at our weekly pickets and community events to help evict ICE from 250 Delaware. See the full calendar and sign up.",
};

export default function EventsPage() {
  return (
    <main className="min-h-screen">
      <Section variant="blue" hero>
        <h1 className="font-black text-4xl md:text-5xl leading-[0.95] mb-4">
          Events
        </h1>
        <p className="text-lg md:text-xl text-white max-w-3xl">
          We&apos;re out in front of 250 Delaware Ave{" "}
          <span className="font-bold text-[#FFD600]">
            every Tuesday from 4:30–5:30pm
          </span>
          .
          <br />
          Join us — tap any event to sign up.
        </p>
      </Section>

      <Section variant="white">
        <EventsCalendar />
      </Section>
    </main>
  );
}
