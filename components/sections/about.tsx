"use client";

import { useRef } from "react";
import { useLang } from "@/lib/lang";
import { useReveal } from "@/lib/use-reveal";
import SectionHead from "../section-head";
import GridLines from "../grid-lines";

export default function About() {
  const { t, lang } = useLang();
  const A = t.about;
  const root = useRef<HTMLElement>(null);
  useReveal(root, [lang]);

  return (
    <section ref={root} className="paper about" id="about">
      <GridLines />
      <div className="shell about__inner">
        <div className="about__mono rv" aria-hidden="true">
          <svg viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 5" />
            <path d="M22 100 H178" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="178" cy="100" r="4" fill="var(--signal)" />
            <text x="100" y="92" textAnchor="middle">MK</text>
          </svg>
        </div>
        <div className="about__copy">
          <SectionHead n="09" label={A.kicker} />
          <h2 className="display rv-title about__title" key={lang}>
            {A.title}
          </h2>
          <p className="body-lg rv">{A.body}</p>
          <a className="link-arrow rv" href="/Mihailo-Kojic-CV.pdf" target="_blank" rel="noopener">
            {A.cv}
            <svg viewBox="0 0 14 14" aria-hidden="true">
              <path d="M1 7h11M8 3l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
