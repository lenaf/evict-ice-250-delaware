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
      <div className="border-2 border-black p-4 hover:border-[#DC2626] transition-colors flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="bg-[#FFD600] text-black font-bold text-xs px-1.5 py-0.5 whitespace-nowrap">
            {formatDate(slot.date)}
          </span>
          <span className="text-black font-bold text-xs whitespace-nowrap">
            {formatTime(slot.start_time)}
          </span>
        </div>
        <h3 className="font-black text-sm md:text-base leading-tight">
          {slot.title}
        </h3>
        <p className="text-xs text-black">
          {slot.location}
        </p>
        {slot.signup_link ? (
          <a
            href={slot.signup_link}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start bg-[#DC2626] hover:bg-black text-white font-black text-xs tracking-wider py-2 px-4 border-2 border-[#DC2626] hover:border-black uppercase transition-all mt-1 no-underline"
          >
            Sign Up
          </a>
        ) : (
          <button
            onClick={() => setShowModal(true)}
            className="self-start bg-[#DC2626] hover:bg-black cursor-pointer text-white font-black text-xs tracking-wider py-2 px-4 border-2 border-[#DC2626] hover:border-black uppercase transition-all mt-1"
          >
            Sign Up
          </button>
        )}
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
