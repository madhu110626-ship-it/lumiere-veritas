"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { EnquiryForm } from "./EnquiryForm";

export function EnquiryModal() {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const pathname = usePathname();
  const onIntl = pathname?.startsWith("/international") || pathname?.startsWith("/visitors");

  useEffect(() => {
    if (onIntl) return;
    try { if (sessionStorage.getItem("lv_enquiry_shown")) return; } catch {}
    const t = setTimeout(() => {
      try { sessionStorage.setItem("lv_enquiry_shown", "1"); } catch {}
      lastFocus.current = document.activeElement as HTMLElement;
      setOpen(true);
    }, 1500);
    return () => clearTimeout(t);
  }, [onIntl]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const el = dialog.current;
    el?.querySelector<HTMLElement>("button[data-skip]")?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { try { sessionStorage.setItem("lv_enquiry_skipped", "1"); } catch {} setOpen(false); }
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

  const close = () => { try { sessionStorage.setItem("lv_enquiry_shown", "1"); sessionStorage.setItem("lv_enquiry_skipped", "1"); } catch {} setOpen(false); };
  const skipBtn = "flex w-full items-center justify-center rounded-full border-2 border-coral bg-bg px-5 py-3.5 text-sm font-semibold tracking-wide text-coral hover:bg-coral hover:text-white transition-colors min-h-[48px]";

  if (!open || onIntl) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6 lv-fade" onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }} style={{ background: "rgba(42,42,42,0.55)", backdropFilter: "blur(6px)" }}>
      <div ref={dialog} role="dialog" aria-modal="true" aria-labelledby="lv-modal-title" className="relative w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto bg-bg-secondary border border-highlight/50 sm:rounded-sm rounded-t-2xl shadow-[0_0_80px_rgba(42,42,42,0.18)] lv-rise">
        <div className="sticky top-0 z-10 bg-bg-secondary/95 backdrop-blur border-b border-text/10 px-6 pt-5 pb-4 sm:px-10 sm:pt-7">
          <button type="button" onClick={close} aria-label="Close enquiry form" className="absolute right-3 top-3 sm:right-5 sm:top-5 inline-flex items-center gap-1.5 rounded-full bg-text px-3.5 py-2 text-white hover:bg-coral transition-colors">
            <span className="text-2xl leading-none" aria-hidden>×</span><span className="text-xs font-semibold uppercase tracking-[0.15em]">Close</span>
          </button>
          <p className="mb-2 text-xs tracking-[0.28em] uppercase text-gold">Start a project</p>
          <h2 id="lv-modal-title" className="font-display text-2xl sm:text-4xl font-medium leading-tight text-text pr-24 sm:pr-28">
            Have an idea? <span className="text-gold">Let&apos;s make it visible.</span>
          </h2>
          <p className="mt-2 mb-3 text-sm text-text/60">Share a few details and our team will reach out within 24 hours.</p>
          <button type="button" data-skip onClick={close} className={skipBtn}>Skip — take me to the website →</button>
        </div>
        <div className="px-6 pt-6 pb-8 sm:px-10 sm:pb-10">
          <EnquiryForm source="popup" compact idPrefix="m" />
          <button type="button" onClick={close} className={`${skipBtn} mt-6`}>Skip — take me to the website →</button>
        </div>
      </div>
    </div>
  );
}
