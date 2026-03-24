import type { Metadata, Viewport } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#020510",
};

export const metadata: Metadata = {
  title: "badhope's Starbase | Full-Stack Developer & AI Explorer",
  description:
    "Welcome to badhope's Starbase — A cosmic hub showcasing full-stack development, AI exploration, and creative coding. Built with Next.js, TypeScript, and Three.js.",
  keywords: [
    "badhope",
    "Starbase",
    "full-stack developer",
    "AI explorer",
    "portfolio",
    "Next.js",
    "TypeScript",
    "Three.js",
    "web development",
    "前端开发",
    "全栈开发",
    "AI探索",
  ],
  authors: [{ name: "badhope" }],
  creator: "badhope",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    alternateLocale: "en_US",
    title: "badhope's Starbase",
    description: "Full-Stack Developer & AI Explorer | 用代码构建星辰大海",
    siteName: "badhope's Starbase",
  },
  twitter: {
    card: "summary_large_image",
    title: "badhope's Starbase",
    description: "Full-Stack Developer & AI Explorer",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;800;900&family=Share+Tech+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased noise-overlay">
        <Providers />
        {children}
      </body>
    </html>
  );
}
