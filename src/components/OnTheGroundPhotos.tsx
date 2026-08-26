import React from "react";
import Image from "next/image";
import { SwipeCarousel } from "@/components/SwipeCarousel";
import { getGroundPhotos, type GroundPhotoItem } from "@/lib/payload";

const REUTERS_CREDIT = "Photo: REUTERS/Lindsay DeDario";

// Shown until photos are added in the CMS (the `groundPhotos` collection).
const FALLBACK_PHOTOS: GroundPhotoItem[] = [
  {
    src: "/photos/reuters/rally-abducted-here.jpg",
    alt: "Demonstrator holding a sign reading 'Your neighbors were abducted here'",
    credit: REUTERS_CREDIT,
  },
  {
    src: "/photos/campaign/ice-fuera-250-delaware.jpg",
    alt: "Supporter holding a yellow '¡ICE Fuera! de 250 Delaware' sign",
    credit: "",
  },
  {
    src: "/photos/reuters/rally-evict-ice-signs.jpg",
    alt: "Demonstrators holding 'Evict ICE from 250 Delaware' signs",
    credit: REUTERS_CREDIT,
  },
  {
    src: "/photos/campaign/family-matters-too.jpg",
    alt: "Demonstrators holding signs reading 'My family matters too' and 'Mi abuela no es criminal'",
    credit: "",
  },
  {
    src: "/photos/campaign/sign-ice-out-now.jpg",
    alt: "A handmade 'ICE Out Now!!' sign held at a demonstration",
    credit: "",
  },
  {
    src: "/photos/reuters/rally-street-signs.jpg",
    alt: "Demonstrators on the street holding 'Abolish ICE' signs",
    credit: REUTERS_CREDIT,
  },
  {
    src: "/photos/campaign/free-dolores.jpg",
    alt: "Demonstrators holding '¡ICE Fuera!' and 'Free Dolores' signs outside 250 Delaware",
    credit: "",
  },
  {
    src: "/photos/campaign/rally-speakers.jpg",
    alt: "Speakers addressing the crowd outside 250 Delaware",
    credit: "",
  },
  {
    src: "/photos/campaign/sign-hands-off-our-neighbors.jpg",
    alt: "Demonstrator holding a 'Hands off our neighbors' sign",
    credit: "",
  },
  {
    src: "/photos/campaign/rally-speaker-megaphone.jpg",
    alt: "Speaker addressing demonstrators with a megaphone",
    credit: "",
  },
];

// "On the Ground" — the demonstration photo strip on a black band. Photos come
// from the CMS (`groundPhotos`), falling back to the hardcoded set when empty.
export const OnTheGroundPhotos = async () => {
  const photos = ((await getGroundPhotos()) ?? FALLBACK_PHOTOS).filter(
    (p) => p.src,
  );

  return (
    <section className="bg-black text-white py-12 md:py-16">
      <div className="px-6 md:px-10 mb-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-black text-2xl md:text-3xl uppercase tracking-wide">
            On the Ground
          </h2>
        </div>
      </div>

      <SwipeCarousel
        tone="light"
        gapClassName="gap-3"
        ariaLabel="Photos from the ground"
      >
        {photos.map((photo, i) => (
          <figure
            key={`${photo.src}-${i}`}
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
                {photo.credit}
              </figcaption>
            )}
          </figure>
        ))}
      </SwipeCarousel>
    </section>
  );
};
