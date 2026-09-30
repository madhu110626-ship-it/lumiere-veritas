export type Project = {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  image: string;
  description: string;
};

export const projectFilters = [
  "All",
  "Campaign",
  "Film",
  "Brand",
  "Digital",
  "Events",
] as const;

export const projects: Project[] = [
  {
    id: "placeholder-01",
    title: "PLACEHOLDER — Campaign Title",
    client: "Client Name",
    category: "Campaign",
    year: "20XX",
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1400&q=80",
    description:
      "PLACEHOLDER project description. Replace with real case study when available.",
  },
  {
    id: "placeholder-02",
    title: "PLACEHOLDER — Brand Film",
    client: "Client Name",
    category: "Film",
    year: "20XX",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84781?w=1400&q=80",
    description:
      "PLACEHOLDER project description. Replace with real case study when available.",
  },
  {
    id: "placeholder-03",
    title: "PLACEHOLDER — Identity System",
    client: "Client Name",
    category: "Brand",
    year: "20XX",
    image:
      "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=1400&q=80",
    description:
      "PLACEHOLDER project description. Replace with real case study when available.",
  },
  {
    id: "placeholder-04",
    title: "PLACEHOLDER — Social Platform",
    client: "Client Name",
    category: "Digital",
    year: "20XX",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1400&q=80",
    description:
      "PLACEHOLDER project description. Replace with real case study when available.",
  },
  {
    id: "placeholder-05",
    title: "PLACEHOLDER — Live Experience",
    client: "Client Name",
    category: "Events",
    year: "20XX",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1400&q=80",
    description:
      "PLACEHOLDER project description. Replace with real case study when available.",
  },
  {
    id: "placeholder-06",
    title: "PLACEHOLDER — OOH Takeover",
    client: "Client Name",
    category: "Campaign",
    year: "20XX",
    image:
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1400&q=80",
    description:
      "PLACEHOLDER project description. Replace with real case study when available.",
  },
];
