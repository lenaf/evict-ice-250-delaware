"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const HELP_OPTIONS = [
  "Research",
  "Design",
  "Outreach",
  "Social Media",
  "Legal",
  "Events",
  "Other",
  "Just Stay Informed",
];

const AN_WIDGET_URL =
  "https://actionnetwork.org/widgets/v6/form/join-us-426?format=js&source=widget";

export function ActionNetworkForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    helpType: "",
    helpOther: "",
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
    script.onerror = (err) => console.error("AN widget failed to load:", err);
    container.appendChild(script);

    // Poll until the AN form renders
    let attempts = 0;
    const interval = setInterval(() => {
      const form = container.querySelector("form");
      if (form) {
        anFormReady.current = form;
        console.log("AN form loaded, fields:", Array.from(form.elements).map((el) => (el as HTMLInputElement).name || (el as HTMLElement).id).filter(Boolean));
        clearInterval(interval);
      }
      if (++attempts > 100) {
        console.warn("AN form never loaded");
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

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
      // Also inject person[] format as fallback
      injectField(
        "person[email_addresses_attributes][0][address]",
        formData.email,
      );
      injectField("person[given_name]", formData.firstName);
      injectField("person[family_name]", formData.lastName);
      if (formData.phone) {
        injectField("person[phone_numbers_attributes][0][number]", formData.phone);
        injectField("answer[phone]", formData.phone);
      }

      // Also try filling any visible fields AN may have rendered (for logged-out users)
      setAnField(anForm, "#form-first_name", formData.firstName);
      setAnField(anForm, "#form-last_name", formData.lastName);
      setAnField(anForm, "#form-email", formData.email);
      setAnField(anForm, "#form-phone_number", formData.phone);

      // Set the Interests radio if user selected a help type
      if (formData.helpType) {
        const radios = anForm.querySelectorAll<HTMLInputElement>('input[name="Interests"]');
        radios.forEach((radio) => {
          if (radio.value === formData.helpType) {
            radio.checked = true;
            radio.dispatchEvent(new Event("change", { bubbles: true }));
            radio.dispatchEvent(new Event("click", { bubbles: true }));
          }
        });
      }

      // If "Other", fill the text field
      if (formData.helpType === "Other" && formData.helpOther) {
        setAnField(anForm, '[name="Interests - Other"]', formData.helpOther);
      }

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
      console.error("Submission error:", err);
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
        <div className="text-center py-8">
          <p className="font-black text-5xl mb-3">You&apos;re in!</p>
          <p className="text-sm opacity-80">We&apos;ll be in touch soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="First name"
              required
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              className="w-full px-3 py-2 bg-white border-2 border-black text-sm text-black placeholder:text-black/40 focus:outline-none focus:border-[#DC2626]"
            />
            <input
              type="text"
              placeholder="Last name"
              required
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              className="w-full px-3 py-2 bg-white border-2 border-black text-sm text-black placeholder:text-black/40 focus:outline-none focus:border-[#DC2626]"
            />
          </div>
          <input
            type="email"
            placeholder="Email address"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-3 py-2 bg-white border-2 border-black text-sm text-black placeholder:text-black/40 focus:outline-none focus:border-[#DC2626]"
          />
          <input
            type="tel"
            placeholder="Phone number"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full px-3 py-2 bg-white border-2 border-black text-sm text-black placeholder:text-black/40 focus:outline-none focus:border-[#DC2626]"
          />

          <fieldset>
            <legend className="text-sm font-bold mb-2 uppercase tracking-wide">
              How can you help?
            </legend>
            <div className="grid grid-cols-2 gap-2">
              {HELP_OPTIONS.map((option) => (
                <label
                  key={option}
                  className={`flex items-center gap-2 px-3 py-2 border-2 text-sm cursor-pointer transition-colors ${
                    formData.helpType === option
                      ? "border-black bg-black text-white font-semibold"
                      : "border-black/20 hover:border-black"
                  }`}
                >
                  <input
                    type="radio"
                    name="helpType"
                    value={option}
                    checked={formData.helpType === option}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        helpType: e.target.value,
                        helpOther: "",
                      })
                    }
                    className="sr-only"
                  />
                  {option}
                </label>
              ))}
            </div>
            {formData.helpType === "Other" && (
              <input
                type="text"
                placeholder="Tell us how you'd like to help..."
                value={formData.helpOther}
                onChange={(e) =>
                  setFormData({ ...formData, helpOther: e.target.value })
                }
                className="w-full mt-2 px-3 py-2 bg-white border-2 border-black text-sm text-black placeholder:text-black/40 focus:outline-none focus:border-[#DC2626]"
              />
            )}
          </fieldset>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full bg-[#DC2626] hover:bg-black disabled:opacity-50 text-white font-black text-xl tracking-wider py-3 px-6 border-2 border-[#DC2626] hover:border-black uppercase transition-all"
          >
            {status === "submitting" ? "Signing up..." : "Join the Fight"}
          </button>

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
