const OWNER = process.env.NOTIFY_EMAIL || "lumiereveritasmediasolutions@gmail.com";
const SITE = "https://lumiereveritasmedia.com";

export async function sendOwnerEmail(subject: string, fields: Record<string, string>, replyTo?: string) {
  const payload: Record<string, string> = { _subject: subject, _template: "table", _captcha: "false", ...fields };
  if (replyTo) payload._replyto = replyTo;
  const res = await fetch(`https://formsubmit.co/ajax/${OWNER}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json", Origin: SITE, Referer: SITE + "/" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  const text = await res.text();
  let json: { success?: string | boolean; message?: string } = {};
  try { json = JSON.parse(text); } catch {}
  return { ok: res.ok && String(json.success) === "true", status: res.status, message: json.message || text.slice(0, 200) };
}

export function istNow() {
  return new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" }) + " IST";
}
