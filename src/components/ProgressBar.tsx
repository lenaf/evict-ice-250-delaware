"use client";

import React from "react";

interface ProgressBarProps {
  current: number;
  target: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, target }) => {
  const pct = Math.min((current / target) * 100, 100);
  const met = current >= target;

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className={met ? "font-bold text-green-700" : "font-semibold"}>
          {met
            ? `${current} volunteers signed up — keep it going!`
            : `${current} signed up — ${target - current} more needed`}
        </span>
      </div>
      <div className="w-full h-2 bg-black/10 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            met ? "bg-green-600" : "bg-[#DC2626]"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};
