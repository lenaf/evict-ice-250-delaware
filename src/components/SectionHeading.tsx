import React from "react";

// Standard section heading used across the facts pages.
export const SectionHeading: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <h2 className="font-black text-2xl md:text-3xl leading-tight text-white mb-3">
    {children}
  </h2>
);
