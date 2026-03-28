import type { Metadata } from "next";
import { Inter, Outfit, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://eventforge.app"),
  title: {
    default: "EventForge",
    template: "%s | EventForge",
  },
  description: "Forge experiences, grow communities, and run events that leave a mark.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "EventForge",
    description: "Forge experiences, grow communities, and run events that leave a mark.",
    url: "https://eventforge.app",
    siteName: "EventForge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EventForge",
    description: "Forge experiences, grow communities, and run events that leave a mark.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${outfit.variable} ${geistMono.variable} min-h-dvh bg-background text-foreground antialiased`}
      >
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
