import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return { name: "Resplandece Mujer", short_name: "Resplandece", description: "Fe, propósito y bienestar para la vida cotidiana.", start_url: "/", display: "standalone", background_color: "#f8f2e9", theme_color: "#3c211b", lang: "es", icons: [{ src: "/assets/logo.png", sizes: "512x512", type: "image/png" }] };
}
