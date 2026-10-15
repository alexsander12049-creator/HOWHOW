"use client";
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { nav } from "@/lib/content";
import { legalDocs, type LegalBlock, type LegalDoc } from "@/lib/legal";
import Nav from "./Nav";
import Reveal from "./Reveal";
import ScrollProgress from "./ScrollProgress";
import SiteFooter from "./SiteFooter";

// Trechos que viram link dentro dos textos legais (e-mails, a página de exclusão, os outros documentos
// e a política do Google), como no site antigo.
const LINKS: { match: string; href: string }[] = [
  { match: "howhow.com.br/exclusao-de-dados", href: "/exclusao-de-dados" },
  { match: "instruções públicas de exclusão de dados", href: "/exclusao-de-dados" },
  { match: "Termos de Uso", href: "/termos-de-uso" },
  { match: "Política de Privacidade", href: "/politica-de-privacidade" },
  { match: "Google API Services User Data Policy", href: "https://developers.google.com/terms/api-services-user-data-policy" },
];
const PATTERN = new RegExp(`([\\w.+-]+@howhow\\.com\\.br|${LINKS.map((l) => l.match.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");

function Rich({ text, self }: { text: string; self: string }) {
  return (
    <>
      {text.split(PATTERN).map((part, i) => {
        if (i % 2 === 0) return <Fragment key={i}>{part}</Fragment>;
        if (part.includes("@")) return <a key={i} href={`mailto:${part}`}>{part}</a>;
        const l = LINKS.find((x) => x.match === part)!;
        if (l.href === `/${self}`) return <Fragment key={i}>{part}</Fragment>; // não linka a própria página
        return l.href.startsWith("http") ? (
          <a key={i} href={l.href} target="_blank" rel="noopener noreferrer">{part}</a>
        ) : (
          <Link key={i} href={l.href}>{part}</Link>
        );
      })}
    </>
  );
}

function Block({ b, self }: { b: LegalBlock; self: string }) {
  if ("list" in b)
    return (
      <ul className="lg-list">
        {b.list.map((it, i) => (
          <li key={i}>
            {it.label && <b>{it.label} </b>}
            <Rich text={it.text} self={self} />
          </li>
        ))}
      </ul>
    );
  if ("links" in b)
    return (
      <div className="lg-links">
        {b.links.map((l) =>
          l.href.startsWith("http") ? (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label} <span aria-hidden>↗</span>
            </a>
          ) : (
            <Link key={l.href} href={l.href}>
              {l.label} <span aria-hidden>→</span>
            </Link>
          ),
        )}
      </div>
    );
  if ("note" in b)
    return (
      <p className="lg-note">
        {b.label && <b>{b.label} </b>}
        <Rich text={b.note} self={self} />
      </p>
    );
  return (
    <p>
      {b.label && <b>{b.label} </b>}
      <Rich text={b.p} self={self} />
    </p>
  );
}

// minutos de leitura (~200 palavras por minuto)
const readingTime = (doc: LegalDoc) => {
  const words = JSON.stringify(doc.sections).split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
};

// Página legal: abas entre os 3 documentos, sumário fixo ao lado (marca a seção que está na tela)
// e o texto num cartão. No celular, o sumário vira um botão que abre a lista.
export default function LegalPage({ doc }: { doc: LegalDoc }) {
  const [active, setActive] = useState(doc.sections[0].id);
  const [tocOpen, setTocOpen] = useState(false);
  const links = nav.map((l) => ({ ...l, href: l.href.startsWith("#") ? `/${l.href}` : l.href }));

  useEffect(() => {
    const els = doc.sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-18% 0px -70% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [doc]);

  const current = doc.sections.find((s) => s.id === active) ?? doc.sections[0];

  return (
    <>
      <Reveal />
      <ScrollProgress />
      <Nav links={links} cta={{ label: "Começar grátis", href: "/marcas#planos" }} />

      <header className="section lg-hero" id="topo">
        <div className="container">
          <nav className="lg-tabs reveal" aria-label="Documentos legais">
            {legalDocs.map((d) => (
              <Link key={d.slug} href={`/${d.slug}`} className={d.slug === doc.slug ? "on" : ""} aria-current={d.slug === doc.slug ? "page" : undefined}>
                {d.tab}
              </Link>
            ))}
          </nav>
          <h1 className="h1 hero-title lg-title">
            {doc.title.split(" ").map((w, i) => (
              <span key={i} className="hw" style={{ ["--i" as string]: i }}>
                {w}{" "}
              </span>
            ))}
          </h1>
          <p className="lead muted reveal">{doc.subtitle}</p>
          <div className="lg-meta reveal">
            {doc.updated && (
              <span>
                <i className="lg-dot" /> Última atualização: {doc.updated}
              </span>
            )}
            <span>{doc.sections.length} seções</span>
            <span>{readingTime(doc)} min de leitura</span>
          </div>
        </div>
      </header>

      <section className="section white lg-body">
        <div className="container">
          <div className="lg-wrap">
            <aside className={`lg-toc${tocOpen ? " open" : ""}`}>
              <button type="button" className="lg-toc-btn" aria-expanded={tocOpen} onClick={() => setTocOpen((v) => !v)}>
                <span>
                  <em>Sumário</em>
                  <b>
                    {current.n}. {current.title}
                  </b>
                </span>
                <svg viewBox="0 0 12 12" aria-hidden>
                  <path d="m3 4.5 3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <span className="lg-toc-title">Sumário</span>
              <ol>
                {doc.sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className={s.id === active ? "on" : ""} onClick={() => setTocOpen(false)}>
                      <em>{s.n}</em>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
              <div className="lg-contact">
                <b>Dúvidas sobre os seus dados?</b>
                <a href="mailto:privacy@howhow.com.br">privacy@howhow.com.br</a>
              </div>
            </aside>

            <article className="lg-doc">
              {doc.sections.map((s) => (
                <section key={s.id} id={s.id} className="lg-sec reveal">
                  <h2 className="lg-h2">
                    <span className="lg-n">{s.n}</span>
                    {s.title}
                  </h2>
                  {s.blocks.map((b, i) => (
                    <Block key={i} b={b} self={doc.slug} />
                  ))}
                </section>
              ))}
            </article>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
