"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/lang";

type Ev = { id: number; text: string };

// A strip of the machine at work: a new (demo) event lands every couple of
// seconds and the row slides to make room. Only runs while on screen.
export default function Ticker() {
  const { t, lang } = useLang();
  const L = t.live;
  const root = useRef<HTMLDivElement>(null);
  const seq = useRef(427);
  const [events, setEvents] = useState<Ev[]>([]);

  useEffect(() => {
    const make = (): Ev => {
      const i = seq.current++;
      const tpl = L.events[i % L.events.length];
      const hh = 9 + (i % 8);
      const text = tpl
        .replace("{n}", String(i).padStart(4, "0"))
        .replace("{s}", (1.2 + ((i * 7) % 30) / 10).toLocaleString(lang === "sr" ? "sr-RS" : "en-GB"))
        .replace("{c}", L.clients[i % L.clients.length])
        .replace("{t}", `${hh}:${i % 2 ? "30" : "00"}`);
      return { id: i, text };
    };
    setEvents(Array.from({ length: 8 }, make).reverse());

    let timer: ReturnType<typeof setInterval> | null = null;
    const start = () => {
      if (timer) return;
      timer = setInterval(() => setEvents((ev) => [make(), ...ev].slice(0, 9)), 2400);
    };
    const stop = () => {
      if (timer) clearInterval(timer);
      timer = null;
    };
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()));
    if (root.current) io.observe(root.current);
    return () => {
      stop();
      io.disconnect();
    };
  }, [L, lang]);

  return (
    <div ref={root} className="ticker" aria-hidden="true">
      <span className="ticker__label mono">
        <i />
        {L.label}
      </span>
      <div className="ticker__track">
        {events.map((e, k) => (
          <span key={e.id} className={`ticker__ev mono ${k === 0 ? "ticker__ev--new" : ""}`}>
            <b>●</b>
            {e.text}
          </span>
        ))}
      </div>
    </div>
  );
}
