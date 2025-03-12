import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StrateGem",
  description: "A project definition tool",
  authors: {
    name: 'Charles Kahuho',
    url: 'https://github.com/Alaric-senpai'
  },
  keywords: ['projects', 'coding', 'inspiration', 'NExt JS', 'React'],
  creator: 'Charles Kahuho',
  applicationName: 'StrateGem'

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>

        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-slate-900 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-950 via-blue-950/90 to-black w-full`}
          >
            {children}
          </body>
        </html>

    </ClerkProvider>
  );
}
