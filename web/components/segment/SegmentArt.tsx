"use client";
import { useEffect, useState } from "react";
import type { SegmentArt as ArtKey } from "@/lib/content";
import { Tick } from "../icons";

// Mini telas dos "3 passos" das páginas de marcas e agências. Peças com --i entram em sequência
// quando o bloco aparece (.art-scene.in); as de agência alternam entre Cliente A, B e C sozinhas.
const iv = (i: number) => ({ ["--i" as string]: i }) as React.CSSProperties;
const face = (c: string) => `/howhow/creators/${c}.jpg`;

function useCycle(n: number, ms = 2600) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((x) => (x + 1) % n), ms);
    return () => clearInterval(id);
  }, [n, ms]);
  return i;
}

function ClientTabs({ active }: { active: number }) {
  return (
    <div className="sa-tabs">
      {["Cliente A", "Cliente B", "Cliente C"].map((c, i) => (
        <span key={c} className={i === active ? "on" : ""}>
          {c}
        </span>
      ))}
    </div>
  );
}

const clients = [
  { audience: "Quem cuida da pele", angle: "Rotina de 15 segundos", deliver: "1 Reels + 3 stories", people: ["c1", "c3", "c6"] },
  { audience: "Gamers de celular", angle: "Primeira partida ao vivo", deliver: "2 TikToks", people: ["c4", "c7", "c5"] },
  { audience: "Quem treina em casa", angle: "Treino com o produto", deliver: "1 Reels + 1 TikTok", people: ["c5", "c8", "c2"] },
];

function Brief({ client }: { client?: number }) {
  const c = clients[client ?? 0];
  return (
    <div className="art-form a-pop sa-card">
      {client !== undefined && <ClientTabs active={client} />}
      <span className="art-label a-in" style={iv(0)}>
        Briefing da campanha
      </span>
      <div className="art-field a-in" style={iv(1)}>
        Público<b key={`a${client}`} className="sa-swap">{c.audience}</b>
      </div>
      <div className="art-field a-in" style={iv(2)}>
        Ângulo criativo<b key={`b${client}`} className="sa-swap">{c.angle}</b>
      </div>
      <div className="art-field a-in" style={iv(3)}>
        Entregável<b key={`c${client}`} className="sa-swap">{c.deliver}</b>
      </div>
      <div className="sa-steps a-in" style={iv(4)}>
        {["Público", "Ângulo", "Entregáveis"].map((s, i) => (
          <span key={s} style={iv(i)}>
            <i>
              <Tick />
            </i>
            {s}
          </span>
        ))}
      </div>
      <span className="art-cta a-press a-in" style={iv(5)}>
        Enviar aos creators →
      </span>
    </div>
  );
}

function Shortlist({ client }: { client?: number }) {
  const c = clients[client ?? 0];
  const actions = ["Revisar o trabalho", "Comparar o encaixe", "Adicionar à lista"];
  return (
    <div className="sa-list">
      {client !== undefined && <ClientTabs active={client} />}
      <span className="sa-criteria a-in" style={iv(0)}>
        Seus critérios: <b>{c.audience}</b>
      </span>
      {c.people.map((p, i) => (
        <div className={`art-row a-in${i === 2 ? " sa-pick" : ""}`} key={`${client}-${p}`} style={iv(i + 1)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="av" src={face(p)} alt="" />
          <span className="who">
            <b>Creator {String.fromCharCode(65 + i)}</b>
            <span>{actions[i]}</span>
          </span>
          {i === 2 ? (
            <span className="paid a-stamp" style={iv(3)}>
              Na lista ✓
            </span>
          ) : (
            <span className="approve">{i === 0 ? "Ver" : "Comparar"}</span>
          )}
        </div>
      ))}
    </div>
  );
}

function Compare() {
  const rows = [
    { h: "@ju.looks", p: "c6", cpm: 6, tag: "Dobrar aposta", good: true },
    { h: "@duda.rotina", p: "c2", cpm: 11, tag: "Manter", good: true },
    { h: "@ana.pele", p: "c1", cpm: 19, tag: "Cortar", good: false },
  ];
  return (
    <div className="art-stats sa-card">
      <span className="art-label">CPM por creator</span>
      {rows.map((r, i) => (
        <div className="sa-bar-row a-in" key={r.h} style={iv(i)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={face(r.p)} alt="" />
          <span className="sa-bar-name">{r.h}</span>
          <span className="sa-bar">
            <i style={{ width: `${(r.cpm / 20) * 100}%`, ...iv(i) }} className={r.good ? "" : "bad"} />
          </span>
          <b>R$ {r.cpm}</b>
          <em className={r.good ? "ok" : "no"}>{r.tag}</em>
        </div>
      ))}
      <span className="sa-foot">Comparação ilustrativa</span>
    </div>
  );
}

function Report({ client }: { client: number }) {
  const c = clients[client];
  return (
    <div className="art-form a-pop sa-card">
      <ClientTabs active={client} />
      <span className="art-label a-in" style={iv(0)}>
        Relatório da campanha
      </span>
      <div className="sa-report a-in" style={iv(1)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={face(c.people[0])} alt="" />
        <span>
          <b>Melhor creator</b>
          <em key={`r${client}`} className="sa-swap">Creator A · menor CPM</em>
        </span>
      </div>
      <div className="sa-report a-in" style={iv(2)}>
        <span className="sa-format">15s</span>
        <span>
          <b>Melhor formato</b>
          <em key={`f${client}`} className="sa-swap">{c.angle}</em>
        </span>
      </div>
      <div className="sa-reco a-in" style={iv(3)}>
        <b>Próxima rodada</b>
        <span key={`n${client}`} className="sa-swap">
          Novo briefing com a Creator A · {c.deliver}
        </span>
      </div>
      <span className="art-cta a-press a-in" style={iv(4)}>
        Enviar ao cliente →
      </span>
    </div>
  );
}

export default function SegmentArt({ art }: { art: ArtKey }) {
  const client = useCycle(3);
  // as telas de marca não trocam de cliente: a cada 7 s remontam e a entrada roda de novo
  const replay = useCycle(2, 7000);
  if (art === "brief") return <Brief key={replay} />;
  if (art === "shortlist") return <Shortlist key={replay} />;
  if (art === "compare") return <Compare key={replay} />;
  if (art === "clientBrief") return <Brief client={client} />;
  if (art === "clientShortlist") return <Shortlist client={client} />;
  return <Report client={client} />;
}
