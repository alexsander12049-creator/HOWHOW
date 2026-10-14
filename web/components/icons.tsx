// Ícones de traço fino no estilo da referência.
type P = { color?: string; className?: string };

export function Sparkle({ color = "#000", className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M14.98 14.98 12.7 21.26a.75.75 0 0 1-1.41 0L9.02 14.98 2.74 12.7a.75.75 0 0 1 0-1.41L9.02 9.02l2.28-6.28a.75.75 0 0 1 1.41 0l2.28 6.28 6.28 2.28a.75.75 0 0 1 0 1.41Z"
        fill={color}
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Check({ color = "#000", className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="12" cy="12" r="10" fill={color} fillOpacity="0.16" />
      <path d="M8 13l3 3 5-7M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Tick({ color = "#fff", className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Cross({ color = "#000", className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden style={{ transform: "rotate(45deg)" }}>
      <path d="M6 12h12M12 18V6" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Plus({ color = "#fff", className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 5v14M5 12h14" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Heart({ color = "#000", className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M16.55 3.08c2.2 0 4.19 1.33 5.03 3.37a5.45 5.45 0 0 1-1.18 5.94l-8.36 8.36-8.4-8.4A5.45 5.45 0 1 1 11.4 4.68l.65.65.66-.65a5.43 5.43 0 0 1 3.84-1.6"
        fill={color}
        fillOpacity="0.16"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Bolt({ color = "#000", className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M15 1.5 13.5 9l6 2.25L9 22.5l1.5-7.5-6-2.25Z" fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function Star({ color = "#ff4d00", className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 17.73l5.13 3.15a.75.75 0 0 0 1.12-.81l-1.4-5.89 4.57-3.94a.75.75 0 0 0-.43-1.31l-5.99-.49-2.3-5.59a.75.75 0 0 0-1.4 0L8.97 8.44l-5.99.49a.75.75 0 0 0-.43 1.31l4.57 3.94-1.4 5.89a.75.75 0 0 0 1.12.81Z" fill={color} />
    </svg>
  );
}

export function Instagram({ color = "#000", className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="2" />
      <circle cx="12" cy="12" r="4" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="17.3" cy="6.7" r="1.2" fill={color} />
    </svg>
  );
}

export function Play({ color = "#000", className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M7 4.5v15l12-7.5Z" fill={color} fillOpacity="0.16" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

// Ícones dos recursos
export function IconProfile({ color = "#000", className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="3" fill={color} fillOpacity="0.16" />
      <rect x="3" y="3" width="18" height="18" rx="3" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="12" cy="10" r="3" fill="none" stroke={color} strokeWidth="2" />
      <path d="M7 18c1-2.5 3-3.5 5-3.5s4 1 5 3.5" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
export function IconSearch({ color = "#000", className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="10.5" cy="10.5" r="7" fill={color} fillOpacity="0.16" stroke={color} strokeWidth="2" />
      <path d="M16 16l5 5" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
export function IconMega({ color = "#000", className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M3 10v4a1 1 0 0 0 1 1h3l8 5V4L7 9H4a1 1 0 0 0-1 1Z" fill={color} fillOpacity="0.16" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <path d="M19 9a4 4 0 0 1 0 6" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
export function IconCalendar({ color = "#000", className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="3" fill={color} fillOpacity="0.16" stroke={color} strokeWidth="2" />
      <path d="M3 10h18M8 3v4M16 3v4" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
export function IconWallet({ color = "#000", className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="2.5" y="5" width="19" height="15" rx="3" fill={color} fillOpacity="0.16" stroke={color} strokeWidth="2" />
      <path d="M16 12.5h2M2.5 9h19" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
