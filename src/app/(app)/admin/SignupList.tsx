"use client";

import React, { useState, useEffect } from "react";
import type { Signup } from "@/types/slots";

interface SignupListProps {
  slotId: string;
  password: string;
}

export const SignupList: React.FC<SignupListProps> = ({ slotId, password }) => {
  const [signups, setSignups] = useState<Signup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/slots/${slotId}`, {
      headers: { "x-admin-password": password },
    })
      .then((r) => r.json())
      .then((data) => setSignups(data.signups || []))
      .finally(() => setLoading(false));
  }, [slotId, password]);

  if (loading) return <p className="text-sm text-black/50">Loading...</p>;
  if (signups.length === 0)
    return <p className="text-sm text-black/50">No signups yet.</p>;

  return (
    <div className="mt-3 border-t border-black/10 pt-3">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs uppercase text-black/50">
            <th className="pb-1">Name</th>
            <th className="pb-1">Email</th>
            <th className="pb-1">Phone</th>
          </tr>
        </thead>
        <tbody>
          {signups.map((s) => (
            <tr key={s.id} className="border-t border-black/5">
              <td className="py-1">{s.name}</td>
              <td className="py-1">{s.email}</td>
              <td className="py-1">{s.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
