import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReactNode } from "react";
import { cookies } from "next/headers";
import { locales, defaultLocale, type Locale } from "@/i18n/config";
import { LocaleProvider } from "@/lib/i18n-context";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value;
  return locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const baseUrl = "https://croma.aurora33.dev";

  return {
    title: locale === "en"
      ? "Croma - Image Compression Tool"
      : "Croma - Compresor de Imágenes",
    description: locale === "en"
      ? "Optimize your images for any project. Compress, resize, and convert to WebP, JPEG, or PNG"
      : "Optimiza tus imágenes para cualquier proyecto. Comprime, redimensiona y convierte a WebP, JPEG o PNG",
    openGraph: {
      title: locale === "en"
        ? "Croma - Image Compression Tool"
        : "Croma - Compresor de Imágenes",
      description: locale === "en"
        ? "Optimize your images for any project"
        : "Optimiza tus imágenes para cualquier proyecto",
      url: baseUrl,
      locale: locale,
      type: "website",
    },
    alternates: {
      canonical: baseUrl,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${baseUrl}?lang=${l}`])
      ),
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const locale = await getLocale();
  const messages = (await import(`@/i18n/locales/${locale}`)).default as any;

  return (
    <html lang={locale}>
      <head>
        {locales.map((l) => (
          <link
            key={l}
            rel="alternate"
            hrefLang={l}
            href={`https://croma.aurora33.dev?lang=${l}`}
          />
        ))}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LocaleProvider locale={locale} messages={messages}>
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
