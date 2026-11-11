"use client";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Visit } from "@/lib/visitStore";

const GlobeView = dynamic(() => import("./GlobeView"), {
  ssr: false,
  loading: () => <div className="h-full w-full grid place-items-center text-[#FBF3E6]/40 text-sm tracking-[0.2em] uppercase">Loading globe…</div>,
});

const GOLD = "#C9A45C", CORAL = "#EE5A4C", CREAM = "#FBF3E6";
const DAY = 86400000;
const RANGES = [
  { id: "all", label: "All time", ms: Infinity },
  { id: "30", label: "30 days", ms: 30 * DAY },
  { id: "7", label: "7 days", ms: 7 * DAY },
] as const;
type RangeId = (typeof RANGES)[number]["id"];

const istDay = (t: number) => new Date(t).toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
const istTime = (t: number) => new Date(t).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", hour: "numeric", minute: "2-digit", hour12: true });
const flag = (cc: string) => (/^[A-Z]{2}$/.test(cc) && cc !== "XX" ? String.fromCodePoint(...[...cc].map((c) => 127397 + c.charCodeAt(0))) : "🌐");
function ago(t: number, now: number) {
  const s = Math.max(0, Math.round((now - t) / 1000));
  if (s < 60) return "just now";
  const m = Math.round(s / 60); if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60); if (h < 24) return `${h} hr ago`;
  const d = Math.round(h / 24); return `${d} day${d > 1 ? "s" : ""} ago`;
}

export type CountryStat = { cc: string; country: string; count: number };
export type CityStat = { key: string; city: string; country: string; cc: string; lat: number; lon: number; count: number; last: number };

