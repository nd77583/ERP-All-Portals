"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/components/sidebar-context";

export default function Sidebar() {
  const { isOpen, closeSidebar, toggleSidebar } = useSidebar();
  const pathname = usePathname();

  return (
    <>
      {/* BACKDROP OVERLAY (small screens only, closes sidebar on tap outside) */}
      {isOpen && (
        <div
          className="sidebar-backdrop"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}


      {/* SIDEBAR ASIDE - FLOATS OVER CONTENT ON SMALL SCREENS, DOCKED ON BIG SCREENS */}
      <aside
        className={`sidebar ${isOpen ? "sidebar-open" : ""}`}
        aria-label="Campus Portals"
      >
        {/* MOBILE DRAWER HEADER (shows close button on small screens) */}
        <div className="sidebar-mobile-header">
          <div className="sidebar-mobile-brand">
            <span className="sidebar-brand-badge">MBSPSU</span>
            <span className="sidebar-brand-text">CAMPUS PORTALS</span>
          </div>
          <button
            type="button"
            className="sidebar-close-btn"
            onClick={closeSidebar}
            aria-label="Close Sidebar"
            title="Close Sidebar (Esc)"
          >
            ✕
          </button>
        </div>

        {/* SUITE F: CAMPUS LIFE */}
        <div className="sidebar-section">
          <div className="section-title">SUITE F: CAMPUS LIFE</div>
          <div className="section-subtitle">Residential & Athlete Services</div>
          <nav className="sidebar-menu">
            <Link
              href="/hostel"
              className={`sidebar-item ${pathname === "/hostel" ? "active" : ""}`}
              onClick={closeSidebar}
            >
              <span className="sidebar-icon">
                <img src="/Container1.png" alt="" />
              </span>
              <span>Hostel & Athlete Mess</span>
            </Link>

            <Link
              href="/library"
              className={`sidebar-item ${pathname === "/library" ? "active" : ""}`}
              onClick={closeSidebar}
            >
              <span className="sidebar-icon">
                <img src="/Container (1).png" alt="" />
              </span>
              <span>RFID Library Automation</span>
            </Link>

            <Link
              href="/transport"
              className={`sidebar-item ${pathname === "/transport" ? "active" : ""}`}
              onClick={closeSidebar}
            >
              <span className="sidebar-icon">
                <img src="/Container (2).png" alt="" />
              </span>
              <span>Fleet & GPS Transport</span>
            </Link>

            <Link
              href="/placement"
              className={`sidebar-item ${pathname === "/placement" ? "active" : ""}`}
              onClick={closeSidebar}
            >
              <span className="sidebar-icon">
                <img src="/Icon (1).png" alt="" />
              </span>
              <span>Placement & Career Hub</span>
            </Link>
          </nav>
        </div>

        {/* CROSS-SUITE PORTALS */}
        <div className="sidebar-section cross-suite">
          <div className="section-title">CROSS-SUITE PORTALS</div>

          <nav className="sidebar-menu">
            <Link
              href="/executive"
              className={`sidebar-item ${pathname === "/executive" ? "active" : ""}`}
              onClick={closeSidebar}
            >
              <span className="sidebar-icon">
                <img src="/Container (4).png" alt="" />
              </span>
              <span>Executive Command</span>
            </Link>

            <Link
              href="/academics"
              className={`sidebar-item ${pathname === "/academics" ? "active" : ""}`}
              onClick={closeSidebar}
            >
              <span className="sidebar-icon">
                <img src="/Container (5).png" alt="" />
              </span>
              <span>SIS & Academics</span>
            </Link>

            <Link
              href="/sports"
              className={`sidebar-item ${pathname === "/sports" ? "active" : ""}`}
              onClick={closeSidebar}
            >
              <span className="sidebar-icon">
                <img src="/Container (6).png" alt="" />
              </span>
              <span>Sports Science & Vault</span>
            </Link>
          </nav>
        </div>
      </aside>
    </>
  );
}
