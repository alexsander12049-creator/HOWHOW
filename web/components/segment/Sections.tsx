import type { SegmentArt as ArtKey } from "@/lib/content";
import { Check, IconCalendar, IconMega, IconProfile, IconSearch, IconWallet } from "../icons";
import { Heading } from "../ui";
import SegmentArt from "./SegmentArt";

const iv = (i: number) => ({ ["--i" as string]: i }) as React.CSSProperties;

type Step = { title: string; text: string; checks: string[]; art: ArtKey; label: string };

// 3 passos (01/03, 02/03, 03/03) com texto de um lado e a mini tela do outro, alternando.
export function ThreeSteps({ tag, title, text, items }: { tag: string; title: string; text: string; items: Step[] }) {
  return (
    <>
      <Heading tag={tag} title={title} text={text} />
      <div className="seg-steps">
        {items.map((s, n) => (
          <div className={`seg-step reveal${n % 2 ? " flip" : ""}`} key={s.title}>
            <div className="seg-step-text">
              <span className="seg-step-n">
                <b>0{n + 1}</b> / 0{items.length}
                <em>{s.label}</em>
              </span>
              <h3 className="h3">{s.title}</h3>
              <p className="body muted">{s.text}</p>
              <ul>
                {s.checks.map((c, i) => (
                  <li key={c} style={iv(i)}>
                    <Check color="#0096dc" /> {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="how-art art-scene reveal">
              <SegmentArt art={s.art} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

const cardIcons = [IconCalendar, IconSearch, IconWallet, IconProfile, IconMega];

// 4 recursos do painel (vindos da página antiga), com ícone e entrada em sequência.
export function ControlCards({ cards }: { cards: { title: string; text: string }[] }) {
  return (
    <div className="seg-cards">
      {cards.map((c, i) => {
        const Icon = cardIcons[i % cardIcons.length];
        return (
          <div className="seg-card reveal" key={c.title} style={iv(i)}>
            <span className="seg-card-icon">
              <Icon color="#0096dc" />
            </span>
            <h3 className="h4">{c.title}</h3>
            <p className="body muted">{c.text}</p>
          </div>
        );
      })}
    </div>
  );
}

// Fluxo de 6 etapas do briefing ao relatório: linha que se desenha e etapas acendendo em sequência.
export function Flow6({ tag, title, text, steps }: { tag: string; title: string; text: string; steps: string[] }) {
  return (
    <>
      <Heading tag={tag} title={title} text={text} />
      <ol className="flow6 reveal">
        {steps.map((s, i) => (
          <li key={s} style={iv(i)}>
            <span className="flow6-dot">{i + 1}</span>
            <b>{s}</b>
          </li>
        ))}
      </ol>
    </>
  );
}

// "Por que UGC em volume": 3 cards numerados.
export function WhyCards({ tag, title, text, cards }: { tag: string; title: string; text: string; cards: { title: string; text: string }[] }) {
  return (
    <>
      <Heading tag={tag} title={title} text={text} />
      <div className="why3">
        {cards.map((c, i) => (
          <div className="why3-card reveal" key={c.title} style={iv(i)}>
            <span className="why3-n">0{i + 1}</span>
            <h3 className="h4">{c.title}</h3>
            <p className="body muted">{c.text}</p>
          </div>
        ))}
      </div>
    </>
  );
}
