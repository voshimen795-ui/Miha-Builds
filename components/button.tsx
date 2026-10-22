"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "@/lib/motion";

type Props = {
  href: string;
  children: string;
  variant?: "ink" | "line";
  size?: "md" | "sm";
  className?: string;
  icon?: ReactNode;
};

const Arrow = () => (
  <svg className="btn__arrow" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

// A pill button with a rolling label and a gentle magnetic pull toward the
// pointer. The pull only runs on devices with a fine pointer.
export default function Button({ href, children, variant = "ink", size = "md", className = "", icon }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.18;
    const y = (e.clientY - r.top - r.height / 2) * 0.28;
    gsap.to(ref.current, { x, y, duration: 0.6, ease: "quiet" });
  };

  const onLeave = () => {
    if (ref.current) gsap.to(ref.current, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.45)" });
  };

  return (
    <a
      ref={ref}
      href={href}
      className={`btn btn--${variant} ${size === "sm" ? "btn--sm" : ""} ${className}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {variant === "ink" ? <span className="btn__dot" aria-hidden="true" /> : null}
      <span className="btn__label">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      {icon ?? <Arrow />}
    </a>
  );
}
