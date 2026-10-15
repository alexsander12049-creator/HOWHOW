"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { goals } from "@/lib/content";
import { Check } from "./icons";
import Num from "./Num";

const AUTO_MS = 6000; // troca sozinha de aba até a pessoa clicar em uma
const iv = (i: number) => ({ ["--i" as string]: i }) as React.CSSProperties;

// "Qual é o objetivo da sua campanha?": abas com plano de teste, exemplo e mix de conteúdo.
// Pílula desliza entre as abas, números contam, barras crescem e a lista entra em sequência.
export default function GoalTabs() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const [visible, setVisible] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const btns = useRef<(HTMLButtonElement | null)[]>([]);
  const [pill, setPill] = useState({ left: 0, width: 0 });
  const g = goals.tabs[i];
  const max = Math.max(...g.mix.map((m) => m.n));

  useLayoutEffect(() => {
    const place = () => {
      const b = btns.current[i];
      if (b) setPill({ left: b.offsetLeft, width: b.offsetWidth });
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [i]);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const pick = (n: number) => {
    setAuto(false);
    setI(n);
  };

  return (
    <>
      <div className="heading">
        <span className="tag reveal">
          <span className="tag-icon" aria-hidden />
          {goals.tag}
        </span>
        <h2 className="h2 reveal">{goals.title}</h2>
        <p className="lead center muted reveal">{goals.text}</p>
      </div>
      <div className="tabs tabs-slide reveal" role="tablist">
        <span className="tabs-pill" style={{ left: pill.left, width: pill.width }} aria-hidden>
          {auto && visible && (
            <i key={i} style={{ animationDuration: `${AUTO_MS}ms` }} onAnimationEnd={() => setI((i + 1) % goals.tabs.length)} />
          )}
        </span>
        {goals.tabs.map((t, n) => (
          <button
            key={t.label}
            ref={(el) => {
              btns.current[n] = el;
            }}
            role="tab"
            aria-selected={n === i}
            className={`tab${n === i ? " on" : ""}`}
            onClick={() => pick(n)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="reveal" style={{ width: "100%" }} ref={wrap}>
        <div className="goal" key={i}>
          <div className="goal-plan">
            <h3 className="h3 goal-title">{g.title}</h3>
            <span className="goal-label">Plano de teste</span>
            <ul>
              {g.plan.map((p, k) => (
                <li key={p} style={iv(k)}>
                  <Check color="#0096dc" /> {p}
                </li>
              ))}
            </ul>
            <a href={goals.cta.href} className="btn black" style={{ alignSelf: "flex-start" }}>
              <i className="dot" /> {goals.cta.label}
            </a>
          </div>
          <div className="goal-example">
            <span className="goal-label">Exemplo de campanha</span>
            <div className="goal-nums">
              {g.example.map((e, k) => (
                <div key={e.label} style={iv(k)}>
                  <b>
                    <Num value={e.value} delay={k * 120} duration={900} replay />
                  </b>
                  <span>{e.label}</span>
                </div>
              ))}
            </div>
            <span className="goal-label">Mix de conteúdo</span>
            <div className="goal-mix">
              {g.mix.map((m, k) => (
                <div key={m.label} className="goal-bar" style={iv(k)}>
                  <div className="goal-bar-top">
                    <span>{m.label}</span>
                    <b>
                      <Num value={`${m.n} vídeos`} delay={300 + k * 150} duration={900} replay />
                    </b>
                  </div>
                  <div className="goal-track">
                    <span style={{ width: `${(m.n / max) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="small muted">{goals.footnote}</p>
          </div>
        </div>
      </div>
    </>
  );
}
