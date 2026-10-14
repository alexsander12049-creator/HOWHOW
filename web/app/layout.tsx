import type { Metadata, Viewport } from "next";
import { Manrope, Russo_One } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });
// Russo One é a fonte do logotipo (manual de identidade novo).
const russo = Russo_One({ variable: "--font-russo", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Howhow — Creator marketing que faz sua marca crescer",
  description:
    "Plataforma de creator marketing que conecta marcas, creators e agências num único ambiente: campanha, candidaturas, entregas, pagamento e resultado.",
  icons: { icon: "/howhow/foguete.png" },
};

export const viewport: Viewport = { themeColor: "#f2f2f2" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} ${russo.variable}`}>
      <body>{children}</body>
    </html>
  );
}
