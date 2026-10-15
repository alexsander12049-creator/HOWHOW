"use client";
import { useEffect, useState, type RefObject } from "react";

// true enquanto o elemento está na tela (com folga de `margin`). Elemento escondido (display: none) nunca
// fica visível, então timers e animações em JS ligados a isto não rodam à toa (ex.: no celular).
export function useInView(ref: RefObject<Element | null>, margin = "120px 0px") {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin]);
  return inView;
}
