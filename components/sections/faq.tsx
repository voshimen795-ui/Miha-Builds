"use client";

import { useRef, useState } from "react";
import { useLang } from "@/lib/lang";
import { useReveal } from "@/lib/use-reveal";
import SectionHead from "../section-head";
import GridLines from "../grid-lines";

export default function Faq() {
  const { t, lang } = useLang();
  const F = t.faq;
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(0);
  useReveal(root, [lang]);

  return (
    <section ref={root} className="paper faq" id="faq">
      <GridLines />
      <div className="shell faq__inner">
        <div>
          <SectionHead n="11" label={F.kicker} />
        </div>
        <div className="faq__list">
          {F.items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={it.q} className={`qa rv ${isOpen ? "qa--open" : ""}`}>
                <button
                  className="qa__q"
                  aria-expanded={isOpen}
                  aria-controls={`qa-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  {it.q}
                  <span className="qa__icon" aria-hidden="true" />
                </button>
                <div className="qa__a" id={`qa-${i}`} role="region">
                  <div>
                    <p>{it.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
