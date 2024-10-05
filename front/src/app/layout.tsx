import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { ProjectQueryClientProvider } from "@/app/_utils/projectQueryClientProvider";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import MainStructure from "@/app/_components/mainStructure";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const mainFont = localFont(
  { src: './_fonts/Montserrat/Montserrat-VariableFont_wght.ttf', style: 'normal' })

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
        <MainStructure>
          {children}
        </MainStructure>
      </ThemeProvider>
    </ProjectQueryClientProvider>
    </body>
    </html>
  );
}
