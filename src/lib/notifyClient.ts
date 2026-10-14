export const OWNER_EMAIL = "lumiereveritasmediasolutions@gmail.com";
export function istNow() {
  return new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" }) + " IST";
}
export async function sendOwnerEmail(subject: string, fields: Record<string, string>, replyTo?: string) {
  const payload: Record<string, string> = { _subject: subject, _template: "table", _captcha: "false", ...fields };
  if (replyTo) payload._replyto = replyTo;
  const r = await fetch(`https://formsubmit.co/ajax/${OWNER_EMAIL}`, {
    method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload), keepalive: true,
  });
  const j = await r.json().catch(() => ({}));
  return String((j as { success?: unknown }).success) === "true";
}
