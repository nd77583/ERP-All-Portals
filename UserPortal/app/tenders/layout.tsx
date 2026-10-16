import React from "react";
import Header from "../Components/ui/Header";
import Footer from "../Components/ui/Footer2";
import Announcement from "../Components/ui/Announcement";

interface TendersLayoutProps {
  children: React.ReactNode;
}

export default function TendersLayout({ children }: TendersLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-100">


      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Header />
        <Announcement />
        <div>{children}</div>
        <Footer />
      </main>
    </div>
  );
}
