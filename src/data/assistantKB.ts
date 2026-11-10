import { services } from "@/data/services";

export type KBEntry = { id: string; keywords: string[]; answer: string };

/** Short, plain answers drawn from the website's own content. Never quote prices. */
export const kb: KBEntry[] = [
  {
    id: "services",
    keywords: ["service", "services", "offer", "what do you do", "do you do", "provide", "capabilit", "help with"],
    answer:
      "We're a one-stop creative team: news media publicity & promotion, social media, influencer marketing, advertising campaigns, brand shoots and video production, AI videos and motion graphics, branding, websites and logos, podcasts, SEO and paid ads, lead generation, events, outdoor and print, and interior concepts.",
  },
  {
    id: "pricing",
    keywords: ["price", "pricing", "cost", "charge", "fee", "rate", "quote", "budget", "how much", "expensive", "cheap", "package"],
    answer:
      "Pricing depends on the scope of work — what you need, how much of it, and how fast. We don't use fixed packages. Share a few details and we'll send a clear quote. International clients can get quotes in USD, AED, GBP or EUR.",
  },
  {
    id: "process",
    keywords: ["how do you work", "process", "approach", "steps", "start", "onboard", "work with you", "method"],
    answer:
      "We work in four steps: Discover (we understand your brand and goals), Strategize (the idea and the channels), Create (film, design, content and media), and Amplify (PR, paid, social, outdoor and events). One partner handles it all, so nothing gets lost between teams.",
  },
  {
    id: "turnaround",
    keywords: ["turnaround", "how long", "how fast", "timeline", "deadline", "urgent", "quick", "delivery", "days", "weeks", "time take"],
    answer:
      "It depends on the project. Small items move quickly, while campaigns and productions need planning time. We reply to every enquiry within 24 hours and confirm a timeline with your quote.",
  },
  {
    id: "international",
    keywords: ["international", "abroad", "outside india", "overseas", "usa", "uk", "dubai", "uae", "europe", "canada", "australia", "remote", "time zone", "timezone", "foreign", "usd", "dollar", "aed", "gbp", "eur"],
    answer:
      "Yes, we work with clients worldwide, fully remote. We plan video calls around your time zone and can quote in USD, AED, GBP or EUR. You can register at lumiereveritasmedia.com/international.",
  },
  {
    id: "location",
    keywords: ["where are you", "location", "based", "office", "mumbai", "address", "city"],
    answer: "We're based in Mumbai, India, and work with brands across India and around the world.",
  },
  {
    id: "audit",
    keywords: ["audit", "free", "consultation", "trial", "call", "meeting"],
    answer:
      "We offer a free 15-minute visibility audit — a quick call where we look at how your brand shows up and suggest what to improve. Tap \"Continue on WhatsApp\" to book it.",
  },
  {
    id: "ai",
    keywords: ["ai", "ai video", "artificial", "motion", "animation", "reel"],
    answer:
      "We make AI-assisted commercial videos and motion graphics. AI speeds up production, while creative direction and taste stay human.",
  },
  {
    id: "pr",
    keywords: ["pr", "press", "news", "publicity", "media coverage", "newspaper", "journalist"],
    answer:
      "We handle news media publicity and promotion — press outreach, editorial stories and campaigns that get your brand into the news and the conversation.",
  },
  {
    id: "web",
    keywords: ["website", "web site", "logo", "branding", "identity", "design"],
    answer:
      "We design websites and logos as part of your brand identity, plus brand visuals and ongoing content so everything looks and sounds like you.",
  },
  {
    id: "social",
    keywords: ["social", "instagram", "facebook", "youtube", "influencer", "content", "followers", "linkedin"],
    answer:
      "We run social media marketing, influencer partnerships and content creation that build a community and turn attention into enquiries.",
  },
  {
    id: "contact",
    keywords: ["contact", "email", "talk", "human", "person", "speak", "reach", "whatsapp", "phone", "call me"],
    answer:
      "You can tap \"Continue on WhatsApp\" to chat with our team directly, or email lumiereveritasmediasolutions@gmail.com. We reply within 24 hours.",
  },
];

export const fallbackAnswer =
  "Good question — our team can answer that best. Tap \"Continue on WhatsApp\" and we'll reply personally, usually within a few hours.";

function hasWord(t: string, k: string) {
  if (k.length > 4) return t.includes(k);
  return new RegExp(`\\b${k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`).test(t);
}

export function ruleAnswer(q: string): string {
  const t = ` ${q.toLowerCase()} `;
  let best: KBEntry | null = null, score = 0;
  for (const e of kb) {
    const s = e.keywords.reduce((n, k) => n + (hasWord(t, k) ? k.length : 0), 0);
    if (s > score) { score = s; best = e; }
  }
  if (/^\s*(hi|hello|hey|namaste|hii+)\b/.test(q.toLowerCase()) && score === 0)
    return "Hello! 👋 Ask me about our services, pricing, how we work or working with clients abroad.";
  return best ? best.answer : fallbackAnswer;
}

/** Plain-text knowledge for the AI model. */
export const kbText = [
  "Agency: Lumiere Veritas Media Solutions, Mumbai, India. Website: www.lumiereveritasmedia.com. Email: lumiereveritasmediasolutions@gmail.com.",
  "Tagline: We create visibility. We build impact. Strategy, creativity, media and execution under one roof.",
  "Full service list: " + services.map((s) => `${s.title} — ${s.description}`).join(" | "),
  ...kb.map((e) => `${e.id}: ${e.answer}`),
].join("\n");
