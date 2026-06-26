import type { Metadata } from "next";
import { WhatHappensInside } from "./WhatHappensInside";

export const metadata: Metadata = {
  title: "What Happens Inside: The Facts",
  description:
    "Field office. Hold rooms. Weapons storage. What the federal government runs out of 250 Delaware Avenue in downtown Buffalo.",
};

export default function WhatHappensInsidePage() {
  return <WhatHappensInside />;
}
