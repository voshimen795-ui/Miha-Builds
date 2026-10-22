"use client";

import { useRef, useState } from "react";
import { useLang } from "@/lib/lang";
import { useReveal } from "@/lib/use-reveal";
import SectionHead from "../section-head";
import GridLines from "../grid-lines";
import Odometer from "../odometer";

const WEEKS = 46;
const SHARE = 0.6;
const FTE_HOURS = 1800;

export const ESTIMATE_EVENT = "miha:estimate";

function Slider(props: {
  label: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  const pct = ((props.value - props.min) / (props.max - props.min)) * 100;
  return (
    <label className="slider" data-cursor="drag">
      <span className="slider__top">
        <span>{props.label}</span>
        <b className="mono">
          {props.value}
          {props.unit}
        </b>
      </span>
      <input
        type="range"
        min={props.min}
        max={props.max}
        value={props.value}
        style={{ ["--p" as string]: `${pct}%` }}
        onChange={(e) => props.onChange(Number(e.target.value))}
      />
    </label>
  );
}

export default function Calculator() {
  const { t, lang } = useLang();
  const C = t.calc;
  const root = useRef<HTMLElement>(null);
  const [people, setPeople] = useState(5);
  const [hours, setHours] = useState(6);
  const [rate, setRate] = useState(12);

  useReveal(root, [lang]);

  const yearHours = Math.round(people * hours * WEEKS * SHARE);
  const yearEuro = Math.round((yearHours * rate) / 10) * 10;
  const locale = lang === "sr" ? "sr-RS" : "en-GB";
  const fte = (yearHours / FTE_HOURS).toLocaleString(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const euro = yearEuro.toLocaleString(locale);

  const send = () => {
    const text = `${C.people}: ${people} · ${C.hours}: ${hours} · ${C.rate}: ${rate} € → ≈ ${euro} € ${C.perYear}, ${yearHours} ${C.hoursYear}`;
    try {
      sessionStorage.setItem(ESTIMATE_EVENT, text);
    } catch {
      // Fine: the event below still carries it.
    }
    window.dispatchEvent(new CustomEvent(ESTIMATE_EVENT, { detail: text }));
  };

  return (
    <section ref={root} className="paper calc" id="calculator">
      <GridLines />
      <div className="shell">
        <SectionHead n="03" label={C.kicker} />
        <h2 className="display rv-title calc__title" key={lang}>
          {C.title}
        </h2>

        <div className="calc__body">
          <div className="calc__inputs rv">
            <Slider label={C.people} value={people} min={1} max={50} unit="" onChange={setPeople} />
            <Slider label={C.hours} value={hours} min={1} max={20} unit=" h" onChange={setHours} />
            <Slider label={C.rate} value={rate} min={5} max={60} unit=" €" onChange={setRate} />
            <p className="calc__note">{C.note}</p>
          </div>

          <div className="calc__result rv" aria-live="polite">
            <div className="calc__big">
              <Odometer value={euro} />
              <span className="calc__unit">€</span>
            </div>
            <p className="mono calc__per">{C.perYear}</p>
            <div className="calc__row">
              <div>
                <Odometer value={yearHours.toLocaleString(locale)} className="odo--sm" />
                <p className="mono">{C.hoursYear}</p>
              </div>
              <div>
                <span className="calc__fte">{fte}</span>
                <p className="mono">{C.fteUnit}</p>
              </div>
            </div>
            <a href="#contact" className="link-arrow" onClick={send}>
              {C.cta}
              <svg viewBox="0 0 14 14" aria-hidden="true">
                <path d="M1 7h11M8 3l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
