import { type VitePWAOptions } from "vite-plugin-pwa";

export const pwaOptions: Partial<VitePWAOptions> = {
  registerType: "prompt",
  manifest: {
    name: "Planet List",
    short_name: "SWPL",
    description: "Planet list using SWAPI",
    icons: [
      {
        src: "icons/manifest-icon-192.maskable.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "icons/manifest-icon-192.maskable.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable"
      },
      {
        src: "icons/manifest-icon-512.maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "icons/manifest-icon-512.maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      }
    ],
    theme_color: "#090a0f",
    background_color: "#1b2735",
    display: "standalone",
    scope: "/PlanetList",
    start_url: "/PlanetList",
    orientation: "landscape"
  }
};
