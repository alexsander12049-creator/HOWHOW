"use client";
import { useEffect, useRef, useState } from "react";
import { agenciesPage } from "@/lib/content";
import { Check } from "../icons";
import Odometer from "../Odometer";

// Cores que a "agência" vai escolhendo no exemplo (a primeira é a da Howhow).
const palette = ["#0096dc", "#7c3aed", "#10b981", "#ff4d00"];

// White-label: o painel troca sozinho de "Howhow" para a marca da agência —
// endereço se digita, logo troca, cores mudam — e volta, em loop, enquanto está na tela.
export default function WhiteLabel() {
  const w = agenciesPage.whiteLabel;
  const [step, setStep] = useState(0); // 0 = Howhow; 1..3 = agência com cores diferentes
  const [annual, setAnnual] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(1);
      return;
    }
    let id = 0;
    const io = new IntersectionObserver(([e]) => {
      clearInterval(id);
      if (e.isIntersecting) id = window.setInterval(() => setStep((s) => (s + 1) % 4), 2400);
    });
    if (box.current) io.observe(box.current);
    return () => {
      io.disconnect();
      clearInterval(id);
    };
  }, []);

  const agency = step > 0;
  const color = palette[step];

  return (
    <div className="wl">
      <div className="wl-copy">
        <span className="tag reveal">
          <span className="tag-icon" aria-hidden />
          {w.tag}
        </span>
        <h2 className="h2 reveal">{w.title}</h2>
        <p className="lead muted reveal">{w.text}</p>
        <ul className="wl-list reveal">
          {w.bullets.map((b, i) => (
            <li key={b} style={{ ["--i" as string]: i }}>
              <Check color="#0096dc" /> {b}
            </li>
          ))}
        </ul>
        <div className="wl-price reveal">
          <div className="wl-toggle" role="radiogroup" aria-label="Forma de cobrança">
            <button type="button" role="radio" aria-checked={!annual} className={!annual ? "on" : ""} onClick={() => setAnnual(false)}>
              Mensal
            </button>
            <button type="button" role="radio" aria-checked={annual} className={annual ? "on" : ""} onClick={() => setAnnual(true)}>
              Anual
            </button>
          </div>
          <p className="plan-price">
            <Odometer value={annual ? w.annual : w.monthly} />
            <span>/mês</span>
          </p>
          <a href={w.cta.href} className="btn black">
            <i className="dot" /> {w.cta.label}
          </a>
        </div>
      </div>

      <div className="wl-mock reveal" ref={box} style={{ ["--brand" as string]: color }} aria-hidden>
        <div className="wl-bar">
          <i />
          <i />
          <i />
          <span className="wl-url" key={agency ? "a" : "h"}>
            {agency ? w.domain : "app.howhow.com.br"}
          </span>
        </div>
        <div className="wl-body">
          <div className="wl-side">
            <span className="wl-logo" key={agency ? "la" : "lh"}>
              {agency ? (
                <span className="wl-mark">SA</span>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src="/howhow/foguete.png" alt="" />
              )}
            </span>
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className={`wl-menu${i === 0 ? " on" : ""}`} />
            ))}
          </div>
          <div className="wl-main">
            <div className="wl-head">
              <b key={agency ? "na" : "nh"} className="wl-name">
                {agency ? w.agencyName : "Howhow"}
              </b>
              <span className="wl-btn">+ Nova campanha</span>
            </div>
            {["Cliente A", "Cliente B", "Cliente C"].map((c, i) => (
              <div className="wl-row" key={c}>
                <span className="wl-dot" />
                <b>{c}</b>
                <span className="wl-track">
                  <i style={{ width: `${[72, 45, 90][i]}%` }} />
                </span>
                <em>{["Em revisão", "Briefing", "Aprovado"][i]}</em>
              </div>
            ))}
            <div className="wl-swatches">
              <span>Cores da marca</span>
              {palette.slice(1).map((p, i) => (
                <i key={p} className={step === i + 1 ? "on" : ""} style={{ background: p }} />
              ))}
            </div>
          </div>
        </div>
        <span className={`wl-badge${agency ? " on" : ""}`}>100% com a marca da sua agência</span>
      </div>
    </div>
  );
}
