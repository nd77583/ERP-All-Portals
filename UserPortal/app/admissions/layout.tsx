import React from "react";
import Header from "../Components/ui/Header";
import Footer from "../Components/ui/Footer2";
import Announcement from "../Components/ui/Announcement";

interface AdmissionsLayoutProps {
  children: React.ReactNode;
}

export default function AdmissionsLayout({ children }: AdmissionsLayoutProps) {
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
