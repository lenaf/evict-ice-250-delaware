import React from "react";
import { DollarBill } from "./MoneyTree";

// Decorative band between sections: a row of open hands, each catching a
// money bag — the public's money dropping into the family's hands.
export const HandsDivider: React.FC = () => (
  <div
    className="bg-black border-y-2 border-white/10 px-6 md:px-10 py-6 overflow-hidden"
    aria-hidden="true"
  >
    <div className="mx-auto flex flex-nowrap justify-center gap-4 md:gap-6 items-end overflow-hidden">
      {Array.from({ length: 24 }).map((_, i) => (
        <div key={i} className="shrink-0 w-14 md:w-16 flex flex-col items-center">
          <div className="w-5 md:w-6 -mb-1 relative z-10">
            <DollarBill />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/illustrations/handout.svg"
            alt=""
            className="w-full invert opacity-50"
          />
        </div>
      ))}
    </div>
  </div>
);
