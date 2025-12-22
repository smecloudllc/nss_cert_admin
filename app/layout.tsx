import AppThemeProvider from "@/providers/theme-provider";
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import { ProgressBarProvider } from "@/providers/next-progress-bar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NSS - Certificate Admin",
  description: "NSS - Certificate Admin",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet, noimageindex",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="robots"
          content="noindex, nofollow, noarchive, nosnippet, noimageindex"
        />
        <meta
          name="googlebot"
          content="noindex, nofollow, noarchive, nosnippet, noimageindex"
        />
        <meta
          name="bingbot"
          content="noindex, nofollow, noarchive, nosnippet, noimageindex"
        />
        <meta
          name="slurp"
          content="noindex, nofollow, noarchive, nosnippet, noimageindex"
        />
        <meta
          name="baiduspider"
          content="noindex, nofollow, noarchive, nosnippet, noimageindex"
        />
        <meta
          name="yandex"
          content="noindex, nofollow, noarchive, nosnippet, noimageindex"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-white font-medium  dark:bg-neutral-950 font-sans antialiased dark:text-neutral-50 text-neutral-800 scrollbar`}
      >
        <ProgressBarProvider>
          <AppThemeProvider>
            <Toaster closeButton={true} position="top-center" />
            {children}
          </AppThemeProvider>
        </ProgressBarProvider>
      </body>
    </html>
  );
}
