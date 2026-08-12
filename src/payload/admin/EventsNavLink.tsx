"use client";

import React from "react";

// Adds an "Events" entry to the Payload admin sidebar (via afterNavLinks) that
// jumps to the custom events admin at /admin-events. Same login (the Payload
// session), so this is just a second entry point — one place to sign in, both
// admins reachable from the sidebar.
export const EventsNavLink: React.FC = () => {
  return (
    <a
      href="/admin-events"
      className="nav__link"
      style={{
        display: "block",
        padding: "8px 0",
        textDecoration: "none",
      }}
    >
      📅 Events
    </a>
  );
};
