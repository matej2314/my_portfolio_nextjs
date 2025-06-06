import type { Metadata } from "next";
import { type ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: 'msliwowski.net | WebDev, SEO, Security',
  description: 'Webdev, SEO, Security'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="no-scrollbar bg-[#0c0c0c] scroll-smooth">
      <body
        id="#__next"
      >
        {children}
      </body>
    </html>
  );
}
