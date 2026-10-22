"use client";

import { useEffect, useRef } from "react";
import { useLang } from "@/lib/lang";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";

// A band of large type that drifts on its own and surges with scroll
// speed; scrolling up turns it around.
export default function Marquee({ dark = false }: { dark?: boolean }) {
  const { t } = useLang();
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !track.current || !root.current) return;
    const el = track.current;
    let x = 0;
    let dir = -1;
    let boost = 0;
    let visible = false;

    const st = ScrollTrigger.create({
      trigger: root.current,
      start: "top bottom",
      end: "bottom top",
      onToggle: (self) => (visible = self.isActive),
      onUpdate: (self) => {
        dir = self.direction === 1 ? -1 : 1;
        boost = Math.min(Math.abs(self.getVelocity()) / 120, 18);
      },
    });

    const tick = (_t: number, dt: number) => {
      if (!visible) return;
      const half = el.scrollWidth / 2;
      boost *= 0.94;
      x += dir * (0.6 + boost) * (dt / 16.7);
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      gsap.set(el, { x });
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      st.kill();
    };
  }, []);

  const words = [...t.marquee, ...t.marquee];
  return (
    <div ref={root} className={`marquee ${dark ? "marquee--dark" : ""}`} aria-hidden="true">
      <div ref={track} className="marquee__track">
        {[...words, ...words].map((w, i) => (
          <span key={i} className={i % 2 ? "marquee__w marquee__w--it" : "marquee__w"}>
            {w}
            <i />
          </span>
        ))}
      </div>
    </div>
  );
}
