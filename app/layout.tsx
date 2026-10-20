import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DataProvider } from "@/context/DataContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PC Store — Official Healthcare & Perawatan Medis Indonesia",
  description:
    "Official Store jaringan cabang PC Store di Indonesia. Temukan produk perawatan berkualitas (Polifix, Policrepe) dan akses toko marketplace resmi kami di berbagai cabang.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F5F3FF] text-gray-900">
        <DataProvider>{children}</DataProvider>
      </body>
    </html>
  );
}
