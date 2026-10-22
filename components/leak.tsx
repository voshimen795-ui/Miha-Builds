"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useLang } from "@/lib/lang";
import { gsap, SplitText, prefersReducedMotion } from "@/lib/motion";

// 02 opens the "machine room": the page turns to night and the statement
// reads itself in, word by word, at the speed you scroll.
export default function Leak() {
  const { t, lang } = useLang();
  const root = useRef<HTMLElement>(null);
  const statement = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !statement.current) return;
      const split = SplitText.create(statement.current, { type: "words", wordsClass: "word" });
      gsap.to(split.words, {
        opacity: 1,
        stagger: 0.08,
        ease: "none",
        scrollTrigger: { trigger: statement.current, start: "top 78%", end: "bottom 42%", scrub: 0.6 },
      });
      return () => split.revert();
    },
    { scope: root, dependencies: [lang], revertOnUpdate: true },
  );

  return (
    <section ref={root} className="leak" id="leak">
      <div className="grid-lines" aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} />
        ))}
      </div>
      <div className="shell">
        <div className="leak__head mono">
          <b>{t.leak.index}</b>
          <span>{t.leak.kicker}</span>
        </div>
        <p ref={statement} className="leak__statement" key={lang}>
          {t.leak.statement}
        </p>
        <p className="leak__note mono">{t.leak.note}</p>
      </div>
    </section>
  );
}
