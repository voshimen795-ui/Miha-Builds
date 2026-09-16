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
  {
    title: "Cvećara Trofej",
    url: "https://cvecaratrofej.com",
    category: { sr: "Sajt za biznis", en: "Business Website" },
    status: { sr: "Uživo", en: "Live" },
    tagline: {
      sr: "Katalog cvetnih aranžmana i online poručivanje",
      en: "Floral catalog with online ordering",
    },
    description: {
      sr: "Sajt cvećare sa katalogom buketa i aranžmana i formom za poručivanje sa dostavom. Radio sam dizajn i razvoj — od strukture kataloga do toka poručivanja koji kupca vodi od izbora aranžmana do slanja porudžbine, bez komplikacija i bez naloga.",
      en: "A florist's website with a catalog of bouquets and arrangements plus an order form with delivery details. I handled design and development — from the catalog structure to an ordering flow that takes the buyer from picking an arrangement to submitting the order, with no friction and no account required.",
    },
    highlights: {
      sr: [
        "Katalog aranžmana organizovan po kategorijama i povodima",
        "Forma za poručivanje sa podacima za dostavu i porukom uz cveće",
        "Galerija sa fotografijama u punoj rezoluciji",
        "Mobile-first dizajn — većina porudžbina stiže sa telefona",
        "Brzo učitavanje i lokalni SEO za pretragu „cvećara“",
      ],
      en: [
        "Catalog of arrangements organized by category and occasion",
        "Order form capturing delivery details and a gift message",
        "Gallery with full-resolution photography",
        "Mobile-first design — most orders arrive from a phone",
        "Fast loading and local SEO for florist searches",
      ],
    },
    tech: ["React", "TypeScript", "Tailwind CSS", "Responsive Design", "SEO"],
    livePreview: false,
  },
  {
    title: "GMGMT",
    url: "https://gmgmt-ten.vercel.app",
    category: { sr: "Sajt agencije", en: "Agency Website" },
    status: { sr: "Uživo", en: "Live" },
    tagline: {
      sr: "Prezentacija menadžment agencije",
      en: "Management agency presentation site",
    },
    description: {
      sr: "Sajt menadžment agencije koji predstavlja usluge, način rada i tim, sa strukturom koja posetioca vodi ka kontaktu. Fokus je na čistom, modernom dizajnu, mekim animacijama i učitavanju koje ne troši strpljenje klijenta.",
      en: "A management agency's website presenting its services, working process, and team, structured to lead visitors toward getting in touch. The focus is on a clean, modern design, smooth animation, and load times that don't spend the client's patience.",
    },
    highlights: {
      sr: [
        "Jasna sekcija usluga i objašnjen proces saradnje",
        "Predstavljanje tima i referenci agencije",
        "Animirani prelazi i mikro-interakcije kroz celu stranicu",
        "Kontakt sekcija kao glavni cilj konverzije",
        "Deploy na Vercel — svaki push objavljuje novu verziju",
      ],
      en: [
        "Clear services section with the working process spelled out",
        "Team and agency references presented up front",
        "Animated transitions and micro-interactions throughout",
        "Contact section as the primary conversion goal",
        "Deployed on Vercel — every push ships a new version",
      ],
    },
    tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
    livePreview: false,
  },
  {
    title: "Vukša",
    url: "https://vuksasajt.vercel.app",
    category: { sr: "Sajt za biznis", en: "Business Website" },
    status: { sr: "Uživo", en: "Live" },
    tagline: {
      sr: "One-pager prezentacija malog biznisa",
      en: "One-page presentation site for a small business",
    },
    description: {
      sr: "Prezentacioni sajt malog biznisa sažet u jednu stranicu: usluge, cenovnik, galerija i kontakt. Cilj je bio da posetilac za manje od minuta vidi šta se nudi, koliko košta i kako da se javi — bez menija, bez lutanja kroz podstranice.",
      en: "A small business presentation site condensed into a single page: services, pricing, gallery, and contact. The goal was for a visitor to see what's offered, what it costs, and how to get in touch in under a minute — no menus, no wandering through subpages.",
    },
    highlights: {
      sr: [
        "Sve na jednoj stranici — usluge, cene, galerija, kontakt",
        "Pregledan cenovnik bez skrivenih stavki",
        "Galerija radova kao glavni argument za poverenje",
        "Kontakt forma i direktan poziv jednim klikom sa telefona",
        "Lagan statički sajt, hostovan besplatno na Vercel-u",
      ],
      en: [
        "Everything on one page — services, pricing, gallery, contact",
        "Transparent pricing with no hidden items",
        "Work gallery carrying the case for trust",
        "Contact form plus one-tap calling from a phone",
        "Lightweight static site, hosted free on Vercel",
      ],
    },
    tech: ["React", "TypeScript", "Tailwind CSS", "Responsive Design", "Vercel"],
    livePreview: false,
  },
];
