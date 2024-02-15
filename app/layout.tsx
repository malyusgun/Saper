import type { Metadata } from "next";
import { Electrolize } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";

const electrolize = Electrolize({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Saper",
  description: "Saper game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={electrolize.className}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
