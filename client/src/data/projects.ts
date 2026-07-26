// Portfolio projects. Edit this file to add, remove, or reorder your work —
// it drives the Projects section directly (no backend, no database).
//
// - imageUrl: path to a preview image in client/public/images (recommended).
//   Leave it undefined to render the live site in an iframe instead.
// - url: the live site URL (used for the "Visit Site" link and the iframe).

export interface Project {
  title: string;
  description: string;
  url: string;
  category: string;
  imageUrl?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: "Diona Servis",
    description:
      "Live business website with a clean, conversion-focused layout — rendered here in real time.",
    url: "https://dionaservis.com",
    category: "Business",
    featured: true,
    // no imageUrl → renders the live site in an iframe
  },
  {
    title: "Dental Clinic",
    description:
      "Modern dental practice site with online booking and a calm, trustworthy aesthetic.",
    url: "https://example.com",
    category: "Healthcare",
    imageUrl: "/images/project-dental.png",
  },
  {
    title: "Fitness Studio",
    description:
      "High-energy landing page for a fitness studio with class schedules and membership CTAs.",
    url: "https://example.com",
    category: "Fitness",
    imageUrl: "/images/project-fitness.png",
  },
  {
    title: "Real Estate Agency",
    description:
      "Property showcase with rich listings and a refined, premium browsing experience.",
    url: "https://example.com",
    category: "Real Estate",
    imageUrl: "/images/project-realestate.png",
  },
  {
    title: "Restaurant",
    description:
      "Appetite-driven restaurant site with menu, reservations, and an immersive gallery.",
    url: "https://example.com",
    category: "Hospitality",
    imageUrl: "/images/project-restaurant.png",
  },
];
