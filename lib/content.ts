// All site copy lives here, SR and EN side by side. Keep it short:
// one idea per line, numbers over adjectives.

export type Lang = "sr" | "en";

export const EMAIL = "mihailoautomation@gmail.com";

export type SystemSlug = "knjigovodje" | "zakazivanje" | "salon" | "lead-finder";

const sr = {
  nav: {
    systems: "Sistemi",
    process: "Proces",
    pricing: "Saradnja",
    about: "O meni",
    cta: "Zakaži procenu",
    menu: "Meni",
    close: "Zatvori",
  },
  hero: {
    kicker: "Automatizacija poslovnih procesa",
    line1: "Vaš tim radi posao",
    line2: "koji mašina može.",
    line3: "Ja ga vraćam u sate, novac i mir.",
    lead: "Računi, podsetnici, zakazivanja i izveštaji rade sami. Uz alate koje već koristite.",
    ctaPrimary: "Zakaži 20-min procenu",
    ctaSecondary: "Izračunaj uštedu",
    scrollHint: "Skrolujte",
    inputs: ["Mejl", "PDF račun", "Excel", "Viber", "Papir"],
    outputs: ["Proknjiženo", "Podsetnik poslat", "Izveštaj u 08:00"],
    hub: "n8n + AI",
    noteChaos: "ručni rad",
    noteCalm: "radi sam, 24/7",
    counterLabel: "Ručnih koraka",
    stateChaos: "Haos",
    stateCalm: "Tiho",
  },
  leak: {
    kicker: "Gde vam curi novac",
    statement: "Vaši ljudi su plaćeni da misle, ne da prepisuju.",
    today: "Danas",
    withSystem: "Sa sistemom",
    saved: "nedeljno nazad, primer",
    departments: [
      {
        name: "Finansije",
        hours: 8,
        manual: ["Prepisivanje računa iz mejla", "Jurenje klijenata za dokumenta", "Provera duplikata ručno"],
        auto: ["AI čita PIB, iznos i PDV", "Podsetnici idu sami 25. i 28.", "Duplikati označeni odmah"],
      },
      {
        name: "Prodaja",
        hours: 6,
        manual: ["Upit čeka do ponedeljka", "Follow-up kad se neko seti", "Kontakti u tri tabele"],
        auto: ["Odgovor za minut, 24/7", "Follow-up posle 2 i 5 dana", "Svaki lead na jednom mestu"],
      },
      {
        name: "Operacije",
        hours: 5,
        manual: ["Zakazivanje telefonom", "Propušteni termini", "Ručne potvrde"],
        auto: ["Online zakazivanje", "Podsetnik 48 h ranije", "Lista čekanja popunjava rupe"],
      },
      {
        name: "Uprava",
        hours: 3,
        manual: ["Izveštaj iz pet Excel fajlova", "Petkom posle podne", "Svaki put drugačiji"],
        auto: ["Izveštaj u 08:00 svaki dan", "Uvek isti format", "Bez ijednog klika"],
      },
    ],
  },
  calc: {
    kicker: "Kalkulator",
    title: "Koliko vas košta ručni rad?",
    people: "Ljudi na ručnom poslu",
    hours: "Sati nedeljno po osobi",
    rate: "Cena sata rada",
    perYear: "godišnje",
    hoursYear: "sati godišnje",
    fteUnit: "zaposlenih više, bez zapošljavanja",
    note: "Gruba procena: 46 radnih nedelja, 60% posla realno automatizovano.",
    cta: "Pošalji mi ovu procenu",
  },
  systems: {
    kicker: "Sistemi",
    title: "Već izgrađeno. Prilagođavam vašoj firmi.",
    open: "Kako radi",
    estimate: "Brojevi su procene iz demo verzije.",
    items: {
      knjigovodje: {
        name: "AI asistent za knjigovođe",
        problem: "Unos dokumenata jede do 30% vremena agencije.",
        result: "Od mejla do tabele za par sekundi",
        steps: ["Račun stiže mejlom", "AI čita PIB, iznos, PDV", "Provera duplikata i zbirova", "Podsetnik klijentu 25. i 28.", "Pregled u 08:00 i Excel izvoz"],
        needs: ["Mejl na koji klijenti šalju dokumenta", "Excel ili Google Sheets"],
        setup: "7 do 14 dana",
      },
      zakazivanje: {
        name: "Asistent za zakazivanje",
        problem: "Recepcija živi na telefonu, pacijenti zaboravljaju termine.",
        result: "Manje propuštenih termina",
        steps: ["Pacijent bira termin online", "AI potvrđuje i odgovara", "Termin upisan u kalendar", "Podsetnik 48 h ranije", "Otkazan termin ide sledećem"],
        needs: ["Kalendar ordinacije", "Mejl ili SMS"],
        setup: "5 do 10 dana",
      },
      salon: {
        name: "Salon asistent",
        problem: "Termini preko Instagrama i Vibera, rupe posle otkazivanja.",
        result: "Popunjeni otkazani termini",
        steps: ["Klijent zakazuje", "Podsetnik na Viber ili mejl", "Otkaz otvara mesto", "Lista čekanja dobija poruku", "Nedeljni pregled za vlasnika"],
        needs: ["Viber, WhatsApp ili mejl", "Spisak usluga i cena"],
        setup: "5 do 10 dana",
      },
      "lead-finder": {
        name: "Lead Finder",
        problem: "Prodaja ručno traži firme i kontakte po mapama.",
        result: "40 firmi sa kontekstom za par minuta",
        steps: ["Grad i delatnost", "Pretraga firmi", "AI istražuje svaku", "Ključne osobe izdvojene", "Excel spreman za prodaju"],
        needs: ["Ciljni grad i delatnost", "Excel"],
        setup: "3 do 7 dana",
      },
    } as Record<SystemSlug, SystemCopy>,
  },
  system: {
    back: "Svi sistemi",
    problem: "Problem",
    flow: "Kako radi",
    result: "Rezultat",
    needs: "Šta vam treba",
    setup: "Uvođenje",
    cta: "Hoću ovo za svoju firmu",
    demo: "Video demo šaljem na zahtev.",
  },
  process: {
    kicker: "Proces",
    title: "Četiri koraka do sistema koji radi sam.",
    steps: [
      { t: "Mapiranje", d: "45 min, besplatno. Dobijate pisanu mapu procesa." },
      { t: "Prototip", d: "Za 7 dana, na vašim pravim podacima." },
      { t: "Uvođenje", d: "Povezujem vaše alate i obučim tim." },
      { t: "Održavanje", d: "Mesečni izveštaj: koliko je sati vraćeno." },
    ],
  },
  tools: {
    kicker: "Alati",
    title: "Ne menjate softver. Povezujem ono što već koristite.",
    list: ["Gmail", "Outlook", "Excel", "Google Sheets", "Viber", "WhatsApp", "SEF", "Kalendar", "CRM", "Gemini", "OpenAI", "PDF"],
  },
  pricing: {
    kicker: "Saradnja",
    title: "Počinje besplatno.",
    tiers: [
      { name: "Procena", price: "Besplatno", points: ["45 min razgovora", "Mapa procesa", "Šta prvo automatizovati"] },
      { name: "Pilot", price: "Fiksna cena", points: ["Jedan proces", "Gotovo za 7 do 14 dana", "30 dana podrške"] },
      { name: "Partner", price: "Mesečno", points: ["Više procesa", "Održavanje i izmene", "Mesečni izveštaj uštede"] },
    ],
    cta: "Zakaži procenu",
  },
  trust: {
    kicker: "Poverenje",
    title: "Vaši podaci ostaju vaši.",
    points: [
      { t: "EU serveri", d: "Ili vaš server. Vi birate." },
      { t: "NDA", d: "Pre prvog razgovora, ako želite." },
      { t: "Minimalan pristup", d: "Samo ono što proces traži." },
      { t: "Sve je vaše", d: "Sistem, podaci i uputstvo." },
    ],
  },
  about: {
    kicker: "O meni",
    title: "Razgovarate sa onim ko pravi sistem.",
    body: "Mihailo Kojić. Studirao AI Solutions u Austriji. Gradim sisteme koji firmama skidaju ručni rad, na srpskom i engleskom.",
    cv: "CV (PDF)",
  },
  sites: {
    kicker: "Takođe",
    title: "Pravim i sajtove.",
    items: [
      { name: "FeelBG", url: "https://feelbg.com", d: "Platforma za beogradske lokale" },
      { name: "Cvećara Trofej", url: "https://cvecaratrofej.com", d: "Katalog i poručivanje" },
      { name: "GMGMT", url: "https://gmgmt-ten.vercel.app", d: "Sajt menadžment agencije" },
      { name: "Vukša", url: "https://vuksasajt.vercel.app", d: "Sajt malog biznisa" },
    ],
  },
  faq: {
    kicker: "Pitanja",
    items: [
      { q: "Koliko traje?", a: "Prvi proces radi za 7 do 14 dana." },
      { q: "Moramo li da menjamo program?", a: "Ne. Povezujem alate koje već imate." },
      { q: "Da li AI greši?", a: "Može. Zato sistem označi sve nesigurno, a proverava čovek." },
      { q: "Šta ako se proces promeni?", a: "Menjam sistem. U Partner saradnji je uključeno." },
      { q: "Ko je vlasnik sistema?", a: "Vi. Sistem, podaci i dokumentacija." },
    ],
  },
  contact: {
    kicker: "Kontakt",
    title: "Nađimo vaših prvih 10 sati.",
    lead: "20 minuta. Na kraju znate šta može da se automatizuje i koliko vredi.",
    name: "Ime",
    company: "Firma",
    email: "Mejl",
    pain: "Šta vam najviše jede vreme?",
    send: "Pošalji",
    sending: "Šaljem",
    ok: "Stiglo je. Javljam se u roku od 24 h.",
    fail: "Nije prošlo. Pišite mi direktno:",
    or: "ili direktno",
    estimate: "Moja procena iz kalkulatora",
  },
  footer: {
    line: "Automatizacija poslovnih procesa · Beograd",
    top: "Na vrh",
  },
};

