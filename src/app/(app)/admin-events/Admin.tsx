"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import type { Slot } from "@/types/slots";
import { formatDate, formatTime } from "@/lib/format";
import { SlotForm } from "./SlotForm";
import { SignupList } from "./SignupList";

interface EventGroup {
  groupId: string;
  slots: Slot[]; // sorted by date ascending
}

// Collapse the flat slot list into one entry per logical event (group_id),
// dates sorted, groups ordered by their soonest date.
function groupSlots(slots: Slot[]): EventGroup[] {
  const map = new Map<string, Slot[]>();
  for (const s of slots) {
    const key = s.group_id || s.id;
    (map.get(key) ?? map.set(key, []).get(key)!).push(s);
  }
  const groups = [...map.entries()].map(([groupId, rows]) => ({
    groupId,
    slots: rows.sort((a, b) => a.date.localeCompare(b.date)),
  }));
  return groups.sort((a, b) => a.slots[0].date.localeCompare(b.slots[0].date));
}

export const Admin: React.FC = () => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingGroup, setEditingGroup] = useState<Slot[] | undefined>();
  const [seedSlot, setSeedSlot] = useState<Slot | undefined>();
  const [expandedDate, setExpandedDate] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showForm) formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [showForm, editingGroup, seedSlot]);

  const fetchSlots = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/slots");
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

  const closeForm = () => {
    setShowForm(false);
    setEditingGroup(undefined);
    setSeedSlot(undefined);
  };

  const openNew = () => {
    setEditingGroup(undefined);
    setSeedSlot(undefined);
    setShowForm(true);
  };
  const openEdit = (group: EventGroup) => {
    setEditingGroup(group.slots);
    setSeedSlot(undefined);
    setShowForm(true);
  };
  const openDuplicate = (group: EventGroup) => {
    setSeedSlot(group.slots[0]);
    setEditingGroup(undefined);
    setShowForm(true);
  };

  const handleDeleteEvent = async (group: EventGroup) => {
    const dateWord = group.slots.length > 1 ? `${group.slots.length} dates` : "this date";
    if (!confirm(`Delete this event (${dateWord})? Signed-up volunteers will be notified.`))
      return;
    await fetch(`/api/slots/group/${group.groupId}`, { method: "DELETE" });
    fetchSlots();
  };

  const today = new Date().toISOString().split("T")[0];
  const groups = groupSlots(slots);
  // A group is "upcoming" if any of its dates is today or later.
  const upcoming = groups.filter((g) => g.slots.some((s) => s.date >= today));
  const past = groups.filter((g) => g.slots.every((s) => s.date < today)).reverse();

  const formKey =
    editingGroup?.[0]?.group_id ?? (seedSlot ? `dup-${seedSlot.id}` : "new");

  const renderGroup = (group: EventGroup, dim: boolean) => {
    const totalSignups = group.slots.reduce((n, s) => n + (s.signup_count || 0), 0);
    const base = group.slots[0];
    return (
      <div
        key={group.groupId}
        className={dim ? "border border-black/20 p-4" : "border-2 border-black p-4"}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className={dim ? "font-bold" : "font-black text-lg"}>{base.title}</p>
            <p className="text-sm text-black/60">
              {formatTime(base.start_time)} – {formatTime(base.end_time)} &middot;{" "}
              {base.location}
            </p>
            <p className="text-sm font-semibold mt-1">
              {group.slots.length} date{group.slots.length > 1 ? "s" : ""} &middot;{" "}
              {totalSignups} signed up
              {base.target_volunteers ? ` (target ${base.target_volunteers}/date)` : ""}
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => openEdit(group)}
              className="text-xs font-bold text-black/50 hover:text-black px-2 py-1 border border-black/20 hover:border-black transition cursor-pointer"
            >
              Edit
            </button>
            <button
              onClick={() => openDuplicate(group)}
              className="text-xs font-bold text-black/50 hover:text-black px-2 py-1 border border-black/20 hover:border-black transition cursor-pointer"
            >
              Duplicate
            </button>
            <button
              onClick={() => handleDeleteEvent(group)}
              className="text-xs font-bold text-[#DC2626] hover:opacity-80 px-2 py-1 border border-[#DC2626] transition cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
        <div className="mt-3 border-t border-black/10 pt-2 space-y-1">
          {group.slots.map((s) => (
            <div key={s.id}>
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className={s.date < today ? "text-black/40" : ""}>
                  {formatDate(s.date)}
                  {s.date < today ? " (past)" : ""}
                </span>
                <span className="flex items-center gap-3">
                  <span className="text-black/50">{s.signup_count || 0} signed up</span>
                  <button
                    onClick={() =>
                      setExpandedDate(expandedDate === s.id ? null : s.id)
                    }
                    className="text-xs font-bold text-[#1E3A8A] hover:text-black cursor-pointer"
                  >
                    {expandedDate === s.id ? "Hide" : "Signups"}
                  </button>
                </span>
              </div>
              {expandedDate === s.id && <SignupList slotId={s.id} />}
            </div>
          ))}
        </div>
      </div>
    );
  };

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
            onClick={openNew}
            className="bg-[#DC2626] hover:opacity-80 text-white font-bold text-sm py-2 px-5 transition cursor-pointer"
          >
            + New Event
          </button>
        </div>

        {showForm && (
          <div ref={formRef} className="mb-10 p-6 border-2 border-[#FFD600] bg-[#FFD600]/5">
            <SlotForm
              key={formKey}
              groupSlots={editingGroup}
              seedFrom={seedSlot}
              onSaved={() => {
                closeForm();
                fetchSlots();
              }}
              onCancel={closeForm}
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
                {upcoming.map((g) => renderGroup(g, false))}
              </div>
            )}

            {past.length > 0 && (
              <>
                <h2 className="font-black text-xl mb-4 text-black/40">
                  Past ({past.length})
                </h2>
                <div className="space-y-4 opacity-60">
                  {past.map((g) => renderGroup(g, true))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
};
