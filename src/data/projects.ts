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
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1400&q=80",
    description:
      "A multi-channel idea system — from insight to visual language to media expression.",
  },
  {
    id: "commercial-film",
    title: "Commercial Film",
    category: "Film",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84781?w=1400&q=80",
    description:
      "Cinematic brand storytelling crafted for screens that demand presence.",
  },
  {
    id: "social",
    title: "Social Content",
    category: "Social",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1400&q=80",
    description:
      "Platform-native narratives designed to earn attention and build habit.",
  },
  {
    id: "outdoor",
    title: "Outdoor Presence",
    category: "Outdoor",
    image:
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1400&q=80",
    description:
      "OOH concepts that turn public space into brand theatre.",
  },
  {
    id: "event",
    title: "Live Experience",
    category: "Event",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1400&q=80",
    description:
      "Moments designed end-to-end — atmosphere, narrative, and on-ground craft.",
  },
  {
    id: "brand-identity",
    title: "Brand Identity",
    category: "Identity",
    image:
      "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=1400&q=80",
    description:
      "Distinctive visual and verbal systems that make a brand unmistakable.",
  },
  {
    id: "ai-commercial",
    title: "AI Commercial",
    category: "AI",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc8b95cd2eb?w=1400&q=80",
    description:
      "Human-directed, AI-accelerated commercial production — speed without losing soul.",
  },
];

/** @deprecated alias for compatibility */
export const projects = concepts;
export const projectFilters = conceptFilters;
