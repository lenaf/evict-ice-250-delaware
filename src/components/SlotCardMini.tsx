"use client";

import React, { useState } from "react";
import type { Slot } from "@/types/slots";
import { formatDate, formatTime } from "@/lib/format";
import { SignupForm } from "@/components/SignupForm";

interface SlotCardMiniProps {
  slot: Slot;
}

export const SlotCardMini: React.FC<SlotCardMiniProps> = ({ slot }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="border-2 border-black p-4 hover:border-[#DC2626] transition-colors flex items-center justify-between gap-4">
        <div>
          <span className="bg-[#FFD600] text-black font-black text-xs px-2 py-0.5">
            {formatDate(slot.date)}
          </span>
          <h3 className="font-black text-base md:text-lg mt-2 leading-tight">
            {slot.title}
          </h3>
          <p className="text-xs text-black/60 mt-1">
            {formatTime(slot.start_time)} – {formatTime(slot.end_time)} · {slot.location}
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="shrink-0 bg-[#DC2626] hover:bg-black cursor-pointer text-white font-black text-xs tracking-wider py-2 px-4 border-2 border-[#DC2626] hover:border-black uppercase transition-all"
        >
          Sign Up
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white w-full max-w-md p-6 md:p-8 max-h-[90vh] overflow-y-auto">
            <SignupForm
              slot={slot}
              onSuccess={() => setShowModal(false)}
              onClose={() => setShowModal(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};
