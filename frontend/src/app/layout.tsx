import type { Metadata } from "next";
import { DM_Sans, Unbounded } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MeetBot",
  description: "MeetBot - Votre assistant de réunion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${dmSans.variable} ${unbounded.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
