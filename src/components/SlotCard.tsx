"use client";

import React, { useState } from "react";
import type { Slot } from "@/types/slots";
import { formatDate, formatTime } from "@/lib/format";
import { ProgressBar } from "@/components/ProgressBar";
import { SignupForm } from "@/components/SignupForm";

interface SlotCardProps {
  slot: Slot;
}

export const SlotCard: React.FC<SlotCardProps> = ({ slot: initialSlot }) => {
  const [slot, setSlot] = useState(initialSlot);
  const [showModal, setShowModal] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const refreshSlot = async () => {
    try {
      const res = await fetch(`/api/slots/${slot.id}`);
      if (res.ok) setSlot(await res.json());
    } catch {
      // fail silently
    }
  };

  return (
    <>
      <div className="border-2 border-black p-6 hover:border-[#DC2626] transition-colors">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-baseline gap-3 mb-1">
              <span className="bg-[#FFD600] text-black font-black text-sm px-2 py-0.5">
                {formatDate(slot.date)}
              </span>
              <span className="text-sm text-black/60">
                {formatTime(slot.start_time)} – {formatTime(slot.end_time)}
              </span>
            </div>
            <h3 className="font-black text-xl md:text-2xl mb-1">{slot.title}</h3>
            <p className="text-sm text-black/60 mb-1">{slot.location}</p>
            {slot.description && (
              <div className="mt-2">
                <p
                  className={`text-sm text-black/70 ${!expanded ? "line-clamp-3" : ""}`}
                >
                  {slot.description}
                </p>
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="text-sm font-bold text-[#DC2626] hover:text-black transition-colors cursor-pointer mt-1"
                >
                  {expanded ? "View less" : "View more"}
                </button>
              </div>
            )}
            <div className="mt-4 max-w-xs">
              <ProgressBar
                current={slot.signup_count || 0}
                target={slot.target_volunteers}
              />
            </div>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="shrink-0 bg-[#DC2626] hover:bg-black cursor-pointer text-white font-black text-sm tracking-wider py-3 px-6 border-2 border-[#DC2626] hover:border-black uppercase transition-all text-center"
          >
            Sign Up
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white w-full max-w-md p-6 md:p-8 max-h-[90vh] overflow-y-auto">
            <SignupForm
              slot={slot}
              onSuccess={() => {
                setShowModal(false);
                refreshSlot();
              }}
              onClose={() => setShowModal(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};
