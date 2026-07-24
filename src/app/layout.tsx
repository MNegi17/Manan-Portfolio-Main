import type { Metadata } from "next";
import { Syne, IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";
import { CursorProvider } from "@/src/context/CursorContext";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fontDisplay = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["700", "800"],
  display: "swap",
});

const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MANAN — Data Analyst, Business Analyst & Automation Engineer",
  description:
    "Ultra-premium portfolio for Manan, specializing in data analytics, business intelligence, Python automation, and predictive machine learning models.",
  keywords: [
    "Manan",
    "Data Analyst",
    "Business Analyst",
    "Automation Engineer",
    "Power BI",
    "Python",
    "SQL",
    "Portfolio",
  ],
  authors: [{ name: "Manan" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable} dark`}
    >
      <body className="bg-background text-foreground antialiased selection:bg-white selection:text-black">
        <CursorProvider>{children}</CursorProvider>
      </body>
    </html>
  );
}
