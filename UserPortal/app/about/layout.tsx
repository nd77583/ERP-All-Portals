import React from "react";
import Header from "../Components/ui/Header";
import Footer2 from "../Components/ui/Footer2";
import Announcement from "../Components/ui/Announcement";

interface AboutLayoutProps {
  children: React.ReactNode;
}

export default function AboutLayout({ children }: AboutLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Content */}
      <main className="min-w-0 w-full flex-1 overflow-auto">
        <Header />
        <Announcement />
        <div className="w-full min-w-0">{children}</div>
        <Footer2 />
      </main>
    </div>
  );
}
