"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import type { Slot } from "@/types/slots";
import { formatDate, formatTime } from "@/lib/format";
import { SlotForm } from "./SlotForm";
import { SignupList } from "./SignupList";

export const Admin: React.FC = () => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSlot, setEditingSlot] = useState<Slot | undefined>();
  const [expandedSlot, setExpandedSlot] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showForm) {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showForm, editingSlot]);

  const fetchSlots = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/slots");
      // Session expired mid-visit — send them back through the CMS login.
      if (res.status === 401) {
        window.location.href = "/admin/login?redirect=/admin-events";
        return;
      }
      setSlots(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

  const handleDelete = async (slotId: string) => {
    if (!confirm("Delete this event? Signed-up volunteers will be notified.")) return;
    await fetch(`/api/slots/${slotId}`, { method: "DELETE" });
    fetchSlots();
  };

  // Duplicate = open the create form pre-filled from this event, minus its
  // identity (blank id → create mode, blank date so a new date is chosen).
  const handleDuplicate = (slot: Slot) => {
    setEditingSlot({ ...slot, id: "", date: "" });
    setShowForm(true);
  };

  const today = new Date().toISOString().split("T")[0];
  const upcoming = slots.filter((s) => s.date >= today);
  const past = slots.filter((s) => s.date < today).reverse();

  return (
    <main className="min-h-screen bg-white pt-28 pb-20 px-6 md:px-10">
      <div className="max-w-4xl mx-auto">
        {/* Hard nav on purpose: /admin is the Payload admin, a separate root
            layout from this Tailwind app — next/link can't soft-navigate there. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          href="/admin"
          className="inline-block mb-6 text-sm font-bold text-black/50 hover:text-black transition"
        >
          ← Back to CMS
        </a>
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-black text-3xl">Events</h1>
          <button
            onClick={() => {
              setEditingSlot(undefined);
              setShowForm(true);
            }}
            className="bg-[#DC2626] hover:opacity-80 text-white font-bold text-sm py-2 px-5 transition cursor-pointer"
          >
            + New Event
          </button>
        </div>

        {showForm && (
          <div
            ref={formRef}
            className="mb-10 p-6 border-2 border-[#FFD600] bg-[#FFD600]/5"
          >
            <SlotForm
              key={editingSlot?.id || "new"}
              initial={editingSlot}
              onSaved={() => {
                setShowForm(false);
                setEditingSlot(undefined);
                fetchSlots();
              }}
              onCancel={() => {
                setShowForm(false);
                setEditingSlot(undefined);
              }}
            />
          </div>
        )}

        {loading ? (
          <p className="text-black/50">Loading...</p>
        ) : (
          <>
            <h2 className="font-black text-xl mb-4 text-[#1E3A8A]">
              Upcoming ({upcoming.length})
            </h2>
            {upcoming.length === 0 ? (
              <p className="text-black/50 mb-8">No upcoming events.</p>
            ) : (
              <div className="space-y-4 mb-10">
                {upcoming.map((slot) => (
                  <div key={slot.id} className="border-2 border-black p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-black text-lg">{slot.title}</p>
                        <p className="text-sm text-black/60">
                          {formatDate(slot.date)} &middot;{" "}
                          {formatTime(slot.start_time)} – {formatTime(slot.end_time)}
                        </p>
                        <p className="text-sm text-black/60">{slot.location}</p>
                        <p className="text-sm font-semibold mt-1">
                          {slot.signup_count || 0} / {slot.target_volunteers} signed up
                        </p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() =>
                            setExpandedSlot(expandedSlot === slot.id ? null : slot.id)
                          }
                          className="text-xs font-bold text-[#1E3A8A] hover:text-black px-2 py-1 border border-[#1E3A8A] hover:border-black transition cursor-pointer"
                        >
                          {expandedSlot === slot.id ? "Hide" : "Signups"}
                        </button>
                        <button
                          onClick={() => {
                            setEditingSlot(slot);
                            setShowForm(true);
                          }}
                          className="text-xs font-bold text-black/50 hover:text-black px-2 py-1 border border-black/20 hover:border-black transition cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDuplicate(slot)}
                          className="text-xs font-bold text-black/50 hover:text-black px-2 py-1 border border-black/20 hover:border-black transition cursor-pointer"
                        >
                          Duplicate
                        </button>
                        <button
                          onClick={() => handleDelete(slot.id)}
                          className="text-xs font-bold text-[#DC2626] hover:opacity-80 px-2 py-1 border border-[#DC2626] transition cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    {expandedSlot === slot.id && <SignupList slotId={slot.id} />}
                  </div>
                ))}
              </div>
            )}

            {past.length > 0 && (
              <>
                <h2 className="font-black text-xl mb-4 text-black/40">
                  Past ({past.length})
                </h2>
                <div className="space-y-4 opacity-60">
                  {past.map((slot) => (
                    <div key={slot.id} className="border border-black/20 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-bold">{slot.title}</p>
                          <p className="text-sm text-black/60">
                            {formatDate(slot.date)} &middot;{" "}
                            {formatTime(slot.start_time)} –{" "}
                            {formatTime(slot.end_time)}
                          </p>
                          <p className="text-sm font-semibold mt-1">
                            {slot.signup_count || 0} / {slot.target_volunteers} signed up
                          </p>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button
                            onClick={() =>
                              setExpandedSlot(expandedSlot === slot.id ? null : slot.id)
                            }
                            className="text-xs font-bold text-black/40 hover:text-black px-2 py-1 border border-black/20 hover:border-black transition cursor-pointer"
                          >
                            {expandedSlot === slot.id ? "Hide" : "Signups"}
                          </button>
                          <button
                            onClick={() => handleDuplicate(slot)}
                            className="text-xs font-bold text-black/40 hover:text-black px-2 py-1 border border-black/20 hover:border-black transition cursor-pointer"
                          >
                            Duplicate
                          </button>
                        </div>
                      </div>
                      {expandedSlot === slot.id && <SignupList slotId={slot.id} />}
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
};
