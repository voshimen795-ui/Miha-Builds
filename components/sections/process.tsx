"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useLang } from "@/lib/lang";
import { useReveal } from "@/lib/use-reveal";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import SectionHead from "../section-head";
import GridLines from "../grid-lines";

// 05: a single rule draws across the four steps as you scroll; each step's
// node switches on as the line reaches it.
export default function Process() {
  const { t, lang } = useLang();
  const P = t.process;
  const root = useRef<HTMLElement>(null);
  useReveal(root, [lang]);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const steps = gsap.utils.toArray<HTMLElement>(".step");
      gsap.fromTo(
        ".steps__fill",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".steps",
            start: "top 75%",
            end: "bottom 45%",
            scrub: 0.6,
            onUpdate: (self) => {
              steps.forEach((s, i) => s.classList.toggle("step--on", self.progress >= i / steps.length + 0.02));
            },
          },
        },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} className="night process" id="process">
      <GridLines />
      <div className="shell">
        <SectionHead n="05" label={P.kicker} dark />
        <h2 className="display rv-title process__title" key={lang}>
          {P.title}
        </h2>
        <ol className="steps">
          <span className="steps__rail" aria-hidden="true">
            <span className="steps__fill" />
          </span>
          {P.steps.map((s, i) => (
            <li key={s.t} className="step">
              <i aria-hidden="true" />
              <span className="mono">0{i + 1}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
