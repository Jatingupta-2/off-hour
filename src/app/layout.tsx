import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/plus-jakarta-sans";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "OFFHOUR — Wear your own time.", template: "%s | OFFHOUR" },
  description:
    "Explore OFFHOUR's wardrobe of minimal streetwear. Find your own rhythm. Wear your own time.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" data-theme="grey">
      <body className="flex min-h-dvh flex-col antialiased">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" className="flex flex-1 flex-col">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
