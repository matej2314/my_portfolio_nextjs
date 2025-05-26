import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: 'msliwowski.net | WebDev, SEO, Security',
  description: 'Webdev, SEO, Security'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="no-scrollbar bg-[#0c0c0c] scroll-smooth">
      <body
      >
        {children}
      </body>
    </html>
  );
}
