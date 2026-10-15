"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { managed } from "@/lib/content";
import { Check } from "./icons";

// Howhow Gerenciado: cada etapa da lista abre um "vídeo" em motion (feito em código, não é arquivo de vídeo)
// mostrando o que o nosso time faz. Cada cena tem 3 fases (as legendas) e passa sozinha para a próxima,
// como stories; dá para pausar, voltar, avançar e fechar (X, Esc ou clicando fora).
const PHASE = 2600; // ms por fase
const TOTAL = PHASE * 3;
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
  const [state, setState] = useState<"closed" | "open" | "closing">("closed");
  const [t, setT] = useState(0); // tópico
  const [ms, setMs] = useState(0); // tempo dentro do tópico
  const [paused, setPaused] = useState(false);
  const [done, setDone] = useState(false);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<Element | null>(null);
  const n = managed.bullets.length;

  const open = (i: number) => {
    lastFocus.current = document.activeElement;
    setT(i);
    setMs(0);
    setPaused(false);
    setDone(false);
    setState("open");
  };
  const close = useCallback(() => {
    setState((s) => (s === "open" ? "closing" : s));
    window.setTimeout(() => {
      setState("closed");
      (lastFocus.current as HTMLElement | null)?.focus?.();
    }, 280);
  }, []);
  const go = useCallback(
    (d: number) => {
      setDone(false);
      setMs(0);
      setT((x) => Math.min(n - 1, Math.max(0, x + d)));
    },
    [n],
  );

  // relógio da cena: avança as fases enquanto está aberto e sem pausa
  useEffect(() => {
    if (state !== "open" || paused || done) return;
    const id = window.setInterval(() => setMs((m) => Math.min(TOTAL, m + 100)), 100);
    return () => clearInterval(id);
  }, [state, paused, done]);
  // fim da cena: passa para o próximo tópico; no último, mostra o final com a chamada
  useEffect(() => {
    if (ms < TOTAL) return;
    if (t < n - 1) {
      setT(t + 1);
      setMs(0);
    } else setDone(true);
  }, [ms, t, n]);

  // trava a rolagem, teclado (Esc fecha, setas trocam, espaço pausa) e foco no X
  useEffect(() => {
    if (state !== "open") return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    closeBtn.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === " ") {
        e.preventDefault();
        setPaused((v) => !v);
      }
    };
    window.addEventListener("keydown", key);
    return () => {
      html.style.overflow = prev;
      window.removeEventListener("keydown", key);
    };
  }, [state, close, go]);

  const phase = Math.min(2, Math.floor(ms / PHASE));
  const Scene = scenes[t];
  const steps = managed.demos[t].steps;

  return (
    <>
      <div className="managed-list">
        {managed.bullets.map((b, k) => (
          <button type="button" className="managed-item" key={b} style={{ ["--k" as string]: k }} onClick={() => open(k)}>
            <Check color="#ff4d00" /> <span className="managed-item-text">{b}</span>
            <span className="managed-play" aria-hidden>
              <svg viewBox="0 0 24 24">
                <path d="M8 5.5v13l11-6.5Z" fill="currentColor" />
              </svg>
            </span>
          </button>
        ))}
        <p className="managed-hint">{managed.hint}</p>
        <p className="managed-price">{managed.price}</p>
      </div>

      {state !== "closed" &&
        createPortal(
          <div
            className={`mm${state === "closing" ? " closing" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-label={`${managed.tag}: ${managed.bullets[t]}`}
            onClick={(e) => e.target === e.currentTarget && close()}
          >
            <div className="mm-box-wrap">
              <div className="mm-top">
                <div>
                  <span className="mm-kicker">
                    {managed.tag} · {t + 1}/{n}
                  </span>
                  <b className="mm-title" key={t}>
                    {managed.bullets[t]}
                  </b>
                </div>
                <button ref={closeBtn} type="button" className="mm-close" onClick={close} aria-label="Fechar">
                  <svg viewBox="0 0 24 24" aria-hidden>
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <div className={`mm-stage${paused ? " paused" : ""}`}>
                <div className="mm-bars" aria-hidden>
                  {managed.bullets.map((b, i) => (
                    <button type="button" key={b} onClick={() => go(i - t)} tabIndex={-1}>
                      <i style={{ transform: `scaleX(${i < t ? 1 : i > t ? 0 : ms / TOTAL})` }} />
                    </button>
                  ))}
                </div>
                <Scene p={phase} key={t} />
                <span className="mm-demo">Demonstração ilustrativa</span>
                {done && (
                  <div className="mm-end">
                    <b>Quer isso rodando na sua marca?</b>
                    <div>
                      <a href={managed.cta.href} className="btn orange" onClick={close}>
                        <i className="dot" /> {managed.cta.label}
                      </a>
                      <button type="button" className="btn outline-white" onClick={() => go(-(n - 1))}>
                        Ver de novo
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="mm-foot">
                <ol className="mm-steps">
                  {steps.map((s, i) => (
                    <li key={`${t}-${i}`} className={i === phase ? "on" : i < phase ? "past" : ""}>
                      <em>{i + 1}</em>
                      {s}
                    </li>
                  ))}
                </ol>
                <div className="mm-ctrl">
                  <button type="button" onClick={() => go(-1)} disabled={t === 0} aria-label="Etapa anterior">
                    <svg viewBox="0 0 24 24" aria-hidden>
                      <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                  </button>
                  <button type="button" className="mm-pp" onClick={() => setPaused((v) => !v)} aria-label={paused ? "Continuar" : "Pausar"}>
                    {paused ? (
                      <svg viewBox="0 0 24 24" aria-hidden>
                        <path d="M8 5.5v13l11-6.5Z" fill="currentColor" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" aria-hidden>
                        <path d="M8 5h3v14H8zM13 5h3v14h-3z" fill="currentColor" />
                      </svg>
                    )}
                  </button>
                  <button type="button" onClick={() => go(1)} disabled={t === n - 1} aria-label="Próxima etapa">
                    <svg viewBox="0 0 24 24" aria-hidden>
                      <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
