import type { Metadata } from "next";
import localFont from "next/font/local";
import ContextProvider from '@/app/context'
import { headers } from "next/headers"; // added
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/SamuraiBlast.ttf",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/SamuraiBlast.ttf",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Merlion's Bloom",
  description: "Coin flip cycles game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookies = headers().get('cookie')
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <ContextProvider cookies={cookies}>{children}</ContextProvider>
      </body>
    </html>
  );
}
