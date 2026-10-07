import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getSlot } from "@/lib/slots";
import { getAdminUser } from "@/lib/adminAuth";
import { formatDateLong, formatTime } from "@/lib/format";
import { Section } from "@/components/Section";
import { EventPage } from "./EventPage";

export const dynamic = "force-dynamic";

interface Params {
  params: Promise<{ id: string }>;
}

// Unpublished events 404 for the public; logged-in admins can still preview them.
async function getVisibleSlot(idOrSlug: string) {
  const slot = await getSlot(idOrSlug);
  if (!slot) return null;
  if (slot.published) return slot;
  return (await getAdminUser({ headers: new Headers(await headers()) })) ? slot : null;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const slot = await getVisibleSlot((await params).id);
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
  const slot = await getVisibleSlot((await params).id);
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
