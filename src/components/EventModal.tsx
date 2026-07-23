"use client";

import React from "react";
import { createPortal } from "react-dom";
import type { Slot } from "@/types/slots";
import { EventDetails } from "@/components/EventDetails";

interface EventModalProps {
  slot: Slot;
  open: boolean;
  onClose: () => void;
}

// Shared centered modal for event details, used by both the calendar chips
// and the homepage event cards.
export const EventModal: React.FC<EventModalProps> = ({ slot, open, onClose }) => {
  if (!open) return null;
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white text-black w-full max-w-md p-6 md:p-8 max-h-[90vh] overflow-y-auto">
        <EventDetails slot={slot} onClose={onClose} />
      </div>
    </div>,
    document.body,
  );
};
