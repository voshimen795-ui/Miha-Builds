"use client";

import { useRef } from "react";
import { useLang } from "@/lib/lang";
import { useReveal } from "@/lib/use-reveal";
import SectionHead from "../section-head";
import GridLines from "../grid-lines";

// 10: websites are a side service now, so they get an index, not a gallery.
export default function Sites() {
  const { t, lang } = useLang();
  const S = t.sites;
  const root = useRef<HTMLElement>(null);
  useReveal(root, [lang]);

  return (
    <section ref={root} className="paper sites" id="sites">
      <GridLines />
      <div className="shell">
        <SectionHead n="10" label={S.kicker} />
        <h2 className="display display--sm rv-title sites__title" key={lang}>
          {S.title}
        </h2>
        <ul className="index">
          {S.items.map((s) => (
            <li key={s.name} className="rv">
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="index__row">
                <span className="index__name">{s.name}</span>
                <span className="index__desc">{s.d}</span>
                <span className="index__url mono">{s.url.replace(/^https?:\/\//, "")}</span>
                <svg className="index__arrow" viewBox="0 0 14 14" aria-hidden="true">
                  <path d="M3 11L11 3M5 3h6v6" fill="none" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
