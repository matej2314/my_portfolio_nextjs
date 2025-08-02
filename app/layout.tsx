import { type ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import Script from "next/script";
import "./globals.css";
import ClientAnalytics from "@/components/ClientAnalytics";
import { generatePageMetadata } from "@/lib/generatePageMetadata";
import { APP_CONFIG } from "@/config/app.config";

export const generateMetadata = () => generatePageMetadata('page', null);

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {

  const locale = await getLocale();
  const htmlLang = locale || 'en';
  const GA_ID = APP_CONFIG.analytics.GA_ID;

  return (
    <html lang={htmlLang} className="max-w-screen min-h-screen no-scrollbar bg-[#0c0c0c] scroll-smooth overflow-x-hidden">
      <head>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
             window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body>
        <NextIntlClientProvider locale={locale}>
          {children}
        </NextIntlClientProvider>
        <ClientAnalytics />
      </body>
    </html>
  );
}
