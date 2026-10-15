"use client";
import { useEffect, useRef, useState } from "react";
import { creators } from "@/lib/content";
import { Check } from "./icons";

// "É creator?" do rodapé: chamada para baixar o app, com o ícone do app em destaque e, ao lado,
// um celular com a tela do app: notificações chegando em sequência e o saldo subindo a cada Pix.
// A animação só roda enquanto o bloco está na tela.
const NOTIF_MS = 2600;

function NotifIcon({ kind }: { kind: string }) {
  if (kind === "pix")
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M12 3.5 20.5 12 12 20.5 3.5 12Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M8.5 12h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  if (kind === "ok")
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="m5.5 12.5 4.2 4 8.8-9" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M4 7.5h16v11H4z M4 8l8 6 8-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

const Apple = () => (
  <svg viewBox="0 0 24 24" aria-hidden>
    <path
      fill="currentColor"
      d="M16.4 12.6c0-2.4 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.1 1-4 2.4-1.7 3-.4 7.3 1.2 9.7.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.1-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.5-1-2.5-3.8ZM14 5.4c.7-.8 1.1-1.9 1-3-1 0-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.9 1.1.1 2.1-.6 2.8-1.4Z"
    />
  </svg>
);
const Play = () => (
  <svg viewBox="0 0 24 24" aria-hidden>
    <path fill="#00d7fe" d="M3.6 2.3 13.5 12l-9.9 9.7c-.4-.2-.6-.6-.6-1.1V3.4c0-.5.2-.9.6-1.1Z" />
    <path fill="#00f076" d="m16.8 8.7-3.3 3.3-9.9-9.7c.2-.1.5-.1.8 0l12.4 6.4Z" />
    <path fill="#ff3a44" d="m16.8 15.3-12.4 6.4c-.3.1-.6.1-.8 0l9.9-9.7 3.3 3.3Z" />
    <path fill="#ffd400" d="M20.4 12c0 .5-.3.9-.7 1.1l-2.9 2.2-3.3-3.3 3.3-3.3 2.9 2.2c.4.2.7.6.7 1.1Z" />
  </svg>
);

export default function CreatorApp() {
  const [shown, setShown] = useState(false);
  const [visible, setVisible] = useState(false);
  const [n, setN] = useState(0);
  const box = useRef<HTMLDivElement>(null);

  // entra uma vez; as notificações só rodam enquanto o bloco está na tela
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      setVisible(e.isIntersecting);
      if (e.isIntersecting) setShown(true);
    }, { rootMargin: "0px 0px -10% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!visible || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setN((x) => x + 1), NOTIF_MS);
    return () => clearInterval(id);
  }, [visible]);

  const list = creators.notifications;
  // pilha: a mais nova em cima, as duas anteriores atrás
  const stack = [0, 1, 2].map((k) => ({ k, item: list[(n - k + list.length * 10) % list.length], id: n - k }));
  // saldo sobe a cada "Pix recebido"
  const pixCount = Math.floor((n + 1) / list.length);
  const balance = 2450 + pixCount * 800;

  return (
    <div className={`capp${shown ? " in" : ""}`} ref={box} id="creators">
      <div className="capp-glow" aria-hidden />
      <div className="capp-copy">
        <div className="capp-head">
          <span className="capp-icon">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/howhow/app-icon.png" alt={`Ícone do app ${creators.appName}`} width={84} height={84} />
          </span>
          <span className="capp-tag">
            <b>{creators.tag}</b>
            <em>App grátis para creators</em>
          </span>
        </div>
        <h3 className="capp-title">{creators.title}</h3>
        <p className="capp-text">{creators.text}</p>
        <ul className="capp-perks">
          {creators.perks.map((p, i) => (
            <li key={p} style={{ ["--i" as string]: i }}>
              <Check color="#ff4d00" /> {p}
            </li>
          ))}
        </ul>
        <div className="capp-stores">
          <a href={creators.stores.ios} className="store" target="_blank" rel="noopener noreferrer">
            <Apple />
            <span>
              <em>Baixar na</em>
              <b>App Store</b>
            </span>
          </a>
          <a href={creators.stores.android} className="store" target="_blank" rel="noopener noreferrer">
            <Play />
            <span>
              <em>Disponível no</em>
              <b>Google Play</b>
            </span>
          </a>
        </div>
      </div>

      <div className="capp-stage" aria-hidden>
        <i className="capp-ring r1" />
        <i className="capp-ring r2" />
        <div className="capp-phone">
          <div className="capp-screen">
            <div className="capp-status">
              <b>9:41</b>
              <span className="capp-island" />
              <span className="capp-bat" />
            </div>
            <div className="capp-hello">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/howhow/creators/c6.jpg" alt="" />
              <span>
                <em>Boa tarde,</em>
                <b>Júlia</b>
              </span>
              <i className="capp-bell">
                <NotifIcon kind="invite" />
                <span key={n}>{(n % 9) + 1}</span>
              </i>
            </div>
            <div className="capp-balance">
              <em>Disponível para saque</em>
              <b key={balance}>R$ {balance.toLocaleString("pt-BR")},00</b>
              <span className="capp-pix">Sacar via Pix</span>
            </div>
            <span className="capp-label">Convites</span>
            {[
              { c: "c1", t: "Skincare · Reels", v: "R$ 800" },
              { c: "c5", t: "Games · TikTok", v: "R$ 1.200" },
              { c: "c3", t: "Moda · Stories", v: "R$ 450" },
            ].map((x, i) => (
              <div className="capp-row" key={x.c} style={{ ["--i" as string]: i }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/howhow/creators/${x.c}.jpg`} alt="" />
                <b>{x.t}</b>
                <em>{x.v}</em>
              </div>
            ))}
            <div className="capp-notifs">
              {stack.map(({ k, item, id }) => (
                <div className={`capp-notif d${k}`} key={id}>
                  <span className={`capp-ni ${item.icon}`}>
                    <NotifIcon kind={item.icon} />
                  </span>
                  <span className="capp-nt">
                    <b>
                      {item.title} <em>agora</em>
                    </b>
                    <span>{item.text}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <span className="capp-chip c1">
          <Check color="#1a9a50" /> Pagamento protegido
        </span>
        <span className="capp-chip c2">
          <i className="capp-dot" /> Saque por Pix toda semana
        </span>
      </div>
    </div>
  );
}
