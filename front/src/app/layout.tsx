import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { ProjectQueryClientProvider } from "@/app/_utils/projectQueryClientProvider";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import MainStructure from "@/app/_components/mainStructure";
import { Toaster } from "@/components/ui/toaster";
import { getGlobal } from "@/app/_queries/websiteInfo";

const { global: global } = await getGlobal();

export const metadata: Metadata = {
  title: global?.siteName ?? "Микрозаймы",
  description: global?.siteDescription ?? "",
  keywords:
    "микрозаймы, микрокредиты, быстрые займы, финансовое сравнение, лучшие ставки по займам",

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  appleWebApp: { title: global?.siteName ?? "Микрозаймы" },

  openGraph: {
    title: global?.motto ?? global?.siteName ?? "Микрозаймы",
    description: global?.siteDescription ?? "",
    url: "https://cash.monster",
    siteName: global?.siteName ?? "Микрозаймы",
    images: [
      {
        url: "https://cash.monster/images/cash.monster.webp",
        width: 1024,
        height: 1024,
        alt: global?.siteName,
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
};

const mainFont = localFont({
  src: [
    {
      path: "./_fonts/Montserrat/static/Montserrat-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./_fonts/Montserrat/static/Montserrat-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={cn(mainFont.className, "bg-background text-foreground")}>
        <ProjectQueryClientProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <MainStructure>{children}</MainStructure>
            <Toaster />
          </ThemeProvider>
        </ProjectQueryClientProvider>
      </body>
    </html>
  );
}
