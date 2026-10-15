"use client";
import { useEffect, useState } from "react";
import { Check, Sparkle } from "../icons";

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
};

const STATUS = [
  { label: "Briefing enviado", cls: "s-brief" },
  { label: "Em revisão", cls: "s-review" },
  { label: "Aprovado", cls: "s-ok" },
];

// Topo das páginas de marcas e agências: texto à esquerda e, à direita, o painel
// "o que precisa da sua atenção hoje?" com os status avançando sozinhos (briefing → revisão → aprovado).
export default function SegmentHero({ tag, title, text, primary, secondary, note, bullets, board }: Props) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setTick((t) => t + 1), 2200);
    return () => clearInterval(id);
  }, []);
  const active = tick % board.rows.length; // a linha que acabou de avançar

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

          <div className="seg-board reveal" aria-hidden>
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
        </div>
      </div>
    </header>
  );
}
