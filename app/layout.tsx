
import { type Metadata } from "next";
import { type ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { headers } from "next/headers";
import "./globals.css";

export const metadata: Metadata = {
  title: 'msliwowski.net | WebDev, SEO, Security',
  description: 'Webdev, SEO, Security',
  icons: {
    icon: '/favicon.svg'
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {

  const nonce = (await headers()).get('x-csp-nonce') || ''
  const locale = await getLocale();
  const htmlLang = locale || 'en';

  return (
    <html suppressHydrationWarning={true} lang={htmlLang} className="max-w-screen min-h-screen no-scrollbar bg-[#0c0c0c] scroll-smooth overflow-x-hidden">
      <head>
        <script nonce={nonce} />
      </head>
      <body suppressHydrationWarning={true}>
        <NextIntlClientProvider locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
