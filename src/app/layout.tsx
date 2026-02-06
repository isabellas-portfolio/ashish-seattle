import type { Metadata } from "next";
import { Cormorant_Garamond, Dancing_Script, Nunito_Sans } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const body = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const handwriting = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-handwriting",
});

export const metadata: Metadata = {
  title: "Seattle, with love",
  description: "A love letter + Seattle guide + long-distance date planner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${handwriting.variable}`}>
      <body className="min-h-screen font-body antialiased">
        {children}
      </body>
    </html>
  );
}
