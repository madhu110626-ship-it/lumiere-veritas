"use client";
import { useEffect } from "react";
import { sendOwnerEmail, istNow } from "@/lib/notifyClient";

const MIN_VISIBLE_MS = 5000;

// Sends one anonymous "new visitor" alert per browser session, and only after real-person signals:
// page visible, not an automated browser, browser languages set, and either some interaction
// (scroll / pointer / touch / key) or at least 5 seconds of visible time.
export function VisitPing() {
  useEffect(() => {
    try { if (sessionStorage.getItem("lv_visit")) return; } catch { return; }
    if (navigator.webdriver) return;
    if (!navigator.languages || navigator.languages.length === 0) return;

    let done = false, visibleMs = 0, visibleSince = document.visibilityState === "visible" ? performance.now() : 0;
    const page = location.pathname + location.search, referrer = document.referrer;
    const events = ["scroll", "pointermove", "pointerdown", "touchstart", "keydown", "wheel"] as const;

    const cleanup = () => {
      events.forEach((e) => window.removeEventListener(e, onInteract, true));
      document.removeEventListener("visibilitychange", onVis);
      clearInterval(timer);
    };
    const fire = () => {
      if (done || document.visibilityState !== "visible") return;
      done = true; cleanup();
      try { if (sessionStorage.getItem("lv_visit")) return; sessionStorage.setItem("lv_visit", "1"); } catch { return; }
      fetch("/api/visit", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ languages: Array.from(navigator.languages || []), webdriver: !!navigator.webdriver }),
      }).then((r) => r.json()).then((v) => {
        if (!v.ok || v.bot || v.skip) return;
        return sendOwnerEmail(`New website visitor — ${v.location}`, {
          Page: page, "Came from": referrer || "Direct / typed URL", Location: v.location, Device: v.device,
          Language: v.language, Time: istNow(), Note: "Anonymous visit. Name/email arrive only if they submit the enquiry form.",
        });
      }).catch(() => {});
    };
    function onInteract(e: Event) { if (e.isTrusted) fire(); }
    function onVis() {
      if (document.visibilityState === "visible") visibleSince = performance.now();
      else if (visibleSince) { visibleMs += performance.now() - visibleSince; visibleSince = 0; }
    }
    const timer = setInterval(() => {
      const total = visibleMs + (visibleSince ? performance.now() - visibleSince : 0);
      if (total >= MIN_VISIBLE_MS) fire();
    }, 1000);
    events.forEach((e) => window.addEventListener(e, onInteract, { capture: true, passive: true }));
    document.addEventListener("visibilitychange", onVis);
    return cleanup;
  }, []);
  return null;
}
