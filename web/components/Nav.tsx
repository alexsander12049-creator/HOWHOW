"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { brand, nav, navCta, solutions } from "@/lib/content";
import SolutionIcon from "./SolutionIcon";

type Link = { label: string; href: string };
type Item = (typeof solutions.groups)[number]["items"][number];

function SolItem({ it, i, current, onClick }: { it: Item; i: number; current: boolean; onClick?: () => void }) {
  return (
    <a href={it.href} className={`sol-item${current ? " current" : ""}`} style={{ ["--i" as string]: i }} onClick={onClick} aria-current={current ? "page" : undefined}>
      <span className="sol-icon">
        <SolutionIcon name={it.icon} />
      </span>
      <span className="sol-text">
        <b>{it.label}</b>
        <em>{it.text}</em>
      </span>
      <span className="sol-arrow" aria-hidden>
        →
      </span>
    </a>
  );
}

// `links`/`cta`: cada página (principal, marcas, agências) passa o seu menu.
// "Soluções" abre um painel (no hover ou no clique) com as páginas por público e os objetivos, como na referência.
export default function Nav({ links = nav, cta = navCta }: { links?: Link[]; cta?: Link }) {
  const [open, setOpen] = useState(false);
  const [sol, setSol] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [launch, setLaunch] = useState(false);
  const path = usePathname();
  const home = path === "/";
  const closeT = useRef(0);
  const solRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // fecha o painel com Esc ou clicando fora dele
  useEffect(() => {
    if (!sol) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSol(false);
    const onDown = (e: PointerEvent) => !solRef.current?.contains(e.target as Node) && setSol(false);
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [sol]);

  const openSol = () => {
    clearTimeout(closeT.current);
    setSol(true);
  };
  const closeSol = () => {
    clearTimeout(closeT.current);
    closeT.current = window.setTimeout(() => setSol(false), 180);
  };
  // em telas de toque o hover não existe: o painel abre/fecha só no clique
  // (com mouse, o clique só garante que fica aberto — senão desfaria o que o hover acabou de abrir)
  const hover = () => window.matchMedia("(hover: hover)").matches;

  let n = 0; // índice para a entrada em sequência dos itens do painel

  return (
    <nav className={`nav${open ? " open" : ""}${scrolled ? " scrolled" : ""}${sol ? " sol-open" : ""}`}>
      <div className="nav-row">
        <a
          href={home ? "#topo" : "/"}
          className={`logo${launch ? " launch" : ""}`}
          onClick={() => setOpen(false)}
          onMouseEnter={() => setLaunch(true)}
          onFocus={() => setLaunch(true)}
          aria-label={home ? undefined : "Howhow — página inicial"}
        >
          {/* foguete decola ao passar o mouse: treme, acende, sai voando e volta por baixo */}
          <span className="logo-rocket" onAnimationEnd={(e) => e.animationName === "rocket-launch" && setLaunch(false)}>
            <i className="logo-flame" aria-hidden />
            <i className="logo-puff p1" aria-hidden />
            <i className="logo-puff p2" aria-hidden />
            <i className="logo-puff p3" aria-hidden />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/howhow/foguete.png" alt="" />
          </span>
          <span className="logo-word">{brand.name}</span>
        </a>
        <div className="nav-links">
          <div className="nav-sol" ref={solRef} onMouseEnter={() => hover() && openSol()} onMouseLeave={() => hover() && closeSol()}>
            <button type="button" className="nav-sol-btn" aria-expanded={sol} aria-controls="sol-panel" onClick={() => setSol((v) => hover() || !v)}>
              {solutions.label}
              <svg viewBox="0 0 12 12" aria-hidden>
                <path d="m3 4.5 3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="sol-panel" id="sol-panel">
              {solutions.groups.map((g, gi) => (
                <div className={`sol-col${gi === 0 ? " main" : ""}`} key={g.title}>
                  <span className="sol-title">{g.title}</span>
                  {g.items.map((it) => (
                    <SolItem key={it.href} it={it} i={n++} current={it.href === path} onClick={() => setSol(false)} />
                  ))}
                  {gi === 0 && (
                    <a href={path === "/marcas" ? "#planos" : "/marcas#planos"} className="sol-promo" style={{ ["--i" as string]: n++ }} onClick={() => setSol(false)}>
                      <b>7 dias grátis</b>
                      <span>Teste a Howhow com a sua marca →</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </div>
        <a href={cta.href} className="btn black">
          {cta.label}
        </a>
        <button
          className={`burger${open ? " open" : ""}`}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <i />
          <i />
        </button>
      </div>
      <div className="nav-menu">
        <div className="nav-menu-sol">
          <span className="sol-title">{solutions.label}</span>
          {solutions.groups[0].items.map((it, i) => (
            <SolItem key={it.href} it={it} i={i} current={it.href === path} onClick={() => setOpen(false)} />
          ))}
        </div>
        {!home && (
          <Link href="/" onClick={() => setOpen(false)}>
            Início
          </Link>
        )}
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a href={cta.href} className="btn black full" onClick={() => setOpen(false)}>
          {cta.label}
        </a>
      </div>
    </nav>
  );
}
