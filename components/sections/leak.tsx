"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { useLang } from "@/lib/lang";
import { useReveal } from "@/lib/use-reveal";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import SectionHead from "../section-head";
import GridLines from "../grid-lines";

// 02: the page turns to night. Pick a department, watch its manual steps
// get struck through and replaced by what the system does instead.
export default function Leak() {
  const { t, lang } = useLang();
  const L = t.leak;
  const root = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const dep = L.departments[active];

  // Departments cycle on their own while in view, until the visitor picks one.
  useEffect(() => {
    if (!auto || prefersReducedMotion()) return;
    let timer: ReturnType<typeof setInterval> | null = null;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !timer) timer = setInterval(() => setActive((a) => (a + 1) % L.departments.length), 5200);
      if (!e.isIntersecting && timer) {
        clearInterval(timer);
        timer = null;
      }
    });
    if (panel.current) io.observe(panel.current);
    return () => {
      if (timer) clearInterval(timer);
      io.disconnect();
    };
  }, [auto, L.departments.length]);

  useReveal(root, [lang]);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !panel.current) return;
      const tl = gsap.timeline({ defaults: { ease: "quiet" } });
      tl.fromTo(".leak__strike", { scaleX: 0 }, { scaleX: 1, duration: 0.7, stagger: 0.12 }, 0.15)
        .fromTo(".leak__auto li", { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1 }, 0.35)
        .fromTo(".leak__hours", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9 }, 0.2);
    },
    { scope: panel, dependencies: [active, lang] },
  );

  return (
    <section ref={root} className="night leak" id="leak">
      <GridLines />
      <div className="shell">
        <SectionHead n="02" label={L.kicker} dark />
        <h2 className="display rv-title leak__statement" key={lang}>
          {L.statement}
        </h2>

        <div className="leak__board">
          <div className="leak__tabs rv" role="tablist" aria-label={L.kicker}>
            {L.departments.map((d, i) => (
              <button
                key={d.name}
                role="tab"
                aria-selected={i === active}
                className="leak__tab"
                data-cursor="pick"
                onClick={() => {
                  setAuto(false);
                  setActive(i);
                }}
              >
                <span className="mono">0{i + 1}</span>
                {d.name}
                {i === active && auto && <span key={active} className="leak__timer" aria-hidden="true" />}
              </button>
            ))}
          </div>

          <div ref={panel} className="leak__panel rv" role="tabpanel">
            <div className="leak__col">
              <p className="mono leak__label">{L.today}</p>
              <ul className="leak__manual">
                {dep.manual.map((m) => (
                  <li key={m}>
                    <span>{m}</span>
                    <i className="leak__strike" aria-hidden="true" />
                  </li>
                ))}
              </ul>
            </div>
            <div className="leak__col">
              <p className="mono leak__label leak__label--on">{L.withSystem}</p>
              <ul className="leak__auto">
                {dep.auto.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
            <div className="leak__hours">
              <strong>{dep.hours} h</strong>
              <span className="mono">{L.saved}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
