// Portfolio projects. Edit this file to add, remove, or reorder your work —
// it drives the Projects section directly (no backend, no database).
//
// Preview options, in order of preference:
//   1. imageUrl  — a screenshot in client/public/images (RECOMMENDED, always works)
//   2. livePreview: true — embeds the real site in an iframe. Only use this if the
//      site allows framing: many hosts send X-Frame-Options/CSP frame-ancestors,
//      which makes the embed render blank. Browsers give JS no way to detect that
//      (onLoad fires even for error pages), so this cannot be auto-detected.
//   3. neither — shows a clean branded panel with a "Visit Site" call to action.
//
// Copy is bilingual so it follows the site's SR/EN language toggle.

export interface Project {
  title: string;
  url: string;
  category: { sr: string; en: string };
  tagline: { sr: string; en: string };
  description: { sr: string; en: string };
  highlights: { sr: string[]; en: string[] };
  tech: string[];
  status?: { sr: string; en: string };
  imageUrl?: string;
  livePreview?: boolean;
}

export const projects: Project[] = [
  {
    title: "FeelBG.com",
    url: "https://feelbg.com",
    category: { sr: "Web Platforma", en: "Web Platform" },
    status: { sr: "U razvoju", en: "In development" },
    tagline: {
      sr: "Platforma za otkrivanje beogradskih lokala",
      en: "A platform for discovering Belgrade's best spots",
    },
    description: {
      sr: "Platforma namenjena turistima koji istražuju beogradske kafiće, restorane i klubove. Osmislio, dizajnirao i razvio sam je kompletno samostalno — od UI/UX dizajna, preko koda, do poslovnog modela zasnovanog na proviziji od partnerskih lokala.",
      en: "A platform built for tourists exploring Belgrade's cafés, restaurants, and clubs. I conceived, designed, and developed it entirely on my own — from the UI/UX design through the code to a revenue model based on commission from partner venues.",
    },
    highlights: {
      sr: [
        "Interaktivna 3D mapa Beograda izrađena u Three.js",
        "Video hero sekcija sa isprepletanim snimcima grada",
        "HD foto-karusel i strukturiran prikaz informacija o lokalima",
        "Poslovni model zasnovan na proviziji od partnerskih lokala",
        "U planu: MapLibre GL JS mapa, referalne preporuke i chat widget",
      ],
      en: [
        "Interactive 3D map of Belgrade built with Three.js",
        "Video hero section with interwoven footage of the city",
        "HD photo carousel and structured venue information",
        "Revenue model based on commission from partner venues",
        "Planned: MapLibre GL JS map, referrals, and a chat widget",
      ],
    },
    tech: ["JavaScript", "Three.js", "HTML5", "CSS3", "Responsive Design"],

    // TO ADD A SCREENSHOT (recommended): save one to
    // client/public/images/project-feelbg.png and uncomment the line below.
    // imageUrl: "/images/project-feelbg.png",

    // Set to true to embed the live site instead — check first that feelbg.com
    // renders inside an iframe (some hosts block it; see notes above).
    livePreview: false,
  },
];