export function VisitorsDashboard({ visits, error, now: serverNow }: { visits: Visit[]; error: string; now: number }) {
  const router = useRouter();
  const [range, setRange] = useState<RangeId>("all");
  const [now, setNow] = useState(serverNow);
  const [showAll, setShowAll] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => { router.refresh(); setNow(Date.now()); }, 60000);
    return () => clearInterval(t);
  }, [router, serverNow]);

  const ms = RANGES.find((r) => r.id === range)!.ms;
  const inRange = useMemo(() => visits.filter((v) => now - v.t <= ms), [visits, ms, now]);

  const countries = useMemo<CountryStat[]>(() => {
    const m = new Map<string, CountryStat>();
    for (const v of inRange) { const c = m.get(v.cc) || { cc: v.cc, country: v.country, count: 0 }; c.count++; m.set(v.cc, c); }
    return [...m.values()].sort((a, b) => b.count - a.count || a.country.localeCompare(b.country));
  }, [inRange]);

  const cities = useMemo<CityStat[]>(() => {
    const m = new Map<string, CityStat>();
    for (const v of inRange) {
      if (v.lat == null || v.lon == null) continue;
      const key = `${v.cc}|${v.city || `${v.lat.toFixed(1)},${v.lon.toFixed(1)}`}`;
      const c = m.get(key) || { key, city: v.city || "Unknown city", country: v.country, cc: v.cc, lat: v.lat, lon: v.lon, count: 0, last: 0 };
      c.count++; c.last = Math.max(c.last, v.t); m.set(key, c);
    }
    return [...m.values()].sort((a, b) => b.count - a.count);
  }, [inRange]);

  const today = istDay(now);
  const todayCount = visits.filter((v) => istDay(v.t) === today).length;
  const weekCount = visits.filter((v) => now - v.t <= 7 * DAY).length;
  const max = countries[0]?.count || 1;
  const recent = inRange.slice(0, showAll ? 100 : 12);
  const since = visits.length ? visits[visits.length - 1].t : null;

  const cards = [
    { label: range === "all" ? "Total visits" : `Visits · ${RANGES.find((r) => r.id === range)!.label}`, value: inRange.length, accent: GOLD },
    { label: "Countries", value: countries.length, accent: CORAL },
    { label: "Today", value: todayCount, accent: GOLD },
    { label: "Last 7 days", value: weekCount, accent: CORAL },
  ];

  return (
    <div ref={scroller} className="lv-private fixed inset-0 z-[200] overflow-y-auto overscroll-contain" style={{ background: "radial-gradient(120% 80% at 50% 0%, #2f2924 0%, #1b1815 45%, #121010 100%)", color: CREAM }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-8 pt-5 pb-16" style={{ paddingTop: "max(1.25rem, env(safe-area-inset-top))" }}>
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo.png" alt="Lumiere Veritas" className="h-10 w-10 sm:h-12 sm:w-12 object-contain rounded-full bg-[#FBF3E6] p-1" />
            <div className="min-w-0">
              <p className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase" style={{ color: GOLD }}>Lumiere Veritas · Private</p>
              <h1 className="font-display text-2xl sm:text-4xl leading-tight">Visitor Globe</h1>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-[#FBF3E6]/60">
            <span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70" style={{ background: CORAL }} /><span className="relative inline-flex h-2.5 w-2.5 rounded-full" style={{ background: CORAL }} /></span>
            Live · updates every minute
          </div>
        </header>

        {/* Filter */}
        <div className="mt-5 inline-flex rounded-full p-1 border" style={{ borderColor: "rgba(201,164,92,0.35)", background: "rgba(255,248,238,0.04)" }} role="tablist" aria-label="Time range">
          {RANGES.map((r) => (
            <button key={r.id} role="tab" aria-selected={range === r.id} onClick={() => setRange(r.id)}
              className="rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium transition-colors min-h-[38px]"
              style={range === r.id ? { background: GOLD, color: "#1b1815" } : { color: "rgba(251,243,230,0.7)" }}>
              {r.label}
            </button>
          ))}
        </div>

        {error && <p className="mt-4 rounded-xl border px-4 py-3 text-sm" style={{ borderColor: CORAL, color: CREAM, background: "rgba(238,90,76,0.12)" }}>{error}</p>}

        {/* Globe + cards */}
        <div className="mt-5 grid gap-5 lg:grid-cols-[1.35fr_1fr] items-start">
          <section className="relative rounded-3xl border overflow-hidden" style={{ borderColor: "rgba(201,164,92,0.25)", background: "radial-gradient(60% 60% at 50% 50%, rgba(201,164,92,0.10), rgba(0,0,0,0) 70%)" }}>
            <div className="aspect-square w-full max-h-[620px]">
              <GlobeView countries={countries} cities={cities} />
            </div>
            <div className="pointer-events-none absolute left-4 bottom-3 flex items-center gap-4 text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-[#FBF3E6]/60">
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm" style={{ background: CORAL }} />Top country</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm" style={{ background: GOLD }} />Visitors</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full border" style={{ borderColor: CORAL }} />City</span>
            </div>
            <p className="pointer-events-none absolute right-4 top-3 text-[10px] tracking-[0.15em] uppercase text-[#FBF3E6]/40">Drag to spin · pinch to zoom</p>
          </section>

          <div className="grid gap-5">
            <div className="grid grid-cols-2 gap-3">
              {cards.map((c) => (
                <div key={c.label} className="rounded-2xl border p-4 sm:p-5" style={{ borderColor: "rgba(201,164,92,0.25)", background: "rgba(255,248,238,0.04)" }}>
                  <p className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#FBF3E6]/55">{c.label}</p>
                  <p className="font-display text-4xl sm:text-5xl mt-1 leading-none" style={{ color: c.accent, fontVariantNumeric: "lining-nums tabular-nums" }}>{c.value.toLocaleString("en-IN")}</p>
                </div>
              ))}
            </div>

            <section className="rounded-2xl border p-4 sm:p-5" style={{ borderColor: "rgba(201,164,92,0.25)", background: "rgba(255,248,238,0.04)" }}>
              <h2 className="font-display text-2xl">Countries</h2>
              {countries.length === 0 ? <p className="mt-2 text-sm text-[#FBF3E6]/55">No visits in this period yet.</p> : (
                <ol className="mt-3 space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
                  {countries.map((c, i) => (
                    <li key={c.cc} className="grid grid-cols-[1.5rem_1.75rem_1fr_auto] items-center gap-2 text-sm">
                      <span className="text-[#FBF3E6]/40 tabular-nums text-xs">{i + 1}</span>
                      <span className="text-xl leading-none" aria-hidden>{flag(c.cc)}</span>
                      <div className="min-w-0">
                        <p className="truncate">{c.country}</p>
                        <div className="mt-1 h-1.5 rounded-full bg-[#FBF3E6]/10 overflow-hidden"><div className="h-full rounded-full" style={{ width: `${Math.max(6, (c.count / max) * 100)}%`, background: i === 0 ? CORAL : GOLD }} /></div>
                      </div>
                      <span className="tabular-nums font-semibold" style={{ color: i === 0 ? CORAL : GOLD }}>{c.count}</span>
                    </li>
                  ))}
                </ol>
              )}
            </section>
          </div>
        </div>

        {/* Recent visits */}
        <section className="mt-5 rounded-2xl border p-4 sm:p-6" style={{ borderColor: "rgba(201,164,92,0.25)", background: "rgba(255,248,238,0.04)" }}>
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="font-display text-2xl">Recent visits</h2>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#FBF3E6]/45">Times in IST</span>
          </div>
          {recent.length === 0 ? <p className="mt-2 text-sm text-[#FBF3E6]/55">No visits in this period yet. New visits show up here within a minute.</p> : (
            <ul className="mt-3 divide-y" style={{ borderColor: "rgba(201,164,92,0.15)" }}>
              {recent.map((v, i) => (
                <li key={`${v.t}-${i}`} className="flex items-center gap-3 py-3" style={{ borderColor: "rgba(201,164,92,0.15)" }}>
                  <span className="text-xl leading-none" aria-hidden>{flag(v.cc)}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm sm:text-base">{v.city ? `${v.city}, ` : ""}{v.country}</p>
                    <p className="truncate text-xs text-[#FBF3E6]/50">{v.page === "/" ? "Home page" : v.page}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs sm:text-sm" style={{ color: GOLD }}>{istTime(v.t)}</p>
                    <p className="text-[11px] text-[#FBF3E6]/45">{ago(v.t, now)}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {inRange.length > 12 && (
            <button onClick={() => setShowAll((s) => !s)} className="mt-3 rounded-full border px-4 py-2 text-xs tracking-[0.15em] uppercase min-h-[38px]" style={{ borderColor: "rgba(201,164,92,0.45)", color: GOLD }}>
              {showAll ? "Show fewer" : `Show more (${Math.min(inRange.length, 100)})`}
            </button>
          )}
        </section>

        <p className="mt-6 text-center text-xs leading-relaxed text-[#FBF3E6]/45">
          Counts real people only. Bots and data-centre traffic are filtered out. No IP addresses or personal details are stored.
          {since ? <> Counting since {new Date(since).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "long", year: "numeric" })}.</> : null}
          <br />www.lumiereveritasmedia.com
        </p>
      </div>
    </div>
  );
}
