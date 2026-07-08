"use client";

import React from "react";
import { useField } from "@payloadcms/ui";

// Slider bounds — a logo can be shrunk to ~40% or grown to 2.5× the base size.
const MIN = 0.4;
const MAX = 2.5;
const STEP = 0.05;

interface ScaleSliderProps {
  path: string;
  field?: { label?: string; admin?: { description?: unknown } };
}

// Custom admin control for a Sponsor's `scale` number field: a range slider
// with a live "1.25×" readout so editors can dial each logo up or down until it
// reads evenly next to its neighbors, instead of typing a raw number.
export const ScaleSlider: React.FC<ScaleSliderProps> = ({ path, field }) => {
  const { value, setValue } = useField<number>({ path });
  const v = typeof value === "number" ? value : 1;
  const label = field?.label || "Scale";
  const description =
    typeof field?.admin?.description === "string" ? field.admin.description : null;

  return (
    <div className="field-type" style={{ marginBottom: 20 }}>
      <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>
        {label}
      </label>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <input
          type="range"
          min={MIN}
          max={MAX}
          step={STEP}
          value={v}
          onChange={(e) => setValue(parseFloat(e.target.value))}
          style={{ flex: 1, cursor: "pointer" }}
        />
        <span
          style={{
            minWidth: 52,
            textAlign: "right",
            fontVariantNumeric: "tabular-nums",
            fontWeight: 600,
          }}
        >
          {v.toFixed(2)}×
        </span>
      </div>
      {description ? (
        <p style={{ marginTop: 6, fontSize: 12, opacity: 0.7 }}>{description}</p>
      ) : null}
    </div>
  );
};
