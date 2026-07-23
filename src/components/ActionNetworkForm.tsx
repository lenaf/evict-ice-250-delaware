"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const AN_WIDGET_URL =
  "https://actionnetwork.org/widgets/v6/form/join-us-426?format=js&source=widget";

const INPUT_CLASS =
  "px-3 py-2 bg-white border-2 border-black text-sm text-black placeholder:text-black/40 focus:outline-none focus:border-[#DC2626]";

interface ActionNetworkFormProps {
  /** Compact single-row layout (email + zip) for the footer signup bar. */
  compact?: boolean;
  /** Called when a signup succeeds (e.g. so the footer popup can dismiss). */
  onSuccess?: () => void;
}

export function ActionNetworkForm({
  compact = false,
  onSuccess,
}: ActionNetworkFormProps = {}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    zip: "",
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const anContainerRef = useRef<HTMLDivElement>(null);
  const anFormReady = useRef<HTMLFormElement | null>(null);

  // Load AN widget on mount so it's ready when user submits
  useEffect(() => {
    const container = anContainerRef.current;
    if (!container) return;

    const script = document.createElement("script");
    script.src = AN_WIDGET_URL;
    script.async = true;
    script.onerror = () => {};
    container.appendChild(script);

    // Poll until the AN form renders
    let attempts = 0;
    const interval = setInterval(() => {
      const form = container.querySelector("form");
      if (form) {
        anFormReady.current = form;
        clearInterval(interval);
      }
      if (++attempts > 100) {
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // Notify the parent (e.g. the footer popup) when a signup succeeds.
  useEffect(() => {
    if (status === "success") onSuccess?.();
  }, [status, onSuccess]);

  const setAnField = useCallback(
    (form: HTMLFormElement, selector: string, value: string) => {
      const el = form.querySelector<HTMLInputElement>(selector);
      if (!el) return;
      // Use native setter to bypass any framework wrappers
      const nativeSetter = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        "value",
      )?.set;
      if (nativeSetter) nativeSetter.call(el, value);
      else el.value = value;
      el.dispatchEvent(new Event("input", { bubbles: true }));
      el.dispatchEvent(new Event("change", { bubbles: true }));
      el.dispatchEvent(new Event("blur", { bubbles: true }));
    },
    [],
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    // Track form submission in GA4
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "form_submit", {
        event_category: "engagement",
        event_label: "newsletter_signup",
      });
    }

    try {
      const anForm = anFormReady.current;
      if (!anForm) {
        throw new Error("Action Network form not loaded yet");
      }

      // Inject or overwrite hidden fields for person data
      const injectField = (name: string, value: string) => {
        if (!value) return;
        let el = anForm.querySelector<HTMLInputElement>(
          `input[name="${name}"]`,
        );
        if (el) {
          el.value = value;
        } else {
          el = document.createElement("input");
          el.type = "hidden";
          el.name = name;
          el.value = value;
          anForm.appendChild(el);
        }
      };

      // AN uses these field names for person identification
      injectField("subscription[email]", formData.email);
      injectField("subscription[given_name]", formData.firstName);
      injectField("subscription[family_name]", formData.lastName);
      injectField("subscription[postal_code]", formData.zip);

      // Also try filling any visible fields AN may have rendered (for logged-out users)
      setAnField(anForm, "#form-first_name", formData.firstName);
      setAnField(anForm, "#form-last_name", formData.lastName);
      setAnField(anForm, "#form-email", formData.email);
      setAnField(anForm, "#form-zip_code", formData.zip);

      // Small delay to let AN's JS process the field changes
      await new Promise((r) => setTimeout(r, 300));

      // Submit via AN's own button
      const submitBtn = anForm.querySelector<HTMLElement>(
        'input[type="submit"], button[type="submit"]',
      );
      if (submitBtn) {
        submitBtn.click();
      } else {
        anForm.requestSubmit();
      }

      // Watch for AN's success response (it typically changes the form content)
      let resolved = false;
      const observer = new MutationObserver(() => {
        const container = anContainerRef.current;
        if (container) {
          const thankYou = container.querySelector(
            ".action_message_area, .after-submit, #thanks",
          );
          if (thankYou) {
            resolved = true;
            observer.disconnect();
            setStatus("success");
          }
        }
      });
      observer.observe(anContainerRef.current!, {
        childList: true,
        subtree: true,
      });

      // Fallback timeout
      setTimeout(() => {
        observer.disconnect();
        if (!resolved) {
          setStatus("success");
        }
      }, 4000);
    } catch (err) {
      void err;
      setStatus("error");
    }
  }

  return (
    <>
      {/* Hidden AN widget — loaded on mount, used for submission */}
      <div
        ref={anContainerRef}
        id="can-form-area-join-us-426"
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "1px",
          height: "1px",
          opacity: 0,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />

      {status === "success" ? (
        <div className={compact ? "py-2" : "text-center py-8"}>
          <p
            className={
              compact ? "font-bold text-lg" : "font-black text-5xl mb-3"
            }
          >
            You&apos;re in!
          </p>
          {!compact && (
            <p className="text-sm opacity-80">We&apos;ll be in touch soon.</p>
          )}
        </div>
      ) : compact ? (
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Email *"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={`${INPUT_CLASS} flex-1 min-w-0`}
            />
            <input
              type="text"
              inputMode="numeric"
              placeholder="ZIP *"
              pattern="\d{5}(-\d{4})?"
              maxLength={10}
              required
              value={formData.zip}
              onChange={(e) => {
                const sanitized = e.target.value.replace(/[^\d-]/g, "");
                setFormData({ ...formData, zip: sanitized });
              }}
              className={`${INPUT_CLASS} sm:w-24`}
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="bg-[#DC2626] hover:opacity-80 disabled:opacity-50 text-white font-black text-base tracking-wider py-2 px-6 border-2 border-[#DC2626] hover:border-black uppercase transition-all cursor-pointer whitespace-nowrap"
            >
              {status === "submitting" ? "..." : "Subscribe"}
            </button>
          </div>
          {status === "error" && (
            <p className="text-red-600 text-sm mt-2">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Mobile: first/last share a row, email + zip stack full-width.
              sm+: all four inline in a single row. */}
          <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-row">
            <input
              type="text"
              placeholder="First name"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              className={`${INPUT_CLASS} min-w-0 sm:flex-1`}
            />
            <input
              type="text"
              placeholder="Last name"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              className={`${INPUT_CLASS} min-w-0 sm:flex-1`}
            />
            <input
              type="email"
              placeholder="Email *"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={`${INPUT_CLASS} col-span-2 min-w-0 sm:flex-1`}
            />
            <input
              type="text"
              inputMode="numeric"
              placeholder="ZIP *"
              pattern="\d{5}(-\d{4})?"
              maxLength={10}
              required
              value={formData.zip}
              onChange={(e) => {
                const sanitized = e.target.value.replace(/[^\d-]/g, "");
                setFormData({ ...formData, zip: sanitized });
              }}
              className={`${INPUT_CLASS} col-span-2 sm:w-24 sm:flex-none`}
            />
          </div>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full bg-[#DC2626] hover:opacity-80 disabled:opacity-50 text-white font-black text-lg tracking-wider py-3 px-6 border-2 border-[#DC2626] hover:border-black uppercase transition-all cursor-pointer"
          >
            {status === "submitting" ? "Subscribing..." : "Subscribe"}
          </button>
          <p className="text-xs text-black/60">
            Your info is only used to keep you updated on this campaign. We
            never share it with third parties.
          </p>
          {status === "error" && (
            <p className="text-red-600 text-sm text-center">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      )}
    </>
  );
}
