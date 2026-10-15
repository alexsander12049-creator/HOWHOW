"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "@/lib/useInView";
import { steps } from "@/lib/content";
import { stepArt } from "./stepArt";

// Tela do painel que corresponde a cada passo (menu lateral e endereço da janela).
const screens = [
  { menu: "Campanhas", path: "campanhas/nova" },
  { menu: "Candidaturas", path: "campanhas/serum-vitamina-c/candidaturas" },
  { menu: "Home", path: "home" },
  { menu: "Entregas", path: "campanhas/serum-vitamina-c/entregas" },
  { menu: "Pagamentos", path: "carteira" },
];
const menuIcons = ["M4 6h16M4 12h10M4 18h7", "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0", "M4 11l8-7 8 7v9H4z", "M3 7l9-4 9 4-9 4-9-4Zm0 5l9 4 9-4M3 17l9 4 9-4", "M3 7h18v12H3zM3 11h18M16 15h2"];

// "Como funciona" no estilo dos sites de produto:
// no computador, os passos ficam à esquerda e uma janela do painel fica parada à direita;
// conforme a pessoa desce, o passo da vez acende, a linha laranja enche e a janela troca de tela
// (cada tela roda a própria animação de novo). No celular, cada passo vira um bloco com a sua tela.
export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const [seen, setSeen] = useState<boolean[]>(() => steps.items.map(() => false));
  const list = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const blocks = useRef<(HTMLDivElement | null)[]>([]);

  // passo ativo = o que está no meio da tela
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const n = Number((e.target as HTMLElement).dataset.n);
          setActive(n);
          setSeen((s) => (s[n] ? s : s.map((v, k) => v || k === n)));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    blocks.current.forEach((b) => b && io.observe(b));
    return () => io.disconnect();
  }, []);

  // linha de progresso ao lado dos passos, acompanhando a rolagem (só com a lista na tela)
  const near = useInView(list, "200px 0px");
  useEffect(() => {
    if (!near) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = list.current;
      if (!el || !fill.current) return;
      const r = el.getBoundingClientRect();
      const mid = window.innerHeight / 2;
      const p = Math.min(Math.max((mid - r.top) / r.height, 0), 1);
      fill.current.style.transform = `scaleY(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [near]);

  const goTo = (n: number) => blocks.current[n]?.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <div className="hiw">
      <div className="hiw-steps" ref={list}>
        <span className="hiw-rail" aria-hidden>
          <span ref={fill} className="hiw-rail-fill" />
        </span>
        {steps.items.map((s, n) => (
          <div
            key={s.key}
            ref={(el) => {
              blocks.current[n] = el;
            }}
            data-n={n}
            className={`hiw-step${active === n ? " active" : ""}${seen[n] ? " seen" : ""}`}
          >
            <button type="button" className="hiw-num" onClick={() => goTo(n)} aria-label={`Ir para o passo ${n + 1}`}>
              0{n + 1}
            </button>
            <div className="hiw-copy">
              <span className="hiw-key">{s.key}</span>
              <h3 className="h3">{s.title}</h3>
              <p className="body muted">{s.text}</p>
            </div>
            {/* celular: a tela do passo aparece logo abaixo do texto */}
            <div className={`hiw-inline art-scene${seen[n] ? " in" : ""}`}>{stepArt(n)}</div>
          </div>
        ))}
      </div>

      {/* computador: janela do painel parada enquanto os passos passam */}
      <div className="hiw-sticky" aria-hidden>
        <div className="hiw-window" data-step={active}>
          <div className="hiw-bar">
            <i />
            <i />
            <i />
            <span className="hiw-url">
              app.howhow.com.br/<b key={active}>{screens[active].path}</b>
            </span>
            <span className="hiw-count">
              {String(active + 1).padStart(2, "0")} / {String(steps.items.length).padStart(2, "0")}
            </span>
          </div>
          <div className="hiw-body">
            <nav className="hiw-side">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/howhow/foguete.png" alt="" />
              {screens.map((sc, n) => (
                <span key={sc.menu} className={`hiw-menu${active === n ? " on" : ""}`} title={sc.menu}>
                  <svg viewBox="0 0 24 24">
                    <path d={menuIcons[n]} />
                  </svg>
                </span>
              ))}
              <span className="hiw-menu-pill" style={{ transform: `translateY(${active * 44}px)` }} />
            </nav>
            <div className="hiw-stage">
              <span className="hiw-glow" />
              {steps.items.map((s, n) => (
                <div key={s.key} className={`hiw-scene art-scene${active === n ? " in" : ""}${n < active ? " past" : ""}`}>
                  {/* remonta ao ficar ativa: as animações e contadores da tela rodam de novo */}
                  <div key={active === n ? "on" : "off"} className="hiw-scene-inner">
                    {stepArt(n)}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="hiw-progress">
            {steps.items.map((s, n) => (
              <span key={s.key} className={n <= active ? "done" : ""} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
