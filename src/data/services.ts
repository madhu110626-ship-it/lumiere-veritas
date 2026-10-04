export type Capability = {
  id: number;
  number: string;
  title: string;
  description: string;
  image: string;
  /** Clear sub-offerings folded into this pillar */
  highlights?: string[];
};

/** Editorial homepage grid — 10 pillars */
export const capabilities: Capability[] = [
  {
    id: 1,
    number: "01",
    title: "News Media Publicity, Promotion & PR",
    description:
      "News media publicity, promotion, and public relations — editorial outreach, press narrative, and campaigns that put your brand in the news and in the conversation.",
    image: "/media/media-pr.jpg",
  },
  {
    id: 2,
    number: "02",
    title: "Digital & Social",
    description:
      "Platform-native storytelling, influencer marketing, and podcast promotion that build community and convert attention.",
    highlights: ["Influencer Marketing", "Podcast Content & Promotion"],
    image: "/media/digital-social.jpg",
  },
  {
    id: 3,
    number: "03",
    title: "Advertising",
    description:
      "Campaign ideas crafted to stop the scroll, own the street, and stick in memory.",
    image: "/media/advertising.jpg",
  },
  {
    id: 4,
    number: "04",
    title: "Video & Production",
    description:
      "Brand shoots, commercial production, brand films, photography, and post — cinematic craft with commercial intent.",
    highlights: ["Brand Shoot & Commercial Production"],
    image: "/media/video.jpg",
  },
  {
    id: 5,
    number: "05",
    title: "AI & Motion",
    description:
      "AI-assisted production and motion graphics — human creativity, intelligently accelerated.",
    image: "/media/ai-motion.jpg",
  },
  {
    id: 6,
    number: "06",
    title: "Branding",
    description:
      "Brand identity through website designing, logo designing, visual systems, and digital content with a distinctive voice.",
    highlights: ["Website Designing", "Logo Designing"],
    image: "/media/branding.jpg",
  },
  {
    id: 7,
    number: "07",
    title: "Events",
    description:
      "Design, planning, and creative management for moments that matter.",
    image: "/media/events.jpg",
  },
  {
    id: 8,
    number: "08",
    title: "Outdoor & Print",
    description:
      "Hoardings, billboards, pamphlets, brochures — presence in the physical world.",
    image: "/media/outdoor.jpg",
  },
  {
    id: 9,
    number: "09",
    title: "Lead Generation",
    description:
      "SEO, paid ads campaign generation, and sales-funnel creative that turns interest into qualified pipeline.",
    highlights: ["SEO & Paid Ads Campaigns"],
    image: "/media/leads.jpg",
  },
  {
    id: 10,
    number: "10",
    title: "Spaces & Interiors",
    description:
      "Interior concepts and brand environments designed with intentional atmosphere.",
    image: "/media/interiors.jpg",
  },
];

/** Full capability list for services page */
export const services = [
  {
    number: "01",
    title: "News Media Publicity, Promotion & PR",
    description:
      "News media publicity, promotion, and public relations — editorial placements, press outreach, and campaigns that put your brand in the news and in the conversation.",
  },
  {
    number: "02",
    title: "Social Media Marketing & Promotion",
    description:
      "Platform-native campaigns that build community, amplify reach, and convert attention into action.",
  },
  {
    number: "03",
    title: "Influencer Marketing",
    description:
      "Creator and influencer partnerships that carry your brand into trusted audiences — casting, briefing, and promotion handled as one.",
  },
  {
    number: "04",
    title: "Creative Advertising & Brand Campaigns",
    description:
      "Big-idea campaigns across channels — crafted to stop the scroll and stick in memory.",
  },
  {
    number: "05",
    title: "Podcast Content Creation & Promotion",
    description:
      "Podcast content creation and promotion — from concept and production to distribution, growing audience and authority.",
  },
  {
    number: "06",
    title: "SEO & Paid Ads Campaign Generation",
    description:
      "Search visibility and paid ads campaigns — keyword strategy, on-page SEO, and ad campaigns written, built, and ready to run.",
  },
  {
    number: "07",
    title: "Lead Generation & Sales Funnel Solutions",
    description:
      "Funnel architecture and creative that turn interest into qualified pipeline.",
  },
  {
    number: "08",
    title: "Event Design, Planning & Creative Management",
    description:
      "Experiences designed end-to-end — from spatial storytelling to on-ground execution.",
  },
  {
    number: "09",
    title: "Interior Designing & Creative Concepts",
    description:
      "Spatial design and creative concepts that make brand environments feel intentional.",
  },
  {
    number: "10",
    title: "Outdoor Advertising — Hoardings & Billboards",
    description:
      "High-impact OOH placements that own the skyline and the street.",
  },
  {
    number: "11",
    title: "Pamphlets, Brochures & Promotional Materials",
    description:
      "Print collateral designed to feel premium in the hand and clear in the message.",
  },
  {
    number: "12",
    title: "Brand Shoot & Commercial Production",
    description:
      "On-set brand shoots and commercial production — stills and film crafted for campaigns, launches, and brand worlds.",
  },
  {
    number: "13",
    title: "Commercial Creative Video Production",
    description:
      "Cinematic commercials and brand films produced with craft and commercial intent.",
  },
  {
    number: "14",
    title: "AI-Assisted Commercial Video Creation",
    description:
      "Human direction meets AI acceleration — faster production without losing soul.",
  },
  {
    number: "15",
    title: "Motion Reel & Motion Graphics Production",
    description:
      "Kinetic type, motion systems, and reels that give your brand a living voice.",
  },
  {
    number: "16",
    title: "Photography & Videography",
    description:
      "Still and moving imagery that captures product, people, and place with precision.",
  },
  {
    number: "17",
    title: "Video Editing & Post-Production",
    description:
      "Editorial craft, color, sound, and finishing that elevate every frame.",
  },
  {
    number: "18",
    title: "Website Designing & Logo Designing for Brand Identity",
    description:
      "Websites and logos designed as brand identity — not templates — so the first impression matches the rest of the work.",
  },
  {
    number: "19",
    title: "Graphic Design & Brand Visuals",
    description:
      "Visual systems, campaigns, and assets that make your brand unmistakable.",
  },
  {
    number: "20",
    title: "Branding & Digital Content Creation",
    description:
      "Identity, positioning, and ongoing content that keeps your brand culturally relevant.",
  },
] as const;
