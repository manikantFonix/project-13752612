import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  weight: ['400', '500', '600'],
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-archivo',
})

export const metadata: Metadata = {
  title: "CraftsmanAI",
  description: "Turn stock photographs into catalogs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${archivo.variable} antialiased`}
        style={{ fontFamily: "var(--font-archivo)" }}
      >
        {children}
      </body>
    </html>
  );
}