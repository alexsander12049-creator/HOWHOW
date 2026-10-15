"use client";
import { useEffect } from "react";

// Fade-up dos elementos com a classe .reveal quando entram na tela, e pausa das animações das seções fora da tela.
export default function Reveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));

    // seções fora da tela ganham .off e as animações delas pausam (não gastam processador à toa)
    const secs = Array.from(document.querySelectorAll<HTMLElement>(".section, .footer"));
    const off = new IntersectionObserver(
      (entries) => {
        for (const e of entries) e.target.classList.toggle("off", !e.isIntersecting);
      },
      { rootMargin: "150px 0px" },
    );
    secs.forEach((el) => off.observe(el));
    return () => {
      io.disconnect();
      off.disconnect();
    };
  }, []);
  return null;
}
