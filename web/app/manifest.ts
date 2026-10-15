import type { MetadataRoute } from "next";

// Manifesto do site: nome e ícones que o celular usa nas abas, na tela de início e na troca de apps.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Howhow — Um exército de creators UGC para a sua marca",
    short_name: "Howhow",
    description: "Creators UGC criando conteúdo viral para a sua marca.",
    start_url: "/",
    display: "browser",
    background_color: "#f2f2f2",
    theme_color: "#f2f2f2",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
