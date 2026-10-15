"use client";
import { useEffect, useRef, useState } from "react";
import { steps } from "@/lib/content";

// Notificações flutuando em volta da VSL, no estilo das notificações do iPhone/Mac:
// cards de vidro com ícone, título, detalhe e "agora"; o conteúdo troca sozinho (a nova sobe,
// a antiga sai) e, no computador, os cards se deslocam de leve com o mouse (profundidade).
// Pessoas fictícias (os mesmos creators de exemplo do "Como funciona").
const people = steps.people;
const candidates = [0, 1, 4, 5].map((i) => people[i]);
const connections = [
  { who: people[2].handle, net: "TikTok" },
  { who: people[3].handle, net: "Instagram" },
  { who: people[7].handle, net: "Kwai" },
];

function NetIcon({ net }: { net: string }) {
  if (net === "Instagram")
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="#fff" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="#fff" strokeWidth="2" />
        <circle cx="17.2" cy="6.8" r="1.2" fill="#fff" />
      </svg>
    );
  if (net === "TikTok")
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M14 3v11.5a3.5 3.5 0 1 1-3-3.46M14 3c.4 2.6 2.2 4.4 5 4.6" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M5 4h3.2v6.4L13.6 4h3.9l-5.8 6.6L18 20h-4l-4.4-6.6-1.4 1.6V20H5Z" fill="#fff" />
    </svg>
  );
}
const netColor: Record<string, string> = { Instagram: "linear-gradient(135deg,#f58529,#dd2a7b 50%,#8134af)", TikTok: "#111", Kwai: "#ff7a00" };

export default function HeroNotifications() {
  const [cand, setCand] = useState(0);
  const [conn, setConn] = useState(0);
  const [views, setViews] = useState(12480);
  const wrap = useRef<HTMLDivElement>(null);

  // trocas automáticas (cada card no seu ritmo) e views subindo
  useEffect(() => {
    const a = setInterval(() => setCand((n) => (n + 1) % candidates.length), 3600);
    const b = setInterval(() => setConn((n) => (n + 1) % connections.length), 4300);
    const c = setInterval(() => setViews((n) => n + 40 + Math.round(Math.random() * 260)), 1400);
    return () => {
      clearInterval(a);
      clearInterval(b);
      clearInterval(c);
    };
  }, []);

  // profundidade: os cards acompanham o mouse em velocidades diferentes
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        wrap.current?.style.setProperty("--px", x.toFixed(3));
        wrap.current?.style.setProperty("--py", y.toFixed(3));
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const c = candidates[cand];
  const k = connections[conn];

  return (
    <div className="hn" ref={wrap} aria-hidden>
      {/* redes conectadas */}
      <div className="hn-card hn-a" style={{ ["--d" as string]: 18 }}>
        <div className="hn-float">
          <div className="hn-glass">
            <span className="hn-app" style={{ background: netColor[k.net] }} key={`i${conn}`}>
              <NetIcon net={k.net} />
            </span>
            <div className="hn-text" key={`t${conn}`}>
              <span className="hn-top">
                <b>Redes conectadas</b>
                <em>agora</em>
              </span>
              <span className="hn-sub">
                {k.who} conectou o {k.net}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* nova candidatura */}
      <div className="hn-card hn-b" style={{ ["--d" as string]: -26 }}>
        <div className="hn-float">
          <div className="hn-glass">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="hn-avatar" src={`/howhow/creators/${c.photo}.jpg`} alt="" key={`a${cand}`} />
            <div className="hn-text" key={`c${cand}`}>
              <span className="hn-top">
                <b>Nova candidatura</b>
                <em>agora</em>
              </span>
              <span className="hn-sub">
                {c.name} · Sérum Vitamina C
              </span>
            </div>
            <span className="hn-btn">Aprovar</span>
          </div>
          <div className="hn-stack" />
        </div>
      </div>

      {/* views do dia */}
      <div className="hn-card hn-c" style={{ ["--d" as string]: 12 }}>
        <div className="hn-float">
          <div className="hn-glass hn-mini">
            <span className="hn-spark">
              <svg viewBox="0 0 60 24" aria-hidden>
                <path d="M2 20 L12 15 L20 17 L30 10 L38 12 L48 5 L58 3" fill="none" stroke="#1a9a50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="hn-mini-text">
              <b className="num">{views.toLocaleString("pt-BR")}</b>
              <span>views hoje ▲</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
