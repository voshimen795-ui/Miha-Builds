"use client";

import { useEffect, useRef } from "react";
import { useLang } from "@/lib/lang";
import { useReveal } from "@/lib/use-reveal";
import SectionHead from "../section-head";
import BrandMark from "../brand-mark";

// 06: the tools you already use orbit one quiet centre. Two counter-rotating
// rings; the motion pauses whenever the section is off screen.
export default function Tools() {
  const { t, lang } = useLang();
  const T = t.tools;
  const root = useRef<HTMLElement>(null);
  useReveal(root, [lang]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => el.classList.toggle("tools--live", e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const inner = T.list.slice(0, 5);
  const outer = T.list.slice(5);

  return (
    <section ref={root} className="night tools" id="tools">
      <div className="shell tools__inner">
        <div className="tools__copy">
          <SectionHead n="06" label={T.kicker} dark />
          <h2 className="display rv-title tools__title" key={lang}>
            {T.title}
          </h2>
        </div>
        <div className="orbit rv" aria-label={T.list.join(", ")}>
          <div className="orbit__hub">
            <BrandMark />
          </div>
          {[inner, outer].map((ring, r) => (
            <div key={r} className={`orbit__ring orbit__ring--${r}`} aria-hidden="true">
              {ring.map((name, i) => (
                <span
                  key={name}
                  className="orbit__item"
                  style={{ ["--a" as string]: `${(360 / ring.length) * i}deg` }}
                >
                  <span className="orbit__chip mono">{name}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
