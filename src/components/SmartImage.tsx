"use client";

import React, { useState } from "react";
import Image, { type ImageProps } from "next/image";

// next/image that falls back to a plain <img> of the original source if the
// optimizer errors. The important case is a 402 when Vercel's image-
// transformation quota is exhausted (an uncached variant can't be generated),
// but it also covers a 400/404. Optimization is kept when it works, so we still
// get small WebP variants — we just never leave a broken image behind.
//
// Client component: it needs the error state and onError handler. Use it for
// remote CMS images (Supabase) that go through the optimizer. Tiny, few-of-a-kind
// images (e.g. press logos) are better served as a plain <img> directly.
export const SmartImage: React.FC<ImageProps> = ({ onError, onLoad, ...props }) => {
  const [failed, setFailed] = useState(false);
  const { src, alt, className, width, height } = props;

  if (failed && typeof src === "string") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        width={typeof width === "number" ? width : undefined}
        height={typeof height === "number" ? height : undefined}
        loading="lazy"
        decoding="async"
        className={className}
        onLoad={onLoad as React.ReactEventHandler<HTMLImageElement> | undefined}
      />
    );
  }

  return (
    <Image
      {...props}
      alt={alt}
      onLoad={onLoad}
      onError={(e) => {
        setFailed(true);
        onError?.(e);
      }}
    />
  );
};
