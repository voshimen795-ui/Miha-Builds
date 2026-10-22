"use client";

import { useRef } from "react";
import { useLang } from "@/lib/lang";
import { useReveal } from "@/lib/use-reveal";
import SectionHead from "../section-head";
import GridLines from "../grid-lines";
import Button from "../button";

export default function Pricing() {
  const { t, lang } = useLang();
  const P = t.pricing;
  const root = useRef<HTMLElement>(null);
  useReveal(root, [lang]);

  return (
    <section ref={root} className="paper pricing" id="pricing">
      <GridLines />
      <div className="shell">
        <SectionHead n="07" label={P.kicker} />
        <h2 className="display rv-title pricing__title" key={lang}>
          {P.title}
        </h2>
        <div className="tiers">
          {P.tiers.map((tier, i) => (
            <div key={tier.name} className={`tier rv ${i === 0 ? "tier--lead" : ""}`}>
              <p className="mono tier__n">0{i + 1}</p>
              <h3 className="tier__name">{tier.name}</h3>
              <p className="tier__price">{tier.price}</p>
              <ul>
                {tier.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              {i === 0 && (
                <Button href="#contact" variant="line" className="tier__cta">
                  {P.cta}
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
