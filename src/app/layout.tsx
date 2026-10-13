import type { Metadata } from "next";
import { Fraunces, Inter_Tight } from "next/font/google";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { MagneticCursor } from "@/components/cursor/magnetic-cursor";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mabera International",
  description: "Martin Mabera — software engineer: pension platforms, AI/ML, trading systems, SaaS.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${interTight.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-charcoal text-bone">
        <MagneticCursor />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
