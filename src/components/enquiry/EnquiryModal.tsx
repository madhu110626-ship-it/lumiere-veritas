"use client";
import { useEffect, useRef, useState } from "react";
import { EnquiryForm } from "./EnquiryForm";

export function EnquiryModal() {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    try { if (sessionStorage.getItem("lv_enquiry_shown")) return; } catch {}
    const t = setTimeout(() => {
      try { sessionStorage.setItem("lv_enquiry_shown", "1"); } catch {}
      lastFocus.current = document.activeElement as HTMLElement;
      setOpen(true);
    }, 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const el = dialog.current;
    el?.querySelector<HTMLElement>("input:not([tabindex='-1'])")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && el) {
        const f = Array.from(el.querySelectorAll<HTMLElement>("button, a[href], input:not([tabindex='-1']), select, textarea")).filter((x) => !x.hasAttribute("disabled"));
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener("keydown", onKey); lastFocus.current?.focus?.(); };
  }, [open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6 lv-fade" onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(false); }} style={{ background: "rgba(42,42,42,0.55)", backdropFilter: "blur(6px)" }}>
      <div ref={dialog} role="dialog" aria-modal="true" aria-labelledby="lv-modal-title" className="relative w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto bg-bg-secondary border border-highlight/50 sm:rounded-sm rounded-t-2xl shadow-[0_0_80px_rgba(42,42,42,0.18)] px-6 py-8 sm:px-10 sm:py-10 lv-rise">
        <button type="button" onClick={() => setOpen(false)} aria-label="Close enquiry form" className="absolute right-4 top-4 h-10 w-10 rounded-full border border-text/15 text-text/70 hover:text-gold hover:border-gold transition-colors text-xl leading-none">×</button>
        <p className="mb-3 text-xs tracking-[0.28em] uppercase text-gold">Start a project</p>
        <h2 id="lv-modal-title" className="font-display text-3xl sm:text-4xl font-medium leading-tight text-text pr-10">
          Have an idea? <span className="text-gold">Let&apos;s make it visible.</span>
        </h2>
        <p className="mt-3 mb-6 text-sm text-text/60">Share a few details and our team will reach out within 24 hours.</p>
        <EnquiryForm source="popup" compact idPrefix="m" />
      </div>
    </div>
  );
}
