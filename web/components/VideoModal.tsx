"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { OPEN_VIDEO, type VideoItem } from "@/lib/video";
import VslPlayer from "./VslPlayer";

// Pop-up para assistir só o vídeo: fundo escuro, vídeo grande com som e controles.
// Sai pelo X, pela tecla Esc ou clicando fora. Com mais de um vídeo (cases), setas ← → trocam.
export default function VideoModal() {
  const [items, setItems] = useState<VideoItem[]>([]);
  const [i, setI] = useState(0);
  const [state, setState] = useState<"closed" | "open" | "closing">("closed");
  const closeBtn = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<Element | null>(null);

  useEffect(() => {
    const open = (e: Event) => {
      const { items: list, index } = (e as CustomEvent<{ items: VideoItem[]; index: number }>).detail;
      lastFocus.current = document.activeElement;
      setItems(list);
      setI(index);
      setState("open");
    };
    window.addEventListener(OPEN_VIDEO, open);
    return () => window.removeEventListener(OPEN_VIDEO, open);
  }, []);

  const close = useCallback(() => {
    setState((s) => (s === "open" ? "closing" : s));
    window.setTimeout(() => {
      setState("closed");
      (lastFocus.current as HTMLElement | null)?.focus?.();
    }, 280);
  }, []);
  const go = useCallback((d: number) => setI((n) => (n + d + items.length) % items.length), [items.length]);

  // trava a rolagem da página, teclado (Esc, setas) e foco no botão de fechar
  useEffect(() => {
    if (state !== "open") return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    closeBtn.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (items.length > 1 && e.key === "ArrowRight") go(1);
      if (items.length > 1 && e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", key);
    return () => {
      html.style.overflow = prev;
      window.removeEventListener("keydown", key);
    };
  }, [state, close, go, items.length]);

  if (state === "closed" || !items.length) return null;
  const v = items[i];
  const many = items.length > 1;

  return createPortal(
    <div
      className={`vmodal${state === "closing" ? " closing" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={v.title ?? "Vídeo"}
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <button ref={closeBtn} type="button" className="vmodal-close" onClick={close} aria-label="Fechar vídeo">
        <svg viewBox="0 0 24 24" aria-hidden>
          <path d="M6 6l12 12M18 6L6 18" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
        <span>Esc</span>
      </button>

      <div className={`vmodal-stage${v.vertical ? " vertical" : ""}`} key={v.src} onClick={(e) => e.target === e.currentTarget && close()}>
        <VslPlayer src={v.src} poster={v.poster} duration="" ctaHref="#contato" autoStart vertical={v.vertical} onCta={close} />
        {(v.title || many) && (
          <div className="vmodal-info">
            <div>
              {v.subtitle && <span className="vmodal-sub">{v.subtitle}</span>}
              {v.title && <b>{v.title}</b>}
            </div>
            {many && (
              <span className="vmodal-count">
                {i + 1} / {items.length}
              </span>
            )}
          </div>
        )}
      </div>

      {many && (
        <>
          <button type="button" className="vmodal-nav prev" onClick={() => go(-1)} aria-label="Vídeo anterior">
            <svg viewBox="0 0 24 24" aria-hidden>
              <path d="M15 5l-7 7 7 7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </button>
          <button type="button" className="vmodal-nav next" onClick={() => go(1)} aria-label="Próximo vídeo">
            <svg viewBox="0 0 24 24" aria-hidden>
              <path d="M9 5l7 7-7 7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </button>
        </>
      )}
    </div>,
    document.body,
  );
}
