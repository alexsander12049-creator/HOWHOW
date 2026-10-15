import { clients } from "@/lib/content";
import { Ticker } from "./ui";

// Faixa com os logos das marcas que já trabalharam com a Howhow.
export default function ClientLogos() {
  return (
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
  );
}
