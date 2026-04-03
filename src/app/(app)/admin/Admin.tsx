"use client";

import React, { useState, useCallback } from "react";
import type { Slot } from "@/types/slots";
import { formatDate, formatTime } from "@/lib/format";
import { LoginForm } from "./LoginForm";
import { SlotForm } from "./SlotForm";
import { SignupList } from "./SignupList";

export const Admin: React.FC = () => {
  const [password, setPassword] = useState<string | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingSlot, setEditingSlot] = useState<Slot | undefined>();
  const [expandedSlot, setExpandedSlot] = useState<string | null>(null);
  const [authError, setAuthError] = useState(false);

  const fetchSlots = useCallback(async (pw: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/slots", {
        headers: { "x-admin-password": pw },
      });
      if (res.status === 401) {
        setAuthError(true);
        setPassword(null);
        return;
      }
      const data = await res.json();
      setSlots(data);
      setAuthError(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = (pw: string) => {
    setPassword(pw);
    fetchSlots(pw);
  };

  const handleDelete = async (slotId: string) => {
    if (!password) return;
    if (!confirm("Delete this slot? Signed-up volunteers will be notified.")) return;

    await fetch(`/api/slots/${slotId}`, {
      method: "DELETE",
      headers: { "x-admin-password": password },
    });

    fetchSlots(password);
  };

  if (!password || authError) {
    return (
      <div>
        <LoginForm onLogin={handleLogin} />
        {authError && (
          <p className="text-center text-red-600 text-sm -mt-20">
            Wrong password. Try again.
          </p>
        )}
      </div>
    );
  }

  const today = new Date().toISOString().split("T")[0];
  const upcoming = slots.filter((s) => s.date >= today);
  const past = slots.filter((s) => s.date < today);

  return (
    <main className="min-h-screen bg-white pt-28 pb-20 px-6 md:px-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-black text-3xl">Volunteer Slots</h1>
          <button
            onClick={() => {
              setEditingSlot(undefined);
              setShowForm(true);
            }}
            className="bg-[#DC2626] hover:bg-black text-white font-bold text-sm py-2 px-5 transition-colors cursor-pointer"
          >
            + New Slot
          </button>
        </div>

        {showForm && (
          <div className="mb-10 p-6 border-2 border-[#FFD600] bg-[#FFD600]/5">
            <SlotForm
              initial={editingSlot}
              password={password}
              onSaved={() => {
                setShowForm(false);
                setEditingSlot(undefined);
                fetchSlots(password);
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
              <p className="text-black/50 mb-8">No upcoming slots.</p>
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
                          className="text-xs font-bold text-[#1E3A8A] hover:text-black px-2 py-1 border border-[#1E3A8A] hover:border-black transition-colors cursor-pointer"
                        >
                          {expandedSlot === slot.id ? "Hide" : "Signups"}
                        </button>
                        <button
                          onClick={() => {
                            setEditingSlot(slot);
                            setShowForm(true);
                          }}
                          className="text-xs font-bold text-black/50 hover:text-black px-2 py-1 border border-black/20 hover:border-black transition-colors cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(slot.id)}
                          className="text-xs font-bold text-[#DC2626] hover:text-white hover:bg-[#DC2626] px-2 py-1 border border-[#DC2626] transition-colors cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    {expandedSlot === slot.id && (
                      <SignupList slotId={slot.id} password={password} />
                    )}
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
                        <button
                          onClick={() =>
                            setExpandedSlot(expandedSlot === slot.id ? null : slot.id)
                          }
                          className="text-xs font-bold text-black/40 hover:text-black px-2 py-1 border border-black/20 hover:border-black transition-colors cursor-pointer"
                        >
                          {expandedSlot === slot.id ? "Hide" : "Signups"}
                        </button>
                      </div>
                      {expandedSlot === slot.id && (
                        <SignupList slotId={slot.id} password={password} />
                      )}
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
