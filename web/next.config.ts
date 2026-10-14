import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Imagens e vídeos da landing (public/howhow) ficam 1 dia no cache do navegador e são
  // revalidados em segundo plano por mais 7 dias: quem volta ao site não baixa tudo de novo.
  async headers() {
    return [
      {
        source: "/howhow/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ];
  },
};

export default nextConfig;
