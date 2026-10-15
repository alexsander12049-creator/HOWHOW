import type { SolutionIcon as Name } from "@/lib/content";

// Ícones de traço do menu "Soluções" e das notificações das páginas de marcas/agências (cor = currentColor).
const paths: Record<Name, React.ReactNode> = {
  brand: (
    <>
      <path d="M4 9.5 5.6 4h12.8L20 9.5" />
      <path d="M4 9.5a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0 2.7 2.7 0 0 0 5.3 0" />
      <path d="M5.5 12.5V20h13v-7.5M10 20v-4.5h4V20" />
    </>
  ),
  agency: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 19.5c.6-3.3 3-5.2 6-5.2s5.4 1.9 6 5.2" />
      <path d="M15.5 5.2a3 3 0 0 1 0 5.6M17.5 14.6c1.9.6 3.1 2.3 3.5 4.9" />
    </>
  ),
  video: (
    <>
      <rect x="6" y="3" width="12" height="18" rx="3" />
      <path d="m10.5 9.2 4 2.8-4 2.8Z" />
    </>
  ),
  coin: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M14.8 9.3c-.5-.9-1.5-1.4-2.8-1.4-1.6 0-2.7.8-2.7 2s1 1.7 2.7 2.1c1.7.4 2.8 1 2.8 2.2s-1.2 2-2.8 2c-1.4 0-2.5-.6-3-1.6M12 6.3v1.6M12 16.2v1.5" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20h16" />
      <path d="M6.5 16v-3.5M11 16V8.5M15.5 16v-5M20 16V5" />
    </>
  ),
  rocket: (
    <>
      <path d="M13.5 4.5c3-1.3 5.4-1 6-.4.6.6.9 3-.4 6l-5.3 5.3-5.2-5.2Z" />
      <path d="M8.6 10.2 5.2 9.7 3.5 11.4l4 1.5M13.8 15.4l.5 3.4-1.7 1.7-1.5-4" />
      <circle cx="15.3" cy="8.7" r="1.4" />
    </>
  ),
};

export default function SolutionIcon({ name }: { name: Name }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {paths[name]}
    </svg>
  );
}
