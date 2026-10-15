import Nav from "../Nav";
import Reveal from "../Reveal";
import ScrollProgress from "../ScrollProgress";
import RocketCursor from "../RocketCursor";
import VideoModal from "../VideoModal";
import ClientLogos from "../ClientLogos";
import CaseVideo from "../CaseVideo";
import Testimonials from "../Testimonials";
import MetricsDashboard from "../MetricsDashboard";
import Plans from "../Plans";
import Faq from "../Faq";
import ContactForm from "../ContactForm";
import SiteFooter from "../SiteFooter";
import { Check, Cross } from "../icons";
import { Heading, Tag, Ticker } from "../ui";
import Num from "../Num";
import { brandsPage, agenciesPage, plans, scale, showcase, stories } from "@/lib/content";
import SegmentHero from "./SegmentHero";
import WhiteLabel from "./WhiteLabel";
import { ControlCards, Flow6, ThreeSteps, WhyCards } from "./Sections";
import Image from "next/image";
import { images } from "@/lib/images";

type Page = typeof brandsPage | typeof agenciesPage;

// Página por público (marcas ou agências), com o mesmo visual da principal.
// Ordem (referência sideshift): promessa → logos → antes × depois → escala → 3 passos → (white-label) → painel →
// fluxo → por que UGC em volume → cases → (planos) → FAQ → chamada final.
export default function SegmentPage({ page, kind }: { page: Page; kind: "marcas" | "agencias" }) {
  const isAgency = kind === "agencias";
  return (
    <>
      <Reveal />
      <ScrollProgress />
      <RocketCursor />
      <VideoModal />
      <Nav links={page.nav} cta={page.navCta} />

      <SegmentHero {...page.hero} />

      <section className="section white">
        <div className="container" style={{ paddingTop: 50, paddingBottom: 50 }}>
          <ClientLogos />
        </div>
      </section>

      {/* antes × depois (página antiga da Howhow) */}
      <section className="section white">
        <div className="container" style={{ paddingTop: 30 }}>
          <Heading tag={page.before.tag} title={page.before.title} />
          <div className="compare compare-2">
            {page.before.columns.map((col, ci) => (
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

      {/* escala: os mesmos números da página principal, contando ao aparecer */}
      <section className="section white">
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
        </div>
      </section>

      <section className="section" id="como-funciona">
        <div className="container">
          <ThreeSteps {...page.steps} />
        </div>
      </section>

      {isAgency && (
        <section className="section white" id="white-label">
          <div className="container">
            <WhiteLabel />
          </div>
        </section>
      )}

      <section className={`section${isAgency ? "" : " white"}`} id="painel">
        <div className="container">
          <Heading tag={page.control.tag} title={page.control.title} text={page.control.text} />
          <ControlCards cards={page.control.cards} />
          <MetricsDashboard />
          <p className="small muted center reveal">Painel com dados ilustrativos de uma campanha.</p>
        </div>
      </section>

      <section className={`section${isAgency ? " white" : ""}`}>
        <div className="container">
          <Flow6 {...page.flow} />
        </div>
      </section>

      <section className={`section${isAgency ? "" : " white"}`}>
        <div className="container">
          <WhyCards {...page.why} />
        </div>
      </section>

      <section className="section" id="cases">
        <div className="container">
          <Heading tag={stories.tag} title={stories.title} text={showcase.text} />
          <div className="cases">
            {showcase.items.map((c, i) => (
              <CaseVideo key={c.video} {...c} index={i} />
            ))}
          </div>
          <Testimonials />
        </div>
      </section>

      {!isAgency && (
        <section className="section pricing" id="planos">
          <div className="container" style={{ paddingTop: 0 }}>
            <Heading tag={plans.tag} title={plans.title} text={plans.text} />
            <Plans />
          </div>
        </section>
      )}

      <section className="section white" id="faq">
        <div className="container">
          <Heading tag="FAQ" title={isAgency ? "Dúvidas de agências" : "Dúvidas de marcas"} />
          <Faq items={page.faq} />
        </div>
      </section>

      <section className="section white" id="contato">
        <div className="container" style={{ paddingTop: 0 }}>
          <div className="contact">
            <div className="heading" style={{ maxWidth: 460 }}>
              <Tag>{page.final.tag}</Tag>
              <h2 className="h2 reveal">{page.final.title}</h2>
              <p className="lead muted reveal">{page.final.text}</p>
            </div>
            <div style={{ flex: 1, maxWidth: 560, width: "100%" }}>
              <ContactForm profiles={page.profiles} />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
      <div className="bottom-blur" aria-hidden />
    </>
  );
}
