import type { Metadata, Viewport } from "next";
import { Manrope, Russo_One } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });
// Russo One é a fonte do logotipo (manual de identidade novo).
const russo = Russo_One({ variable: "--font-russo", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Howhow — Um exército de creators UGC para a sua marca",
  description:
    "2.246 creators UGC criando conteúdo viral para a sua marca. Acompanhe as views de cada post em tempo real e pague por CPM. 7 dias grátis.",
  applicationName: "Howhow",
  appleWebApp: { title: "Howhow", statusBarStyle: "default" },
  // ícones pequenos para as abas do celular (o favicon.ico, o icon.png e o apple-icon.png vêm da pasta app/)
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = { themeColor: "#f2f2f2" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} ${russo.variable}`}>
      <body>{children}</body>
    </html>
  );
}
