import Image from "next/image";
import Link from "next/link";
import { brand, creators, footer } from "@/lib/content";
import { images } from "@/lib/images";
import { Ticker } from "./ui";

// Rodapé comum às páginas: faixa "É creator?", colunas de links, faixas cruzadas e legal.
export default function SiteFooter() {
  return (
    <>
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
              <Link href="/" className="logo">
                <Image src={images.foguete} alt="" width={30} height={30} />
                <span>{brand.name}</span>
              </Link>
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
    </>
  );
}
