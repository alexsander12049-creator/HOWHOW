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
import HowItWorks from "@/components/HowItWorks";
import MetricsDashboard from "@/components/MetricsDashboard";
import CpmCampaign from "@/components/CpmCampaign";
import Refund from "@/components/Refund";
import Num from "@/components/Num";
import { Check, Cross, Heart, Instagram, Sparkle } from "@/components/icons";
import {
  brand, clients, compare, cpm, creators, faq, finalCta, footer, hero, managed, metrics, plans, scale, showcase, start, steps, stories,
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
          <HowItWorks />
          <Cta {...steps.cta} />
        </div>
      </section>

      {/* 4b. MÉTRICAS REAIS */}
      <section className="section" id="metricas">
        <div className="container">
          <div className="heading">
            <span className="tag reveal">
              <span className="tag-icon">
                <Sparkle />
              </span>
              {metrics.tag}
              {metrics.badge && <em className="badge-new">{metrics.badge}</em>}
            </span>
            <h2 className="h2 reveal">{metrics.title}</h2>
            <p className="lead center muted reveal">{metrics.text}</p>
          </div>
          <MetricsDashboard />
          <div className="metrics-bullets">
            {metrics.bullets.map((b, i) => (
              <span className="pill sm reveal" key={b} style={{ ["--i" as string]: i }}>
                <Check color="#0096dc" /> {b}
              </span>
            ))}
          </div>
          <p className="small muted center reveal">{metrics.note}</p>
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
          <Testimonials />
        </div>
      </section>

      {/* 6b. CAMPANHA POR CPM */}
      <section className="section" id="cpm">
        <div className="container">
          <CpmCampaign />
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
