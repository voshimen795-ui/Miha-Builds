"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/lang";
import BrandMark from "./brand-mark";
import Button from "./button";

export default function Nav() {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      // Step out of the way while reading down, return on the way back up.
      setHidden(y > 240 && y > last + 2);
      if (y < last - 2) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const links = [
    { href: "#systems", label: t.nav.systems, n: "04" },
    { href: "#process", label: t.nav.process, n: "05" },
    { href: "#pricing", label: t.nav.pricing, n: "07" },
    { href: "#about", label: t.nav.about, n: "09" },
  ];

  return (
    <>
      <header className={`nav ${scrolled ? "nav--scrolled" : ""} ${hidden && !open ? "nav--hidden" : ""}`}>
        <div className="shell nav__inner">
          <a href="#top" className="brand" aria-label="Miha Builds">
            <BrandMark />
            Miha Builds
          </a>

          <nav className="nav__links" aria-label="Primary">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="nav__link">
                {l.label}
                <sup>{l.n}</sup>
              </a>
            ))}
          </nav>

          <div className="nav__end">
            <div className="lang" role="group" aria-label="Language">
              <button aria-pressed={lang === "sr"} onClick={() => setLang("sr")}>
                SR
              </button>
              <span aria-hidden="true">/</span>
              <button aria-pressed={lang === "en"} onClick={() => setLang("en")}>
                EN
              </button>
            </div>
            <Button href="#contact" size="sm" className="nav__cta">
              {t.nav.cta}
            </Button>
            <button
              className="nav__menu-btn mono"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? t.nav.close : t.nav.menu}
            </button>
          </div>
        </div>
      </header>

      <div className={`sheet ${open ? "sheet--open" : ""}`} aria-hidden={!open}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
            {l.label}
          </a>
        ))}
        <div style={{ marginTop: 24 }}>
          <Button href="#contact">{t.nav.cta}</Button>
        </div>
      </div>
    </>
  );
}
