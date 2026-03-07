import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";

import "./globals.css";

const glahoSylfaen = localFont({
  src: "./fonts/bpg_glaho_sylfaen.woff2",
  variable: "--font-primary",
  display: "swap",
});

export const metadata: Metadata = {
  title: "სარემონტო მომსახურება თბილისში",
  description:
    "საიმედო სარემონტო მომსახურება, ინტერიერის დიზაინი და ავეჯის დამზადება",
  openGraph: {
    title: "სარემონტო მომსახურება თბილისში",
    description:
      "საიმედო სარემონტო მომსახურება, ინტერიერის დიზაინი და ავეჯის დამზადება",
    url: "https://comfortprogeorgia.webuild.ge",
    type: "website",
    images: [
      {
        url: "/assets/images/og-comfortprogeorgia.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ka">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${glahoSylfaen.variable} font-primary antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
