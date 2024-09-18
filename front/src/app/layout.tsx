import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { Provider } from "@/app/_utils/provider";
import localFont from "next/font/local";

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
    <html lang="en">
    <body className={mainFont.className}>
    <Provider>
      {children}
    </Provider>
    </body>
    </html>
  );
}
