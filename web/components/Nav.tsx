"use client";
import { useEffect, useState } from "react";
import { brand, nav, navCta } from "@/lib/content";

type Link = { label: string; href: string };
// `links`/`cta`: cada página (principal, marcas, agências) passa o seu menu.
export default function Nav({ links = nav, cta = navCta }: { links?: Link[]; cta?: Link }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [launch, setLaunch] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav${open ? " open" : ""}${scrolled ? " scrolled" : ""}`}>
      <div className="nav-row">
        <a
          href="#topo"
          className={`logo${launch ? " launch" : ""}`}
          onClick={() => setOpen(false)}
          onMouseEnter={() => setLaunch(true)}
          onFocus={() => setLaunch(true)}
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
