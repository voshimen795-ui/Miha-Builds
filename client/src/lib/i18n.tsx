import { createContext, useContext, useState, useCallback } from "react";

export type Lang = "sr" | "en";

const translations = {
  nav: {
    home: { sr: "Pocetna", en: "Home" },
    lab: { sr: "Laboratorija", en: "The Lab" },
    beta: { sr: "Beta Program", en: "Beta Program" },
    applyForBeta: { sr: "Prijavi se", en: "Apply for Beta" },
  },
  hero: {
    badge: { sr: "Primamo prijave", en: "Now Accepting Applications" },
    headlinePre: { sr: "Gradimo", en: "Building the" },
    headlineMid: { sr: "Digitalni Standard", en: "2026 Digital" },
    headlinePost: { sr: "2026.", en: "Standard." },
    subheadline: { sr: "Premium web iskustva za brendove koji odbijaju da budu prosecni.", en: "Premium web experiences for brands that refuse to blend in." },
    betaSpots: { sr: "3 besplatna beta mesta dostupna.", en: "3 Free Beta Spots Available." },
    claimSpot: { sr: "Rezervisi mesto", en: "Claim Your Spot" },
    viewWork: { sr: "Pogledaj radove", en: "View Our Work" },
  },
  stats: {
    satisfaction: { sr: "Zadovoljstvo klijenata", en: "Client Satisfaction" },
    projects: { sr: "Isporucenih projekata", en: "Projects Delivered" },
    support: { sr: "Podrska", en: "Dedicated Support" },
  },
  features: {
    sectionLabel: { sr: "Zasto Miha Builds", en: "Why Miha Builds" },
    sectionTitle: { sr: "Inzenjering za izvrsnost", en: "Engineered for Excellence" },
    precision: { sr: "Precizni inzenjering", en: "Precision Engineering" },
    precisionDesc: { sr: "Svaki piksel, svaka interakcija, pedantno napravljena za moderan web.", en: "Every pixel, every interaction, meticulously crafted for the modern web." },
    lightning: { sr: "Munjevite performanse", en: "Lightning Performance" },
    lightningDesc: { sr: "Optimizovano za brzinu. Ucitavanje za manje od sekunde.", en: "Optimized for speed. Sub-second load times that keep users engaged." },
    futureProof: { sr: "Tehnologije buducnosti", en: "Future-Proof Stack" },
    futureProofDesc: { sr: "Izgradeno sa najnovijim tehnologijama koje rastu sa vasom vizijom.", en: "Built with cutting-edge technologies that scale with your vision." },
  },
  process: {
    sectionLabel: { sr: "Nas proces", en: "Our Process" },
    sectionTitle: { sr: "Kako", en: "How We" },
    sectionTitleAccent: { sr: "gradimo", en: "Build" },
    discovery: { sr: "Istrazivanje", en: "Discovery" },
    discoveryDesc: { sr: "Duboko se upoznajemo sa vasom markom, publikom i ciljevima da kreiramo savrsen plan.", en: "We dive deep into your brand, audience, and goals to craft the perfect strategy." },
    design: { sr: "Dizajn", en: "Design" },
    designDesc: { sr: "Piksel-savrseni mockup-ovi sa paznjom na svaki detalj, animaciju i mikro-interakciju.", en: "Pixel-perfect mockups with attention to every detail, animation, and micro-interaction." },
    develop: { sr: "Razvoj", en: "Develop" },
    developDesc: { sr: "Cist, performantan kod izgraden sa najnovijim tehnologijama i najboljim praksama.", en: "Clean, performant code built with cutting-edge technologies and best practices." },
    deploy: { sr: "Lansiranje", en: "Deploy" },
    deployDesc: { sr: "Lansirajte sa pouzdanjem. Optimizovan hosting, analitika i stalna podrska.", en: "Launch with confidence. Optimized hosting, analytics, and ongoing support." },
  },
  cta: {
    title: { sr: "Spremni da napravite nesto", en: "Ready to Build Something" },
    titleAccent: { sr: " izvanredno", en: " Extraordinary" },
    description: { sr: "Saradjujemo sa ambicioznim brendovima da kreiramo digitalna iskustva koja postavljaju nove standarde. Ogranicen broj mesta.", en: "We partner with ambitious brands to create digital experiences that set new standards. Limited spots available." },
    button: { sr: "Prijavi se za besplatan beta", en: "Apply for Free Beta" },
  },
  footer: {
    tagline: { sr: "Gradimo buducnost, piksel po piksel.", en: "Building the future, one pixel at a time." },
  },
  lab: {
    badge: { sr: "Laboratorija", en: "The Lab" },
    title: { sr: "Nas", en: "Our" },
    titleAccent: { sr: "portfolio", en: "Portfolio" },
    description: { sr: "Svaki projekat je dokaz nase posvecenosti izvrsnosti. Istrazite nase najnovije radove.", en: "Every project is a testament to our commitment to excellence. Explore our latest builds rendered in real-time." },
    loading: { sr: "Ucitavanje projekata...", en: "Loading projects..." },
    comingSoon: { sr: "Projekti uskoro", en: "Projects Coming Soon" },
    comingSoonDesc: { sr: "Pripremamo nesto posebno. Vratite se uskoro.", en: "We're cooking up something special. Check back soon." },
    noCategory: { sr: "Nema projekata u kategoriji", en: "No projects in this category" },
    viewAll: { sr: "Pogledaj sve projekte", en: "View all projects" },
    wantProject: { sr: "Zelite vas projekat ovde?", en: "Want your project here?" },
    spotsRemaining: { sr: "Imamo 3 besplatna beta mesta.", en: "We have 3 free beta spots remaining." },
    applyNow: { sr: "Prijavi se", en: "Apply Now" },
    visitSite: { sr: "Poseti sajt", en: "Visit Site" },
    all: { sr: "Sve", en: "All" },
  },
  beta: {
    badge: { sr: "Beta program", en: "Beta Program" },
    title: { sr: "Prijavi se za", en: "Apply for" },
    titleAccent: { sr: "besplatan beta", en: "Free Beta" },
    description: { sr: "Samo 3 mesta dostupna. Ispricajte nam o svom projektu.", en: "Only 3 spots available. Tell us about your project." },
    stepAbout: { sr: "O vama", en: "About You" },
    stepBusiness: { sr: "Vas posao", en: "Your Business" },
    stepProject: { sr: "Detalji projekta", en: "Project Details" },
    fullName: { sr: "Ime i prezime", en: "Full Name" },
    email: { sr: "Email adresa", en: "Email Address" },
    businessName: { sr: "Naziv firme", en: "Business Name" },
    businessType: { sr: "Tip poslovanja", en: "Business Type" },
    currentWebsite: { sr: "Trenutni sajt (opciono)", en: "Current Website (optional)" },
    projectDescription: { sr: "Opis projekta", en: "Project Description" },
    projectPlaceholder: { sr: "Ispricajte nam o vasoj viziji. Koji problem resite? Kako izgleda vas idealan sajt?", en: "Tell us about your vision. What problem are you solving? What does your dream website look like?" },
    budgetRange: { sr: "Opseg budzeta", en: "Budget Range" },
    timeline: { sr: "Vremenski okvir", en: "Timeline" },
    howDidYouHear: { sr: "Kako ste culi za nas? (opciono)", en: "How did you hear about us? (optional)" },
    howPlaceholder: { sr: "Twitter, prijatelj, pretraga...", en: "Twitter, friend, search..." },
    back: { sr: "Nazad", en: "Back" },
    next: { sr: "Dalje", en: "Next" },
    submit: { sr: "Posalji prijavu", en: "Submit Application" },
    submitting: { sr: "Slanje...", en: "Submitting..." },
    successTitle: { sr: "Prijava primljena!", en: "Application Received!" },
    successDesc: { sr: "Hvala sto ste se prijavili za Miha Builds Beta Program. Pregledacemo vasu prijavu i javicemo vam se u roku od 48 sati.", en: "Thank you for applying to the Miha Builds Beta Program. We'll review your application and get back to you within 48 hours." },
    successBadge: { sr: "Jedan korak blize lansiranju", en: "You're one step closer to launch" },
    errorName: { sr: "Ime je obavezno", en: "Name is required" },
    errorEmail: { sr: "Potrebna je validna email adresa", en: "Valid email is required" },
    errorBusiness: { sr: "Naziv firme je obavezan", en: "Business name is required" },
    errorType: { sr: "Izaberite tip poslovanja", en: "Select a business type" },
    errorDescription: { sr: "Opisite projekat (min 20 karaktera)", en: "Describe your project (min 20 chars)" },
    errorBudget: { sr: "Izaberite opseg budzeta", en: "Select a budget range" },
    errorTimeline: { sr: "Izaberite vremenski okvir", en: "Select a timeline" },
    submissionFailed: { sr: "Slanje neuspesno", en: "Submission Failed" },
    businessTypes: {
      sr: ["Startap", "E-Trgovina", "SaaS", "Agencija", "Licni brend", "Neprofitna", "Drugo"],
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
    limited: { sr: "Ogranicena dostupnost", en: "Limited availability" },
    applyNow: { sr: "Prijavi se", en: "Apply Now" },
  },
  notFound: {
    message: { sr: "Ova stranica ne postoji.", en: "This page doesn't exist yet." },
    goHome: { sr: "Na pocetnu", en: "Go Home" },
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
