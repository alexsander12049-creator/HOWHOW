import { scale } from "@/lib/content";
import Num from "./Num";

// Números de escala num painel único, no estilo de dashboard de produto: rótulo pequeno, número grande
// em preto (unidade discreta), descrição e uma mini visualização por métrica, tudo animando ao aparecer.
type Stat = (typeof scale.stats)[number];

const faces = ["c1", "c6", "c4", "c2", "c8", "c5"];
// barras subindo até a última (destacada); é só o desenho do gráfico, não são dados
const bars = [30, 36, 33, 44, 40, 52, 48, 58, 55, 66, 62, 74, 70, 90];
const SEGMENTS = 25;

function Viz({ s }: { s: Stat }) {
  if (s.viz === "people")
    return (
      <div className="stat-viz stat-people">
        <span className="stat-faces">
          {faces.map((f, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={f} src={`/howhow/creators/${f}.jpg`} alt="" style={{ ["--k" as string]: i }} />
          ))}
          <em style={{ ["--k" as string]: faces.length }}>+</em>
        </span>
        <span className="stat-note">Skincare · Games · Moda · Tech</span>
      </div>
    );
  if (s.viz === "bars")
    return (
      <div className="stat-viz stat-bars" aria-hidden>
        {bars.map((h, i) => (
          <i key={i} style={{ height: `${h}%`, ["--k" as string]: i }} className={i === bars.length - 1 ? "top" : ""} />
        ))}
      </div>
    );
  const filled = Math.round((parseFloat(s.value.replace(",", ".")) / 100) * SEGMENTS);
  return (
    <div className="stat-viz stat-segs" aria-hidden>
      {Array.from({ length: SEGMENTS }, (_, i) => (
        <i key={i} className={i < filled ? "on" : ""} style={{ ["--k" as string]: i }} />
      ))}
    </div>
  );
}

export default function ScaleStats() {
  return (
    <div className="stats reveal">
      {scale.stats.map((s, i) => {
        const pct = s.value.endsWith("%");
        return (
          <div className="stat" key={s.label} style={{ ["--i" as string]: i }}>
            <span className="stat-eyebrow">
              <i />
              {s.eyebrow}
            </span>
            <b className="stat-num">
              <Num value={pct ? s.value.slice(0, -1) : s.value} delay={300 + i * 150} duration={1600} />
              {pct && <small>%</small>}
            </b>
            <p className="stat-label">{s.label}</p>
            <Viz s={s} />
          </div>
        );
      })}
    </div>
  );
}
