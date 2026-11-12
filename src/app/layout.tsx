import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
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
import { getProjects } from "@/lib/data";
import { SpeedInsights } from "@vercel/speed-insights/next"

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  display: "swap",
  variable: "--font-bricolage",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  // Body text only, never above the fold: don't compete with the h1 font.
  preload: false,
  display: "swap",
  variable: "--font-hanken",
});

const courier = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-courier",
});

export const metadata: Metadata = {
  title: "Ankit Singh — Software Developer & DevRel",
  description:
    "Software developer and DevRel building web3 products, SDKs and interfaces since 2021. Open to freelance and full-time work.",
};

export const viewport: Viewport = {
  themeColor: "#f6edd6",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const projects = await getProjects();
  return (
    <html
      lang="en"
      className={`paper-page ${bricolage.variable} ${hanken.variable} ${courier.variable} antialiased`}
    >
      <body className="font-sans">
        <SpeedInsights />
        <MotionProvider>
          <SmoothScroll />
          <ConsoleEgg />
          <Header projectCount={projects.length} />
          {children}
          <Footer />
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
