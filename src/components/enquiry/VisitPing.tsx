"use client";
import { useEffect } from "react";
import { sendOwnerEmail, istNow } from "@/lib/notifyClient";
export function VisitPing() {
  useEffect(() => {
    try { if (sessionStorage.getItem("lv_visit")) return; sessionStorage.setItem("lv_visit", "1"); } catch { return; }
    if (navigator.webdriver) return;
    const page = location.pathname + location.search, referrer = document.referrer;
    fetch("/api/visit", { method: "POST" }).then((r) => r.json()).then((v) => {
      if (!v.ok || v.bot) return;
      return sendOwnerEmail(`New website visitor — ${v.location}`, {
        Page: page, "Came from": referrer || "Direct / typed URL", Location: v.location, Device: v.device,
        Language: v.language, Time: istNow(), Note: "Anonymous visit. Name/email arrive only if they submit the enquiry form.",
      });
    }).catch(() => {});
  }, []);
  return null;
}
