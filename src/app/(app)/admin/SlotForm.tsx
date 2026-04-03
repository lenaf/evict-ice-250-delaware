"use client";

import React, { useState } from "react";
import type { Slot } from "@/types/slots";

interface SlotFormProps {
  initial?: Slot;
  password: string;
  onSaved: () => void;
  onCancel: () => void;
}

export const SlotForm: React.FC<SlotFormProps> = ({ initial, password, onSaved, onCancel }) => {
  const [title, setTitle] = useState(initial?.title || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [date, setDate] = useState(initial?.date || "");
  const [startTime, setStartTime] = useState(initial?.start_time || "");
  const [endTime, setEndTime] = useState(initial?.end_time || "");
  const [location, setLocation] = useState(
    initial?.location || "250 Delaware Ave, Buffalo, NY",
  );
  const [target, setTarget] = useState(initial?.target_volunteers || 5);
  const [recurrence, setRecurrence] = useState(initial?.recurrence || "none");
  const [recurrenceEnd, setRecurrenceEnd] = useState(
    initial?.recurrence_end_date || "",
  );
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const body = {
      title,
      description: description || null,
      date,
      start_time: startTime,
      end_time: endTime,
      location,
      target_volunteers: target,
      recurrence,
      recurrence_end_date: recurrence !== "none" ? recurrenceEnd : null,
    };

    const url = initial ? `/api/slots/${initial.id}` : "/api/slots";
    const method = initial ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        onSaved();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to save");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <h2 className="font-black text-2xl">
        {initial ? "Edit Slot" : "Create Slot"}
      </h2>
      <input
        type="text"
        placeholder="Title *"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-3 py-2 border-2 border-black text-sm focus:outline-none focus:border-[#DC2626]"
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
        className="w-full px-3 py-2 border-2 border-black text-sm focus:outline-none focus:border-[#DC2626]"
      />
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-bold mb-1 uppercase">Date *</label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border-2 border-black text-sm focus:outline-none focus:border-[#DC2626]"
          />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1 uppercase">Start *</label>
          <input
            type="time"
            required
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full px-3 py-2 border-2 border-black text-sm focus:outline-none focus:border-[#DC2626]"
          />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1 uppercase">End *</label>
          <input
            type="time"
            required
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full px-3 py-2 border-2 border-black text-sm focus:outline-none focus:border-[#DC2626]"
          />
        </div>
      </div>
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full px-3 py-2 border-2 border-black text-sm focus:outline-none focus:border-[#DC2626]"
      />
      <div>
        <label className="block text-xs font-bold mb-1 uppercase">
          Target volunteers (minimum needed)
        </label>
        <input
          type="number"
          min={1}
          value={target}
          onChange={(e) => setTarget(parseInt(e.target.value) || 1)}
          className="w-24 px-3 py-2 border-2 border-black text-sm focus:outline-none focus:border-[#DC2626]"
        />
      </div>
      {!initial && (
        <>
          <div>
            <label className="block text-xs font-bold mb-1 uppercase">
              Recurrence
            </label>
            <select
              value={recurrence}
              onChange={(e) => setRecurrence(e.target.value as Slot["recurrence"])}
              className="w-full px-3 py-2 border-2 border-black text-sm focus:outline-none focus:border-[#DC2626]"
            >
              <option value="none">One-time</option>
              <option value="weekly">Weekly</option>
              <option value="biweekly">Biweekly</option>
            </select>
          </div>
          {recurrence !== "none" && (
            <div>
              <label className="block text-xs font-bold mb-1 uppercase">
                Repeat until
              </label>
              <input
                type="date"
                value={recurrenceEnd}
                onChange={(e) => setRecurrenceEnd(e.target.value)}
                className="w-full px-3 py-2 border-2 border-black text-sm focus:outline-none focus:border-[#DC2626]"
              />
            </div>
          )}
        </>
      )}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="bg-[#DC2626] hover:bg-black disabled:opacity-50 text-white font-bold py-2 px-6 transition-colors cursor-pointer"
        >
          {saving ? "Saving..." : initial ? "Update" : "Create"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-sm text-black/50 hover:text-black px-4 cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
