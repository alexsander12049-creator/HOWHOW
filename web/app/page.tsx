import Image from "next/image";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import Faq from "@/components/Faq";
import ContactForm from "@/components/ContactForm";
import CaseVideo from "@/components/CaseVideo";
import VslPlayer from "@/components/VslPlayer";
import VideoModal from "@/components/VideoModal";
import ScrollProgress from "@/components/ScrollProgress";
import RocketCursor from "@/components/RocketCursor";
import HeroNotifications from "@/components/HeroNotifications";
import GoalTabs from "@/components/GoalTabs";
import Plans from "@/components/Plans";
import Testimonials from "@/components/Testimonials";
import HowItWorks from "@/components/HowItWorks";
import MetricsDashboard from "@/components/MetricsDashboard";
import CpmCampaign from "@/components/CpmCampaign";
import Refund from "@/components/Refund";
import Num from "@/components/Num";
import { Check, Cross, Sparkle } from "@/components/icons";
import { Cta, Heading, Tag, Ticker } from "@/components/ui";
import SiteFooter from "@/components/SiteFooter";
import ClientLogos from "@/components/ClientLogos";
import {
  compare, faq, finalCta, hero, managed, metrics, plans, scale, showcase, start, steps, stories,
} from "@/lib/content";
import { images } from "@/lib/images";

export default function Home() {
  return (
    <>
      <Reveal />
      <ScrollProgress />
      <RocketCursor />
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
            <HeroNotifications />
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
          <ClientLogos />
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
      <section className="section pricing" id="planos">
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

      <SiteFooter />
      <div className="bottom-blur" aria-hidden />
    </>
  );
}
