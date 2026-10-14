"use client";
import { useEffect, useRef, useState } from "react";
import { Heart } from "./icons";

type Props = {
  brand: string;
  campaign: string;
  result: string;
  gradient: string[];
  video: number;
};

const fmt = (s: number) => {
  if (!Number.isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${r.toString().padStart(2, "0")}`;
};

// Só um vídeo toca por vez: quem começa a tocar avisa os outros.
const PLAY_EVENT = "howhow:case-play";

// Card de case com vídeo, como na referência:
// - passando o mouse, uma bolinha de play acompanha o cursor (o vídeo continua parado);
// - clicando, o vídeo toca e a bolinha vira pausa; clicando de novo, pausa;
// - indo para outro card, a bolinha vai junto mostrando play; o clique ali troca o vídeo que está tocando.
// No celular (sem mouse) o toque alterna play/pause e o play fica fixo no centro.
export default function CaseVideo({ brand, campaign, result, gradient, video }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const ball = useRef<HTMLSpanElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef(0);
  const [playing, setPlaying] = useState(false);
  const [hover, setHover] = useState(false);
  const [left, setLeft] = useState<number | null>(null);
  const [muted, setMuted] = useState(true);

  // eventos do vídeo + pausa quando outro card começa a tocar
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const tick = () => setLeft(v.duration - v.currentTime);
    const on = () => {
      setPlaying(true);
      window.dispatchEvent(new CustomEvent(PLAY_EVENT, { detail: video }));
    };
    const off = () => setPlaying(false);
    const other = (e: Event) => {
      if ((e as CustomEvent<number>).detail !== video) v.pause();
    };
    v.addEventListener("timeupdate", tick);
    v.addEventListener("loadedmetadata", tick);
    v.addEventListener("play", on);
    v.addEventListener("pause", off);
    window.addEventListener(PLAY_EVENT, other);
    return () => {
      v.removeEventListener("timeupdate", tick);
      v.removeEventListener("loadedmetadata", tick);
      v.removeEventListener("play", on);
      v.removeEventListener("pause", off);
      window.removeEventListener(PLAY_EVENT, other);
    };
  }, [video]);

  // a bolinha desliza atrás do cursor (interpolação a cada quadro)
  useEffect(() => {
    if (!hover) return;
    const step = () => {
      const c = current.current;
      const t = target.current;
      c.x += (t.x - c.x) * 0.22;
      c.y += (t.y - c.y) * 0.22;
      if (ball.current) ball.current.style.transform = `translate(${c.x}px, ${c.y}px) translate(-50%, -50%)`;
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [hover]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  const where = (e: React.PointerEvent) => {
    const r = card.current?.getBoundingClientRect();
    return r ? { x: e.clientX - r.left, y: e.clientY - r.top } : { x: 0, y: 0 };
  };

  return (
    // A animação de entrada (.reveal → .in) fica num invólucro fixo: o React reescreve o className do card a cada estado.
    <div className="reveal">
      <div
        ref={card}
        className={`case case-video${hover ? " hovering" : ""}${playing ? " playing" : ""}`}
        style={{ background: `linear-gradient(160deg, ${gradient[0]}, ${gradient[1]})` }}
        onPointerEnter={(e) => {
          if (e.pointerType !== "mouse") return;
          const p = where(e);
          target.current = p;
          current.current = { ...p }; // entra já no lugar do cursor, sem "voar" do canto
          setHover(true);
        }}
        onPointerMove={(e) => {
          if (e.pointerType === "mouse") target.current = where(e);
        }}
        onPointerLeave={(e) => e.pointerType === "mouse" && setHover(false)}
        onClick={toggle}
        role="button"
        tabIndex={0}
        aria-label={`${playing ? "Pausar" : "Tocar"} vídeo do case ${brand}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
          }
        }}
      >
        <video
          ref={ref}
          className="case-media"
          src={`/howhow/videos/video-${video}.mp4`}
          poster={`/howhow/videos/capa-${video}.jpg`}
          preload="none"
          playsInline
          loop
          muted={muted}
        />
        <span className="case-brand">{brand.toUpperCase()}</span>
        <span className="case-time">{left === null ? "" : fmt(left)}</span>
        <h3>{campaign}</h3>
        <span className="pill sm">
          <Heart color="#ff4d00" /> {result}
        </span>

        <button
          type="button"
          className="case-sound"
          aria-label={muted ? "Ativar som" : "Desativar som"}
          onClick={(e) => {
            e.stopPropagation();
            setMuted((m) => !m);
          }}
        >
          {muted ? <SoundOff /> : <SoundOn />}
        </button>

        {/* bolinha que acompanha o mouse */}
        <span ref={ball} className="case-cursor" aria-hidden>
          <span className="case-cursor-btn">{playing ? <PauseIcon /> : <PlayIcon />}</span>
        </span>
        {/* no toque, um play fixo no centro enquanto está pausado */}
        <span className="case-center" aria-hidden>
          <span className="case-cursor-btn">
            <PlayIcon />
          </span>
        </span>
      </div>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M8 5.5v13l10.5-6.5Z" fill="#000" />
    </svg>
  );
}
function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <rect x="7" y="5.5" width="3.6" height="13" rx="1.2" fill="#000" />
      <rect x="13.4" y="5.5" width="3.6" height="13" rx="1.2" fill="#000" />
    </svg>
  );
}
function SoundOff() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4Z" fill="#fff" />
      <path d="M16 9.5l5 5M21 9.5l-5 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function SoundOn() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4Z" fill="#fff" />
      <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}
