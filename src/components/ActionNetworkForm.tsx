"use client";

import { useEffect, useRef } from "react";

const AN_WIDGET_URL =
  "https://actionnetwork.org/widgets/v6/form/evict-ice-join-us?format=js&source=widget";

// Embeds Action Network's real join form and lets people fill it directly, so
// signups actually reach AN. The form is restyled to match the site via the
// `.an-embed` rules in globals.css. AN's own JS handles submission/validation.
export function ActionNetworkForm() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    // Don't inject twice (React strict mode / remounts).
    if (container.querySelector("script, form")) return;

    const script = document.createElement("script");
    script.src = AN_WIDGET_URL;
    script.async = true;
    container.appendChild(script);

    // Once AN renders the form: relabel its submit button and default the
    // hidden country field to US (it's required but we hide it via CSS).
    let tries = 0;
    const interval = setInterval(() => {
      const submit = container.querySelector<HTMLInputElement>(
        'input[name="commit"]',
      );
      const country = container.querySelector<HTMLSelectElement>("#form-country");
      if (country && !country.value) {
        country.value = "US";
        country.dispatchEvent(new Event("change", { bubbles: true }));
      }
      if (submit) {
        submit.value = "Subscribe";
        clearInterval(interval);
      }
      if (++tries > 100) clearInterval(interval);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div ref={containerRef} id="can-form-area-evict-ice-join-us" className="an-embed" />
      <p className="mt-3 text-xs text-black/55">
        Your info is only used to keep you updated on this campaign. We never
        share it with third parties.
      </p>
    </div>
  );
}
