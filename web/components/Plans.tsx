"use client";
import { useLayoutEffect, useRef, useState } from "react";
import { agency, plans } from "@/lib/content";
import { Check, Sparkle } from "./icons";
import Num from "./Num";
import Odometer from "./Odometer";

const SOON = " (em breve)";
const iv = (i: number) => ({ ["--i" as string]: i }) as React.CSSProperties;
const brl = (s: string) => Number(s.replace(/[^\d,]/g, "").replace(",", "."));
const money = (n: number) => n.toLocaleString("pt-BR", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 });
// quanto a marca economiza por ano no plano anual
const saving = (monthly: string, annual: string) => money((brl(monthly) - brl(annual)) * 12);

// Card inclina em 3D acompanhando o mouse e ganha um brilho que segue o cursor (--mx/--my, --rx/--ry).
const tilt = (e: React.MouseEvent<HTMLElement>) => {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = e.clientX - r.left;
  const y = e.clientY - r.top;
  el.style.setProperty("--mx", `${x}px`);
  el.style.setProperty("--my", `${y}px`);
  el.style.setProperty("--ry", `${((x / r.width - 0.5) * 7).toFixed(2)}deg`);
  el.style.setProperty("--rx", `${((0.5 - y / r.height) * 7).toFixed(2)}deg`);
};
const untilt = (e: React.MouseEvent<HTMLElement>) => {
  e.currentTarget.style.setProperty("--rx", "0deg");
  e.currentTarget.style.setProperty("--ry", "0deg");
};

// Planos num "palco" escuro: chave mensal/anual, teste grátis de 7 dias, preços em contador de painel,
// economia do anual, plano popular em destaque e o white-label das agências.
export default function Plans() {
  const [annual, setAnnual] = useState(false);
  const btns = useRef<(HTMLButtonElement | null)[]>([]);
  const [pill, setPill] = useState({ left: 4, width: 0 });

  // a pílula desliza até o botão escolhido
  useLayoutEffect(() => {
    const place = () => {
      const b = btns.current[annual ? 1 : 0];
      if (b) setPill({ left: b.offsetLeft, width: b.offsetWidth });
    };
    place();
    window.addEventListener("resize", place);
    document.fonts?.ready.then(place);
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
            {a && <span className={`billing-hint${annual ? " lit" : ""}`}>{plans.billing.annualHint}</span>}
          </button>
        ))}
      </div>

      <div className="trial reveal">
        <div className="trial-days" aria-hidden>
          <b>7</b>
          <span className="trial-bars">
            {Array.from({ length: 7 }).map((_, i) => (
              <i key={i} style={iv(i)} />
            ))}
          </span>
        </div>
        <div className="trial-copy">
          <h3 className="h4">
            <Sparkle color="#fff" /> {plans.trial.title}
          </h3>
          <p className="body">{plans.trial.text}</p>
        </div>
        <a href={plans.trial.cta.href} className="btn white">
          <i className="dot" /> {plans.trial.cta.label}
        </a>
      </div>

      <div className="plans">
        {plans.items.map((p, n) => (
          <div className={`plan-shell reveal${p.popular ? " popular" : ""}`} key={p.name} style={iv(n)}>
            {p.popular && <span className="plan-glow" aria-hidden />}
            <div className={`plan${p.popular ? " popular" : ""}`} onMouseMove={tilt} onMouseLeave={untilt}>
              <div className="plan-top">
                <h3 className="h4">{p.name}</h3>
                {p.popular && <span className="pill sm plan-badge">Mais popular</span>}
              </div>
              <p className="body plan-for">{p.for}</p>
              <div>
                <p className="plan-price">
                  <Odometer value={annual ? p.annual : p.monthly} delay={150 + n * 150} />
                  <span>/mês</span>
                </p>
                <p className="plan-sub">{annual ? `cobrado anualmente · no mensal ${p.monthly}` : `ou ${p.annual}/mês no anual`}</p>
                <span className={`plan-save${annual ? " on" : ""}`}>Economia de R$ {saving(p.monthly, p.annual)} por ano</span>
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
              <a href="#contato" className={`btn full ${p.popular ? "orange plan-cta" : "white"}`}>
                <i className="dot" /> {p.cta}
              </a>
              <ul>
                {p.features.map((f, i) => {
                  const soon = f.endsWith(SOON);
                  return (
                    <li key={f} style={iv(i)}>
                      <Check color={p.popular ? "#ff8a4d" : "#5cc4f2"} /> {soon ? f.slice(0, -SOON.length) : f}
                      {soon && <span className="soon">em breve</span>}
                    </li>
                  );
                })}
              </ul>
              <p className="plan-budget">{p.budget}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="included reveal">
        <span className="small muted">{plans.includedTitle}</span>
        <div className="included-list">
          {plans.included.map((item, i) => (
            <span className="pill sm" key={item} style={iv(i)}>
              <Check color="#5cc4f2" /> {item}
            </span>
          ))}
        </div>
      </div>

      <div className="agency reveal" id="agencias" onMouseMove={tilt} onMouseLeave={untilt}>
        <div className="agency-copy">
          <span className="pill sm agency-tag">{agency.tag}</span>
          <h3 className="h3">{agency.title}</h3>
          <p className="body">{agency.text}</p>
        </div>
        <div className="agency-price">
          <p className="plan-price">
            <Odometer value={annual ? agency.annual : agency.monthly} delay={200} />
            <span>/mês</span>
          </p>
          <p className="plan-sub">{annual ? `cobrado anualmente · no mensal ${agency.monthly}` : `ou ${agency.annual}/mês no anual`}</p>
          <span className={`plan-save${annual ? " on" : ""}`}>Economia de R$ {saving(agency.monthly, agency.annual)} por ano</span>
          <a href={agency.cta.href} className="btn white">
            <i className="dot" /> {agency.cta.label}
          </a>
        </div>
      </div>
    </>
  );
}
