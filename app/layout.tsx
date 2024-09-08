import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import AuthProvider from "./auth/Provider";
import NavBar from "./NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body>
          <NavBar />
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
