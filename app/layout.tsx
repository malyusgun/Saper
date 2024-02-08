import type { Metadata } from "next";
import { Electrolize } from "next/font/google";
import "./globals.css";

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
        <main className="w-full h-full flex items-center justify-center p-8 bg-gradient-to-br from-yellow-300 to-blue-300">
          {children}
        </main>
      </body>
    </html>
  );
}
