import { createContext, useContext, useState, useCallback } from "react";

export type Lang = "sr" | "en";

const translations = {
  nav: {
    home: { sr: "Početna", en: "Home" },
    projects: { sr: "Projekti", en: "Projects" },
    services: { sr: "Usluge", en: "Services" },
    skills: { sr: "Veštine", en: "Skills" },
    contact: { sr: "Kontakt", en: "Contact" },
    getInTouch: { sr: "Kontaktiraj me", en: "Get in Touch" },
  },
  hero: {
    badge: { sr: "Dostupan za nove projekte", en: "Available for New Projects" },
    headlinePre: { sr: "Gradimo", en: "Building the" },
    headlineMid: { sr: "Digitalni Standard", en: "2026 Digital" },
    headlinePost: { sr: "2026.", en: "Standard." },
    subheadline: { sr: "Premium web iskustva za brendove koji odbijaju da budu prosečni.", en: "Premium web experiences for brands that refuse to blend in." },
    betaSpots: { sr: "Dizajn i razvoj sajtova po meri.", en: "Custom website design & development." },
    claimSpot: { sr: "Kontaktiraj me", en: "Get in Touch" },
    viewWork: { sr: "Pogledaj radove", en: "View My Work" },
  },
  stats: {
    satisfaction: { sr: "Zadovoljstvo klijenata", en: "Client Satisfaction" },
    projects: { sr: "Isporučenih projekata", en: "Projects Delivered" },
    support: { sr: "Podrška", en: "Dedicated Support" },
  },
  features: {
    sectionLabel: { sr: "Zašto Miha Builds", en: "Why Miha Builds" },
    sectionTitle: { sr: "Inženjering za izvrsnost", en: "Engineered for Excellence" },
    precision: { sr: "Precizni inženjering", en: "Precision Engineering" },
    precisionDesc: { sr: "Svaki piksel, svaka interakcija, pedantno napravljena za moderan web.", en: "Every pixel, every interaction, meticulously crafted for the modern web." },
    lightning: { sr: "Munjevite performanse", en: "Lightning Performance" },
    lightningDesc: { sr: "Optimizovano za brzinu. Učitavanje za manje od sekunde.", en: "Optimized for speed. Sub-second load times that keep users engaged." },
    futureProof: { sr: "Tehnologije budućnosti", en: "Future-Proof Stack" },
    futureProofDesc: { sr: "Izgrađeno sa najnovijim tehnologijama koje rastu sa vašom vizijom.", en: "Built with cutting-edge technologies that scale with your vision." },
  },
  process: {
    sectionLabel: { sr: "Naš proces", en: "Our Process" },
    sectionTitle: { sr: "Kako", en: "How We" },
    sectionTitleAccent: { sr: "gradimo", en: "Build" },
    discovery: { sr: "Istraživanje", en: "Discovery" },
    discoveryDesc: { sr: "Duboko se upoznajemo sa vašom markom, publikom i ciljevima da kreiramo savršen plan.", en: "We dive deep into your brand, audience, and goals to craft the perfect strategy." },
    design: { sr: "Dizajn", en: "Design" },
    designDesc: { sr: "Piksel-savršeni mockup-ovi sa pažnjom na svaki detalj, animaciju i mikro-interakciju.", en: "Pixel-perfect mockups with attention to every detail, animation, and micro-interaction." },
    develop: { sr: "Razvoj", en: "Develop" },
    developDesc: { sr: "Čist, performantan kod izgrađen sa najnovijim tehnologijama i najboljim praksama.", en: "Clean, performant code built with cutting-edge technologies and best practices." },
    deploy: { sr: "Lansiranje", en: "Deploy" },
    deployDesc: { sr: "Lansirajte sa pouzdanjem. Optimizovan hosting, analitika i stalna podrška.", en: "Launch with confidence. Optimized hosting, analytics, and ongoing support." },
  },
  cta: {
    title: { sr: "Spremni da napravite nešto", en: "Ready to Build Something" },
    titleAccent: { sr: " izvanredno", en: " Extraordinary" },
    description: { sr: "Sarađujemo sa ambicioznim brendovima da kreiramo digitalna iskustva koja postavljaju nove standarde. Ograničen broj mesta.", en: "We partner with ambitious brands to create digital experiences that set new standards. Limited spots available." },
    button: { sr: "Prijavi se za besplatan beta", en: "Apply for Free Beta" },
  },
  footer: {
    tagline: { sr: "Gradimo budućnost, piksel po piksel.", en: "Building the future, one pixel at a time." },
    rights: { sr: "Sva prava zadržana.", en: "All rights reserved." },
  },
  skills: {
    badge: { sr: "Tehnologije", en: "Tech Stack" },
    title: { sr: "Veštine i", en: "Skills &" },
    titleAccent: { sr: " alati", en: " Tools" },
    description: { sr: "Moderan stack koji koristim da gradim brze, skalabilne i lepe web aplikacije.", en: "The modern stack I use to build fast, scalable, and beautiful web apps." },
    frontend: { sr: "Frontend", en: "Frontend" },
    backend: { sr: "Backend", en: "Backend" },
    tooling: { sr: "Alati i DevOps", en: "Tooling & DevOps" },
    design: { sr: "Dizajn", en: "Design" },
  },
  contact: {
    badge: { sr: "Kontakt", en: "Contact" },
    title: { sr: "Hajde da napravimo", en: "Let's build something" },
    titleAccent: { sr: " nešto sjajno", en: " great" },
    description: { sr: "Imaš projekat na umu? Pošalji mi poruku i javiću se u roku od 48 sati.", en: "Have a project in mind? Send me a message and I'll get back to you within 48 hours." },
    name: { sr: "Ime", en: "Name" },
    email: { sr: "Email", en: "Email" },
    message: { sr: "Poruka", en: "Message" },
    namePlaceholder: { sr: "Vaše ime", en: "Your name" },
    emailPlaceholder: { sr: "vas@email.com", en: "you@email.com" },
    messagePlaceholder: { sr: "Ispričaj mi o svom projektu...", en: "Tell me about your project..." },
    send: { sr: "Pošalji poruku", en: "Send Message" },
    sending: { sr: "Slanje...", en: "Sending..." },
    successTitle: { sr: "Poruka poslata!", en: "Message sent!" },
    successDesc: { sr: "Hvala! Javiću se uskoro.", en: "Thanks! I'll be in touch soon." },
    errorTitle: { sr: "Slanje neuspešno", en: "Failed to send" },
    errorDesc: { sr: "Pokušaj ponovo ili mi piši direktno na email.", en: "Please try again or email me directly." },
    orReachMe: { sr: "Ili me pronađi na", en: "Or reach me at" },
  },
  lab: {
    badge: { sr: "Laboratorija", en: "The Lab" },
    title: { sr: "Naš", en: "Our" },
    titleAccent: { sr: "portfolio", en: "Portfolio" },
    description: { sr: "Svaki projekat je dokaz naše posvećenosti izvrsnosti. Istražite naše najnovije radove.", en: "Every project is a testament to our commitment to excellence. Explore our latest builds rendered in real-time." },
    loading: { sr: "Učitavanje projekata...", en: "Loading projects..." },
    comingSoon: { sr: "Projekti uskoro", en: "Projects Coming Soon" },
    comingSoonDesc: { sr: "Pripremamo nešto posebno. Vratite se uskoro.", en: "We're cooking up something special. Check back soon." },
    noCategory: { sr: "Nema projekata u kategoriji", en: "No projects in this category" },
    viewAll: { sr: "Pogledaj sve projekte", en: "View all projects" },
    wantProject: { sr: "Želite vaš projekat ovde?", en: "Want your project here?" },
    spotsRemaining: { sr: "Imamo 3 besplatna beta mesta.", en: "We have 3 free beta spots remaining." },
    applyNow: { sr: "Prijavi se", en: "Apply Now" },
    visitSite: { sr: "Poseti sajt", en: "Visit Site" },
    all: { sr: "Sve", en: "All" },
  },
  beta: {
    badge: { sr: "Beta program", en: "Beta Program" },
    title: { sr: "Prijavi se za", en: "Apply for" },
    titleAccent: { sr: "besplatan beta", en: "Free Beta" },
    description: { sr: "Samo 3 mesta dostupna. Ispričajte nam o svom projektu.", en: "Only 3 spots available. Tell us about your project." },
    stepAbout: { sr: "O vama", en: "About You" },
    stepBusiness: { sr: "Vaš posao", en: "Your Business" },
    stepProject: { sr: "Detalji projekta", en: "Project Details" },
    fullName: { sr: "Ime i prezime", en: "Full Name" },
    email: { sr: "Email adresa", en: "Email Address" },
    businessName: { sr: "Naziv firme", en: "Business Name" },
    businessType: { sr: "Tip poslovanja", en: "Business Type" },
    currentWebsite: { sr: "Trenutni sajt (opciono)", en: "Current Website (optional)" },
    projectDescription: { sr: "Opis projekta", en: "Project Description" },
    projectPlaceholder: { sr: "Ispričajte nam o vašoj viziji. Koji problem rešite? Kako izgleda vaš idealan sajt?", en: "Tell us about your vision. What problem are you solving? What does your dream website look like?" },
    budgetRange: { sr: "Opseg budžeta", en: "Budget Range" },
    timeline: { sr: "Vremenski okvir", en: "Timeline" },
    howDidYouHear: { sr: "Kako ste čuli za nas? (opciono)", en: "How did you hear about us? (optional)" },
    howPlaceholder: { sr: "Twitter, prijatelj, pretraga...", en: "Twitter, friend, search..." },
    back: { sr: "Nazad", en: "Back" },
    next: { sr: "Dalje", en: "Next" },
    submit: { sr: "Pošalji prijavu", en: "Submit Application" },
    submitting: { sr: "Slanje...", en: "Submitting..." },
    successTitle: { sr: "Prijava primljena!", en: "Application Received!" },
    successDesc: { sr: "Hvala što ste se prijavili za Miha Builds Beta Program. Pregledaćemo vašu prijavu i javićemo vam se u roku od 48 sati.", en: "Thank you for applying to the Miha Builds Beta Program. We'll review your application and get back to you within 48 hours." },
    successBadge: { sr: "Jedan korak bliže lansiranju", en: "You're one step closer to launch" },
    errorName: { sr: "Ime je obavezno", en: "Name is required" },
    errorEmail: { sr: "Potrebna je validna email adresa", en: "Valid email is required" },
    errorBusiness: { sr: "Naziv firme je obavezan", en: "Business name is required" },
    errorType: { sr: "Izaberite tip poslovanja", en: "Select a business type" },
    errorDescription: { sr: "Opišite projekat (min 20 karaktera)", en: "Describe your project (min 20 chars)" },
    errorBudget: { sr: "Izaberite opseg budžeta", en: "Select a budget range" },
    errorTimeline: { sr: "Izaberite vremenski okvir", en: "Select a timeline" },
    submissionFailed: { sr: "Slanje neuspešno", en: "Submission Failed" },
    businessTypes: {
      sr: ["Startap", "E-Trgovina", "SaaS", "Agencija", "Lični brend", "Neprofitna", "Drugo"],
      en: ["Startup", "E-Commerce", "SaaS", "Agency", "Personal Brand", "Non-Profit", "Other"],
    },
    budgetRanges: {
      sr: ["Besplatan beta", "1000 - 3000 RSD", "3000 - 5000 RSD", "5000 - 10000 RSD", "10000+ RSD"],
      en: ["Free Beta Tier", "$1k - $3k", "$3k - $5k", "$5k - $10k", "$10k+"],
    },
    timelines: {
      sr: ["Hitno (1-2 nedelje)", "1 mesec", "2-3 meseca", "Fleksibilno"],
      en: ["ASAP (1-2 weeks)", "1 Month", "2-3 Months", "Flexible"],
    },
  },
  sticky: {
    spotsLeft: { sr: "3 besplatna beta mesta", en: "3 Free Beta Spots Left" },
    limited: { sr: "Ograničena dostupnost", en: "Limited availability" },
    applyNow: { sr: "Prijavi se", en: "Apply Now" },
  },
  notFound: {
    message: { sr: "Ova stranica ne postoji.", en: "This page doesn't exist yet." },
    goHome: { sr: "Na početnu", en: "Go Home" },
  },
  services: {
    badge: { sr: "Naše usluge", en: "Our Services" },
    title: { sr: "Digitalna rešenja", en: "Digital Solutions" },
    titleAccent: { sr: " po meri", en: " Tailored" },
    description: { sr: "Od jednostavnih landing stranica do kompleksnih web aplikacija — biramo pravu tehnologiju za vaš projekat.", en: "From simple landing pages to complex web applications — we choose the right technology for your project." },
    startingFrom: { sr: "Od", en: "From" },
    popular: { sr: "Najpopularniji", en: "Most Popular" },
    getStarted: { sr: "Započni projekat", en: "Get Started" },
    contactUs: { sr: "Kontaktiraj nas", en: "Contact Us" },
    includedTitle: { sr: "Uključeno u svaki projekat", en: "Included in Every Project" },
    includedDesc: { sr: "Bez obzira na paket, svaki projekat dolazi sa ovim standardima kvaliteta.", en: "Regardless of the package, every project comes with these quality standards." },
    ctaTitle: { sr: "Niste sigurni koji paket vam treba?", en: "Not sure which package you need?" },
    ctaDesc: { sr: "Javite nam se i pomoći ćemo vam da izaberete pravo rešenje za vaš biznis. Konsultacija je besplatna.", en: "Reach out and we'll help you choose the right solution for your business. Consultation is free." },
    ctaButton: { sr: "Besplatna konsultacija", en: "Free Consultation" },
    landing: {
      name: { sr: "Landing stranica", en: "Landing Page" },
      price: { sr: "€200 — €500", en: "€200 — €500" },
      desc: { sr: "Savršena za lansiranje proizvoda, događaja ili ličnog brenda.", en: "Perfect for launching a product, event, or personal brand." },
      features: {
        sr: ["Jedna stranica sa sekcijama", "Responsivan dizajn", "Kontakt forma", "SEO optimizacija", "Brza isporuka (5-7 dana)"],
        en: ["Single page with sections", "Responsive design", "Contact form", "SEO optimization", "Fast delivery (5-7 days)"],
      },
    },
    business: {
      name: { sr: "Poslovni sajt", en: "Business Website" },
      price: { sr: "€500 — €1,500", en: "€500 — €1,500" },
      desc: { sr: "Profesionalno prisustvo za firme koje žele da se istaknu.", en: "Professional presence for businesses that want to stand out." },
      features: {
        sr: ["Do 10 stranica", "CMS za upravljanje sadržajem", "Blog sekcija", "Google Analytics integracija", "Optimizovane performanse", "Isporuka za 2-3 nedelje"],
        en: ["Up to 10 pages", "Content management system", "Blog section", "Google Analytics integration", "Optimized performance", "Delivery in 2-3 weeks"],
      },
    },
    ecommerce: {
      name: { sr: "E-Trgovina", en: "E-Commerce" },
      price: { sr: "€1,500 — €3,000", en: "€1,500 — €3,000" },
      desc: { sr: "Kompletna online prodavnica spremna za prodaju od prvog dana.", en: "Complete online store ready to sell from day one." },
      features: {
        sr: ["Katalog proizvoda", "Korpa i checkout", "Integracija plaćanja", "Admin panel", "Email notifikacije", "Upravljanje zalihama", "Isporuka za 3-5 nedelja"],
        en: ["Product catalog", "Cart and checkout", "Payment integration", "Admin panel", "Email notifications", "Inventory management", "Delivery in 3-5 weeks"],
      },
    },
    custom: {
      name: { sr: "Custom Web Aplikacija", en: "Custom Web App" },
      price: { sr: "€3,000+", en: "€3,000+" },
      desc: { sr: "Potpuno prilagođena aplikacija za kompleksne poslovne potrebe.", en: "Fully customized application for complex business needs." },
      features: {
        sr: ["Potpuno prilagođen dizajn", "Full-stack razvoj", "Baza podataka i API", "Korisnički panel", "Integracije sa trećim servisima", "Skalabilna arhitektura", "Stalna podrška i održavanje"],
        en: ["Fully custom design", "Full-stack development", "Database and API", "User dashboard", "Third-party integrations", "Scalable architecture", "Ongoing support and maintenance"],
      },
    },
    included: {
      sr: ["Responsivan dizajn za sve uređaje", "SEO optimizacija", "SSL sertifikat i sigurnost", "Podrška nakon lansiranja (30 dana)", "Optimizovane performanse", "Moderan tech stack"],
      en: ["Responsive design for all devices", "SEO optimization", "SSL certificate and security", "Post-launch support (30 days)", "Optimized performance", "Modern tech stack"],
    },
  },
} as const;

type Translations = typeof translations;

interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextType>({
  lang: "sr",
  setLang: () => {},
  t: translations,
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("miha-lang") as Lang) || "sr";
    }
    return "sr";
  });

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("miha-lang", newLang);
  }, []);

  return (
    <I18nContext.Provider value={{ lang, setLang, t: translations }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  const { lang, t } = ctx;

  const tr = useCallback(
    (obj: { sr: string; en: string }) => obj[lang],
    [lang]
  );

  return { ...ctx, tr };
}
