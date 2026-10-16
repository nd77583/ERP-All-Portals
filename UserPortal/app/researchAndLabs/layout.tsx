import React from "react";
import Header from "../Components/ui/Header";
import Announcement from "../Components/ui/Announcement";
import Footer2 from "../Components/ui/Footer2";

interface ResearchLayoutProps {
  children: React.ReactNode;
}

export default function ResearchLayout({ children }: ResearchLayoutProps) {
  return (
    <div className="flex min-h-screen w-full min-w-0 bg-gray-100">


      {/* Main Content */}
      <main className="flex min-w-0 w-full flex-1 flex-col overflow-x-hidden">
        <Header />
        <Announcement />
        <div className="w-full min-w-0">{children}</div>
        <Footer2 />
      </main>
    </div>
  );
}
