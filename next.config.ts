import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cactusmoving.com.br"], // Permite imagens do domínio
  },
  output: "export", // Configura o Next.js para exportação estática
  basePath: "", // Use se o app estiver em um subdiretório
  assetPrefix: "", // Use se os assets estiverem em um CDN ou subdiretório
};

export default nextConfig;