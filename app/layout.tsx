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
          <StoreProvider>
            <main className="w-full h-full flex items-center justify-center max-sm:p-4 p-8 bg-gradient-to-br from-green-300 to-blue-400">
              {children}
            </main>
          </StoreProvider>
        </body>
    </html>
  );
}
