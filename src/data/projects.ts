export type Concept = {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  /** Optional concept film. Not a client case. */
  video?: string;
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

/** Creative Possibilities — concept directions, not client work */
export const concepts: Concept[] = [
  {
    id: "ai-commercial",
    title: "AI Commercial Concept 02",
    category: "AI",
    image: "/media/videos/ai-02.jpg",
    video: "/media/videos/ai-02.mp4",
    description:
      "AI Creative concept artwork — a commercial study, not a client project or result.",
  },
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
];

/** @deprecated alias for compatibility */
export const projects = concepts;
export const projectFilters = conceptFilters;

export type AICreativeFilm = {
  id: string;
  title: string;
  src: string;
  poster: string;
};

/** Concept artwork only. Titles do not name clients. */
export const aiCreativeFilms: AICreativeFilm[] = [
  {
    id: "01",
    title: "AI Commercial Concept 01",
    src: "/media/videos/ai-01.mp4",
    poster: "/media/videos/ai-01.jpg",
  },
  {
    id: "02",
    title: "AI Commercial Concept 02",
    src: "/media/videos/ai-02.mp4",
    poster: "/media/videos/ai-02.jpg",
  },
  {
    id: "03",
    title: "AI Commercial Concept 03",
    src: "/media/videos/ai-03.mp4",
    poster: "/media/videos/ai-03.jpg",
  },
  {
    id: "04",
    title: "AI Commercial Concept 04",
    src: "/media/videos/ai-04.mp4",
    poster: "/media/videos/ai-04.jpg",
  },
];

/** Portrait product study used as the showreel opener. */
export const showreelFilm = aiCreativeFilms[0];
