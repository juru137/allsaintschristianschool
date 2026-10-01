import type { Metadata } from "next";
import { SITE } from "./constants";
import "./globals.css";

export const metadata: Metadata = {
  title: SITE.name,
  description: SITE.description,
  icons: {
    icon: SITE.logos.icon,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}