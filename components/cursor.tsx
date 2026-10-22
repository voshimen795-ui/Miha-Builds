"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/lang";
import { gsap } from "@/lib/motion";

type Kind = "open" | "drag" | "visit" | "pick";

// Desktop-only cursor: an exact dot plus a ring that trails it. Over
// interactive things the ring grows; elements with data-cursor="open|drag|
// visit|pick" make it carry a word.
export default function Cursor() {
  const { t } = useLang();
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<Kind | null>(null);
  const [hot, setHot] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const html = document.documentElement;
    // Stay hidden until the pointer actually moves, so it never parks at 0,0.
    html.classList.add("has-cursor", "cursor-out");

    const dx = gsap.quickTo(dot.current, "x", { duration: 0.08, ease: "power3" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.08, ease: "power3" });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.55, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.55, ease: "power3" });

    const move = (e: PointerEvent) => {
      html.classList.remove("cursor-out");
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
      const target = e.target as HTMLElement;
      const tagged = target.closest<HTMLElement>("[data-cursor]");
      setLabel((tagged?.dataset.cursor as Kind) ?? null);
      setHot(!!target.closest("a, button, input, textarea, label"));
    };
    const leave = () => html.classList.add("cursor-out");
    const enter = () => html.classList.remove("cursor-out");
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    document.addEventListener("pointerenter", enter);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.removeEventListener("pointerenter", enter);
      html.classList.remove("has-cursor", "cursor-out");
    };
  }, []);

  return (
    <>
      <div ref={ring} className={`cursor-ring ${hot ? "is-hot" : ""} ${label ? "is-label" : ""}`} aria-hidden="true">
        <span>{label ? t.cursor[label] : ""}</span>
      </div>
      <div ref={dot} className={`cursor-dot ${label ? "is-hidden" : ""}`} aria-hidden="true" />
    </>
  );
}
