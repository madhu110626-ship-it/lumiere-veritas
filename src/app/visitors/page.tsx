import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { timingSafeEqual } from "crypto";
import { readVisits, visitStoreReady } from "@/lib/visitStore";
import { VisitorsDashboard } from "./VisitorsDashboard";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Visitor Globe",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  alternates: { canonical: null },
};

function keyOk(given: string | undefined) {
  const real = process.env.VISITORS_KEY || "";
  if (!real || !given) return false;
  const a = Buffer.from(given), b = Buffer.from(real);
  return a.length === b.length && timingSafeEqual(a, b);
}

export default async function VisitorsPage({ searchParams }: { searchParams: Promise<{ key?: string | string[] }> }) {
  const sp = await searchParams;
  const key = Array.isArray(sp.key) ? sp.key[0] : sp.key;
  if (!keyOk(key)) notFound();
  let visits: Awaited<ReturnType<typeof readVisits>> = [];
  let error = "";
  try { visits = await readVisits(); } catch (e) { error = "Couldn't load visits right now. Please refresh in a minute."; console.error(e); }
  if (!visitStoreReady()) error = "Visit storage isn't connected.";
  return <VisitorsDashboard visits={visits} error={error} now={Date.now()} />;
}
