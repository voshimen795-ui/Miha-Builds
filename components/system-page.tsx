"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useLang } from "@/lib/lang";
import { useReveal } from "@/lib/use-reveal";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { SYSTEM_SLUGS, type SystemSlug } from "@/lib/content";
import GridLines from "./grid-lines";
import SectionHead from "./section-head";
import Button from "./button";
import FlowLine from "./flow-line";
import Footer from "./footer";

export default function SystemPage({ slug }: { slug: SystemSlug }) {
  const { t, lang } = useLang();
  const it = t.systems.items[slug];
  const L = t.system;
  const root = useRef<HTMLElement>(null);
  const flow = useRef<HTMLDivElement>(null);
  const n = SYSTEM_SLUGS.indexOf(slug) + 1;
  const next = SYSTEM_SLUGS[n % SYSTEM_SLUGS.length];

  useReveal(root, [lang, slug]);

  // The vertical flow lights node by node as it scrolls through view.
  useGSAP(
    () => {
      if (!flow.current) return;
      const items = flow.current.querySelectorAll("li");
      if (prefersReducedMotion()) {
        items.forEach((li) => li.classList.add("on"));
        return;
      }
      items.forEach((li) => {
        gsap.timeline({ scrollTrigger: { trigger: li, start: "top 70%", toggleClass: { targets: li, className: "on" }, once: true } });
      });
    },
    { scope: flow, dependencies: [lang, slug] },
  );

  return (
    <article ref={root} className="paper case">
      <GridLines />
      <div className="shell">
        <Link href="/#systems" className="mono case__back rv">
          ← {L.back}
        </Link>
        <SectionHead n={`04.${n}`} label={t.systems.kicker} />
        <h1 className="display rv-title case__title" key={lang}>
          {it.name}
        </h1>

        <div className="case__grid">
          <div className="case__side">
            <div className="case__block rv">
              <p className="mono">{L.problem}</p>
              <p className="body-lg">{it.problem}</p>
            </div>
            <div className="case__block rv">
              <p className="mono">{L.result}</p>
              <p className="case__result">{it.result}</p>
              <p className="mono case__est">{t.systems.estimate}</p>
            </div>
            <div className="case__block rv">
              <p className="mono">{L.needs}</p>
              <ul className="case__list">
                {it.needs.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <div className="case__block rv">
              <p className="mono">{L.setup}</p>
              <p className="body-lg">{it.setup}</p>
            </div>
          </div>

          <div ref={flow} className="case__flow">
            <p className="mono rv">{L.flow}</p>
            <FlowLine steps={it.steps} vertical />
          </div>
        </div>

        <div className="case__cta rv">
          <Button href="/#contact">{L.cta}</Button>
          <span className="mono">{L.demo}</span>
        </div>

        <Link href={`/sistemi/${next}`} className="case__next rv">
          <span className="mono">0{(n % SYSTEM_SLUGS.length) + 1}</span>
          <span>{t.systems.items[next].name}</span>
          <svg viewBox="0 0 14 14" aria-hidden="true">
            <path d="M1 7h11M8 3l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </Link>
        <Footer />
      </div>
    </article>
  );
}
