"use client";
import { useEffect, useRef, useState } from "react";
import { agenciesPage, clients } from "@/lib/content";

// "Quem confia" da página de agências: mural de logos com três camadas de movimento:
// - entrada: cartões em sequência e o logo revelado de baixo para cima;
// - destaque automático: um logo por vez sai do cinza para a cor e sobe (em loop, enquanto está na tela);
// - no computador, a borda dos cartões acende seguindo o mouse (e o destaque automático pausa).
const STEP = 1700;

export default function TrustWall() {
  const agencies = agenciesPage.trust.agencies;
  const total = agencies.length + clients.logos.length;
  const [on, setOn] = useState(-1);
  const [hover, setHover] = useState(false);
  const grid = useRef<HTMLDivElement>(null);

  // destaque passando de logo em logo só enquanto o mural está na tela
  useEffect(() => {
    if (hover || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let id = 0;
    const io = new IntersectionObserver(([e]) => {
      clearInterval(id);
      if (e.isIntersecting) id = window.setInterval(() => setOn((n) => (n + 1) % total), STEP);
    });
    if (grid.current) io.observe(grid.current);
    return () => {
      io.disconnect();
      clearInterval(id);
    };
  }, [hover, total]);

  // luz da borda: cada cartão recebe a posição do mouse relativa a ele
  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !grid.current) return;
    for (const el of Array.from(grid.current.children) as HTMLElement[]) {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--x", `${e.clientX - r.left}px`);
      el.style.setProperty("--y", `${e.clientY - r.top}px`);
    }
  };

  return (
    <div
      className={`trust reveal${hover ? " lit" : ""}`}
      ref={grid}
      onPointerMove={move}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      {agencies.map((a, i) => (
        <div className={`trust-tile trust-agency${on === i ? " on" : ""}`} key={a} style={{ ["--i" as string]: i }}>
          <span className="trust-kind">Agência</span>
          <b className="trust-word">{a}</b>
        </div>
      ))}
      {clients.logos.map((c, k) => {
        const i = k + agencies.length;
        return (
          <div className={`trust-tile${on === i ? " on" : ""}`} key={c.logo} style={{ ["--i" as string]: i }}>
            <span className="trust-logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/howhow/marcas/${c.logo}.png`} alt={c.name} style={{ height: c.height }} />
            </span>
          </div>
        );
      })}
    </div>
  );
}
