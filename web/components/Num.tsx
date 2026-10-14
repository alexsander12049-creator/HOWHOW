"use client";
import { useEffect, useRef, useState } from "react";

// Número animado a partir de um texto já formatado ("R$ 1.097", "3,1 mi", "8,4%", "R$ 4.990,90").
// - conta de 0 até o valor quando aparece na tela (com `delay` opcional);
// - se o valor mudar depois (ex.: mensal → anual), desliza do valor atual para o novo.
// Textos sem número (ex.: "∞") aparecem como estão.
// `replay`: conta de novo mesmo se já estiver na tela ao montar (ex.: números que trocam com a aba).
export default function Num({ value, delay = 0, duration = 1300, replay = false }: { value: string; delay?: number; duration?: number; replay?: boolean }) {
  const m = value.match(/^(\D*?)([\d.,]+)(.*)$/);
  const pre = m?.[1] ?? "";
  const raw = m?.[2] ?? "";
  const suf = m?.[3] ?? "";
  const decimals = raw.includes(",") ? raw.split(",")[1].length : 0;
  const target = m ? Number(raw.replace(/\./g, "").replace(",", ".")) : 0;

  const ref = useRef<HTMLSpanElement>(null);
  // o HTML já sai com o valor final (Google e quem abre sem JavaScript veem o número certo);
  // no navegador, se o número ainda estiver fora da tela, ele volta a 0 e conta quando aparecer
  const [n, setN] = useState(target);
  const cur = useRef(target);
  const started = useRef(false);
  const raf = useRef(0);

  const tween = (to: number, ms: number, wait = 0) => {
    cancelAnimationFrame(raf.current);
    const from = cur.current;
    let t0 = 0;
    const step = (t: number) => {
      if (!t0) t0 = t + wait;
      const p = Math.max(0, Math.min((t - t0) / ms, 1));
      const v = from + (to - from) * (1 - Math.pow(1 - p, 3));
      cur.current = v;
      setN(v);
      if (p < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  };

  // primeira vez: quando aparece na tela
  useEffect(() => {
    const el = ref.current;
    if (!el || !m) return;
    if (!replay && el.getBoundingClientRect().top < window.innerHeight) {
      started.current = true; // já está na tela ao abrir: mostra o valor sem animar
      return;
    }
    cur.current = 0;
    setN(0);
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || started.current) return;
        started.current = true;
        io.disconnect();
        tween(target, duration, delay);
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // valor mudou depois de já ter aparecido: desliza até o novo
  useEffect(() => {
    if (started.current) tween(target, 650);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  if (!m) return <>{value}</>;
  return (
    <span ref={ref} className="num">
      {pre}
      {n.toLocaleString("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suf}
    </span>
  );
}
