"use client";

import React, { useState } from "react";
import type { Slot } from "@/types/slots";

interface DateRow {
  id?: string; // present → an existing slot row; absent → a new date
  date: string;
  signup_count?: number;
}

interface SlotFormProps {
  // The event being edited: all of its date-rows (slots sharing a group_id).
  // Undefined/empty → creating a new event.
  groupSlots?: Slot[];
  // Seed shared fields from here without entering edit mode (used by Duplicate).
  seedFrom?: Slot;
  onSaved: () => void;
  onCancel: () => void;
}

export const SlotForm: React.FC<SlotFormProps> = ({ groupSlots, seedFrom, onSaved, onCancel }) => {
  const isEdit = !!groupSlots && groupSlots.length > 0;
  const groupId = groupSlots?.[0]?.group_id;
  const base = groupSlots?.[0] ?? seedFrom;

  const [type, setType] = useState<"picket" | "event">(base?.type || "picket");
  const [title, setTitle] = useState(base?.title || "");
  const [description, setDescription] = useState(base?.description || "");
  const [startTime, setStartTime] = useState(base?.start_time || "");
  const [endTime, setEndTime] = useState(base?.end_time || "");
  const [location, setLocation] = useState(
    base?.location || "250 Delaware Ave, Buffalo, NY",
  );
  const [target, setTarget] = useState<string>(
    base?.target_volunteers != null ? String(base.target_volunteers) : "",
  );
  const [signupLink, setSignupLink] = useState(base?.signup_link || "");
  const [imageUrl, setImageUrl] = useState(base?.image_url || "");
  const [featured, setFeatured] = useState(base?.featured ?? false);
  const [dates, setDates] = useState<DateRow[]>(
    isEdit
      ? [...groupSlots!]
          .sort((a, b) => a.date.localeCompare(b.date))
          .map((s) => ({ id: s.id, date: s.date, signup_count: s.signup_count }))
      : [{ date: "" }],
  );
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const setDate = (i: number, value: string) =>
    setDates((rows) => rows.map((r, idx) => (idx === i ? { ...r, date: value } : r)));

  const addDate = () => setDates((rows) => [...rows, { date: "" }]);

  const removeDate = (i: number) => {
    const row = dates[i];
    if (row.signup_count && row.signup_count > 0) {
      if (
        !confirm(
          `This date has ${row.signup_count} signed-up volunteer(s), who will be notified it's cancelled. Remove it?`,
        )
      )
        return;
    }
    setDates((rows) => rows.filter((_, idx) => idx !== i));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please choose an image file.");
      return;
    }
    setUploading(true);
    try {
      const data = new FormData();
      data.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: data });
      const json = await res.json();
      if (res.ok) setImageUrl(json.url);
      else alert(json.error || "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanDates = dates.filter((d) => d.date);
    if (cleanDates.length === 0) {
      alert("Add at least one date.");
      return;
    }
    setSaving(true);

    const shared = {
      type,
      title,
      description: description || null,
      start_time: startTime,
      end_time: endTime,
      location,
      target_volunteers: target ? parseInt(target) : null,
      signup_link: signupLink || null,
      image_url: imageUrl || null,
      featured,
    };

    const url = isEdit ? `/api/slots/group/${groupId}` : "/api/slots";
    const method = isEdit ? "PUT" : "POST";
    const body = isEdit
      ? { ...shared, dates: cleanDates.map((d) => ({ id: d.id, date: d.date })) }
      : { ...shared, dates: cleanDates.map((d) => d.date) };

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) onSaved();
      else {
        const data = await res.json();
        alert(data.error || "Failed to save");
      }
    } finally {
      setSaving(false);
    }
  };

  const input =
    "w-full px-3 py-2 border-2 border-black text-sm focus:outline-none focus:border-[#DC2626]";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <h2 className="font-black text-2xl">{isEdit ? "Edit Event" : "Create Event"}</h2>
      <div>
        <label className="block text-xs font-bold mb-1 uppercase">Type *</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as "picket" | "event")}
          className={input}
        >
          <option value="picket">Picket</option>
          <option value="event">Event</option>
        </select>
      </div>
      <input
        type="text"
        placeholder="Title *"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={input}
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
        className={input}
      />

      <div>
        <label className="block text-xs font-bold mb-1 uppercase">Dates *</label>
        <p className="text-xs text-black/50 mb-2">
          One entry per date. All dates share the details above; each shows
          separately on the site with its own signups.
        </p>
        <div className="space-y-2">
          {dates.map((row, i) => (
            <div key={row.id ?? `new-${i}`} className="flex items-center gap-2">
              <input
                type="date"
                required
                value={row.date}
                onChange={(e) => setDate(i, e.target.value)}
                className={input}
              />
              {row.signup_count ? (
                <span className="text-xs text-black/50 whitespace-nowrap">
                  {row.signup_count} signed up
                </span>
              ) : null}
              <button
                type="button"
                onClick={() => removeDate(i)}
                disabled={dates.length === 1}
                aria-label="Remove date"
                className="text-lg leading-none px-2 text-black/40 hover:text-[#DC2626] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addDate}
          className="mt-2 text-sm font-bold text-[#1E3A8A] hover:text-black cursor-pointer"
        >
          + Add date
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold mb-1 uppercase">Start *</label>
          <input
            type="time"
            required
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className={input}
          />
        </div>
        <div>
          <label className="block text-xs font-bold mb-1 uppercase">End *</label>
          <input
            type="time"
            required
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className={input}
          />
        </div>
      </div>
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className={input}
      />
      <div>
        <label className="block text-xs font-bold mb-1 uppercase">
          Target volunteers (optional)
        </label>
        <input
          type="number"
          min={1}
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="Leave blank if n/a"
          className={input}
        />
      </div>
      <div>
        <label className="block text-xs font-bold mb-1 uppercase">
          External signup link (optional)
        </label>
        <input
          type="url"
          value={signupLink}
          onChange={(e) => setSignupLink(e.target.value)}
          placeholder="https://..."
          className={input}
        />
      </div>
      <div>
        <label className="block text-xs font-bold mb-1 uppercase">Photo (optional)</label>
        {imageUrl ? (
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt="Event"
              className="h-20 w-20 object-cover border-2 border-black"
            />
            <button
              type="button"
              onClick={() => setImageUrl("")}
              className="text-sm text-[#DC2626] hover:text-black underline cursor-pointer"
            >
              Remove
            </button>
          </div>
        ) : (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={uploading}
            className="w-full text-sm file:mr-3 file:border-2 file:border-black file:bg-white file:px-3 file:py-1 file:font-bold file:cursor-pointer disabled:opacity-50"
          />
        )}
        {uploading && <p className="text-xs text-black/50 mt-1">Uploading…</p>}
      </div>
      <label className="flex items-start gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
          className="mt-0.5 h-4 w-4 accent-[#DC2626]"
        />
        <span>
          <span className="block text-xs font-bold uppercase">Feature on homepage</span>
          <span className="block text-xs text-black/50">
            Featured events show on the homepage (next date), alongside the next
            weekly picket.
          </span>
        </span>
      </label>
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="bg-[#DC2626] hover:opacity-80 disabled:opacity-50 text-white font-bold py-2 px-6 transition cursor-pointer"
        >
          {saving ? "Saving..." : isEdit ? "Update" : "Create"}
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
