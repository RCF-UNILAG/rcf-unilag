import type { Metadata } from "next";
import { Geist_Mono, Plus_Jakarta_Sans, Syne } from "next/font/google";
import "./globals.css";
import "./cabinet-grotesk.css";
import { Footer } from "../components/footer";
import { Navigation } from "../components/navigation";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RCF UNILAG | The Chosen Generation",
  description:
    "RCF, One Family. We are passionate about our members and provide a place to grow, in faith and other areas. We are a people of THE WORD. Every month, we have a Bible Study Reading Plan, to help our members grow in the knowledge of the Word, and to apply this Word in",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.variable} ${geistMono.variable} ${syne.variable} antialiased`}
      >
        <div>
          <header className="fixed top-0 left-0 w-full z-99">
            <Navigation />
          </header>
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
