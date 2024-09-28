import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";

import { StatusBar } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';

// Check if the app is running on a native platform
if (Capacitor.getPlatform() !== 'web') {
  // Set the StatusBar overlay for native platforms
  StatusBar.setOverlaysWebView({ overlay: false });
}


const inter = Inter({
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter'
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="font-inter mt-[40px]">
      <body className={inter.className}>
        { children }
      </body>
    </html>
  );
}
