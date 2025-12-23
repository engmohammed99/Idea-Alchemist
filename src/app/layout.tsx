import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Idea Alchemist",
  description: "Transform your website ideas into architectural blueprints.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-slate-950 text-slate-100 selection:bg-indigo-500/30 overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
