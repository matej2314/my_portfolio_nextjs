import type { Metadata } from "next";
import { type ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import "./globals.css";

export const metadata: Metadata = {
  title: 'msliwowski.net | WebDev, SEO, Security',
  description: 'Webdev, SEO, Security'
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {

  const locale = await getLocale();

  return (
    <html lang={locale} className="no-scrollbar bg-[#0c0c0c] scroll-smooth">
      <body
        id="#__next"
      >
        <NextIntlClientProvider locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
