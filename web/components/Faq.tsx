"use client";
import { useState } from "react";
import { faq } from "@/lib/content";
import { Plus } from "./icons";

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq reveal">
      {faq.items.map((it, n) => (
        <div key={it.q} className={`faq-item${open === n ? " open" : ""}`} style={{ ["--i" as string]: n }}>
          <button className="faq-q" aria-expanded={open === n} onClick={() => setOpen(open === n ? -1 : n)}>
            <span>{it.q}</span>
            <i className="faq-icon">
              <Plus />
            </i>
          </button>
          <div className="faq-a">
            <div>
              <p>{it.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
