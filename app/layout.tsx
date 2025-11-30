import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import BackgroundController from "./components/BackgroundController";

export const metadata: Metadata = {
  title: "Tarım Bilgi ve Bitki Tanı Sistemi",
  description: "Türkiye için ticari bitki haritası ve bitki tanıma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className="antialiased">
        <Providers>
          <BackgroundController />
          {children}
        </Providers>
      </body>
    </html>
  );
}
