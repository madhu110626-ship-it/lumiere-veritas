import { put, list } from "@vercel/blob";

// Anonymous visit log kept in the private Vercel Blob store "lv-visitors".
// Each visit is one tiny blob; every field lives in the blob's pathname so the
// dashboard can read the whole log with list() alone. No IP or personal data is stored.

export type Visit = {
  t: number; // timestamp (ms)
  cc: string; // ISO country code, e.g. IN
  country: string; // country name
  city: string;
  region: string;
  lat: number | null;
  lon: number | null;
  page: string;
};

const PREFIX = "visits/";
const b64 = (s: string) => Buffer.from(s, "utf8").toString("base64url");
const unb64 = (s: string) => Buffer.from(s, "base64url").toString("utf8");

export function countryName(cc: string) {
  try { return new Intl.DisplayNames(["en"], { type: "region" }).of(cc) || cc; } catch { return cc; }
}

export function visitStoreReady() {
  return !!(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

export async function recordVisit(v: Omit<Visit, "t" | "country"> & { t?: number }) {
  if (!visitStoreReady()) return;
  const t = v.t ?? Date.now();
  const cc = (v.cc || "").toUpperCase().slice(0, 2) || "XX";
  const data = {
    cc, country: cc === "XX" ? "Unknown" : countryName(cc),
    city: (v.city || "").slice(0, 80), region: (v.region || "").slice(0, 20),
    lat: v.lat, lon: v.lon, page: (v.page || "/").slice(0, 120),
  };
  const id = Math.random().toString(36).slice(2, 8);
  // Reverse-sortable time key isn't needed; we sort after listing.
  const pathname = `${PREFIX}${t}_${id}_${b64(JSON.stringify(data))}.json`;
  await put(pathname, "1", { access: "private", addRandomSuffix: false, contentType: "application/json" });
}

export function parseVisit(pathname: string): Visit | null {
  try {
    const m = pathname.slice(PREFIX.length).match(/^(\d+)_[a-z0-9]+_([A-Za-z0-9_-]+)\.json$/);
    if (!m) return null;
    const d = JSON.parse(unb64(m[2]));
    return { t: Number(m[1]), cc: d.cc, country: d.country, city: d.city || "", region: d.region || "", lat: d.lat ?? null, lon: d.lon ?? null, page: d.page || "/" };
  } catch { return null; }
}

export async function readVisits(): Promise<Visit[]> {
  if (!visitStoreReady()) return [];
  const out: Visit[] = [];
  let cursor: string | undefined;
  for (let i = 0; i < 50; i++) {
    const r = await list({ prefix: PREFIX, cursor, limit: 1000 });
    for (const b of r.blobs) { const v = parseVisit(b.pathname); if (v) out.push(v); }
    if (!r.hasMore || !r.cursor) break;
    cursor = r.cursor;
  }
  return out.sort((a, b) => b.t - a.t);
}
