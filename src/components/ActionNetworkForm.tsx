"use client";

import { useState, useCallback, useRef } from "react";

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

  const loadAnWidget = useCallback((): Promise<HTMLFormElement> => {
    return new Promise((resolve, reject) => {
      const container = anContainerRef.current;
      if (!container) return reject(new Error("Container not found"));

      // Clear any previous widget content
      container.innerHTML = "";

      // Remove any previously injected AN scripts
      document
        .querySelectorAll('script[src*="actionnetwork.org/widgets"]')
        .forEach((s) => s.remove());

      // Inject a fresh script
      const script = document.createElement("script");
      script.src = AN_WIDGET_URL;
      script.async = true;
      document.body.appendChild(script);

      // Poll for the form to appear
      let attempts = 0;
      const interval = setInterval(() => {
        const form = container.querySelector("form");
        if (form) {
          clearInterval(interval);
          resolve(form);
        }
        if (++attempts > 50) {
          clearInterval(interval);
          reject(new Error("AN form did not load"));
        }
      }, 100);
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    try {
      // Load a fresh AN widget
      const anForm = await loadAnWidget();

      // Fill or inject Action Network form fields
      const setField = (name: string, selector: string, value: string) => {
        let el = anForm.querySelector<HTMLInputElement>(selector);
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

      setField(
        "answer[first_name]",
        '#form-first_name, [name="answer[first_name]"]',
        formData.firstName
      );
      setField(
        "answer[last_name]",
        '#form-last_name, [name="answer[last_name]"]',
        formData.lastName
      );
      setField(
        "answer[email]",
        '#form-email, [name="answer[email]"]',
        formData.email
      );
      setField(
        "answer[phone]",
        '#form-phone, [name="answer[phone]"]',
        formData.phone
      );

      // Set the matching Interests radio button
      const skillValue =
        formData.helpType === "Other" ? "Other" : formData.helpType;
      const radio = anForm.querySelector<HTMLInputElement>(
        `input[name="Interests"][value="${skillValue}"]`
      );
      if (radio) radio.checked = true;

      // If "Other", fill in the text field
      if (formData.helpType === "Other" && formData.helpOther) {
        setField(
          "Interests - Other",
          '#Interests-_-Other, [name="Interests - Other"]',
          formData.helpOther
        );
      }

      // Click the AN submit button
      const submitBtn = anForm.querySelector<HTMLInputElement>(
        'input[type="submit"], button[type="submit"]'
      );
      if (submitBtn) {
        submitBtn.click();
      } else {
        anForm.submit();
      }

      // Wait for AN to process, then show success
      setTimeout(() => setStatus("success"), 1500);
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
    }
  }

  return (
    <>
      {/* Hidden Action Network form container — always rendered */}
      <div
        ref={anContainerRef}
        id="can-form-area-join-us-426"
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
          pointerEvents: "none",
        }}
      />

      {status === "success" ? (
        <div className="text-center py-8">
          <p className="font-black text-5xl mb-3">You&apos;re in!</p>
          <p className="text-sm opacity-80">
            We&apos;ll be in touch soon. Together, we&apos;ll evict ICE from 250
            Delaware.
          </p>
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
