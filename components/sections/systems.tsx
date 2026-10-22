"use client";

import Link from "next/link";
import { useRef } from "react";
import { useLang } from "@/lib/lang";
import { useReveal } from "@/lib/use-reveal";
import { SYSTEM_SLUGS } from "@/lib/content";
import SectionHead from "../section-head";
import GridLines from "../grid-lines";
import FlowLine from "../flow-line";

export default function Systems() {
  const { t, lang } = useLang();
  const S = t.systems;
  const root = useRef<HTMLElement>(null);
  useReveal(root, [lang]);

  return (
    <section ref={root} className="paper paper--deep systems" id="systems">
      <GridLines />
      <div className="shell">
        <SectionHead n="04" label={S.kicker} />
        <h2 className="display rv-title systems__title" key={lang}>
          {S.title}
        </h2>

        <div className="systems__grid">
          {SYSTEM_SLUGS.map((slug, i) => {
            const it = S.items[slug];
            return (
              <Link
                key={slug}
                href={`/sistemi/${slug}`}
                className="card rv"
                data-cursor="open"
                onPointerMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
                }}
              >
                <span className="card__spot" aria-hidden="true" />
                <div className="card__top mono">
                  <span>0{i + 1}</span>
                  <span className="card__open">
                    {S.open}
                    <svg viewBox="0 0 14 14" aria-hidden="true">
                      <path d="M1 7h11M8 3l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                  </span>
                </div>
                <h3 className="card__name">{it.name}</h3>
                <p className="card__problem">{it.problem}</p>
                <FlowLine steps={it.steps} />
                <p className="card__result">
                  <i aria-hidden="true" />
                  {it.result}
                </p>
              </Link>
            );
          })}
        </div>
        <p className="mono systems__note rv">{S.estimate}</p>
      </div>
    </section>
  );
}
