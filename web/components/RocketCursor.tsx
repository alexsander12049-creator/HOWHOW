"use client";
import { useEffect, useRef } from "react";

// Cursor de foguete (só computador com mouse; com "reduzir movimento" fica a setinha normal).
// - a ponta do foguete é o ponto exato do clique;
// - parado, aponta como uma seta; em movimento, gira suave na direção em que voa;
// - a chama cresce com a velocidade e deixa um rastro de fumaça;
// - em links e botões cresce e ganha um anel; no clique, pulso com faíscas;
// - em campos de texto volta o cursor de texto; nos vídeos dos cases quem aparece é a bolinha de play.
const SIZE = 34;
const TIP = { x: 0.66 * SIZE, y: 0.16 * SIZE }; // onde fica a ponta do foguete na imagem
const TIP_ANGLE = -65.8; // direção da ponta na imagem original (graus)
const IDLE_ANGLE = -125; // parado: apontando para cima e para a esquerda, como uma seta
const POOL = 24;

export default function RocketCursor() {
  const root = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const flame = useRef<HTMLSpanElement>(null);
  const ring = useRef<HTMLSpanElement>(null);
  const puffs = useRef<(HTMLSpanElement | null)[]>([]);
  const sparks = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm) return;
    const html = document.documentElement;
    html.classList.add("rc-on");

    const pos = { x: -100, y: -100 };
    const last = { x: -100, y: -100 };
    let angle = IDLE_ANGLE;
    let speed = 0;
    let scale = 1;
    let hot = false; // em cima de algo clicável
    let hidden = true;
    let raf = 0;
    let puffIdx = 0;
    let lastPuff = 0;

    const show = (v: boolean) => {
      if (hidden === !v) return;
      hidden = !v;
      root.current?.classList.toggle("off", hidden);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pos.x = e.clientX;
      pos.y = e.clientY;
      const t = e.target as Element | null;
      const textField = t?.closest("input:not([type=range]):not([type=checkbox]):not([type=radio]), textarea, select, [contenteditable=true]");
      const caseCard = t?.closest(".case-video");
      show(!textField && !caseCard);
      const isHot = !!t?.closest("a, button, [role=button], [role=tab], label, summary, input[type=range]");
      if (isHot !== hot) {
        hot = isHot;
        root.current?.classList.toggle("hot", hot);
      }
    };
    const onLeave = () => show(false);
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || hidden) return;
      root.current?.classList.remove("boost");
      void root.current?.offsetWidth; // reinicia a animação do pulso
      root.current?.classList.add("boost");
      const box = sparks.current;
      if (!box) return;
      box.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      box.classList.remove("go");
      void box.offsetWidth;
      box.classList.add("go");
    };

    const step = (now: number) => {
      const dx = pos.x - last.x;
      const dy = pos.y - last.y;
      last.x = pos.x;
      last.y = pos.y;
      const v = Math.hypot(dx, dy);
      speed += (Math.min(v, 60) - speed) * 0.2;

      // direção: segue o movimento; parado, volta a apontar como seta
      const target = speed > 1.2 ? (Math.atan2(dy, dx) * 180) / Math.PI : IDLE_ANGLE;
      let diff = ((target - angle + 540) % 360) - 180;
      angle += diff * (speed > 1.2 ? 0.22 : 0.1);

      scale += ((hot ? 1.25 : 1) - scale) * 0.2;
      const rot = angle - TIP_ANGLE;
      if (body.current) {
        body.current.style.transform = `translate3d(${pos.x - TIP.x}px, ${pos.y - TIP.y}px, 0) rotate(${rot}deg) scale(${scale})`;
      }
      if (flame.current) flame.current.style.transform = `rotate(35deg) scale(${0.35 + Math.min(speed / 18, 1.3)}, ${0.3 + Math.min(speed / 10, 2.2)})`;
      if (ring.current) ring.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;

      // fumaça saindo da cauda quando está rápido
      if (!hidden && speed > 5 && now - lastPuff > 28) {
        lastPuff = now;
        const rad = (angle * Math.PI) / 180;
        const tailX = pos.x - Math.cos(rad) * SIZE * 0.95;
        const tailY = pos.y - Math.sin(rad) * SIZE * 0.95;
        const p = puffs.current[puffIdx++ % POOL];
        if (p) {
          const s = 0.5 + Math.random() * 0.7;
          p.style.setProperty("--x", `${tailX}px`);
          p.style.setProperty("--y", `${tailY}px`);
          p.style.setProperty("--dx", `${-Math.cos(rad) * 18 + (Math.random() - 0.5) * 14}px`);
          p.style.setProperty("--dy", `${-Math.sin(rad) * 18 + (Math.random() - 0.5) * 14}px`);
          p.style.setProperty("--s", String(s));
          p.classList.remove("go");
          void p.offsetWidth;
          p.classList.add("go");
        }
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      html.classList.remove("rc-on");
    };
  }, []);

  return (
    <div ref={root} className="rc off" aria-hidden>
      {Array.from({ length: POOL }).map((_, i) => (
        <span
          key={i}
          className="rc-puff"
          ref={(el) => {
            puffs.current[i] = el;
          }}
        />
      ))}
      <span ref={ring} className="rc-ring">
        <i />
      </span>
      <div ref={sparks} className="rc-sparks">
        {Array.from({ length: 8 }).map((_, i) => (
          <i key={i} style={{ ["--a" as string]: `${i * 45}deg` }} />
        ))}
      </div>
      <div ref={body} className="rc-body">
        <span ref={flame} className="rc-flame" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/howhow/foguete.png" alt="" draggable={false} />
      </div>
    </div>
  );
}
