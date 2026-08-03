"use client";

import { useEffect, useRef, useState } from "react";

const AN_WIDGET_URL =
  "https://actionnetwork.org/widgets/v6/form/evict-ice-join-us?format=js&source=widget";

// AN conditionally renders a "Not in [country]?" link to reveal the country
// dropdown (based on geo/IP), with inconsistent classes. Hide it by its text
// so it never shows regardless of how AN renders it.
const hideCountryToggle = (container: HTMLElement) => {
  container.querySelectorAll<HTMLElement>("a").forEach((a) => {
    if (a.style.display !== "none" && /^\s*not in\b/i.test(a.textContent || "")) {
      a.style.display = "none";
    }
  });
};

// Embeds Action Network's real join form and lets people fill it directly, so
// signups actually reach AN. The form is restyled to match the site via the
// `.an-embed` rules in globals.css. AN's own JS handles submission/validation.
export function ActionNetworkForm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    // Don't inject twice (React strict mode / remounts).
    if (container.querySelector("script, form")) return;

    const script = document.createElement("script");
    script.src = AN_WIDGET_URL;
    script.async = true;
    container.appendChild(script);

    let observer: MutationObserver | undefined;
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
        // Relabel AN's submit button and hide the country toggle if present.
        submit.value = "Subscribe";
        hideCountryToggle(container);
        // The form is loaded. After a successful submit AN either removes the
        // form or hides it and swaps in its own share/goal screen. Detect
        // either case (removed OR hidden) and show our clean confirmation.
        observer = new MutationObserver(() => {
          hideCountryToggle(container);
          const f = container.querySelector<HTMLFormElement>("form");
          if (!f || f.offsetParent === null) setSubmitted(true);
        });
        observer.observe(container, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ["style", "class"],
        });
        clearInterval(interval);
      }
      if (++tries > 100) clearInterval(interval);
    }, 200);

    return () => {
      clearInterval(interval);
      observer?.disconnect();
    };
  }, []);

  return (
    <div>
      {submitted && (
        <div className="text-center py-8">
          <p className="font-black text-5xl mb-3">You&apos;re in!</p>
          <p className="text-sm opacity-80">We&apos;ll be in touch soon.</p>
        </div>
      )}
      {/* AN renders its real form into this container; kept mounted but hidden
          after submit so its share screen doesn't show. */}
      <div
        ref={containerRef}
        id="can-form-area-evict-ice-join-us"
        className="an-embed"
        style={submitted ? { display: "none" } : undefined}
      />
      {!submitted && (
        <p className="mt-3 text-xs text-black/55">
          Your info is only used to keep you updated on this campaign. We never
          share it with third parties.
        </p>
      )}
    </div>
  );
}
