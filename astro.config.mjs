import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ar"],
    fallback: {
      ar: "en",
    },
    routing: {
      prefixDefaultLocale: false,
      fallbackType: "rewrite",
    },
  },
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Noto Sans",
        cssVariable: "--font-sans",
        formats: ["woff2"],
        weights: ["400", "500", "600", "700"],
      },
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
