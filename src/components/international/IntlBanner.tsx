"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { visitorTz, isIndiaTz } from "@/lib/tz";
import { GlobeIcon } from "@/components/ui/GlobeIcon";

/** One-time, subtle note for visitors whose browser time zone is outside India. */
export function IntlBanner() {
  const [show, setShow] = useState(false);
  const path = usePathname();
  useEffect(() => {
    if (path === "/international") return;
    try {
      if (localStorage.getItem("lv_intl_banner")) return;
      const tz = visitorTz();
      if (isIndiaTz(tz)) return;
      const t = setTimeout(() => setShow(true), 2500);
      return () => clearTimeout(t);
    } catch {}
  }, [path]);
  const close = () => { setShow(false); try { localStorage.setItem("lv_intl_banner", "1"); } catch {} };
  if (!show || path === "/international") return null;
  return (
    <div role="region" aria-label="International visitors" className="fixed left-3 right-3 bottom-24 sm:left-6 sm:right-auto sm:bottom-6 z-40 sm:max-w-sm bg-bg-secondary border border-highlight/60 shadow-[0_10px_40px_rgba(42,42,42,0.15)] rounded-xl p-4 pr-10 lv-rise">
      <button onClick={close} aria-label="Dismiss" className="absolute right-2 top-2 h-8 w-8 text-text/60 hover:text-gold text-lg leading-none">×</button>
      <p className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-gold"><GlobeIcon /> Visiting from abroad?</p>
      <p className="mt-1.5 text-sm text-text/80">We work with clients worldwide. Register in two minutes and we&apos;ll set up a video call in your time zone.</p>
      <Link href="/international#register" onClick={close} className="mt-3 inline-flex rounded-full bg-coral px-4 py-2 text-xs font-medium text-white hover:bg-coral-dark">Register as an international client →</Link>
    </div>
  );
}
