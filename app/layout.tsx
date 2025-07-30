// app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "CryptoClarity MVP",
  description: "Preverjanje kripto projektov",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="sl">
      <body>{children}</body>
    </html>
  );
}
