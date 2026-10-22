// All site copy lives here, in both languages, so the SR/EN toggle and
// future case-study pages read from one place.

export type Lang = "sr" | "en";

export const content = {
  sr: {
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
      index: "01",
      kicker: "Automatizacija poslovnih procesa",
      meta: "Beograd · rad za celu Evropu",
      line1: "Vaš tim radi posao",
      line2: "koji mašina može.",
      line3: "Ja ga vraćam u sate, novac i mir.",
      lead:
        "Gradim sisteme koji sami preuzimaju ponavljajući rad: unos računa, podsetnike, zakazivanja i izveštaje. Povezujem alate koje već koristite, uz AI tamo gde ima smisla.",
      ctaPrimary: "Zakaži 20-min procenu",
      ctaSecondary: "Izračunaj uštedu",
      scrollHint: "Skrolujte da raspletemo",
      inputs: ["Mejl", "PDF račun", "Excel", "Viber", "Papir"],
      outputs: ["Proknjiženo", "Podsetnik poslat", "Izveštaj u 08:00"],
      hub: "n8n + AI",
      noteChaos: "ručno prepisivanje, prosleđivanje, podsećanje",
      noteCalm: "radi sam, 24/7",
      counterLabel: "Ručnih koraka",
      stateChaos: "Stanje: haos",
      stateCalm: "Stanje: tiho",
    },
    leak: {
      index: "02",
      kicker: "Gde vam curi novac",
      statement:
        "Vaši ljudi su plaćeni da misle. A veliki deo njihove nedelje odlazi na prepisivanje, prosleđivanje i podsećanje drugih.",
      note: "Prototip: ostale sekcije stižu u sledećoj fazi.",
    },
  },
  en: {
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
      index: "01",
      kicker: "Business process automation",
      meta: "Belgrade · working across Europe",
      line1: "Your team is doing work",
      line2: "a machine should do.",
      line3: "I give it back as hours, money and calm.",
      lead:
        "I build systems that take over repetitive work on their own: invoice entry, reminders, bookings and reports. I connect the tools you already use, with AI where it actually helps.",
      ctaPrimary: "Book a 20-min assessment",
      ctaSecondary: "Calculate savings",
      scrollHint: "Scroll to untangle",
      inputs: ["Email", "PDF invoice", "Excel", "Viber", "Paper"],
      outputs: ["Booked", "Reminder sent", "Report at 08:00"],
      hub: "n8n + AI",
      noteChaos: "manual retyping, forwarding, chasing",
      noteCalm: "runs on its own, 24/7",
      counterLabel: "Manual steps",
      stateChaos: "State: chaos",
      stateCalm: "State: quiet",
    },
    leak: {
      index: "02",
      kicker: "Where your money leaks",
      statement:
        "Your people are paid to think. Yet a large part of their week goes to retyping, forwarding and chasing others.",
      note: "Prototype: the remaining sections arrive in the next phase.",
    },
  },
} as const;

export type Content = (typeof content)[Lang];
