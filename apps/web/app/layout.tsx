import { outfit } from "@/utils/fonts";
import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/common/Navbar";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Bisyam",
  description:
    "Whether you're catching up with old pals or staying connected with loved ones, Bisyam provides a seamless and secure way to chat, share, and stay in touch",
  viewport: { initialScale: 1, width: "device-width" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={outfit.className}
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
