"use client";
import { useEffect } from "react";
export function VisitPing() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem("lv_visit")) return;
      sessionStorage.setItem("lv_visit", "1");
    } catch { return; }
    if ((navigator as Navigator & { webdriver?: boolean }).webdriver) return;
    fetch("/api/visit", { method: "POST", headers: { "Content-Type": "application/json" }, keepalive: true,
      body: JSON.stringify({ page: location.pathname + location.search, referrer: document.referrer }) }).catch(() => {});
  }, []);
  return null;
}
