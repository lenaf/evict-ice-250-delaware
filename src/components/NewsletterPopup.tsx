"use client";

import { useCallback, useEffect, useState } from "react";
import { ActionNetworkForm } from "@/components/ActionNetworkForm";

const DISMISS_KEY = "evictice_newsletter_dismissed";
const DISMISS_DAYS = 30;
const SCROLL_REVEAL = 0.35; // reveal once 35% of the page is scrolled
const TIME_REVEAL_MS = 12000; // ...or after 12s, whichever comes first

/** True if the user dismissed recently or already signed up. */
const wasDismissed = (): boolean => {
  try {
    const raw = localStorage.getItem(DISMISS_KEY);
    if (!raw) return false;
    if (raw === "signed-up") return true; // permanent after a successful signup
    const ts = Number(raw);
    if (Number.isNaN(ts)) return true;
    return Date.now() - ts < DISMISS_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false; // storage blocked — fail open, still let them dismiss in-session
  }
};

const persistDismissal = (value: string) => {
  try {
    localStorage.setItem(DISMISS_KEY, value);
  } catch {
    // ignore storage errors
  }
};

/**
 * NewsletterPopup — a dismissible bottom bar that nudges newsletter signups.
 *
 * Best-practice behavior: appears only after engagement (scroll or delay), never
 * on immediate load; is easy to dismiss (X or Esc) and remembers the dismissal;
 * hides while the inline #join form is on screen so the same form isn't shown
 * twice; and disappears for good once the visitor subscribes.
 */
export function NewsletterPopup() {
  const [mounted, setMounted] = useState(false); // in the DOM once triggered
  const [shown, setShown] = useState(false); // drives the slide-in transform
  const [joinInView, setJoinInView] = useState(false);

  const dismiss = useCallback(() => {
    setShown(false);
    persistDismissal(String(Date.now()));
    window.setTimeout(() => setMounted(false), 300);
  }, []);

  const handleSuccess = useCallback(() => {
    persistDismissal("signed-up");
    window.setTimeout(() => {
      setShown(false);
      window.setTimeout(() => setMounted(false), 300);
    }, 3000);
  }, []);

  // Reveal on scroll depth or after a delay, whichever fires first.
  useEffect(() => {
    if (wasDismissed()) return;

    let done = false;
    let timer = 0;
    const reveal = () => {
      if (done) return;
      done = true;
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      setMounted(true);
    };
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= SCROLL_REVEAL) reveal();
    };

    timer = window.setTimeout(reveal, TIME_REVEAL_MS);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Once mounted, trigger the slide-in on the next frame.
  useEffect(() => {
    if (!mounted) return;
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, [mounted]);

  // Esc dismisses; suppress while the inline #join form is visible.
  useEffect(() => {
    if (!mounted) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);

    const join = document.getElementById("join");
    let observer: IntersectionObserver | undefined;
    if (join) {
      observer = new IntersectionObserver(
        ([entry]) => setJoinInView(entry.isIntersecting),
        { threshold: 0.2 },
      );
      observer.observe(join);
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      observer?.disconnect();
    };
  }, [mounted, dismiss]);

  if (!mounted) return null;

  const offscreen = !shown || joinInView;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Newsletter signup"
      className={`fixed inset-x-0 bottom-0 z-50 bg-white border-t-2 border-black transition-transform duration-300 ease-out motion-reduce:transition-none ${
        offscreen ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="relative mx-auto max-w-5xl px-4 py-4 pr-12 md:px-8">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss newsletter signup"
          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center border-2 border-black bg-white text-black hover:bg-black hover:text-white cursor-pointer transition-colors"
        >
          <span aria-hidden="true" className="text-lg leading-none">
            &times;
          </span>
        </button>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
          <div className="md:flex-1">
            <p className="font-black uppercase tracking-wide text-lg leading-tight">
              Sign up for our newsletter
            </p>
            <p className="text-xs text-black/60">
              Campaign news, events, and ways to help. No spam.
            </p>
          </div>
          <div className="w-full md:flex-[2]">
            <ActionNetworkForm compact onSuccess={handleSuccess} />
          </div>
        </div>
      </div>
    </div>
  );
}
