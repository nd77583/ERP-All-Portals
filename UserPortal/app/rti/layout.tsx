import React from "react";
import Header from "../Components/ui/Header";
import Footer from "../Components/ui/Footer3";

interface RTILayoutProps {
  children: React.ReactNode;
}

export default function RTILayout({ children }: RTILayoutProps) {
  return (
    <div className="flex h-screen bg-gray-100">


      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Header />
        <div>{children}</div>
        <Footer />
      </main>
    </div>
  );
}
