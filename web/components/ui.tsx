// Peças de layout usadas por todas as páginas (principal, marcas e agências).

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="tag reveal">
      <span className="tag-icon" aria-hidden />
      {children}
    </span>
  );
}

export function Heading({ tag, title, text }: { tag: string; title: string; text?: string }) {
  return (
    <div className="heading">
      <Tag>{tag}</Tag>
      <h2 className="h2 reveal">{title}</h2>
      {text && <p className="lead center muted reveal">{text}</p>}
    </div>
  );
}

export function Cta({ label, href }: { label: string; href: string }) {
  return (
    <a href={href} className="btn black reveal">
      <i className="dot" /> {label}
    </a>
  );
}

export function Ticker({ items, speed = 40, reverse = false }: { items: React.ReactNode[]; speed?: number; reverse?: boolean }) {
  const track = (hidden: boolean) => (
    <div className="ticker-track" aria-hidden={hidden || undefined}>
      {items.map((it, i) => (
        <div key={i}>{it}</div>
      ))}
    </div>
  );
  return (
    <div className={`ticker${reverse ? " reverse" : ""}`} style={{ ["--speed" as string]: `${speed}s` }}>
      {track(false)}
      {track(true)}
    </div>
  );
}
