"use client";
import { useEffect, useRef, useState } from "react";
import type { CreatorKey, SolutionIcon as IconName } from "@/lib/content";
import { Check, Sparkle } from "../icons";
import SolutionIcon from "../SolutionIcon";

type Row = { name: string; who: string; next: string };
type Props = {
  tag: string;
  title: string;
  text: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  note: string;
  bullets: string[];
  board: { title: string; label: string; rows: Row[]; steps: string[] };
  toasts: {
    people: { title: string; text: string; who: CreatorKey }[];
    system: { title: string; text: string; icon: IconName }[];
    counter: { start: number; label: string };
  };
};

const STATUS = [
  { label: "Briefing enviado", cls: "s-brief" },
  { label: "Em revisão", cls: "s-review" },
  { label: "Aprovado", cls: "s-ok" },
];

// Topo das páginas de marcas e agências: texto à esquerda e, à direita, o painel
// "o que precisa da sua atenção hoje?" com os status avançando sozinhos (briefing → revisão → aprovado).
// Em volta do painel, 3 notificações flutuam (creator, sistema e um contador) trocando sozinhas,
// e no computador o painel inclina e as notificações se deslocam acompanhando o mouse.
export default function SegmentHero({ tag, title, text, primary, secondary, note, bullets, board, toasts }: Props) {
  const [tick, setTick] = useState(0);
  const [pi, setPi] = useState(0);
  const [si, setSi] = useState(0);
  const [count, setCount] = useState(toasts.counter.start);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ids = [
      setInterval(() => setTick((t) => t + 1), 2200),
      setInterval(() => setPi((n) => (n + 1) % toasts.people.length), 3800),
      setInterval(() => setSi((n) => (n + 1) % toasts.system.length), 4600),
      setInterval(() => setCount((n) => n + 1), 5200),
    ];
    return () => ids.forEach(clearInterval);
  }, [toasts.people.length, toasts.system.length]);

  // profundidade: painel inclina e notificações andam em velocidades diferentes, seguindo o mouse
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        wrap.current?.style.setProperty("--px", (e.clientX / window.innerWidth - 0.5).toFixed(3));
        wrap.current?.style.setProperty("--py", (e.clientY / window.innerHeight - 0.5).toFixed(3));
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const active = tick % board.rows.length; // a linha que acabou de avançar
  const p = toasts.people[pi];
  const sy = toasts.system[si];

  return (
    <header className="section seg-hero" id="topo">
      <div className="container">
        <div className="seg-hero-grid">
          <div className="seg-hero-copy">
            <span className="tag reveal">
              <span className="tag-icon">
                <Sparkle />
              </span>
              {tag}
            </span>
            <h1 className="h1 hero-title">
              {title.split(" ").map((w, i) => (
                <span key={i} className="hw" style={{ ["--i" as string]: i }}>
                  {w}{" "}
                </span>
              ))}
            </h1>
            <p className="lead reveal">{text}</p>
            <div className="hero-actions reveal">
              <a href={primary.href} className="btn black">
                <i className="dot" /> {primary.label}
              </a>
              <a href={secondary.href} className="btn outline">
                {secondary.label}
              </a>
            </div>
            <ul className="seg-bullets reveal">
              {bullets.map((b) => (
                <li key={b}>
                  <Check color="#0096dc" /> {b}
                </li>
              ))}
            </ul>
            <p className="small muted reveal">{note}</p>
          </div>

          <div className="seg-board-wrap reveal" ref={wrap} aria-hidden>
            <div className="seg-board">
              <div className="seg-board-head">
                <span className="dash-live">
                  <i /> Ao vivo
                </span>
                <span className="seg-board-label">{board.label}</span>
              </div>
              <b className="seg-board-title">{board.title}</b>
              <div className="seg-board-cols">
                <span>Campanha</span>
                <span>Próximo passo</span>
                <span>Status</span>
              </div>
              {board.rows.map((r, i) => {
                const st = STATUS[(tick + i) % STATUS.length];
                return (
                  <div className={`seg-row${active === i ? " bump" : ""}`} key={r.name} style={{ ["--i" as string]: i }}>
                    <span className="seg-row-who">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`/howhow/creators/${r.who}.jpg`} alt="" />
                      <b>{r.name}</b>
                    </span>
                    <span className="seg-row-next">{r.next}</span>
                    <span className={`seg-status ${st.cls}`} key={st.label}>
                      <i /> {st.label}
                    </span>
                  </div>
                );
              })}
              <div className="seg-board-steps">
                {board.steps.map((s, i) => (
                  <span key={s} className={i === active ? "on" : ""}>
                    <em>{i + 1}</em> {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="hn">
              <div className="hn-card hn-a" style={{ ["--d" as string]: 22 }}>
                <div className="hn-float">
                  <div className="hn-glass">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="hn-avatar" src={`/howhow/creators/${p.who}.jpg`} alt="" key={`a${pi}`} />
                    <div className="hn-text" key={`p${pi}`}>
                      <span className="hn-top">
                        <b>{p.title}</b>
                        <em>agora</em>
                      </span>
                      <span className="hn-sub">{p.text}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hn-card hn-b" style={{ ["--d" as string]: -30 }}>
                <div className="hn-float">
                  <div className="hn-glass">
                    <span className="hn-app seg-app" key={`i${si}`}>
                      <SolutionIcon name={sy.icon} />
                    </span>
                    <div className="hn-text" key={`s${si}`}>
                      <span className="hn-top">
                        <b>{sy.title}</b>
                        <em>agora</em>
                      </span>
                      <span className="hn-sub">{sy.text}</span>
                    </div>
                  </div>
                  <div className="hn-stack" />
                </div>
              </div>
              <div className="hn-card hn-c" style={{ ["--d" as string]: 14 }}>
                <div className="hn-float">
                  <div className="hn-glass hn-mini">
                    <span className="hn-spark">
                      <svg viewBox="0 0 60 24" aria-hidden>
                        <path
                          d="M2 20 L12 15 L20 17 L30 10 L38 12 L48 5 L58 3"
                          fill="none"
                          stroke="#1a9a50"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="hn-mini-text">
                      <b className="num" key={count}>
                        {count}
                      </b>
                      <span>{toasts.counter.label} ▲</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
