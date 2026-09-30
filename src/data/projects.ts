export type Concept = {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
};

export const conceptFilters = [
  "All",
  "Campaign",
  "Film",
  "Social",
  "Outdoor",
  "Event",
  "Identity",
  "AI",
] as const;

/** Creative Possibilities — concept placeholders, not client work */
export const concepts: Concept[] = [
  {
    id: "brand-campaign",
    title: "Brand Campaign",
    category: "Campaign",
    image: "/media/campaign.jpg",
    description:
      "A multi-channel idea system — from insight to visual language to media expression.",
  },
  {
    id: "commercial-film",
    title: "Commercial Film",
    category: "Film",
    image: "/media/commercial-film.jpg",
    description:
      "Cinematic brand storytelling crafted for screens that demand presence.",
  },
  {
    id: "social",
    title: "Social Content",
    category: "Social",
    image: "/media/social-content.jpg",
    description:
      "Platform-native narratives designed to earn attention and build habit.",
  },
  {
    id: "outdoor",
    title: "Outdoor Presence",
    category: "Outdoor",
    image: "/media/outdoor.jpg",
    description:
      "OOH concepts that turn public space into brand theatre.",
  },
  {
    id: "event",
    title: "Live Experience",
    category: "Event",
    image: "/media/events.jpg",
    description:
      "Moments designed end-to-end — atmosphere, narrative, and on-ground craft.",
  },
  {
    id: "brand-identity",
    title: "Brand Identity",
    category: "Identity",
    image: "/media/branding.jpg",
    description:
      "Distinctive visual and verbal systems that make a brand unmistakable.",
  },
  {
    id: "ai-commercial",
    title: "AI Commercial",
    category: "AI",
    image: "/media/ai-motion.jpg",
    description:
      "Human-directed, AI-accelerated commercial production — speed without losing soul.",
  },
];

/** @deprecated alias for compatibility */
export const projects = concepts;
export const projectFilters = conceptFilters;
