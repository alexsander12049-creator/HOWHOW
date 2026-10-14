import Image from "next/image";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import Faq from "@/components/Faq";
import ContactForm from "@/components/ContactForm";
import CaseVideo from "@/components/CaseVideo";
import VslPlayer from "@/components/VslPlayer";
import VideoModal from "@/components/VideoModal";
import ScrollProgress from "@/components/ScrollProgress";
import GoalTabs from "@/components/GoalTabs";
import Plans from "@/components/Plans";
import Testimonials from "@/components/Testimonials";
import Results from "@/components/Results";
import CountUp from "@/components/CountUp";
import Refund from "@/components/Refund";
import Num from "@/components/Num";
import { Check, Cross, Heart, Instagram, Sparkle, Star, Tick } from "@/components/icons";
import {
  brand, clients, compare, creators, faq, finalCta, footer, hero, managed, plans, scale, showcase, start, steps, stories,
} from "@/lib/content";
import { images } from "@/lib/images";

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="tag reveal">
      <span className="tag-icon">
        <Sparkle />
      </span>
      {children}
    </span>
  );
}

function Heading({ tag, title, text }: { tag: string; title: string; text?: string }) {
  return (
    <div className="heading">
      <Tag>{tag}</Tag>
      <h2 className="h2 reveal">{title}</h2>
      {text && <p className="lead center muted reveal">{text}</p>}
    </div>
  );
}

function Cta({ label, href }: { label: string; href: string }) {
  return (
    <a href={href} className="btn black reveal">
      <i className="dot" /> {label}
    </a>
  );
}

function Ticker({ items, speed = 40, reverse = false }: { items: React.ReactNode[]; speed?: number; reverse?: boolean }) {
  const track = (hidden: boolean) => (
    <div className="ticker-track" aria-hidden={hidden || undefined}>
      {items.map((it, i) => (
        <div key={i}>{it}</div>
      ))}
    </div>
  );
  return (
    <div className={`ticker${reverse ? " reverse" : ""}`} style={{ ["--speed" as string]: `${speed}s` }}>
      {track(false)}
      {track(true)}
    </div>
  );
}


