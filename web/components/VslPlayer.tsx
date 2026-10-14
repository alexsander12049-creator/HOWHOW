"use client";
import { useEffect, useRef, useState } from "react";

const fmt = (s: number) => {
  if (!Number.isFinite(s) || s < 0) return "0:00";
  return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, "0")}`;
};

// Mesmo canal dos cards de case: só um vídeo toca por vez na página.
const PLAY_EVENT = "howhow:case-play";

// Player da VSL no topo da página: capa com play grande, controles próprios
// (play/pause, tempo, barra de progresso clicável, som, tela cheia) e chamada no final.
export default function VslPlayer({ src, poster, duration, ctaHref }: { src: string; poster: string; duration: string; ctaHref: string }) {
  const box = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLVideoElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [muted, setMuted] = useState(false);
  const [t, setT] = useState(0);
  const [dur, setDur] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [controls, setControls] = useState(true);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const time = () => {
      setT(v.currentTime);
      if (Number.isFinite(v.duration)) setDur(v.duration);
      if (v.buffered.length) setBuffered(v.buffered.end(v.buffered.length - 1));
    };
    const meta = () => setDur(v.duration);
    const on = () => {
      setPlaying(true);
      setEnded(false);
      window.dispatchEvent(new CustomEvent(PLAY_EVENT, { detail: "vsl" }));
    };
    const off = () => setPlaying(false);
    const end = () => {
      setPlaying(false);
      setEnded(true);
    };
    const other = (e: Event) => {
      if ((e as CustomEvent).detail !== "vsl") v.pause();
    };
    v.addEventListener("timeupdate", time);
    v.addEventListener("progress", time);
    v.addEventListener("loadedmetadata", meta);
    v.addEventListener("play", on);
    v.addEventListener("pause", off);
    v.addEventListener("ended", end);
    window.addEventListener(PLAY_EVENT, other);
    if (v.readyState >= 1) meta(); // a duração pode ter carregado antes deste efeito
    return () => {
      v.removeEventListener("timeupdate", time);
      v.removeEventListener("progress", time);
      v.removeEventListener("loadedmetadata", meta);
      v.removeEventListener("play", on);
      v.removeEventListener("pause", off);
      v.removeEventListener("ended", end);
      window.removeEventListener(PLAY_EVENT, other);
    };
  }, []);

  // controles somem sozinhos enquanto toca e o mouse está parado
  const wake = () => {
    setControls(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setControls(false), 2200);
  };
  useEffect(() => () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
  }, []);

  const play = () => {
    const v = ref.current;
    if (!v) return;
    if (ended) v.currentTime = 0;
    setStarted(true);
    v.play().catch(() => {});
    wake();
  };
  const toggle = () => (ref.current?.paused ? play() : ref.current?.pause());

  const seek = (clientX: number) => {
    const v = ref.current;
    const r = bar.current?.getBoundingClientRect();
    if (!v || !r || !dur) return;
    v.currentTime = Math.min(Math.max((clientX - r.left) / r.width, 0), 1) * dur;
  };

  const fullscreen = () => {
    const el = box.current;
    const v = ref.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (document.fullscreenElement) document.exitFullscreen();
    else if (el?.requestFullscreen) el.requestFullscreen();
    else v?.webkitEnterFullscreen?.(); // iPhone
  };

  const pct = dur ? (t / dur) * 100 : 0;
  const bufPct = dur ? (buffered / dur) * 100 : 0;

  return (
    <div
      ref={box}
      className={`vsl${started ? " started" : ""}${playing ? " playing" : ""}${controls || !playing ? " show-controls" : ""}`}
      onMouseMove={started ? wake : undefined}
      onMouseLeave={() => playing && setControls(false)}
    >
      <video
        ref={ref}
        className="vsl-video"
        src={src}
        poster={poster}
        preload="metadata"
        playsInline
        muted={muted}
        onClick={started ? toggle : undefined}
      />

      {/* capa: antes do primeiro play */}
      {!started && (
        <button type="button" className="vsl-cover" onClick={play} aria-label="Assistir ao vídeo">
          <span className="vsl-play">
            <span className="vsl-pulse" />
            <svg viewBox="0 0 24 24" aria-hidden>
              <path d="M8 5.5v13l10.5-6.5Z" fill="#000" />
            </svg>
          </span>
          <span className="vsl-cover-text">
            <b>Veja a Howhow em ação</b>
            <span>{duration} · assista com som</span>
          </span>
        </button>
      )}

      {/* fim: assistir de novo + chamada */}
      {ended && (
        <div className="vsl-end">
          <p>Pronto pra decolar?</p>
          <div className="vsl-end-actions">
            <a href={ctaHref} className="btn orange">
              <i className="dot" /> Fale com a gente
            </a>
            <button type="button" className="btn white" onClick={play}>
              ↺ Assistir de novo
            </button>
          </div>
        </div>
      )}

      {/* controles */}
      {started && !ended && (
        <div className="vsl-controls" onClick={(e) => e.stopPropagation()}>
          <div
            ref={bar}
            className="vsl-bar"
            role="slider"
            aria-label="Posição do vídeo"
            aria-valuemin={0}
            aria-valuemax={Math.round(dur)}
            aria-valuenow={Math.round(t)}
            tabIndex={0}
            onPointerDown={(e) => {
              (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
              seek(e.clientX);
            }}
            onPointerMove={(e) => e.buttons === 1 && seek(e.clientX)}
            onKeyDown={(e) => {
              const v = ref.current;
              if (!v) return;
              if (e.key === "ArrowRight") v.currentTime = Math.min(v.currentTime + 5, dur);
              if (e.key === "ArrowLeft") v.currentTime = Math.max(v.currentTime - 5, 0);
            }}
          >
            <span className="vsl-bar-buf" style={{ width: `${bufPct}%` }} />
            <span className="vsl-bar-fill" style={{ width: `${pct}%` }} />
            <span className="vsl-bar-knob" style={{ left: `${pct}%` }} />
          </div>
          <div className="vsl-row">
            <button type="button" className="vsl-icon" onClick={toggle} aria-label={playing ? "Pausar" : "Tocar"}>
              {playing ? (
                <svg viewBox="0 0 24 24" aria-hidden>
                  <rect x="6.5" y="5" width="4" height="14" rx="1.2" fill="#fff" />
                  <rect x="13.5" y="5" width="4" height="14" rx="1.2" fill="#fff" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden>
                  <path d="M8 5v14l11-7Z" fill="#fff" />
                </svg>
              )}
            </button>
            <button type="button" className="vsl-icon" onClick={() => setMuted((m) => !m)} aria-label={muted ? "Ativar som" : "Desativar som"}>
              <svg viewBox="0 0 24 24" aria-hidden>
                <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4Z" fill="#fff" />
                {muted ? (
                  <path d="M16 9.5l5 5M21 9.5l-5 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                ) : (
                  <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />
                )}
              </svg>
            </button>
            <span className="vsl-time">
              {fmt(t)} <span>/ {fmt(dur)}</span>
            </span>
            <span className="vsl-brand">HOWHOW</span>
            <button type="button" className="vsl-icon" onClick={fullscreen} aria-label="Tela cheia">
              <svg viewBox="0 0 24 24" aria-hidden>
                <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
