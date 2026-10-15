"use client";
import { useEffect, useRef, useState } from "react";
import { cpm } from "@/lib/content";
import { Check } from "./icons";
import Num from "./Num";

const brl = (n: number, d = 0) => n.toLocaleString("pt-BR", { minimumFractionDigits: d, maximumFractionDigits: d });

// Campanha por CPM: fluxo em 6 etapas, simulador (verba × CPM = views estimadas)
// e um ciclo de pagamento acontecendo ao vivo, calculado pelo CPM escolhido.
export default function CpmCampaign() {
  const { calc, cycle } = cpm;
  const [budget, setBudget] = useState(calc.budget.value);
  const [price, setPrice] = useState(calc.price.value);
  const views = Math.round((budget / price) * 1000);

  // ciclo: as views do post sobem, o pagamento é calculado junto e no fim aparece "Pago"
  const box = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(0);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!visible) return;
    let raf = 0;
    let t0 = 0;
    const RUN = 5200;
    const HOLD = 1800;
    const step = (now: number) => {
      if (!t0) t0 = now;
      const e = (now - t0) % (RUN + HOLD);
      setT(Math.min(e / RUN, 1));
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [visible]);
  const ease = 1 - Math.pow(1 - t, 2);
  const cycViews = Math.round(cycle.views * ease);
  const pay = (cycViews / 1000) * price;
  const fill = (v: number, min: number, max: number) => `${((v - min) / (max - min)) * 100}%`;

  return (
    <div className="cpm">
      <div className="cpm-copy">
        <span className="tag reveal">
          <span className="tag-icon" aria-hidden />
          {cpm.tag}
          {cpm.badge && <em className="badge-new">{cpm.badge}</em>}
        </span>
        <h2 className="h2 reveal">{cpm.title}</h2>
        <p className="lead muted reveal">{cpm.text}</p>
        <ol className="cpm-flow reveal">
          {cpm.flow.map((f, i) => (
            <li key={f.title} style={{ ["--i" as string]: i }}>
              <span className="cpm-n">{i + 1}</span>
              <span>
                <b>{f.title}</b>
                <em>{f.text}</em>
              </span>
            </li>
          ))}
        </ol>
        <a href={cpm.cta.href} className="btn black reveal">
          <i className="dot" /> {cpm.cta.label}
        </a>
      </div>

      <div className="cpm-side">
        <div className="cpm-calc reveal">
          <span className="cpm-calc-title">{calc.title}</span>
          <label className="cpm-range">
            <span className="cpm-range-top">
              {calc.budget.label}
              <b>R$ {brl(budget)}</b>
            </span>
            <input
              type="range"
              min={calc.budget.min}
              max={calc.budget.max}
              step={calc.budget.step}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              style={{ ["--fill" as string]: fill(budget, calc.budget.min, calc.budget.max) }}
            />
          </label>
          <label className="cpm-range">
            <span className="cpm-range-top">
              {calc.price.label}
              <b>R$ {brl(price)}</b>
            </span>
            <input
              type="range"
              min={calc.price.min}
              max={calc.price.max}
              step={calc.price.step}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              style={{ ["--fill" as string]: fill(price, calc.price.min, calc.price.max) }}
            />
          </label>
          <div className="cpm-result">
            <b>
              <Num value={brl(views)} duration={900} />
            </b>
            <span>{calc.result}</span>
          </div>
          <p className="cpm-note">{calc.note}</p>
        </div>

        <div className="cpm-cycle reveal" ref={box}>
          <div className="cpm-cycle-head">
            <span>{cycle.title}</span>
            <em>{cycle.days}</em>
          </div>
          <div className="cpm-cycle-row">
            <span className="cpm-cycle-thumb" style={{ backgroundImage: "url(/howhow/videos/capa-1.jpg)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/howhow/creators/${cycle.photo}.jpg`} alt="" />
            </span>
            <span className="cpm-cycle-who">
              <b>{cycle.handle}</b>
              <span>
                <b className="num">{brl(cycViews)}</b> views medidas
              </span>
            </span>
            <span className="cpm-cycle-pay">
              <span>a pagar</span>
              <b className="num">R$ {brl(pay, 2)}</b>
            </span>
          </div>
          <div className="cpm-cycle-bar">
            <i style={{ transform: `scaleX(${ease})` }} />
          </div>
          <div className="cpm-cycle-foot">
            <span>
              {brl(cycViews)} views ÷ 1.000 × R$ {brl(price)} = <b>R$ {brl(pay, 2)}</b>
            </span>
            <span className={`cpm-paid${t >= 1 ? " on" : ""}`}>
              <Check color="#1a9a50" /> Pago
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
