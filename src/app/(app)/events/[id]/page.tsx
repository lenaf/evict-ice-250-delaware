import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSlot } from "@/lib/slots";
import { formatDateLong, formatTime } from "@/lib/format";
import { Section } from "@/components/Section";
import { EventPage } from "./EventPage";

export const dynamic = "force-dynamic";

interface Params {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const slot = await getSlot((await params).id);
  if (!slot) return { title: "Event not found" };
  const when = `${formatDateLong(slot.date)} · ${formatTime(slot.start_time)}`;
  const description = `${when} at ${slot.location}.${slot.description ? " " + slot.description : ""}`.slice(0, 200);
  return {
    title: slot.title,
    description,
    openGraph: {
      title: slot.title,
      description,
      ...(slot.image_url ? { images: [slot.image_url] } : {}),
    },
  };
}

export default async function EventDetailPage({ params }: Params) {
  const slot = await getSlot((await params).id);
  if (!slot) notFound();

  return (
    <main className="min-h-screen">
      <Section variant="white" hero>
        <div className="max-w-xl mx-auto">
          <EventPage slot={slot} />
        </div>
      </Section>
    </main>
  );
}
