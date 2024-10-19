import "./globals.css";
import React from "react";
import { ProjectQueryClientProvider } from "@/app/_utils/projectQueryClientProvider";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import env from "@/app/_lib/env";
import Header from "@/app/_components/header";
import Footer from "@/app/_components/footer";
import { getGlobal } from "@/app/_queries/websiteInfo";
import { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { global: global } = await getGlobal();

  return {
    title: global?.siteName ?? "Микрозаймы",
    description: global?.siteDescription ?? "",
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

    keywords: [
      "микрозаймы",
      "быстрые займы",
      "онлайн кредиты",
      "микрокредиты",
      "финансовые услуги",
      "срочные займы",
      "займы без отказа",
      "кредиты онлайн",
      "мгновенные займы",
      "займы на карту",
      "финансовое сравнение",
      "лучшие ставки по займам",
    ],
    authors: [{ name: `${global?.siteName ?? "Микрозаймы"} Team` }],
    creator: global?.siteName ?? "Микрозаймы",
    publisher: global?.siteName ?? "Микрозаймы",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },

    openGraph: {
      type: "website",
      title: global?.motto ?? global?.siteName ?? "Микрозаймы",
      description: global?.siteDescription ?? "",
      url: `${env.NEXT_PUBLIC_URL}`,
      siteName: global?.siteName ?? "Микрозаймы",
      images: [
        {
          url: `${env.NEXT_PUBLIC_URL}/images/monster.square.jpg`,
          width: 1024,
          height: 1024,
          alt: global?.siteName,
        },
      ],
      locale: "ru_RU",
    },

    twitter: {
      card: "summary_large_image",
      site: global?.siteName,
      description: global?.siteDescription ?? "",
      images: `${env.NEXT_PUBLIC_URL}/images/monster.square.jpg`,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    alternates: {
      canonical: env.NEXT_PUBLIC_URL,
    },
  };
}

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { global: global } = await getGlobal();

  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={cn(mainFont.className, "bg-background text-foreground")}>
        <ProjectQueryClientProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Header global={global} />
            <main className="container mx-auto px-4 py-8">{children}</main>
            <Footer global={global} />
            <Toaster />
          </ThemeProvider>
        </ProjectQueryClientProvider>
      </body>
    </html>
  );
}
