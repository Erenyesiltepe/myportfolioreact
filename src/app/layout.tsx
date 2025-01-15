import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eren Yesiltepe",
  description: "Eren Yesiltepe's personal website",
  icons: {
    icon: [
      { url: '/logo.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/logo.ico', sizes: 'any' }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased scrollbar`}
      >
        {children}
      </body>
    </html>
  );
}
