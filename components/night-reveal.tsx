"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";

// Each dark "machine room" section opens like a lid as it arrives: it starts
// inset with rounded corners and widens to full bleed.
export default function NightReveal() {
  const path = usePathname();
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".night").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(0% 5% 0% 5% round 48px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 0px)",
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "top 25%", scrub: 0.5 },
          },
        );
      });
    });
    const id = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => {
      clearTimeout(id);
      ctx.revert();
    };
  }, [path]);
  return null;
}
