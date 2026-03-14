import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "List of Billionaires | World's Richest People 2026",
  description: "Comprehensive list of the world's billionaires with rankings, net worth, industries, and profiles. Discover who are the richest people in the world.",
  keywords: [
    "billionaires",
    "richest people",
    "net worth",
    "wealth rankings",
    "top billionaires 2026"
  ],
  authors: [{ name: "List of Billionaires" }],
  creator: "List of Billionaires",
  publisher: "List of Billionaires",
  openGraph: {
    title: "List of Billionaires | World's Richest People 2026",
    description: "Explore the complete list of billionaires with detailed profiles, rankings, and wealth data.",
    url: "https://www.list-of-billionaires.com",
    siteName: "List of Billionaires",
    images: [
      {
        url: "https://www.list-of-billionaires.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "World's Billionaires List",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "List of Billionaires | World's Richest People 2026",
    description: "Comprehensive rankings of the world's richest billionaires.",
    images: ["https://www.list-of-billionaires.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.list-of-billionaires.com",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
