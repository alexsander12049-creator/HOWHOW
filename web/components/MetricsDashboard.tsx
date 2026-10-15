"use client";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { metrics } from "@/lib/content";
import Num from "./Num";

const W = 600;
const H = 220;
const PAD = 8;

// curva suave passando pelos pontos (Catmull-Rom → Bézier)
function smooth(pts: [number, number][]) {
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0]},${p2[1].toFixed(1)}`;
  }
  return d;
}
const toNumber = (s: string) => Number(s.replace(/[^\d,]/g, "").replace(",", "."));
const fmt = (n: number) => Math.round(n).toLocaleString("pt-BR");

// Painel de métricas "por dentro da plataforma": views subindo ao vivo, período 7/30/90 dias,
// gráfico que se desenha (com valor do dia ao passar o mouse), top posts, CPM por creator e redes.
export default function MetricsDashboard() {
  const [p, setP] = useState(1);
  const [live, setLive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState<number | null>(null);
  const [toast, setToast] = useState(-1);
  const box = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pill, setPill] = useState({ left: 0, width: 0 });

  const series = metrics.series[p];
  const total = toNumber(metrics.kpis[0].values[p]);
  const sum = series.reduce((a, b) => a + b, 0);
  const max = Math.max(...series);

  const pts = useMemo<[number, number][]>(
    () => series.map((v, i) => [PAD + (i * (W - PAD * 2)) / (series.length - 1), H - PAD - (v / max) * (H - PAD * 2 - 20)]),
    [series, max],
  );
  const line = useMemo(() => smooth(pts), [pts]);
  const area = `${line} L${pts[pts.length - 1][0]},${H} L${pts[0][0]},${H} Z`;

  useLayoutEffect(() => {
    const b = tabs.current[p];
    if (b) setPill({ left: b.offsetLeft, width: b.offsetWidth });
  }, [p]);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // views "ao vivo" e avisos de novos posts enquanto o painel está na tela
  useEffect(() => {
    if (!visible) return;
    const tick = setInterval(() => setLive((n) => n + 80 + Math.round(Math.random() * 520)), 1600);
    const t = setInterval(() => setToast((n) => (n + 1) % metrics.toasts.length), 4200);
    setToast((n) => (n < 0 ? 0 : n));
    return () => {
      clearInterval(tick);
      clearInterval(t);
    };
  }, [visible]);

  const onMove = (e: React.MouseEvent<SVGRectElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * W;
    const i = Math.round(((x - PAD) / (W - PAD * 2)) * (series.length - 1));
    setHover(Math.min(Math.max(i, 0), series.length - 1));
  };

  const kpiValue = (k: number) => (k === 0 ? fmt(total + live) : metrics.kpis[k].values[p]);
  const budgetUsed = (() => {
    const used = toNumber(metrics.kpis[3].values[p]);
    const cap = toNumber(metrics.kpis[3].delta[p]) * 1000;
    return cap ? Math.min(used / cap, 1) : 0;
  })();
  const netMax = Math.max(...metrics.networks.map((n) => n.posts));

  return (
    <div className="dash reveal" ref={box}>
      <div className="dash-bar">
        <i />
        <i />
        <i />
        <span className="hiw-url">
          app.howhow.com.br/<b>analytics</b>
        </span>
        <span className="dash-live">
          <i /> Ao vivo
        </span>
      </div>

      <div className="dash-body">
        <div className="dash-head">
          <div>
            <span className="dash-label">Campanha</span>
            <b className="dash-campaign">{metrics.campaign}</b>
          </div>
          <div className="dash-periods" role="tablist" aria-label="Período">
            <span className="dash-pill" style={{ left: pill.left, width: pill.width }} aria-hidden />
            {metrics.periods.map((label, n) => (
              <button
                key={label}
                ref={(el) => {
                  tabs.current[n] = el;
                }}
                type="button"
                role="tab"
                aria-selected={p === n}
                className={p === n ? "on" : ""}
                onClick={() => {
                  setP(n);
                  setHover(null);
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="dash-kpis">
          {metrics.kpis.map((k, n) => (
            <div className="dash-kpi" key={k.label} style={{ ["--i" as string]: n }}>
              <span className="dash-label">{k.label}</span>
              <b>
                <Num value={kpiValue(n)} duration={1000} />
              </b>
              {n === 3 ? (
                <span className="dash-budget">
                  <i style={{ transform: `scaleX(${budgetUsed})` }} />
                  <em>{k.delta[p]}</em>
                </span>
              ) : (
                <span className="dash-delta">{k.delta[p]}</span>
              )}
            </div>
          ))}
        </div>

        <div className="dash-main">
          <div className="dash-chart">
            <div className="dash-chart-head">
              <span className="dash-label">Views por dia</span>
              <span className="dash-legend">
                <i /> todas as redes
              </span>
            </div>
            <div className="dash-plot">
            <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" key={p}>
              <defs>
                <linearGradient id="dash-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#0096dc" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#0096dc" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="dash-line" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="#0096dc" />
                  <stop offset="100%" stopColor="#ff4d00" />
                </linearGradient>
              </defs>
              {[0.25, 0.5, 0.75].map((g) => (
                <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} className="dash-grid" />
              ))}
              <path d={area} fill="url(#dash-fill)" className="dash-area" />
              <path d={line} fill="none" stroke="url(#dash-line)" strokeWidth="3" strokeLinecap="round" pathLength={1} className="dash-line" />
              <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="5" className="dash-dot" />
              {hover !== null && (
                <g className="dash-hover">
                  <line x1={pts[hover][0]} x2={pts[hover][0]} y1="0" y2={H} />
                  <circle cx={pts[hover][0]} cy={pts[hover][1]} r="5.5" />
                </g>
              )}
              <rect x="0" y="0" width={W} height={H} fill="transparent" onMouseMove={onMove} onMouseLeave={() => setHover(null)} />
            </svg>
            {hover !== null && (
              <span className="dash-tip" style={{ left: `${(pts[hover][0] / W) * 100}%`, top: `${(pts[hover][1] / H) * 100}%` }}>
                <b>{fmt((series[hover] / sum) * total)}</b> views · dia {hover + 1}
              </span>
            )}
            </div>
          </div>

          <div className="dash-side">
            <div className="dash-card">
              <span className="dash-label">Top posts</span>
              {metrics.topPosts.map((t, n) => (
                <div className="dash-post" key={t.handle} style={{ ["--i" as string]: n }}>
                  <span className="dash-thumb" style={{ backgroundImage: `url(/howhow/videos/capa-${t.thumb}.jpg)` }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/howhow/creators/${t.photo}.jpg`} alt="" />
                  </span>
                  <span className="dash-post-who">
                    <b>{t.handle}</b>
                    <span>{t.network}</span>
                  </span>
                  <span className="dash-post-num">
                    <b>{t.views}</b>
                    <span>CPM {t.cpm}</span>
                  </span>
                </div>
              ))}
            </div>
            <div className="dash-card">
              <span className="dash-label">Posts por rede</span>
              {metrics.networks.map((n, k) => (
                <div className="dash-net" key={n.name} style={{ ["--i" as string]: k }}>
                  <span>{n.name}</span>
                  <span className="dash-net-bar">
                    <i style={{ width: `${(n.posts / netMax) * 100}%` }} />
                  </span>
                  <b>{n.posts}</b>
                </div>
              ))}
            </div>
          </div>
        </div>

        {toast >= 0 && (
          <div className="dash-toast" key={toast} aria-live="polite">
            <i /> {metrics.toasts[toast]}
          </div>
        )}
      </div>
    </div>
  );
}
