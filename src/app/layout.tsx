import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  Caveat,
  Courier_Prime,
  Hanken_Grotesk,
} from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MotionProvider } from "@/components/reveal";
import { ConsoleEgg } from "@/components/console-egg";
import { SmoothScroll } from "@/components/smooth-scroll";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  variable: "--font-bricolage",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
});

const courier = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-courier",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: "Ankit Singh — Ships Software",
  description:
    "Software developer shipping web3 products, SDKs and interfaces since 2021.",
};

export const viewport: Viewport = {
  themeColor: "#fef9ec",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${hanken.variable} ${courier.variable} ${caveat.variable} antialiased`}
    >
      <body className="font-sans">
        <MotionProvider>
          <SmoothScroll />
          <ConsoleEgg />
          <Header />
          {children}
          <Footer />
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
