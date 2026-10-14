"use client";
import { useEffect, useRef, useState } from "react";
import { stories } from "@/lib/content";
import { Star } from "./icons";

const DURATION = 7000; // tempo de cada depoimento na tela

// Depoimentos em destaque: foto grande, frase entrando palavra por palavra e troca automática
// com barra de progresso nas abas de baixo. Pausa com o mouse em cima ou fora da tela.
export default function Testimonials() {
  const quotes = stories.quotes;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [seen, setSeen] = useState(false); // a 1ª animação só roda quando o bloco aparece na tela
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setVisible(e.isIntersecting);
        if (e.isIntersecting) setSeen(true);
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = visible && !paused;
  const q = quotes[i];
  const words = q.quote.split(" ");
  const k = seen ? String(i) : "pre";

  return (
    // .reveal fica num invólucro fixo: o React reescreve o className do bloco quando pausa/retoma
    <div className="reveal" style={{ width: "100%" }}>
    <div
      ref={box}
      className={`testi${running ? " running" : ""}`}
      style={{ ["--dur" as string]: `${DURATION}ms` }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="testi-card">
        <svg key={`m${k}`} className="testi-mark" viewBox="0 0 68 52" aria-hidden>
          <path d="M30 5.5v30c0 8.9-7 16.5-15.6 16.5a2.7 2.7 0 0 1 0-5.5c5.7 0 10.4-4.9 10.4-11v-2.7H5.2A5.3 5.3 0 0 1 0 27.4V5.5A5.3 5.3 0 0 1 5.2 0h19.6C27.7 0 30 2.5 30 5.5Zm32.8-5.5H43.2a5.3 5.3 0 0 0-5.3 5.5v21.9c0 3 2.4 5.4 5.3 5.4h19.6v2.8c0 6-4.7 11-10.5 11a2.7 2.7 0 0 0 0 5.4C61 52 68 44.5 68 35.6V5.5C68 2.5 65.6 0 62.8 0Z" />
        </svg>

        <div className="testi-photo" key={`p${k}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/howhow/depoimentos/${q.photo}.jpg`} alt={q.name} />
          <span className="testi-company">{q.company}</span>
        </div>

        <div className="testi-body">
          <div className="stars" key={`s${k}`}>
            {Array.from({ length: 5 }).map((_, k) => (
              <span key={k} className="testi-star" style={{ animationDelay: `${k * 70}ms` }}>
                <Star />
              </span>
            ))}
          </div>
          <blockquote className="testi-quote" key={`q${k}`} aria-live="polite">
            {words.map((w, k) => (
              <span key={k} style={{ animationDelay: `${120 + k * 28}ms` }}>
                {k === 0 ? "“" : ""}
                {w}
                {k === words.length - 1 ? "”" : ""}{" "}
              </span>
            ))}
          </blockquote>
          <div className="testi-person" key={`n${k}`}>
            <b>{q.name}</b>
            <span>
              {q.role} · {q.company}
            </span>
          </div>
        </div>
      </div>

      <div className="testi-tabs" role="tablist" aria-label="Depoimentos">
        {quotes.map((t, n) => (
          <button
            key={t.name}
            type="button"
            role="tab"
            aria-selected={n === i}
            className={`testi-tab${n === i ? " on" : ""}`}
            onClick={() => setI(n)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/howhow/depoimentos/${t.photo}.jpg`} alt="" />
            <span className="testi-tab-text">
              <b>{t.name}</b>
              <span>{t.company}</span>
            </span>
            {n === i && (
              <span className="testi-progress" key={`b${i}`} onAnimationEnd={() => setI((i + 1) % quotes.length)}>
                <i />
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
    </div>
  );
}
