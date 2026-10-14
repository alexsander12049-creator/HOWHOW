"use client";
import { useEffect, useRef, useState } from "react";
import { caseVideos, openVideo } from "@/lib/video";
import { Heart } from "./icons";

type Props = {
  brand: string;
  campaign: string;
  result: string;
  gradient: string[];
  video: number;
  index: number;
};

// Card de case com vídeo:
// - passando o mouse, uma bolinha de play acompanha o cursor e a capa aproxima de leve;
// - o clique abre o vídeo no pop-up (com som), onde dá para assistir e sair quando quiser.
// No celular (sem mouse) o play fica fixo no centro.
export default function CaseVideo({ brand, campaign, result, gradient, video, index }: Props) {
  const card = useRef<HTMLDivElement>(null);
  const ball = useRef<HTMLSpanElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef(0);
  const [hover, setHover] = useState(false);

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

  const where = (e: React.PointerEvent) => {
    const r = card.current?.getBoundingClientRect();
    return r ? { x: e.clientX - r.left, y: e.clientY - r.top } : { x: 0, y: 0 };
  };
  const open = () => openVideo(caseVideos, index);

  return (
    // A animação de entrada (.reveal → .in) fica num invólucro fixo: o React reescreve o className do card a cada estado.
    <div className="reveal case-wrap" style={{ ["--i" as string]: index }}>
      <div
        ref={card}
        className={`case case-video${hover ? " hovering" : ""}`}
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
        onClick={open}
        role="button"
        tabIndex={0}
        aria-label={`Assistir ao vídeo do case ${brand}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            open();
          }
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="case-media" src={`/howhow/videos/capa-${video}.jpg`} alt="" loading="lazy" />
        <span className="case-brand">{brand.toUpperCase()}</span>
        <h3>{campaign}</h3>
        <span className="pill sm">
          <Heart color="#ff4d00" /> {result}
        </span>

        {/* bolinha que acompanha o mouse */}
        <span ref={ball} className="case-cursor" aria-hidden>
          <span className="case-cursor-btn">
            <PlayIcon />
          </span>
        </span>
        {/* no toque, um play fixo no centro */}
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
