import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Righteous } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import PageTransition from "./components/PageTransition";
import { TransitionProvider } from "./components/TransitionContext";

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
        <TransitionProvider>
          <div className="h-screen px-2 pt-6 pb-26 md:p-10 m-0">
            <div
              id="content-area"
              className="bg-background h-full rounded-2xl overflow-hidden flex flex-col items-center w-full justify-center border-4 md:border-8 border-background-base/50 relative"
            >
              <PageTransition>
                {children}
                {/* { !== "/projects" && <ConnectButton />} */}
              </PageTransition>
            </div>
          </div>

          <NavBar />
        </TransitionProvider>
      </body>
    </html>
  );
}
