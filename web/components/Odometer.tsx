"use client";
import { useEffect, useRef, useState } from "react";

// Preço em "contador de painel": cada dígito é uma coluna 0–9 que rola até o número certo.
// - o HTML já sai com o valor final (Google e quem abre sem JavaScript veem o preço);
// - fora da tela ao abrir, os dígitos vão a 0 e rolam quando o preço aparece;
// - quando o valor muda (mensal ↔ anual), cada dígito rola para o novo, um pouco depois do outro.
const zeroed = (s: string) => s.replace(/\d/g, "0");

export default function Odometer({ value, delay = 0 }: { value: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);
  const seen = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.getBoundingClientRect().top < window.innerHeight) {
      seen.current = true;
      return;
    }
    setShown(zeroed(value));
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        seen.current = true;
        window.setTimeout(() => setShown(value), delay);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (seen.current) setShown(value);
  }, [value]);

  // alinha pela direita: assim "R$ 1.097" → "R$ 897" mantém as casas no lugar certo
  const chars = shown.split("");
  return (
    <span ref={ref} className="odo" aria-label={value}>
      {chars.map((ch, i) => {
        const pos = chars.length - i; // posição a partir da direita
        if (!/\d/.test(ch)) {
          return (
            <span key={`s${pos}`} className="odo-sym" aria-hidden>
              {ch}
            </span>
          );
        }
        return (
          <span key={`d${pos}`} className="odo-digit" aria-hidden>
            <span className="odo-col" style={{ transform: `translateY(${-Number(ch) * 10}%)`, transitionDelay: `${(chars.length - pos) * 45}ms` }}>
              {"0123456789".split("").map((d) => (
                <span key={d}>{d}</span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}
