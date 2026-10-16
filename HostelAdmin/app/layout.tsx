import type { Metadata } from "next";

import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import Footer from "@/components/footer";

import { Geist, Geist_Mono } from "next/font/google";

import { SidebarProvider } from "@/components/sidebar-context";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "School Management",
  description: "School Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="w-full min-h-screen flex flex-col">
        <SidebarProvider>
          {/* Navbar */}
          <Navbar />

          {/* Sidebar + Main */}
          <div className="app-layout">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="main-content">
              {children}

              {/* Footer */}
              <Footer />
            </main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
