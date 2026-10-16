import React from "react";
import Header from "../Components/ui/Header";
import Footer from "../Components/ui/Footer";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-100">


      {/* Main Content */}
      <main className="min-w-0 w-full flex-1 overflow-auto">
        <Header />
        <div>{children}</div>
        <Footer />
      </main>
    </div>
  );
}
