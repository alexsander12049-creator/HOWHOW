import CountUp from "./CountUp";
import { Tick } from "./icons";
import { steps } from "@/lib/content";

// Mini telas de cada passo do "Como funciona". Cada peça tem --i (ordem de entrada):
// quando o card aparece (.how-card.in) elas entram em sequência, e algumas ficam em loop suave.
const st = (i: number) => ({ ["--i" as string]: i }) as React.CSSProperties;
const face = (photo: string) => `/howhow/creators/${photo}.jpg`;

export function stepArt(n: number) {
  const people = steps.people;
  if (n === 0)
    return (
      <div className="art-form a-pop">
        <span className="art-label a-in" style={st(0)}>Nova campanha</span>
        <div className="art-field a-in" style={st(1)}>
          Produto<b className="a-type">Sérum Vitamina C</b>
        </div>
        <div className="art-field a-in" style={st(2)}>
          Objetivo<b className="a-type">Lançamento no Reels e TikTok</b>
        </div>
        <div className="seg a-in a-seg" style={st(3)}>
          <i className="seg-pill" />
          <span>Aberta</span>
          <span className="on">Híbrida</span>
          <span>Fechada</span>
        </div>
        <div className="art-done a-in" style={st(4)}>
          <span className="art-check a-tick"><Tick /></span> Briefing pronto
          <span className="art-cta a-press">Publicar →</span>
        </div>
        <span className="a-cursor" aria-hidden />
      </div>
    );
  if (n === 1)
    return (
      <div className="art-apply">
        <div className="art-apply-head a-in" style={st(0)}>
          <b><CountUp to={127} /></b> candidaturas
          <span className="pill sm">30 aprovados</span>
        </div>
        <div className="art-grid">
          {people.map((p, i) => (
            <span key={p.ini} className={`art-av a-face${i < 3 ? " ok" : ""}`} style={st(i + 1)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={face(p.photo)} alt="" />
              {i < 3 && <i><Tick /></i>}
            </span>
          ))}
        </div>
        <div className="art-row a-in a-glow" style={st(9)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="av" src={face(people[0].photo)} alt="" />
          <span className="who">
            <b>{people[0].handle}</b>
            <span>Skincare · 84,2 mil · 8,1%</span>
          </span>
          <span className="approve a-press">Aprovar</span>
        </div>
      </div>
    );
  if (n === 2)
    return (
      <div className="art-queue a-pop">
        <b className="art-queue-title a-in" style={st(0)}>
          <i className="a-live" /> {steps.queue.title}
        </b>
        <div className="art-kpis four">
          {steps.queue.counters.map((k, i) => (
            <div key={k.label} className="a-in" style={st(i + 1)}>
              <b><CountUp to={Number(k.value)} /></b>
              <span>{k.label}</span>
            </div>
          ))}
        </div>
        {steps.queue.rows.map((r, i) => (
          <div className="art-row a-in" key={r.campaign} style={st(i + 5)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="av" src={face(people[i + 4].photo)} alt="" />
            <span className="who">
              <b>{r.campaign}</b>
              <span>{r.detail}</span>
            </span>
            <span className={`approve${i === 0 ? " a-press" : ""}`}>{r.action}</span>
          </div>
        ))}
      </div>
    );
  if (n === 3)
    return (
      <div className="art-flow">
        <div className="flow a-flow">
          {steps.flow.map((f, i) => (
            <div key={f} style={{ display: "contents" }}>
              <div className={`flow-step${i < 2 ? " done" : i === 2 ? " now" : ""}`} style={st(i)}>
                <span className="flow-dot">{i < 2 && <Tick />}</span>
                {f}
              </div>
              {i < steps.flow.length - 1 && <span className={`flow-line${i < 2 ? " done" : ""}`} style={st(i)} />}
            </div>
          ))}
        </div>
        <div className="art-post a-in" style={st(4)}>
          <span className="art-post-thumb" style={{ backgroundImage: "url(/howhow/videos/capa-3.jpg)" }}>
            <i className="a-play" />
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="av" src={face(people[0].photo)} alt="" />
          <span className="who">
            <b>Entrega de {people[0].handle}</b>
            <span>Produto recebido · vídeo enviado</span>
          </span>
        </div>
        <div className="art-actions a-in" style={st(5)}>
          <span className="art-ghost">Pedir ajuste</span>
          <span className="art-cta a-press">Aprovar</span>
        </div>
      </div>
    );
  return (
    <div className="art-pay">
      {steps.payouts.map((p, i) => (
        <div className="art-row a-in" key={p.name} style={st(i)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="av" src={face(p.photo)} alt="" />
          <span className="who">
            <b>{p.name}</b>
            <span>Nota fiscal recebida</span>
          </span>
          <span className="art-value"><CountUp to={p.value} prefix="R$ " /></span>
          <span className="paid a-stamp" style={st(i + 3)}>Pago</span>
        </div>
      ))}
    </div>
  );
}
