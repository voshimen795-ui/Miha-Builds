"use client";

import { useRef } from "react";
import { useLang } from "@/lib/lang";
import { useReveal } from "@/lib/use-reveal";
import SectionHead from "../section-head";
import GridLines from "../grid-lines";

export default function Trust() {
  const { t, lang } = useLang();
  const T = t.trust;
  const root = useRef<HTMLElement>(null);
  useReveal(root, [lang]);

  return (
    <section ref={root} className="paper paper--deep trust" id="trust">
      <GridLines />
      <div className="shell">
        <SectionHead n="08" label={T.kicker} />
        <h2 className="display rv-title trust__title" key={lang}>
          {T.title}
        </h2>
        <div className="trust__grid">
          {T.points.map((p) => (
            <div key={p.t} className="trust__item rv">
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
