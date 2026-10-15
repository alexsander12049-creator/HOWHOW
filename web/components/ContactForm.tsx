"use client";
import { useState } from "react";
import { contact } from "@/lib/content";

// O envio ainda não vai para lugar nenhum: ligue `onSubmit` a uma API (ex.: app/api/contato/route.ts),
// a um CRM ou a um serviço de e-mail antes de publicar.
export default function ContactForm({ profiles = contact.profiles }: { profiles?: string[] }) {
  const [perfil, setPerfil] = useState(profiles[0]);
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="form">
        <div className="form-ok">
          <h3 className="h4">Recebido! 🚀</h3>
          <p className="body" style={{ opacity: 0.7 }}>A gente responde em breve.</p>
          <button className="btn white" onClick={() => setSent(false)}>Enviar outra mensagem</button>
        </div>
      </div>
    );
  }

  return (
    <form
      className="form reveal"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="full" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <span style={{ fontSize: 14, color: "rgba(255,255,255,.6)" }}>Você é</span>
        <div className="chips">
          {profiles.map((p) => (
            <button type="button" key={p} className={`chip${p === perfil ? " on" : ""}`} onClick={() => setPerfil(p)}>
              {p}
            </button>
          ))}
        </div>
      </div>
      <label>
        Nome
        <input name="nome" required placeholder="Seu nome" />
      </label>
      <label>
        E-mail
        <input name="email" type="email" required placeholder="voce@empresa.com" />
      </label>
      <label className="full">
        WhatsApp
        <input name="telefone" type="tel" placeholder="(11) 90000-0000" />
      </label>
      <label className="full">
        Mensagem
        <textarea name="mensagem" required placeholder="Conte o que você precisa" />
      </label>
      <button type="submit" className="btn white full">
        <i className="dot" /> Enviar
      </button>
    </form>
  );
}
