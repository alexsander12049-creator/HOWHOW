import { brand, finalCta, signup } from "@/lib/content";
import { Check } from "./icons";

// Chamada final sem formulário: 3 passos até a primeira campanha e um botão que leva direto ao cadastro.
// (Os 3 passos acendem em sequência e a linha entre eles se desenha quando o painel aparece.)
export default function SignupPanel() {
  const p = finalCta.panel;
  return (
    <div className="signup reveal">
      <span className="signup-label">{p.label}</span>
      <ol className="signup-steps">
        {p.steps.map((s, i) => (
          <li key={s} style={{ ["--i" as string]: i }}>
            <em>{i + 1}</em>
            {s}
          </li>
        ))}
      </ol>
      <div className="signup-perks">
        {p.perks.map((k, i) => (
          <span key={k} style={{ ["--i" as string]: i }}>
            <Check color="#ff4d00" /> {k}
          </span>
        ))}
      </div>
      <a href={signup.href} className="btn orange full signup-cta">
        {p.cta} <span aria-hidden>→</span>
      </a>
      <div className="signup-foot">
        <a href={signup.login}>{p.login}</a>
        <span>
          {p.talk} <a href={`mailto:${brand.contactEmail}`}>{brand.contactEmail}</a>
        </span>
      </div>
    </div>
  );
}
