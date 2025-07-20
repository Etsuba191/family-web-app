import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Family App PWA",
    short_name: "FamilyApp",
    description: "A Progressive Web App for family management",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#5f0113", // Dark red/maroon for theme
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon-maskable-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  }
}
