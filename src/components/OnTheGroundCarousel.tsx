import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SwipeCarousel } from "@/components/SwipeCarousel";

interface Photo {
  src: string;
  alt: string;
  credit?: boolean;
}

const REUTERS_CREDIT = "Photo: REUTERS/Lindsay DeDario";

const photos: Photo[] = [
  {
    src: "/photos/reuters/rally-abducted-here.jpg",
    alt: "Demonstrator holding a sign reading 'Your neighbors were abducted here'",
    credit: true,
  },
  {
    src: "/photos/campaign/ice-fuera-250-delaware.jpg",
    alt: "Supporter holding a yellow '¡ICE Fuera! de 250 Delaware' sign",
  },
  {
    src: "/photos/reuters/rally-evict-ice-signs.jpg",
    alt: "Demonstrators holding 'Evict ICE from 250 Delaware' signs",
    credit: true,
  },
  {
    src: "/photos/campaign/family-matters-too.jpg",
    alt: "Demonstrators holding signs reading 'My family matters too' and 'Mi abuela no es criminal'",
  },
  {
    src: "/photos/campaign/sign-ice-out-now.jpg",
    alt: "A handmade 'ICE Out Now!!' sign held at a demonstration",
  },
  {
    src: "/photos/reuters/rally-street-signs.jpg",
    alt: "Demonstrators on the street holding 'Abolish ICE' signs",
    credit: true,
  },
  {
    src: "/photos/campaign/free-dolores.jpg",
    alt: "Demonstrators holding '¡ICE Fuera!' and 'Free Dolores' signs outside 250 Delaware",
  },
  {
    src: "/photos/campaign/rally-speakers.jpg",
    alt: "Speakers addressing the crowd outside 250 Delaware",
  },
  {
    src: "/photos/campaign/sign-hands-off-our-neighbors.jpg",
    alt: "Demonstrator holding a 'Hands off our neighbors' sign",
  },
  {
    src: "/photos/campaign/rally-speaker-megaphone.jpg",
    alt: "Speaker addressing demonstrators with a megaphone",
  },
];

export const OnTheGroundCarousel: React.FC = () => {
  return (
    <section className="bg-black text-white py-12 md:py-16">
      <div className="px-6 md:px-10 mb-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-black text-2xl md:text-3xl uppercase tracking-wide">
            Stand With Us
          </h2>
          <p className="text-white/70 mt-2 leading-relaxed">
            We&apos;re out in front of 250 Delaware Ave every Tuesday from
            4:30–5:30pm. Join us.{" "}
            <Link
              href="/events"
              className="font-black text-[#DC2626] hover:text-white underline underline-offset-2 transition"
            >
              See all events &amp; details &rarr;
            </Link>
          </p>
        </div>
      </div>

      <SwipeCarousel
        tone="light"
        gapClassName="gap-3"
        ariaLabel="Photos from the ground"
      >
        {photos.map((photo) => (
          <figure
            key={photo.src}
            className="relative shrink-0 snap-start h-64 md:h-80 aspect-square overflow-hidden"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 768px) 320px, 256px"
              className="object-cover"
            />
            {photo.credit && (
              <figcaption className="absolute bottom-0 right-0 bg-black/70 text-white/90 text-[10px] leading-none px-1.5 py-1">
                {REUTERS_CREDIT}
              </figcaption>
            )}
          </figure>
        ))}
      </SwipeCarousel>
    </section>
  );
};
