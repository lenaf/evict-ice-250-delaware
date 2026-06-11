import React from "react";

interface SourceLinkProps {
  href: string;
  label: string;
}

export const SourceLink: React.FC<SourceLinkProps> = ({ href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="underline hover:text-[#DC2626] transition"
  >
    {label}
  </a>
);
