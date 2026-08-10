import { type ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import Script from 'next/script';
import './globals.css';
import ClientAnalytics from '@/components/ClientAnalytics';
import SkipToContent from '@/components/SkipToContent';
import { generatePageMetadata } from '@/lib/generatePageMetadata';
import { APP_CONFIG } from '@/config/app.config';
import { geist } from '@/fonts/geist';
import { geistMono } from '@/fonts/geistMono';

export const generateMetadata = () => generatePageMetadata('page', null);

export default async function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	const locale = await getLocale();
	const messages = await getMessages({ locale });
	const htmlLang = locale || 'en';
	const GA_ID = APP_CONFIG.analytics.GA_ID;

	return (
		<html
			lang={htmlLang}
			className={`max-w-screen min-h-screen no-scrollbar overflow-x-hidden ${geist.variable} ${geistMono.variable}`}
		>
			<head>
				<Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy='afterInteractive' />
				<Script id='google-analytics' strategy='afterInteractive'>
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
			<body className='bg-scene grain font-sans text-ink-1 antialiased'>
				<NextIntlClientProvider locale={locale} messages={messages}>
					<SkipToContent />
					{children}
				</NextIntlClientProvider>
				<ClientAnalytics />
			</body>
		</html>
	);
}
