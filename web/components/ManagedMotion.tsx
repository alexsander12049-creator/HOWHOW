"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { managed } from "@/lib/content";
import { Check } from "./icons";

// Howhow Gerenciado: cada etapa da lista abre o SEU "vídeo" em motion (feito em código, não é arquivo de vídeo)
// num balãozinho ao lado do item, sem escurecer a página. No computador abre ao passar o mouse; no toque,
// ao tocar (e aparece logo abaixo do item). Cada cena tem 3 fases (as legendas) e repete enquanto o balão está aberto.
const PHASE = 2600; // ms por fase
const TOTAL = PHASE * 3;
const HOLD = 1400; // pausa no fim antes de repetir
const face = (c: string) => `/howhow/creators/${c}.jpg`;

type SceneProps = { p: number };
const cls = (p: number) => `mm-scene${p >= 1 ? " s1" : ""}${p >= 2 ? " s2" : ""}`;

/* ---------- cena 1: casting ---------- */
const casting = [
  { c: "c1", h: "@ana.pele", fit: true },
  { c: "c4", h: "@caio.tech", fit: false },
  { c: "c3", h: "@lu.natural", fit: true },
  { c: "c7", h: "@rafa.come", fit: false },
  { c: "c5", h: "@bruno.fit", fit: false },
  { c: "c6", h: "@ju.looks", fit: true },
  { c: "c2", h: "@duda.rotina", fit: true },
  { c: "c8", h: "@mari.viaja", fit: false },
];
function Casting({ p }: SceneProps) {
  const picks = casting.filter((x) => x.fit);
  return (
    <div className={`${cls(p)} mm-casting`}>
      <div className="mm-card mm-brief">
        <span className="mm-label">Briefing</span>
        <b>Sérum Vitamina C</b>
        <span className="mm-chip">Skincare</span>
        <span className="mm-chip">18–34 anos</span>
        <span className="mm-chip">Rotina real</span>
      </div>
      <div className="mm-grid">
        <i className="mm-scan" />
        {casting.map((x, i) => (
          <div className={`mm-face${x.fit ? " fit" : " out"}`} key={x.c} style={{ ["--i" as string]: i }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={face(x.c)} alt="" />
            <span>{x.h}</span>
          </div>
        ))}
      </div>
      <div className="mm-card mm-short">
        <span className="mm-label">Shortlist</span>
        {picks.map((x, i) => (
          <div className="mm-row" key={x.c} style={{ ["--i" as string]: i }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={face(x.c)} alt="" />
            <b>{x.h}</b>
            <em>Aprovar</em>
          </div>
        ))}
        <span className="mm-done">Shortlist pronta · {picks.length} creators</span>
      </div>
    </div>
  );
}

/* ---------- cena 2: roteiro ---------- */
const beats = [
  { k: "Gancho", t: "0–3s", line: "“Eu achava que vitamina C era tudo igual…”", c: "o" },
  { k: "Demonstração", t: "3–12s", line: "Aplica o sérum, mostra a textura e o antes/depois", c: "b" },
  { k: "Chamada", t: "12–15s", line: "“Testa e me conta nos comentários”", c: "g" },
];
function Script({ p }: SceneProps) {
  return (
    <div className={`${cls(p)} mm-script`}>
      <div className="mm-phone">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={face("c6")} alt="" />
        <span className="mm-phone-tag">Reels · 15s</span>
        <div className="mm-timeline">
          {beats.map((b) => (
            <i key={b.k} className={b.c} />
          ))}
          <em className="mm-playhead" />
        </div>
      </div>
      <div className="mm-card mm-doc">
        <div className="mm-doc-head">
          <span className="mm-label">Roteiro</span>
          <b>@ju.looks · Sérum Vitamina C</b>
        </div>
        {beats.map((b, i) => (
          <div className={`mm-beat ${b.c}`} key={b.k} style={{ ["--i" as string]: i }}>
            <span>
              {b.k} <em>{b.t}</em>
            </span>
            <p>{b.line}</p>
            <i className="mm-skel" />
          </div>
        ))}
        <span className="mm-stamp">Roteiro aprovado ✓</span>
      </div>
    </div>
  );
}

/* ---------- cena 3: envio de produto e revisão ---------- */
function Shipping({ p }: SceneProps) {
  return (
    <div className={`${cls(p)} mm-ship`}>
      <div className="mm-card mm-route">
        <span className="mm-node">
          <svg viewBox="0 0 24 24" aria-hidden>
            <path d="M3 9.5 12 4l9 5.5V20H3Z M9 20v-6h6v6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
          Marca
        </span>
        <span className="mm-path">
          <i className="mm-box">
            <svg viewBox="0 0 24 24" aria-hidden>
              <path d="M12 3 4 7v10l8 4 8-4V7Z M4 7l8 4 8-4 M12 11v10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
          </i>
        </span>
        <span className="mm-node">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={face("c6")} alt="" />
          @ju.looks
        </span>
        <span className="mm-status">
          <em className="a">Em trânsito</em>
          <em className="b">Entregue ✓</em>
        </span>
      </div>
      <div className="mm-card mm-review">
        <div className="mm-video">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={face("c6")} alt="" />
          <span className="mm-ver">
            <em className="a">Versão 1</em>
            <em className="b">Versão 2</em>
          </span>
          <span className="mm-bar">
            <i />
            <b className="mm-pin" />
          </span>
        </div>
        <div className="mm-comments">
          <div className="mm-comment">
            <span className="mm-av">H</span>
            <p>
              <b>Howhow · 0:04</b> Mostrar o rótulo mais de perto
            </p>
            <i className="mm-ok">✓</i>
          </div>
          <span className="mm-stamp">Versão final aprovada ✓</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- cena 4: nota fiscal e pagamentos ---------- */
const payouts = [
  { c: "c6", h: "@ju.looks", v: "R$ 800" },
  { c: "c2", h: "@duda.rotina", v: "R$ 650" },
  { c: "c1", h: "@ana.pele", v: "R$ 900" },
  { c: "c3", h: "@lu.natural", v: "R$ 850" },
];
function Payments({ p }: SceneProps) {
  return (
    <div className={`${cls(p)} mm-pay`}>
      <div className="mm-card mm-nf">
        <span className="mm-label">Nota fiscal</span>
        <b>NF-e de serviço · @ju.looks</b>
        <div className="mm-nf-row">
          <span>Entrega</span>
          <em>1 Reels + 3 stories</em>
        </div>
        <div className="mm-nf-row">
          <span>Valor</span>
          <em>R$ 800,00</em>
        </div>
        <div className="mm-checks">
          <span style={{ ["--i" as string]: 0 }}>CNPJ conferido</span>
          <span style={{ ["--i" as string]: 1 }}>Entrega aprovada</span>
          <span style={{ ["--i" as string]: 2 }}>Valor do contrato</span>
        </div>
      </div>
      <div className="mm-card mm-payouts">
        <span className="mm-label">Pagamentos</span>
        {payouts.map((x, i) => (
          <div className="mm-row" key={x.c} style={{ ["--i" as string]: i }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={face(x.c)} alt="" />
            <b>{x.h}</b>
            <span className="mm-amt">{x.v}</span>
            <span className="mm-pix">
              <em className="a">Agendado</em>
              <em className="b">Pix enviado ✓</em>
            </span>
          </div>
        ))}
        <div className="mm-total">
          <span>Relatório da campanha</span>
          <b>R$ 3.200 · conciliado ✓</b>
        </div>
      </div>
    </div>
  );
}

const scenes = [Casting, Script, Shipping, Payments];

export default function ManagedMotion() {
  const [active, setActive] = useState<number | null>(null);
  const [ms, setMs] = useState(0);
  const [run, setRun] = useState(0); // muda a cada repetição/abertura para remontar a cena
  const [pos, setPos] = useState({ top: 0, arrow: 0 });
  const list = useRef<HTMLDivElement>(null);
  const pop = useRef<HTMLDivElement>(null);
  const items = useRef<(HTMLButtonElement | null)[]>([]);
  const closeT = useRef(0);
  const openT = useRef(0);

  const hover = () => window.matchMedia("(hover: hover) and (min-width: 1200px)").matches;
  const show = (k: number) => {
    clearTimeout(closeT.current);
    if (k === active) return;
    setActive(k);
    setMs(0);
    setRun((r) => r + 1);
  };
  const hide = () => {
    clearTimeout(openT.current);
    closeT.current = window.setTimeout(() => setActive(null), 220);
  };

  // relógio da cena; no fim segura um pouco e recomeça
  useEffect(() => {
    if (active === null) return;
    const id = window.setInterval(() => setMs((m) => (m + 100 >= TOTAL + HOLD ? -1 : m + 100)), 100);
    return () => clearInterval(id);
  }, [active]);
  useEffect(() => {
    if (ms !== -1) return;
    setMs(0);
    setRun((r) => r + 1);
  }, [ms]);

  // Esc fecha
  useEffect(() => {
    if (active === null) return;
    const key = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [active]);

  // no computador o balão fica ao lado da lista, centrado no item e sem sair do cartão escuro
  useLayoutEffect(() => {
    if (active === null || !hover()) return;
    const l = list.current, b = pop.current, it = items.current[active];
    const card = l?.closest(".managed");
    if (!l || !b || !it || !card) return;
    const lr = l.getBoundingClientRect(), ir = it.getBoundingClientRect(), cr = card.getBoundingClientRect();
    const h = b.offsetHeight;
    const center = ir.top + ir.height / 2 - lr.top;
    const min = cr.top - lr.top + 14;
    const max = cr.bottom - lr.top - h - 14;
    const top = Math.max(min, Math.min(max, center - h / 2));
    setPos({ top, arrow: Math.max(18, Math.min(h - 18, center - top)) });
  }, [active]);

  const phase = Math.min(2, Math.floor(Math.max(0, ms) / PHASE));
  const Scene = active === null ? null : scenes[active];

  const balloon =
    active !== null && Scene ? (
      <div
        ref={pop}
        className="mpop"
        role="region"
        aria-label={`Como funciona: ${managed.bullets[active]}`}
        style={{ ["--top" as string]: `${pos.top}px`, ["--arrow" as string]: `${pos.arrow}px` }}
        onMouseEnter={() => clearTimeout(closeT.current)}
        key={`pop-${active}`}
      >
        <div className="mpop-stage">
          <Scene p={phase} key={run} />
          <span className="mpop-bar">
            <i style={{ transform: `scaleX(${Math.min(1, Math.max(0, ms) / TOTAL)})` }} />
          </span>
        </div>
        <div className="mpop-cap">
          <span className="mpop-dots" aria-hidden>
            {[0, 1, 2].map((i) => (
              <i key={i} className={i === phase ? "on" : i < phase ? "past" : ""} />
            ))}
          </span>
          <p key={`${active}-${phase}`}>{managed.demos[active].steps[phase]}</p>
        </div>
        <span className="mpop-demo">Demonstração ilustrativa</span>
      </div>
    ) : null;

  return (
    <div className="managed-list" ref={list} onMouseLeave={() => hover() && hide()}>
      {managed.bullets.map((b, k) => (
        <div className="managed-slot" key={b}>
          <button
            ref={(el) => {
              items.current[k] = el;
            }}
            type="button"
            className={`managed-item${active === k ? " on" : ""}`}
            style={{ ["--k" as string]: k }}
            aria-expanded={active === k}
            onMouseEnter={() => {
              if (!hover()) return;
              clearTimeout(openT.current);
              openT.current = window.setTimeout(() => show(k), active === null ? 120 : 0);
            }}
            onClick={() => (active === k && !hover() ? setActive(null) : show(k))}
          >
            <Check color="#ff4d00" /> <span className="managed-item-text">{b}</span>
            <span className="managed-play" aria-hidden>
              <svg viewBox="0 0 24 24">
                <path d="M8 5.5v13l11-6.5Z" fill="currentColor" />
              </svg>
            </span>
          </button>
          {active === k && balloon}
        </div>
      ))}
      <p className="managed-hint">{managed.hint}</p>
      <p className="managed-price">{managed.price}</p>
    </div>
  );
}
