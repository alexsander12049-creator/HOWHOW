"use client";
import { useEffect, useRef, useState } from "react";
import { refund } from "@/lib/content";
import Num from "./Num";

// Devolução da sobra contada como uma cena: teto → fechou em (barra enchendo) → devolvido (com destaque).
export default function Refund() {
  const box = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const [cap, closed, back] = refund.example;
  return (
    <div className="reveal" style={{ width: "100%" }}>
      <div ref={box} className={`refund${on ? " on" : ""}`}>
        <div className="refund-copy">
          <span className="pill sm refund-tag">{refund.tag}</span>
          <h2 className="h2">{refund.title}</h2>
          <p className="lead muted">{refund.text}</p>
        </div>
        <div className="refund-card">
          <div className="refund-row r1">
            <span>{cap.label}</span>
            <b>
              <Num value={cap.value} delay={200} duration={900} />
            </b>
          </div>
          <div className="refund-row r2">
            <span>{closed.label}</span>
            <b>
              <Num value={closed.value} delay={700} duration={1100} />
            </b>
          </div>
          <div className="refund-bar">
            <span />
            <i className="refund-bar-label">sobra</i>
          </div>
          <div className="refund-row back r3">
            <span>{back.label}</span>
            <b>
              <Num value={back.value} delay={1700} duration={1100} />
            </b>
            <i className="refund-shine" aria-hidden />
          </div>
          <span className="refund-coin c1" aria-hidden>R$</span>
          <span className="refund-coin c2" aria-hidden>R$</span>
          <span className="refund-coin c3" aria-hidden>R$</span>
          <p className="small muted">{refund.note}</p>
        </div>
      </div>
    </div>
  );
}
