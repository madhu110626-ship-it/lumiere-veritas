export type Capability = {
  id: number;
  number: string;
  title: string;
  description: string;
  image: string;
};

/** Editorial homepage grid — 10 pillars */
export const capabilities: Capability[] = [
  {
    id: 1,
    number: "01",
    title: "Media & PR",
    description:
      "Publicity, editorial outreach, and media presence that puts your brand in the conversation.",
    image: "/media/media-pr.jpg",
  },
  {
    id: 2,
    number: "02",
    title: "Digital & Social",
    description:
      "Platform-native storytelling and promotion that builds community and converts attention.",
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
    title: "Video",
    description:
      "Commercials, brand films, photography, and post — cinematic craft with commercial intent.",
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
      "Identity, visual systems, and digital content that give your brand a distinctive voice.",
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
      "Sales funnel creative and promotion that turns interest into qualified pipeline.",
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
    title: "News Media, Publicity & PR Promotion",
    description:
      "Editorial placements, press outreach, and publicity strategies that put your brand in the conversation.",
  },
  {
    number: "02",
    title: "Social Media Marketing & Promotion",
    description:
      "Platform-native campaigns that build community, amplify reach, and convert attention into action.",
  },
  {
    number: "03",
    title: "Creative Advertising & Brand Campaigns",
    description:
      "Big-idea campaigns across channels — crafted to stop the scroll and stick in memory.",
  },
  {
    number: "04",
    title: "Podcast Content Creation & Promotion",
    description:
      "From concept and production to distribution — podcasts that grow audiences and authority.",
  },
  {
    number: "05",
    title: "Lead Generation & Sales Funnel Solutions",
    description:
      "Funnel architecture and creative that turn interest into qualified pipeline.",
  },
  {
    number: "06",
    title: "Event Design, Planning & Creative Management",
    description:
      "Experiences designed end-to-end — from spatial storytelling to on-ground execution.",
  },
  {
    number: "07",
    title: "Interior Designing & Creative Concepts",
    description:
      "Spatial design and creative concepts that make brand environments feel intentional.",
  },
  {
    number: "08",
    title: "Outdoor Advertising — Hoardings & Billboards",
    description:
      "High-impact OOH placements that own the skyline and the street.",
  },
  {
    number: "09",
    title: "Pamphlets, Brochures & Promotional Materials",
    description:
      "Print collateral designed to feel premium in the hand and clear in the message.",
  },
  {
    number: "10",
    title: "Commercial Creative Video Production",
    description:
      "Cinematic commercials and brand films produced with craft and commercial intent.",
  },
  {
    number: "11",
    title: "AI-Assisted Commercial Video Creation",
    description:
      "Human direction meets AI acceleration — faster production without losing soul.",
  },
  {
    number: "12",
    title: "Motion Reel & Motion Graphics Production",
    description:
      "Kinetic type, motion systems, and reels that give your brand a living voice.",
  },
  {
    number: "13",
    title: "Photography & Videography",
    description:
      "Still and moving imagery that captures product, people, and place with precision.",
  },
  {
    number: "14",
    title: "Video Editing & Post-Production",
    description:
      "Editorial craft, color, sound, and finishing that elevate every frame.",
  },
  {
    number: "15",
    title: "Graphic Design & Brand Visuals",
    description:
      "Visual systems, campaigns, and assets that make your brand unmistakable.",
  },
  {
    number: "16",
    title: "Branding & Digital Content Creation",
    description:
      "Identity, positioning, and ongoing content that keeps your brand culturally relevant.",
  },
] as const;
