"use client";

import { useEffect, useState } from "react";
import Snowfall from "react-snowfall";
import NavBar from "./NavBar";
import PageTransition from "./PageTransition";
import { TransitionProvider } from "./TransitionContext";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [snowflakeCount, setSnowflakeCount] = useState(0); // Start with 0 to avoid hydration mismatch

  useEffect(() => {
    // Only run on client
    const snowflake0 = document.createElement("img");
    snowflake0.src = "/snowflake-0.svg";
    setImages([snowflake0]);

    const updateSnowflakeCount = () => {
      setSnowflakeCount(window.innerWidth > 768 ? 50 : 20);
    };

    updateSnowflakeCount();
    window.addEventListener("resize", updateSnowflakeCount);

    return () => window.removeEventListener("resize", updateSnowflakeCount);
  }, []);

  return (
    <>
      {images.length > 0 && (
        <Snowfall
          snowflakeCount={snowflakeCount}
          style={{ zIndex: 1000 }}
          radius={[10, 20]}
          speed={[0.5, 1.5]}
          images={images}
        />
      )}
      <TransitionProvider>
        <div className="h-screen px-2 pt-6 pb-26 md:p-10 m-0">
          <div
            id="content-area"
            className="bg-background h-full rounded-2xl overflow-hidden flex flex-col items-center w-full justify-center border-4 md:border-8 border-background-base/50 relative"
          >
            <PageTransition>{children}</PageTransition>
          </div>
        </div>

        <NavBar />
      </TransitionProvider>
    </>
  );
}

