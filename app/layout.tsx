import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Righteous } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import ClientLayout from "./components/ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-poppins",
});

const righteous = Righteous({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-righteous",
});

export const metadata: Metadata = {
  title: "Ankit Singh's Portfolio",
  description: "Portfolio v3 hosted by Ankit Singh",
  other: {
    Portfolio: "Ankit Singh's Portfolio",
    Version: "3.5",
    User: "ankitzm",
  },
  openGraph: {
    title: "Ankit Singh's Portfolio",
    description: "Portfolio v3 hosted by Ankit Singh",
    url: "https://ankitsingh.tech/",
    siteName: "Ankit Singh's Portfolio",
    images: [
      {
        url: "https://raw.githubusercontent.com/ankitzm/resume/main/preview.png",
        width: 1200,
        height: 630,
        alt: "Ankit Singh's Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ankit Singh's Portfolio",
    description: "Portfolio v3 hosted by Ankit Singh",
    creator: "@ankitzm",
    images: [
      "https://raw.githubusercontent.com/ankitzm/resume/main/preview.png",
    ],
  },
  icons: {
    icon: "/leaf.svg",
    apple: "/leaf.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${righteous.variable} antialiased bg-background-base h-screen overflow-hidden`}
      >
        <ClientLayout>{children}</ClientLayout>
        <Analytics />
      </body>
    </html>
  );
}
