"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { useLang } from "@/lib/lang";
import { gsap, ScrollTrigger, SplitText, prefersReducedMotion } from "@/lib/motion";
import { buildLayout, clamp01, easeInOutCubic, lerp, toPath, type Layout } from "@/lib/geometry";
import Button from "./button";

const MAX_STEPS = 14;

export default function Hero() {
  const { t, lang } = useLang();
  const h = t.hero;

  const root = useRef<HTMLElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const wires = useRef<(SVGPathElement | null)[]>([]);
  const outs = useRef<(SVGPathElement | null)[]>([]);
  const packets = useRef<(SVGCircleElement | null)[]>([]);
  const hubCore = useRef<SVGCircleElement>(null);
  const hubRing = useRef<SVGGElement>(null);
  const noteChaos = useRef<SVGGElement>(null);
  const noteCalm = useRef<SVGGElement>(null);
  const counter = useRef<HTMLElement>(null);
  const state = useRef<HTMLSpanElement>(null);
  const hint = useRef<HTMLSpanElement>(null);

  const progress = useRef(0);
  const [layout, setLayout] = useState<Layout | null>(null);
  const layoutRef = useRef<Layout | null>(null);
  layoutRef.current = layout;

  // Geometry follows the stage's real pixel size so labels never scale.
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) setLayout(buildLayout(width, height, h.inputs.length, h.outputs.length));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [h.inputs.length, h.outputs.length]);

  // Headline arrives line by line from behind a mask.
  useGSAP(
    () => {
      const reduce = prefersReducedMotion();
      let split: SplitText | null = null;
      const run = () => {
        if (!title.current) return;
        split = SplitText.create(title.current.querySelectorAll(".line"), { type: "lines", mask: "lines", linesClass: "ln" });
        const tl = gsap.timeline({ defaults: { ease: "quiet" } });
        if (reduce) return;
        tl.from(split.lines, { yPercent: 110, duration: 1.5, stagger: 0.09 }, 0.1)
          .from(".hero__meta > *", { y: 14, autoAlpha: 0, duration: 1, stagger: 0.06 }, 0.35)
          .from(".hero__lead, .hero__actions > *", { y: 18, autoAlpha: 0, duration: 1.1, stagger: 0.07 }, 0.6)
          .from(".hero__stage", { autoAlpha: 0, duration: 1.6 }, 0.5)
          .from(".hero__hud > *", { y: 10, autoAlpha: 0, duration: 1 }, 1);
      };
      document.fonts.ready.then(run);
      return () => split?.revert();
    },
    { scope: root, dependencies: [lang], revertOnUpdate: true },
  );

  // Scroll pins the hero and drives the untangling from 0 to 1.
  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        progress.current = 1;
        return;
      }
      const st = ScrollTrigger.create({
        trigger: root.current,
        // On short phones the hero is taller than the screen: pin once its
        // bottom (the machine) is fully in view instead of at the very top.
        start: () => (root.current && root.current.offsetHeight > window.innerHeight + 4 ? "bottom bottom" : "top top"),
        end: "+=120%",
        pin: true,
        scrub: 0.9,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          progress.current = self.progress;
        },
      });
      return () => st.kill();
    },
    { scope: root },
  );

  // One frame loop draws the machine. It only runs while the hero is visible.
  useEffect(() => {
    let raf = 0;
    let visible = true;
    const start = performance.now();
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(frame);
    });
    if (root.current) io.observe(root.current);

    function frame(now: number) {
      raf = 0;
      const L = layoutRef.current;
      if (L) draw(L, (now - start) / 1000);
      if (visible) raf = requestAnimationFrame(frame);
    }

    function draw(L: Layout, time: number) {
      const p = progress.current;
      const u = easeInOutCubic(clamp01(p / 0.62));
      const hubOn = clamp01((p - 0.42) / 0.22);
      const outOn = clamp01((p - 0.52) / 0.3);
      const flow = clamp01((p - 0.66) / 0.14);
      const nerves = 1 - u;

      L.tangled.forEach((tangle, i) => {
        const calm = L.straight[i];
        const ph = L.phases[i];
        const pts = tangle.map((a, j) => {
          const b = calm[j];
          const edge = j === 0 ? 0 : 1;
          // The knot twitches; the solved system is perfectly still.
          const jx = Math.sin(time * 1.3 + ph[j]) * 7 * nerves * edge;
          const jy = Math.cos(time * 1.1 + ph[j] * 1.7) * 9 * nerves * edge;
          return { x: lerp(a.x, b.x, u) + jx, y: lerp(a.y, b.y, u) + jy };
        });
        const el = wires.current[i];
        if (el) {
          el.setAttribute("d", toPath(pts));
          el.style.opacity = String(lerp(0.42, 0.9, u));
        }
      });

      outs.current.forEach((el) => {
        if (!el) return;
        const len = el.getTotalLength();
        el.style.strokeDasharray = `${len}`;
        el.style.strokeDashoffset = `${len * (1 - outOn)}`;
      });

      if (hubCore.current) {
        hubCore.current.setAttribute("r", String(lerp(3, L.hubR * 0.42, hubOn)));
        hubCore.current.style.fill = hubOn > 0.5 ? "var(--signal)" : "var(--ink)";
      }
      if (hubRing.current) {
        hubRing.current.style.opacity = String(lerp(0.15, 1, hubOn));
        hubRing.current.setAttribute("transform", `rotate(${(time * 14) % 360} ${L.hub.x} ${L.hub.y})`);
      }

      // Packets travel the straightened wires once the system is on.
      const lanes = [...wires.current, ...outs.current];
      packets.current.forEach((dot, i) => {
        const path = lanes[i];
        if (!dot || !path) return;
        const len = path.getTotalLength();
        const k = (time * (0.16 + (i % 3) * 0.03) + i * 0.37) % 1;
        const pt = path.getPointAtLength(len * k);
        dot.setAttribute("cx", pt.x.toFixed(1));
        dot.setAttribute("cy", pt.y.toFixed(1));
        const fade = Math.sin(Math.PI * k);
        dot.style.opacity = String(flow * fade);
      });

      if (noteChaos.current) noteChaos.current.style.opacity = String(clamp01(1 - u * 2.2));
      if (noteCalm.current) noteCalm.current.style.opacity = String(clamp01((p - 0.72) / 0.18));

      if (counter.current) counter.current.textContent = String(Math.round(MAX_STEPS * (1 - u))).padStart(2, "0");
      if (state.current) state.current.dataset.calm = u > 0.98 ? "1" : "0";
      if (hint.current) hint.current.style.opacity = String(clamp01(1 - p * 3));
    }

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  const L = layout;

  return (
    <section ref={root} className="hero" id="top">
      <div className="grid-lines" aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} />
        ))}
      </div>

      <div className="shell hero__top">
        <div className="hero__meta mono">
          <span className="hero__index">
            <b>{h.index}</b>
          </span>
          <span>
            <b>{h.kicker}</b>
          </span>
          <span>{h.meta}</span>
        </div>

        <h1 ref={title} className="hero__title" key={lang}>
          <span className="line">{h.line1}</span>
          <span className="line">{h.line2}</span>
          <span className="line line--accent">{h.line3}</span>
        </h1>
      </div>

      <div className="shell hero__sub">
        <p className="hero__lead">{h.lead}</p>
        <div className="hero__actions">
          <Button href="#contact">{h.ctaPrimary}</Button>
          <Button href="#calculator" variant="line">
            {h.ctaSecondary}
          </Button>
        </div>
      </div>

      <div className="shell hero__stage-wrap">
        <div ref={stage} className="hero__stage" role="img" aria-label={`${h.noteChaos} → ${h.noteCalm}`}>
          {L && (
            <svg viewBox={`0 0 ${L.w} ${L.h}`} aria-hidden="true">
              {/* Outputs: drawn from the hub once it switches on */}
              {!L.compact &&
                L.outputs.map((o, i) => (
                  <path
                    key={`o${i}`}
                    ref={(el) => {
                      outs.current[i] = el;
                    }}
                    className="m-out"
                    d={`M${L.hub.x + L.hubR + 6} ${L.hub.y} C${lerp(L.hub.x, o.x, 0.55)} ${L.hub.y} ${lerp(L.hub.x, o.x, 0.45)} ${o.y} ${o.x} ${o.y}`}
                  />
                ))}

              {/* Inputs: the wires that get untangled */}
              {L.inputs.map((_, i) => (
                <path
                  key={`w${i}`}
                  ref={(el) => {
                    wires.current[i] = el;
                  }}
                  className="m-wire"
                />
              ))}

              {/* Hub */}
              <g ref={hubRing}>
                <circle cx={L.hub.x} cy={L.hub.y} r={L.hubR} fill="var(--paper)" stroke="var(--ink)" strokeWidth="1" />
                <circle
                  cx={L.hub.x}
                  cy={L.hub.y}
                  r={L.hubR + 9}
                  fill="none"
                  stroke="var(--ink)"
                  strokeWidth="1"
                  strokeDasharray="2 6"
                />
              </g>
              <circle ref={hubCore} cx={L.hub.x} cy={L.hub.y} r="3" />
              <text className="m-label m-label--keep" x={L.hub.x} y={L.hub.y + L.hubR + 30} textAnchor="middle">
                {h.hub}
              </text>

              {/* Input chips */}
              {L.inputs.map((p, i) => (
                <g key={`c${i}`} className="m-chip" transform={`translate(${p.x} ${p.y - L.chipH / 2})`}>
                  <rect width={L.chipW} height={L.chipH} rx={L.chipH / 2} />
                  <text x={14} y={L.chipH / 2 + 4}>
                    {h.inputs[i]}
                  </text>
                </g>
              ))}

              {/* Output chips */}
              {!L.compact &&
                L.outputs.map((p, i) => (
                  <g key={`oc${i}`} className="m-chip" transform={`translate(${p.x} ${p.y - L.chipH / 2})`}>
                    <rect width={L.outW} height={L.chipH} rx={L.chipH / 2} />
                    <circle cx={14} cy={L.chipH / 2} r={3} fill="var(--signal)" />
                    <text x={26} y={L.chipH / 2 + 4}>
                      {h.outputs[i]}
                    </text>
                  </g>
                ))}

              {/* Margin notes, like an engineer's pencil on a drawing */}
              <g ref={noteChaos}>
                {L.compact ? (
                  <text className="m-note m-note--sm" x={L.w} y={14} textAnchor="end">
                    {h.noteChaos}
                  </text>
                ) : (
                  <>
                    <path
                      className="m-note-line"
                      d={`M${L.knot.x} ${L.knot.y - 40} L${L.knot.x + 30} ${18} L${L.knot.x + 52} ${18}`}
                    />
                    <text className="m-note" x={L.knot.x + 58} y={22}>
                      {h.noteChaos}
                    </text>
                  </>
                )}
              </g>
              <g ref={noteCalm} style={{ opacity: 0 }}>
                <path
                  className="m-note-line"
                  d={`M${L.hub.x} ${L.hub.y - L.hubR - 12} L${L.hub.x - 24} ${18} L${L.hub.x - 44} ${18}`}
                />
                <text className="m-note" x={L.hub.x - 50} y={22} textAnchor="end">
                  {h.noteCalm}
                </text>
              </g>

              {/* Data packets */}
              {[...L.inputs, ...(L.compact ? [] : L.outputs)].map((_, i) => (
                <circle
                  key={`p${i}`}
                  ref={(el) => {
                    packets.current[i] = el;
                  }}
                  className="m-packet"
                  r={3}
                  style={{ opacity: 0 }}
                />
              ))}
            </svg>
          )}

          <div className="hero__hud mono">
            <div className="hero__counter">
              <strong ref={counter}>{String(MAX_STEPS).padStart(2, "0")}</strong>
              <span>
                {h.counterLabel}
                <br />
                <span ref={state} className="hero__state" data-calm="0">
                  <span className="s-chaos">{h.stateChaos}</span>
                  <span className="s-calm">{h.stateCalm}</span>
                </span>
              </span>
            </div>
            <span ref={hint} className="hero__hint">
              <i aria-hidden="true" />
              {h.scrollHint}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