export type SystemCopy = {
  name: string;
  problem: string;
  result: string;
  steps: string[];
  needs: string[];
  setup: string;
};

type Copy = typeof sr;

const en: Copy = {
  nav: {
    systems: "Systems",
    process: "Process",
    pricing: "Engagement",
    about: "About",
    cta: "Book an assessment",
    menu: "Menu",
    close: "Close",
  },
  hero: {
    kicker: "Business process automation",
    line1: "Your team is doing work",
    line2: "a machine should do.",
    line3: "I give it back as hours, money and calm.",
    lead: "Invoices, reminders, bookings and reports run on their own. With the tools you already use.",
    ctaPrimary: "Book a 20-min assessment",
    ctaSecondary: "Calculate savings",
    scrollHint: "Scroll",
    inputs: ["Email", "PDF invoice", "Excel", "Viber", "Paper"],
    outputs: ["Booked", "Reminder sent", "Report at 08:00"],
    hub: "n8n + AI",
    noteChaos: "manual work",
    noteCalm: "runs itself, 24/7",
    counterLabel: "Manual steps",
    stateChaos: "Chaos",
    stateCalm: "Quiet",
  },
  leak: {
    kicker: "Where your money leaks",
    statement: "Your people are paid to think, not to retype.",
    today: "Today",
    withSystem: "With a system",
    saved: "back every week, example",
    departments: [
      {
        name: "Finance",
        hours: 8,
        manual: ["Retyping invoices from email", "Chasing clients for documents", "Checking duplicates by hand"],
        auto: ["AI reads tax ID, amount, VAT", "Reminders go out on the 25th and 28th", "Duplicates flagged instantly"],
      },
      {
        name: "Sales",
        hours: 6,
        manual: ["Enquiry waits until Monday", "Follow-up when someone remembers", "Contacts in three sheets"],
        auto: ["Reply in a minute, 24/7", "Follow-up after 2 and 5 days", "Every lead in one place"],
      },
      {
        name: "Operations",
        hours: 5,
        manual: ["Booking by phone", "Missed appointments", "Manual confirmations"],
        auto: ["Online booking", "Reminder 48 h ahead", "Waitlist fills the gaps"],
      },
      {
        name: "Management",
        hours: 3,
        manual: ["Report from five Excel files", "Friday afternoons", "Different every time"],
        auto: ["Report at 08:00 daily", "Always the same format", "Zero clicks"],
      },
    ],
  },
  calc: {
    kicker: "Calculator",
    title: "What is manual work costing you?",
    people: "People doing manual work",
    hours: "Hours per person, per week",
    rate: "Cost of an hour",
    perYear: "per year",
    hoursYear: "hours per year",
    fteUnit: "extra employees, without hiring",
    note: "Rough estimate: 46 working weeks, 60% of the work realistically automated.",
    cta: "Send me this estimate",
  },
  systems: {
    kicker: "Systems",
    title: "Already built. Tailored to your company.",
    open: "How it works",
    estimate: "Figures are estimates from the demo.",
    items: {
      knjigovodje: {
        name: "AI assistant for accountants",
        problem: "Document entry eats up to 30% of an agency's time.",
        result: "From email to spreadsheet in seconds",
        steps: ["Invoice arrives by email", "AI reads tax ID, amount, VAT", "Duplicate and total checks", "Client reminder on the 25th and 28th", "08:00 summary and Excel export"],
        needs: ["The inbox clients send documents to", "Excel or Google Sheets"],
        setup: "7 to 14 days",
      },
      zakazivanje: {
        name: "Booking assistant",
        problem: "Reception lives on the phone, patients forget appointments.",
        result: "Fewer missed appointments",
        steps: ["Patient books online", "AI confirms and replies", "Booked in the calendar", "Reminder 48 h ahead", "Cancelled slot goes to the next"],
        needs: ["The practice calendar", "Email or SMS"],
        setup: "5 to 10 days",
      },
      salon: {
        name: "Salon assistant",
        problem: "Bookings via Instagram and Viber, gaps after cancellations.",
        result: "Cancelled slots filled",
        steps: ["Client books", "Reminder by Viber or email", "Cancellation frees a slot", "Waitlist gets a message", "Weekly summary for the owner"],
        needs: ["Viber, WhatsApp or email", "List of services and prices"],
        setup: "5 to 10 days",
      },
      "lead-finder": {
        name: "Lead Finder",
        problem: "Sales searches maps by hand for companies and contacts.",
        result: "40 companies with context in minutes",
        steps: ["City and industry", "Company search", "AI researches each", "Key people extracted", "Excel ready for sales"],
        needs: ["Target city and industry", "Excel"],
        setup: "3 to 7 days",
      },
    },
  },
  system: {
    back: "All systems",
    problem: "Problem",
    flow: "How it works",
    result: "Result",
    needs: "What you need",
    setup: "Setup",
    cta: "I want this for my company",
    demo: "Video demo available on request.",
  },
  process: {
    kicker: "Process",
    title: "Four steps to a system that runs itself.",
    steps: [
      { t: "Mapping", d: "45 min, free. You get a written process map." },
      { t: "Prototype", d: "In 7 days, on your real data." },
      { t: "Rollout", d: "I connect your tools and train the team." },
      { t: "Care", d: "Monthly report: hours given back." },
    ],
  },
  tools: {
    kicker: "Tools",
    title: "No new software. I connect what you already use.",
    list: ["Gmail", "Outlook", "Excel", "Google Sheets", "Viber", "WhatsApp", "e-Invoicing", "Calendar", "CRM", "Gemini", "OpenAI", "PDF"],
  },
  pricing: {
    kicker: "Engagement",
    title: "It starts free.",
    tiers: [
      { name: "Assessment", price: "Free", points: ["45 min call", "Process map", "What to automate first"] },
      { name: "Pilot", price: "Fixed price", points: ["One process", "Done in 7 to 14 days", "30 days of support"] },
      { name: "Partner", price: "Monthly", points: ["Several processes", "Maintenance and changes", "Monthly savings report"] },
    ],
    cta: "Book an assessment",
  },
  trust: {
    kicker: "Trust",
    title: "Your data stays yours.",
    points: [
      { t: "EU servers", d: "Or your own. Your call." },
      { t: "NDA", d: "Before the first call, if you like." },
      { t: "Minimal access", d: "Only what the process needs." },
      { t: "You own it", d: "System, data and manual." },
    ],
  },
  about: {
    kicker: "About",
    title: "You talk to the person who builds it.",
    body: "Mihailo Kojić. Studied AI Solutions in Austria. I build systems that take manual work off companies, in English and Serbian.",
    cv: "CV (PDF)",
  },
  sites: {
    kicker: "Also",
    title: "I build websites too.",
    items: [
      { name: "FeelBG", url: "https://feelbg.com", d: "Platform for Belgrade venues" },
      { name: "Cvećara Trofej", url: "https://cvecaratrofej.com", d: "Catalog and ordering" },
      { name: "GMGMT", url: "https://gmgmt-ten.vercel.app", d: "Management agency site" },
      { name: "Vukša", url: "https://vuksasajt.vercel.app", d: "Small business site" },
    ],
  },
  faq: {
    kicker: "Questions",
    items: [
      { q: "How long does it take?", a: "The first process runs in 7 to 14 days." },
      { q: "Do we have to switch software?", a: "No. I connect the tools you have." },
      { q: "Does AI make mistakes?", a: "It can. So the system flags anything uncertain and a person checks it." },
      { q: "What if our process changes?", a: "I change the system. Included in Partner." },
      { q: "Who owns the system?", a: "You. System, data and documentation." },
    ],
  },
  contact: {
    kicker: "Contact",
    title: "Let's find your first 10 hours.",
    lead: "20 minutes. By the end you know what can be automated and what it's worth.",
    name: "Name",
    company: "Company",
    email: "Email",
    pain: "What eats most of your time?",
    send: "Send",
    sending: "Sending",
    ok: "Got it. I'll reply within 24 h.",
    fail: "That didn't go through. Write to me directly:",
    or: "or directly",
    estimate: "My calculator estimate",
  },
  footer: {
    line: "Business process automation · Belgrade",
    top: "Back to top",
  },
};

export const content: Record<Lang, Copy> = { sr, en };
export type Content = Copy;
export const SYSTEM_SLUGS: SystemSlug[] = ["knjigovodje", "zakazivanje", "salon", "lead-finder"];
