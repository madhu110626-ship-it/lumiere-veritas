// Decides whether a /api/visit request looks like a real person or a bot / data-centre machine.
// Visit alerts are only sent for "human". Enquiry-form emails never go through this.

export const BOT_UA = new RegExp(
  [
    "bot", "crawl", "spider", "slurp", "scrape", "preview", "headless", "phantomjs", "puppeteer", "playwright", "selenium",
    "webdriver", "lighthouse", "pagespeed", "chrome-lighthouse", "gtmetrix", "pingdom", "uptime", "monitor", "checker",
    "google-inspectiontool", "googleother", "google-read-aloud", "google-safety", "apis-google", "mediapartners-google",
    "adsbot", "feedfetcher", "storebot", "google-site-verification", "facebookexternalhit", "facebookcatalog", "meta-externalagent",
    "whatsapp", "telegram", "slack", "discord", "twitterbot", "linkedinbot", "pinterest", "skypeuripreview", "bingpreview",
    "microsoftpreview", "embedly", "quora link preview", "redditbot", "applebot", "yandex", "baidu", "duckduck", "petalbot",
    "semrush", "ahrefs", "mj12", "dotbot", "bytespider", "gptbot", "chatgpt", "claude", "anthropic", "perplexity", "ccbot",
    "curl", "wget", "python", "httpclient", "okhttp", "java/", "go-http", "node-fetch", "axios", "undici", "postman", "insomnia",
    "vercel-screenshot", "vercel-favicon",
  ].map((s) => s.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&")).join("|"),
  "i",
);

// Towns known mainly for big cloud / data-centre campuses (Google, AWS, Microsoft, Meta, Apple).
// Matched on city + country (+ region where the name is also a normal city elsewhere).
const DC_CITIES: { city: string; country: string; region?: string }[] = [
  { city: "council bluffs", country: "US" }, // Google (Iowa)
  { city: "ashburn", country: "US" }, // AWS us-east-1, many others
  { city: "sterling", country: "US", region: "VA" },
  { city: "leesburg", country: "US", region: "VA" },
  { city: "manassas", country: "US", region: "VA" },
  { city: "boydton", country: "US" }, // Microsoft
  { city: "boardman", country: "US" }, // AWS us-west-2
  { city: "hermiston", country: "US" },
  { city: "umatilla", country: "US" },
  { city: "the dalles", country: "US" }, // Google
  { city: "prineville", country: "US" }, // Meta, Apple
  { city: "hillsboro", country: "US", region: "OR" },
  { city: "quincy", country: "US", region: "WA" }, // Microsoft, Yahoo
  { city: "wenatchee", country: "US", region: "WA" },
  { city: "santa clara", country: "US" },
  { city: "mountain view", country: "US" }, // Google HQ
  { city: "san jose", country: "US", region: "CA" },
  { city: "moncks corner", country: "US" }, // Google (S. Carolina)
  { city: "lenoir", country: "US" }, // Google
  { city: "forest city", country: "US" }, // Meta
  { city: "maiden", country: "US", region: "NC" }, // Apple
  { city: "pryor", country: "US" }, // Google (Mayes County)
  { city: "mayes county", country: "US" },
  { city: "douglas county", country: "US" },
  { city: "lithia springs", country: "US" }, // Google (Douglas County GA)
  { city: "midlothian", country: "US", region: "TX" }, // Google
  { city: "papillion", country: "US" }, // Google
  { city: "altoona", country: "US", region: "IA" }, // Meta
  { city: "west des moines", country: "US" }, // Microsoft
  { city: "new albany", country: "US", region: "OH" }, // Google, AWS, Meta
  { city: "hilliard", country: "US", region: "OH" }, // AWS us-east-2
  { city: "dublin", country: "US", region: "OH" }, // AWS us-east-2
  { city: "columbus", country: "US", region: "OH" },
  { city: "henderson", country: "US", region: "NV" },
  { city: "reno", country: "US", region: "NV" },
  { city: "san antonio", country: "US", region: "TX" }, // Microsoft
  { city: "cheyenne", country: "US" }, // Microsoft
  { city: "north charleston", country: "US" },
  { city: "st. ghislain", country: "BE" }, // Google Europe
  { city: "saint-ghislain", country: "BE" },
  { city: "eemshaven", country: "NL" }, // Google
  { city: "groningen", country: "NL" },
  { city: "hamina", country: "FI" }, // Google
  { city: "lulea", country: "SE" }, // Meta
  { city: "luleå", country: "SE" },
  { city: "clonee", country: "IE" }, // Meta
];
// Note: big real cities that also host clouds (Dublin IE, Frankfurt, London, Singapore, Mumbai) are deliberately NOT here,
// so genuine visitors from them still get through. Bots there are caught by the user-agent / language checks instead.

// Cloud/hosting ASNs, used only if Vercel ever exposes an ASN header.
const DC_ASNS = new Set([
  "15169", "396982", "19527", "36040", "43515", // Google
  "16509", "14618", "8987", // AWS
  "8075", "8068", "8069", // Microsoft
  "32934", "63293", // Meta
  "13335", "209242", // Cloudflare
  "54113", // Fastly
  "14061", "63949", "20473", "24940", "16276", "45102", "132203", "31898", "396356", "136907", "212238", "9009",
]);

export type Verdict = { human: true } | { human: false; reason: string };

const dec = (v: string | null) => { try { return v ? decodeURIComponent(v) : ""; } catch { return v || ""; } };

export function classifyVisit(h: Headers, signals?: { languages?: unknown; webdriver?: unknown }): Verdict {
  const ua = h.get("user-agent") || "";
  if (!ua) return { human: false, reason: "no-user-agent" };
  if (BOT_UA.test(ua)) return { human: false, reason: "bot-user-agent" };
  if (!/mozilla\/5\.0/i.test(ua)) return { human: false, reason: "non-browser-user-agent" };

  const lang = (h.get("accept-language") || "").trim();
  if (!lang || lang === "*") return { human: false, reason: "no-accept-language" };

  const asn = (h.get("x-vercel-ip-asn") || h.get("x-vercel-ip-as-number") || "").replace(/^AS/i, "").trim();
  if (asn && DC_ASNS.has(asn)) return { human: false, reason: "datacenter-asn" };

  const city = dec(h.get("x-vercel-ip-city")).toLowerCase().trim();
  const country = (h.get("x-vercel-ip-country") || "").toUpperCase();
  const region = (h.get("x-vercel-ip-country-region") || "").toUpperCase();
  if (city && DC_CITIES.some((d) => d.city === city && d.country === country && (!d.region || d.region === region)))
    return { human: false, reason: "datacenter-city" };

  if (signals) {
    if (signals.webdriver === true) return { human: false, reason: "webdriver" };
    if (Array.isArray(signals.languages) && signals.languages.length === 0) return { human: false, reason: "no-navigator-languages" };
  }
  return { human: true };
}