export default function Home() {
  return (
    <>
      <Reveal />
      <ScrollProgress />
      <VideoModal />
      <Nav />

      {/* 1. PROMESSA */}
      <header className="section hero" id="topo">
        <div className="container">
          <div className="hero-copy">
            <Tag>{hero.tag}</Tag>
            <h1 className="h1 hero-title">
              {hero.title.split(" ").map((w, i) => (
                <span key={i} className="hw" style={{ ["--i" as string]: i }}>
                  {w}{" "}
                </span>
              ))}
            </h1>
            <p className="lead reveal">{hero.text}</p>
            <div className="hero-actions reveal">
              <a href={hero.primary.href} className="btn black">
                <i className="dot" /> {hero.primary.label}
              </a>
              <a href={hero.secondary.href} className="btn outline">
                {hero.secondary.label}
              </a>
            </div>
            <p className="small muted reveal">{hero.note}</p>
          </div>

          <div className="vsl-wrap reveal">
            <div className="float vsl-f1">
              <span className="pill balloon">
                <Instagram color="#0096dc" /> Redes conectadas <i className="live" />
              </span>
            </div>
            <div className="float vsl-f2">
              <span className="pill balloon">
                <Heart color="#ff4d00" /> Nova candidatura <i className="live" />
              </span>
            </div>
            <VslPlayer
              src="/howhow/vsl.mp4"
              poster="/howhow/vsl-capa.jpg"
              duration={hero.vsl.duration}
              ctaHref="#contato"
              modal={{ src: "/howhow/vsl.mp4", poster: "/howhow/vsl-capa.jpg", title: "Veja a Howhow em ação", subtitle: "Howhow" }}
            />
          </div>
        </div>
      </header>

      {/* 2. LOGOS */}
      <section className="section white">
        <div className="container" style={{ paddingTop: 50, paddingBottom: 50 }}>
          <div className="clients">
            <p className="small muted">{clients.label}</p>
            <Ticker
              speed={30}
              items={clients.logos.map((c) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={c.logo}
                  className="client-logo"
                  src={`/howhow/marcas/${c.logo}.png`}
                  alt={c.name}
                  width={Math.round((c.height * c.w) / c.h)}
                  height={c.height}
                  style={{ ["--h" as string]: `${c.height}px` }}
                />
              ))}
            />
          </div>
        </div>
      </section>

      {/* 3. NÚMEROS */}
      <section className="section">
        <div className="container">
          <Heading tag={scale.tag} title={scale.title} />
          <div className="scale">
            {scale.stats.map((s, i) => (
              <div className="scale-stat reveal" key={s.label} style={{ ["--i" as string]: i }}>
                <b>
                  <Num value={s.value} delay={i * 150} duration={1600} />
                </b>
                <i className="scale-line" aria-hidden />
                <span>{s.label}</span>
              </div>
            ))}
          </div>
          <Ticker
            items={scale.ticker.map((t) => (
              <span className="pill" key={t}>
                <Check color="#000" /> {t}
              </span>
            ))}
          />
          <p className="small muted center reveal">{scale.note}</p>
        </div>
      </section>

      {/* 4. COMO FUNCIONA */}
      <section className="section white" id="como-funciona">
        <div className="container">
          <Heading tag={steps.tag} title={steps.title} />
          <div className="how">
            {steps.items.map((s, n) => (
              <div className={`how-card reveal${n % 2 ? " flip" : ""}`} key={s.key}>
                <div className="how-text">
                  <span className="how-key">
                    <span>0{n + 1}</span> {s.key}
                  </span>
                  <h3 className="h3">{s.title}</h3>
                  <p className="body muted">{s.text}</p>
                </div>
                <div className="how-art">{stepArt(n)}</div>
              </div>
            ))}
          </div>
          <Cta {...steps.cta} />
        </div>
      </section>

      {/* 5. CONTEÚDO REAL */}
      <section className="section" id="conteudo">
        <div className="container">
          <Heading tag={showcase.tag} title={showcase.title} text={showcase.text} />
          <div className="cases">
            {showcase.items.map((c, i) => (
              <CaseVideo key={c.video} {...c} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. CASES + DEPOIMENTOS */}
      <section className="section" id="cases">
        <div className="container" style={{ paddingTop: 0 }}>
          <Heading tag={stories.tag} title={stories.title} />
          <div className="numbers wide reveal">
            {stories.numbers.map((n) => (
              <div className="number" key={n.label}>
                <b>{n.value}</b>
                <span>{n.label}</span>
              </div>
            ))}
          </div>
          <Testimonials />
          <Results />
        </div>
      </section>

      {/* 7. OBJETIVO */}
      <section className="section white" id="objetivo">
        <div className="container">
          <GoalTabs />
        </div>
      </section>

      {/* 8. DEVOLUÇÃO DA SOBRA */}
      <section className="section" id="devolucao">
        <div className="container">
          <Refund />
        </div>
      </section>

      {/* 9. PLANOS (+ agências) */}
      <section className="section" id="planos">
        <div className="container" style={{ paddingTop: 0 }}>
          <Heading tag={plans.tag} title={plans.title} text={plans.text} />
          <Plans />
        </div>
      </section>

      {/* 9. COMPARAÇÃO */}
      <section className="section white" id="compare">
        <div className="container">
          <Heading tag={compare.tag} title={compare.title} />
          <div className="compare">
            {compare.columns.map((col, ci) => (
              <div className={`compare-col reveal${col.good ? " good" : ""}`} key={col.title} style={{ ["--i" as string]: ci }}>
                <div className={`compare-head${col.good ? " good" : ""}`}>
                  {col.good && <Image src={images.fogueteBranco} alt="" width={26} height={26} />}
                  <h3 className="h4">{col.title}</h3>
                </div>
                <div className="compare-list">
                  {col.items.map((it, k) => (
                    <div className="compare-item" key={it} style={{ ["--k" as string]: k }}>
                      {col.good ? <Check color="#0096dc" /> : <Cross color="#000" />}
                      {it}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. GERENCIADO */}
      <section className="section white" id="gerenciado">
        <div className="container" style={{ paddingTop: 0 }}>
          <div className="managed reveal">
            <Image className="managed-mark" src={images.fogueteBranco} alt="" width={320} height={320} />
            <div className="managed-copy">
              <span className="pill sm managed-tag">{managed.tag}</span>
              <h2 className="h2">{managed.title}</h2>
              <p className="lead">{managed.text}</p>
              <a href={managed.cta.href} className="btn white">
                <i className="dot" /> {managed.cta.label}
              </a>
            </div>
            <div className="managed-list">
              {managed.bullets.map((b, k) => (
                <div className="managed-item" key={b} style={{ ["--k" as string]: k }}>
                  <Check color="#ff4d00" /> {b}
                </div>
              ))}
              <p className="managed-price">{managed.price}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. COMO COMEÇAR */}
      <section className="section" id="comecar">
        <div className="container">
          <Heading tag={start.tag} title={start.title} />
          <div className="timeline reveal">
            {start.steps.map((s, i) => (
              <div className="tl-step reveal" key={s.title} style={{ ["--i" as string]: i }}>
                <div className="tl-dot">{i + 1}</div>
                <span className="tl-when">{s.when}</span>
                <h3 className="h4">{s.title}</h3>
                <p className="body muted">{s.text}</p>
              </div>
            ))}
          </div>
          <Cta {...start.cta} />
        </div>
      </section>

      {/* 12. FAQ */}
      <section className="section white" id="faq">
        <div className="container">
          <Heading tag={faq.tag} title={faq.title} />
          <Faq />
        </div>
      </section>

      {/* 13. CTA FINAL + FORMULÁRIO */}
      <section className="section white" id="contato">
        <div className="container" style={{ paddingTop: 0 }}>
          <div className="contact">
            <div className="heading" style={{ maxWidth: 440 }}>
              <Tag>{finalCta.tag}</Tag>
              <h2 className="h2 reveal">{finalCta.title}</h2>
              <p className="lead muted reveal">{finalCta.text}</p>
            </div>
            <div style={{ flex: 1, maxWidth: 560, width: "100%" }}>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* RODAPÉ */}
      <footer className="footer">
        <div className="container">
          <div className="creators-band reveal" id="creators">
            <div className="creators-cover" style={{ backgroundImage: `url(${images.hopeCapa})` }} />
            <div className="creators-copy">
              <h3 className="h3">{creators.title}</h3>
              <p className="body">{creators.text}</p>
            </div>
            <a href={creators.cta.href} className="btn white">
              <i className="dot" /> {creators.cta.label}
            </a>
          </div>
          <div className="footer-cols">
            <div className="footer-col reveal footer-brand">
              <a href="#topo" className="logo">
                <Image src={images.foguete} alt="" width={30} height={30} />
                <span>{brand.name}</span>
              </a>
              <p className="body muted">{brand.slogan}</p>
            </div>
            {footer.columns.map((c, i) => (
              <div className="footer-col reveal" key={c.title} style={{ ["--i" as string]: i + 1 }}>
                <h3>{c.title}</h3>
                {c.links.map((l) => (
                  <a key={l.label} href={l.href}>{l.label}</a>
                ))}
              </div>
            ))}
            <div className="footer-col reveal">
              <h3>Redes</h3>
              <a href="https://instagram.com/howhow.oficial">Instagram {brand.instagram}</a>
              <a href={`mailto:${brand.contactEmail}`}>{brand.contactEmail}</a>
            </div>
          </div>
        </div>
        {/* duas faixas cruzadas rolando em sentidos opostos */}
        <div className="stripes" aria-hidden>
          <div className="stripe stripe-back">
            <Ticker
              speed={32}
              reverse
              items={[0, 1, 2].map((i) => (
                <div className="stripe-item small" key={i}>
                  {["Creators", "Marcas", "Campanhas", "Resultados"].map((w) => (
                    <span key={w}>
                      {w} <i>✦</i>
                    </span>
                  ))}
                </div>
              ))}
            />
          </div>
          <div className="stripe stripe-front">
            <Ticker
              speed={25}
              items={[0, 1, 2].map((i) => (
                <div className="stripe-item" key={i}>
                  <span>{brand.name}</span>
                  <Image className="stripe-rocket" src={images.fogueteBranco} alt="" width={56} height={56} />
                  <span>{brand.slogan}</span>
                  <Image className="stripe-rocket" src={images.fogueteBranco} alt="" width={56} height={56} />
                </div>
              ))}
            />
          </div>
        </div>
        <div className="legal">
          <span>© {new Date().getFullYear()} Howhow. Todos os direitos reservados.</span>
          <span>{brand.site}</span>
        </div>
      </footer>
      <div className="bottom-blur" aria-hidden />
    </>
  );
}

// Mini telas de cada passo do "Como funciona". Cada peça tem --i (ordem de entrada):
// quando o card aparece (.how-card.in) elas entram em sequência, e algumas ficam em loop suave.
const st = (i: number) => ({ ["--i" as string]: i }) as React.CSSProperties;
const face = (photo: string) => `/howhow/creators/${photo}.jpg`;

function stepArt(n: number) {
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
