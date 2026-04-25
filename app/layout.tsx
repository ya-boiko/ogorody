import type { Metadata } from "next";
import localFont from "next/font/local";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/footer/Footer";
import "./styles/tokens.css";
import "./styles/sections-a.css";
import "./styles/sections-b.css";
import "./styles/sections-c.css";
import "./styles/catalog.css";

const manrope = localFont({
  src: [
    { path: "../public/fonts/Manrope-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Manrope-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/Manrope-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/Manrope-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Огороды — Свой урожай без дачной рутины",
    template: "%s — Огороды",
  },
  description:
    "Готовые участки в Краснодарском крае: рента, посадка, уход и контроль через приложение.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={manrope.variable}>
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
