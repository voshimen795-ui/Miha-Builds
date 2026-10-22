"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText, prefersReducedMotion } from "@/lib/motion";
import { useLang } from "@/lib/lang";
import { useReveal } from "@/lib/use-reveal";
import { EMAIL } from "@/lib/content";
import SectionHead from "../section-head";
import GridLines from "../grid-lines";
import Footer from "../footer";
import { ESTIMATE_EVENT } from "./calculator";

// Free Web3Forms key, set NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY on Vercel. Without
// a key the form opens the visitor's mail app with everything filled in.
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

type State = "idle" | "sending" | "ok" | "fail";

export default function Contact() {
  const { t, lang } = useLang();
  const C = t.contact;
  const root = useRef<HTMLElement>(null);
  const [state, setState] = useState<State>("idle");
  const [estimate, setEstimate] = useState("");
  useReveal(root, [lang]);

  // The closing wordmark rises letter by letter as the page runs out.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const split = SplitText.create(".wordmark", { type: "chars", mask: "chars" });
      gsap.from(split.chars, {
        yPercent: 105,
        stagger: 0.04,
        ease: "quiet",
        scrollTrigger: { trigger: ".wordmark", start: "top 95%", end: "bottom 85%", scrub: 0.8 },
      });
      return () => split.revert();
    },
    { scope: root },
  );

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(ESTIMATE_EVENT);
      if (saved) setEstimate(saved);
    } catch {
      // No storage: the live event still works.
    }
    const on = (e: Event) => setEstimate((e as CustomEvent<string>).detail);
    window.addEventListener(ESTIMATE_EVENT, on);
    return () => window.removeEventListener(ESTIMATE_EVENT, on);
  }, []);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const body = [
      `${C.name}: ${data.name}`,
      `${C.company}: ${data.company}`,
      `${C.email}: ${data.email}`,
      `${C.pain}: ${data.pain}`,
      estimate ? `${C.estimate}: ${estimate}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    if (!ACCESS_KEY) {
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`Procena · ${data.company || data.name}`)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setState("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Miha Builds · ${data.company || data.name}`,
          from_name: data.name,
          replyto: data.email,
          message: body,
        }),
      });
      const json = await res.json();
      setState(json.success ? "ok" : "fail");
      if (json.success) form.reset();
    } catch {
      setState("fail");
    }
  };

  return (
    <section ref={root} className="night contact" id="contact">
      <GridLines />
      <div className="shell">
        <SectionHead n="12" label={C.kicker} dark />
        <div className="contact__grid">
          <div>
            <h2 className="display rv-title contact__title" key={lang}>
              {C.title}
            </h2>
            <p className="body-lg contact__lead rv">{C.lead}</p>
            <p className="contact__direct rv">
              <span className="mono">{C.or}</span>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </p>
          </div>

          <form className="form rv" onSubmit={submit}>
            <label className="field">
              <span>{C.name}</span>
              <input name="name" required autoComplete="name" />
            </label>
            <label className="field">
              <span>{C.company}</span>
              <input name="company" autoComplete="organization" />
            </label>
            <label className="field">
              <span>{C.email}</span>
              <input name="email" type="email" required autoComplete="email" />
            </label>
            <label className="field">
              <span>{C.pain}</span>
              <textarea name="pain" rows={3} required />
            </label>
            {estimate && (
              <p className="form__estimate mono">
                {C.estimate}: {estimate}
              </p>
            )}
            <button className="btn btn--signal" type="submit" disabled={state === "sending"}>
              <span className="btn__label">
                <span>{state === "sending" ? C.sending : C.send}</span>
                <span aria-hidden="true">{state === "sending" ? C.sending : C.send}</span>
              </span>
              <svg className="btn__arrow" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </button>
            <p className="form__status" role="status">
              {state === "ok" && C.ok}
              {state === "fail" && (
                <>
                  {C.fail} <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </>
              )}
            </p>
          </form>
        </div>

        <div className="wordmark" aria-hidden="true">
          Miha <em>Builds</em>
        </div>
        <Footer />
      </div>
    </section>
  );
}
