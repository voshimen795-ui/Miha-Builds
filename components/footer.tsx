"use client";

import { usePathname } from "next/navigation";
import { useLang } from "@/lib/lang";
import BrandMark from "./brand-mark";

export default function Footer() {
  const { t } = useLang();
  const base = usePathname() === "/" ? "" : "/";
  return (
    <footer className="footer">
      <a href={`${base}#top`} className="brand">
        <BrandMark />
        Miha Builds
      </a>
      <span className="mono">{t.footer.line}</span>
      <span className="mono">© 2026</span>
      <a href="#top" className="mono footer__top">
        {t.footer.top} ↑
      </a>
    </footer>
  );
}
