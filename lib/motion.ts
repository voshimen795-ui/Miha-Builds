"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

// One easing vocabulary for the whole site. "quiet" is a long, soft
// deceleration: things arrive and settle instead of bouncing.
CustomEase.create("quiet", "0.16, 1, 0.3, 1");
CustomEase.create("lift", "0.65, 0, 0.35, 1");

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger, SplitText };
