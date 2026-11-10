/** Visitor's browser time zone (client only). */
export function visitorTz(): string {
  try { return Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch { return ""; }
}
export function isIndiaTz(tz: string): boolean {
  return !tz || tz === "Asia/Calcutta" || tz === "Asia/Kolkata";
}
