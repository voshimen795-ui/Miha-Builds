"use client";

import { type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText, prefersReducedMotion } from "./motion";

// Shared entrance for every section: `.rv-title` headings rise line by line
// from behind a mask, `.rv` blocks drift up and settle. Runs once per view.
export function useReveal(scope: RefObject<HTMLElement | null>, deps: unknown[] = []) {
  useGSAP(
    () => {
      if (prefersReducedMotion() || !scope.current) return;
      const splits: SplitText[] = [];

      scope.current.querySelectorAll<HTMLElement>(".rv-title").forEach((el) => {
        const split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "ln" });
        splits.push(split);
        gsap.from(split.lines, {
          yPercent: 110,
          duration: 1.3,
          stagger: 0.08,
          ease: "quiet",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });

      scope.current.querySelectorAll<HTMLElement>(".rv").forEach((el) => {
        gsap.from(el, {
          y: 26,
          autoAlpha: 0,
          duration: 1.1,
          ease: "quiet",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      return () => splits.forEach((s) => s.revert());
    },
    { scope, dependencies: deps, revertOnUpdate: true },
  );
}
