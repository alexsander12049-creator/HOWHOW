"use client";
import { useLayoutEffect, useRef, useState } from "react";
import { agency, plans } from "@/lib/content";
import { Check, Sparkle } from "./icons";
import Num from "./Num";

const SOON = " (em breve)";
const iv = (i: number) => ({ ["--i" as string]: i }) as React.CSSProperties;

// Brilho que segue o mouse dentro do card (posição em --mx/--my).
const spot = (e: React.MouseEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

// Planos com a chave mensal/anual, o teste grátis, o que todos incluem e o plano white-label das agências.
export default function Plans() {
  const [annual, setAnnual] = useState(false);
  const btns = useRef<(HTMLButtonElement | null)[]>([]);
  const [pill, setPill] = useState({ left: 4, width: 0 });

  // a pílula preta desliza até o botão escolhido
  useLayoutEffect(() => {
    const place = () => {
      const b = btns.current[annual ? 1 : 0];
      if (b) setPill({ left: b.offsetLeft, width: b.offsetWidth });
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [annual]);

  return (
    <>
      <div className="billing reveal" role="radiogroup" aria-label="Forma de cobrança">
        <span className="billing-pill" style={{ left: pill.left, width: pill.width }} aria-hidden />
        {[false, true].map((a, k) => (
          <button
            key={k}
            ref={(el) => {
              btns.current[k] = el;
            }}
            type="button"
            role="radio"
            aria-checked={annual === a}
            className={annual === a ? "on" : ""}
            onClick={() => setAnnual(a)}
          >
            {a ? plans.billing.annual : plans.billing.monthly}
            {a && <span className="billing-hint">{plans.billing.annualHint}</span>}
          </button>
        ))}
      </div>

      <div className="trial reveal">
        <span className="trial-icon">
          <Sparkle color="#fff" />
        </span>
        <div className="trial-copy">
          <h3 className="h4">{plans.trial.title}</h3>
          <p className="body">{plans.trial.text}</p>
        </div>
        <a href={plans.trial.cta.href} className="btn white">
          <i className="dot" /> {plans.trial.cta.label}
        </a>
      </div>

      <div className="plans">
        {plans.items.map((p, n) => (
          <div className={`plan reveal${p.popular ? " popular" : ""}`} key={p.name} style={iv(n)} onMouseMove={spot}>
            <div className="plan-top">
              <h3 className="h4">{p.name}</h3>
              {p.popular && <span className="pill sm plan-badge">Mais popular</span>}
            </div>
            <p className="body plan-for">{p.for}</p>
            <div>
              <p className="plan-price">
                <Num value={annual ? p.annual : p.monthly} delay={200 + n * 120} />
                <span>/mês</span>
              </p>
              <p className="plan-sub" key={String(annual)}>
                {annual ? `cobrado anualmente · no mensal ${p.monthly}` : `ou ${p.annual}/mês no anual`}
              </p>
            </div>
            <div className="plan-limits">
              {p.limits.map((l) => (
                <div key={l.label}>
                  <b>
                    <Num value={l.value} delay={400 + n * 120} />
                  </b>
                  <span>{l.label}</span>
                </div>
              ))}
            </div>
            <a href="#contato" className={`btn full ${p.popular ? "orange" : "black"}`}>
              <i className="dot" /> {p.cta}
            </a>
            <ul>
              {p.features.map((f, i) => {
                const soon = f.endsWith(SOON);
                return (
                  <li key={f} style={iv(i)}>
                    <Check color={p.popular ? "#fff" : "#0096dc"} /> {soon ? f.slice(0, -SOON.length) : f}
                    {soon && <span className="soon">em breve</span>}
                  </li>
                );
              })}
            </ul>
            <p className="plan-budget">{p.budget}</p>
          </div>
        ))}
      </div>

      <div className="included reveal">
        <span className="small muted">{plans.includedTitle}</span>
        <div className="included-list">
          {plans.included.map((item, i) => (
            <span className="pill sm" key={item} style={iv(i)}>
              <Check color="#0096dc" /> {item}
            </span>
          ))}
        </div>
      </div>

      <div className="agency reveal" id="agencias" onMouseMove={spot}>
        <div className="agency-copy">
          <span className="pill sm agency-tag">{agency.tag}</span>
          <h3 className="h3">{agency.title}</h3>
          <p className="body">{agency.text}</p>
        </div>
        <div className="agency-price">
          <p className="plan-price">
            <Num value={annual ? agency.annual : agency.monthly} delay={200} />
            <span>/mês</span>
          </p>
          <p className="plan-sub" key={String(annual)}>
            {annual ? `cobrado anualmente · no mensal ${agency.monthly}` : `ou ${agency.annual}/mês no anual`}
          </p>
          <a href={agency.cta.href} className="btn white">
            <i className="dot" /> {agency.cta.label}
          </a>
        </div>
      </div>
    </>
  );
}
