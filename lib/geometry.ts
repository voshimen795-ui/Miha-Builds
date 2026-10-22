// Pure helpers for the hero machine: seeded randomness, Catmull-Rom
// smoothing, and the two states every wire moves between.

export type Pt = { x: number; y: number };

export function seeded(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const smooth = (t: number) => t * t * (3 - 2 * t);
export const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Catmull-Rom through every point, written as cubic Béziers. */
export function toPath(pts: Pt[], tension = 1) {
  if (pts.length < 2) return "";
  let d = `M${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1.x + ((p2.x - p0.x) / 6) * tension;
    const c1y = p1.y + ((p2.y - p0.y) / 6) * tension;
    const c2x = p2.x - ((p3.x - p1.x) / 6) * tension;
    const c2y = p2.y - ((p3.y - p1.y) / 6) * tension;
    d += ` C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

export type Layout = {
  w: number;
  h: number;
  compact: boolean;
  chipW: number;
  chipH: number;
  outW: number;
  inputs: Pt[];
  outputs: Pt[];
  hub: Pt;
  hubR: number;
  knot: Pt;
  tangled: Pt[][];
  straight: Pt[][];
  phases: number[][];
};

const POINTS = 11;

export function buildLayout(w: number, h: number, count: number, outCount: number): Layout {
  const compact = w < 720;
  const chipW = compact ? 92 : 128;
  const chipH = 28;
  const outW = compact ? 0 : 168;
  const top = compact ? 44 : 34;
  const bottom = h - (compact ? 96 : 86);
  const hub = { x: compact ? w - 46 : w * 0.6, y: (top + bottom) / 2 };
  const hubR = compact ? 18 : 24;
  const knot = { x: compact ? w * 0.6 : w * 0.43, y: hub.y };

  const inputs = Array.from({ length: count }, (_, i) => ({
    x: 0,
    y: lerp(top, bottom, i / (count - 1)),
  }));

  const outputs = Array.from({ length: outCount }, (_, i) => ({
    x: w - outW,
    y: lerp(hub.y - (bottom - top) * 0.32, hub.y + (bottom - top) * 0.32, i / Math.max(1, outCount - 1)),
  }));

  const rand = seeded(427);
  const tangled: Pt[][] = [];
  const straight: Pt[][] = [];
  const phases: number[][] = [];

  inputs.forEach((inp) => {
    const start = { x: chipW, y: inp.y };
    const end = { x: hub.x - hubR - 6, y: hub.y };
    const s: Pt[] = [];
    const t: Pt[] = [];
    const ph: number[] = [];
    const spanX = knot.x - start.x;

    for (let j = 0; j < POINTS; j++) {
      const k = j / (POINTS - 1);
      // Calm state: leave the chip level, then ease into the hub.
      const settle = smooth(clamp01((k - 0.18) / 0.82));
      s.push({ x: lerp(start.x, end.x, k), y: lerp(start.y, end.y, settle) });

      // Chaos state: the wire doubles back on itself and wanders the whole
      // height before dying in a knot short of the hub.
      if (j === 0) {
        t.push({ ...start });
      } else {
        const swing = Math.sin(Math.PI * k);
        const back = (rand() - 0.5) * spanX * 0.55 * swing;
        const x = start.x + spanX * Math.pow(k, 0.85) + back;
        const y =
          j === POINTS - 1
            ? knot.y + (rand() - 0.5) * 70
            : lerp(top - 10, bottom + 10, rand()) * swing + inp.y * (1 - swing);
        t.push({ x, y });
      }
      ph.push(rand() * Math.PI * 2);
    }
    straight.push(s);
    tangled.push(t);
    phases.push(ph);
  });

  return { w, h, compact, chipW, chipH, outW, inputs, outputs, hub, hubR, knot, tangled, straight, phases };
}
