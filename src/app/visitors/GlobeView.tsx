"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Globe, { type GlobeMethods } from "react-globe.gl";
import { MeshPhongMaterial, Color } from "three";
import type { CountryStat, CityStat } from "./VisitorsDashboard";

type Feature = { type: "Feature"; properties: { iso: string; name: string }; geometry: unknown };

export default function GlobeView({ countries, cities }: { countries: CountryStat[]; cities: CityStat[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const globe = useRef<GlobeMethods | undefined>(undefined);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [features, setFeatures] = useState<Feature[]>([]);
  const [hover, setHover] = useState<Feature | null>(null);

  useEffect(() => {
    fetch("/geo/countries.json").then((r) => r.json()).then((d) => setFeatures(d.features)).catch(() => {});
  }, []);
  useEffect(() => {
    const el = wrap.current; if (!el) return;
    const ro = new ResizeObserver(([e]) => setSize({ w: Math.round(e.contentRect.width), h: Math.round(e.contentRect.height) }));
    ro.observe(el); return () => ro.disconnect();
  }, []);

  const byCc = useMemo(() => new Map(countries.map((c, i) => [c.cc, { ...c, rank: i }])), [countries]);
  const max = countries[0]?.count || 1;
  const material = useMemo(() => {
    const m = new MeshPhongMaterial({ color: new Color("#221e1a"), emissive: new Color("#120f0d"), shininess: 18, specular: new Color("#5a4a2e") });
    return m;
  }, []);

  useEffect(() => {
    const g = globe.current; if (!g) return;
    const c = g.controls() as unknown as { autoRotate: boolean; autoRotateSpeed: number; enableZoom: boolean; minDistance: number; maxDistance: number };
    c.autoRotate = true; c.autoRotateSpeed = 0.45; c.minDistance = 160; c.maxDistance = 520;
    const top = cities[0];
    g.pointOfView({ lat: top ? top.lat : 20, lng: top ? top.lon : 78, altitude: size.w < 520 ? 1.75 : 2.1 }, 1200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size.w > 0, features.length > 0]);

  const maxCity = cities[0]?.count || 1;
  const label = (name: string, cc: string) => {
    const s = byCc.get(cc);
    return `<div style="font-family:var(--font-body),system-ui;background:rgba(27,24,21,0.92);border:1px solid rgba(201,164,92,0.5);color:#FBF3E6;padding:6px 10px;border-radius:10px;font-size:12px"><b style="color:${s ? (s.rank === 0 ? "#EE5A4C" : "#C9A45C") : "#FBF3E6"}">${name}</b>${s ? ` · ${s.count} visit${s.count > 1 ? "s" : ""}` : ""}</div>`;
  };

  return (
    <div ref={wrap} className="h-full w-full cursor-grab active:cursor-grabbing">
      {size.w > 0 && (
        <Globe
          ref={globe}
          width={size.w}
          height={size.h}
          backgroundColor="rgba(0,0,0,0)"
          globeMaterial={material}
          showAtmosphere
          atmosphereColor="#C9A45C"
          atmosphereAltitude={0.2}
          polygonsData={features}
          polygonAltitude={(f) => { const s = byCc.get((f as Feature).properties.iso); return f === hover ? 0.03 : s ? 0.008 + 0.022 * (s.count / max) : 0.004; }}
          polygonCapColor={(f) => {
            const s = byCc.get((f as Feature).properties.iso);
            if (!s) return f === hover ? "rgba(251,243,230,0.16)" : "rgba(251,243,230,0.07)";
            const a = 0.55 + 0.4 * (s.count / max);
            return s.rank === 0 ? `rgba(238,90,76,${a})` : `rgba(201,164,92,${a})`;
          }}
          polygonSideColor={() => "rgba(201,164,92,0.12)"}
          polygonStrokeColor={() => "rgba(201,164,92,0.35)"}
          polygonLabel={(f) => label((f as Feature).properties.name, (f as Feature).properties.iso)}
          onPolygonHover={(f) => setHover((f as Feature) || null)}
          polygonsTransitionDuration={300}
          pointsData={cities}
          pointLat="lat"
          pointLng="lon"
          pointColor={() => "#FBF3E6"}
          pointAltitude={0.035}
          pointRadius={(c) => 0.28 + 0.5 * Math.sqrt((c as CityStat).count / maxCity)}
          pointLabel={(c) => { const x = c as CityStat; return `<div style="font-family:var(--font-body),system-ui;background:rgba(27,24,21,0.92);border:1px solid rgba(238,90,76,0.6);color:#FBF3E6;padding:6px 10px;border-radius:10px;font-size:12px"><b style="color:#EE5A4C">${x.city}</b>, ${x.country} · ${x.count} visit${x.count > 1 ? "s" : ""}</div>`; }}
          ringsData={cities}
          ringLat="lat"
          ringLng="lon"
          ringAltitude={0.035}
          ringColor={() => (t: number) => `rgba(238,90,76,${Math.max(0, 1 - t)})`}
          ringMaxRadius={(c) => 2.5 + 4 * Math.sqrt((c as CityStat).count / maxCity)}
          ringPropagationSpeed={2.2}
          ringRepeatPeriod={1400}
        />
      )}
    </div>
  );
}
