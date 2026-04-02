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
  metadataBase: new URL("https://eventhive.app"),
  title: {
    default: "EventHive — Premium Event Management Platform",
    template: "%s | EventHive",
  },
  description: "Create stunning events, manage attendees effortlessly, and grow your community with EventHive's all-in-one platform. Free to start, powerful to scale.",
  keywords: ["events", "event management", "RSVP", "attendee management", "event hosting"],
  alternates: {
    canonical: "/",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "EventHive — Premium Event Management Platform",
    description: "Create stunning events, manage attendees effortlessly, and grow your community with EventHive.",
    url: "https://eventhive.app",
    siteName: "EventHive",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "EventHive — Premium Event Management Platform",
    description: "Create stunning events, manage attendees effortlessly, and grow your community with EventHive.",
    creator: "@eventhive",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#6366f1" />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} ${geistMono.variable} min-h-dvh bg-background text-foreground antialiased transition-smooth`}
      >
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
