"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { useSidebar } from "@/components/sidebar-context";

export default function Navbar() {
  const { toggleSidebar } = useSidebar();
  interface NotificationItem {
    id: string;
    title: string;
    message: string;
    time: string;
    read: boolean;
    tag?: string;
  }

  const [notifications, setNotifications] = React.useState<NotificationItem[]>([
    {
      id: "1",
      title: "Room Allocation",
      message: "Gurpreet Singh has been allotted Room 201 - Bed A.",
      time: "Just now",
      read: false,
      tag: "Hostel Matrix",
    },
    {
      id: "2",
      title: "Hostel Update",
      message: "Room 202 - Bed B is now available.",
      time: "10 minutes ago",
      read: false,
      tag: "Vacancy Alert",
    },
    {
      id: "3",
      title: "Out-Pass Approved",
      message: "Simranjit Kaur's digital out-pass has been approved.",
      time: "25 minutes ago",
      read: false,
      tag: "Biometric Pass",
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const hasUnread = unreadCount > 0;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const [showNotifications, setShowNotifications] = React.useState(false);
  const notificationRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!showNotifications) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showNotifications]);

  return (
    <AppBar
      position="static"
      className="navbar-appbar"
      sx={{
        width: "100%",
        minWidth: "100%",
        maxWidth: "100%",
        flexShrink: 0,
        backgroundColor: "#0F2744",
        backgroundImage: "none",
        boxShadow: "none",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        zIndex: 50,
      }}
    >
      <Box
        sx={{
          width: "100%",
          px: { xs: 1.5, sm: 2.5, lg: 3 },
          boxSizing: "border-box",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            width: "100%",
            minHeight: { xs: "56px", sm: "62px", lg: "70px" },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: { xs: 1, sm: 2 },
          }}
        >
          {/* ========================================================
              LEFT: SIDEBAR OPENER (SMALL SCREENS ONLY) + LOGO & NAME
              ======================================================== */}
          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 1.5 } }}>
            {/* BUTTON SHOULD BE IN SMALL SCREENS ONLY (hidden on lg / big screens) */}
            <IconButton
              color="inherit"
              aria-label="Toggle navigation menu"
              edge="start"
              onClick={toggleSidebar}
              sx={{
                display: { xs: "flex", lg: "none" },
                p: "6px",
                color: "#ffffff",
                border: "1px solid rgba(255, 255, 255, 0.25)",
                borderRadius: "8px",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.12)",
                  borderColor: "rgba(255, 255, 255, 0.4)",
                },
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </IconButton>

            {/* UNIVERSITY LOGO & COLLEGE NAME (VISIBLE ON ALL SCREENS NEXT TO SIDEBAR BUTTON) */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 1, sm: 1.5 },
              }}
            >
              <Link href="/" className="flex items-center no-underline">
                <Image
                  src="/university-logo.png"
                  alt="MBSPSU Patiala"
                  width={170}
                  height={46}
                  priority
                  className="h-[28px] sm:h-[34px] lg:h-[42px] w-auto object-contain shrink-0 cursor-pointer"
                />
              </Link>
              <Box
                sx={{
                  display: { xs: "none", sm: "flex" },
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography
                  component="div"
                  sx={{
                    color: "#ffffff",
                    fontSize: { sm: "12.5px", md: "13px", lg: "14px" },
                    fontWeight: 700,
                    letterSpacing: "0.5px",
                    lineHeight: 1.2,
                    whiteSpace: "nowrap",
                  }}
                >
                  MBSPSU PATIALA
                </Typography>
                <Typography
                  component="div"
                  sx={{
                    color: "#FE932C",
                    fontSize: { sm: "8.5px", md: "9.5px", lg: "10px" },
                    fontWeight: 600,
                    letterSpacing: "0.5px",
                    lineHeight: 1.2,
                    mt: "2px",
                    whiteSpace: "nowrap",
                  }}
                >
                  CAMPUS LIFE &amp; STUDENT SERVICES PORTAL
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* ========================================================
              CENTER: ACADEMIC YEAR & SYNC STATUS BADGES (BIG SCREENS)
              ======================================================== */}
          <Box
            sx={{
              display: { xs: "none", xl: "flex" },
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <div className="academic-year">
              <span className="status-dot"></span>
              <span>AY 2025-26</span>
            </div>

            <div className="sync-status">
              <span>◉</span>
              <span>RFID &amp; Hostel Sync: Online</span>
            </div>
          </Box>

          {/* ========================================================
              RIGHT: NOTIFICATION + DESIGNATION + PROFILE PICTURE
              ======================================================== */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1.2, sm: 2, lg: 2.5 },
            }}
          >
            {/* NOTIFICATION BUTTON */}
            <Box
              ref={notificationRef}
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconButton
                onClick={() => setShowNotifications(!showNotifications)}
                aria-label={
                  hasUnread
                    ? `${unreadCount} Unread Notifications`
                    : "Statutory Notifications"
                }
                title={
                  hasUnread
                    ? `${unreadCount} Unread Statutory Notifications`
                    : "Statutory Notifications (All Read)"
                }
                sx={{
                  p: "6px",
                  bgcolor: "transparent",
                  borderRadius: "8px",
                  color: "#ffffff",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.12)",
                    transform: "scale(1.05)",
                  },
                }}
              >
                <div className="relative flex items-center justify-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[21px] h-[21px] sm:w-[23px] sm:h-[23px] text-white transition-transform duration-200"
                  >
                    <path
                      d="M12 2C10.9 2 10 2.9 10 4V4.3C7.1 5.2 5 7.8 5 11V16L3 18V19H21V18L19 16V11C19 7.8 16.9 5.2 14 4.3V4C14 2.9 13.1 2 12 2Z"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 20C10 21.1 10.9 22 12 22C13.1 22 14 21.1 14 20"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {hasUnread && (
                      <circle
                        cx="18.5"
                        cy="5.5"
                        r="3.8"
                        fill="#FE932C"
                        stroke="#0F2744"
                        strokeWidth="2.2"
                      />
                    )}
                  </svg>
                </div>
              </IconButton>

              {/* NOTIFICATION POPUP */}
              {showNotifications && (
                <div className="absolute top-[44px] right-0 z-[9999] w-[330px] max-w-[calc(100vw-32px)] overflow-hidden rounded-lg border border-[#d9e0e8] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.2)]">
                  {/* POPUP HEADER */}
                  <div className="flex h-[45px] items-center justify-between bg-[#102d4d] px-4 text-white">
                    <div className="flex items-center gap-2">
                      <span className="text-[13.5px] font-bold">
                        Statutory Notifications
                      </span>
                      {hasUnread && (
                        <span className="bg-[#FE932C] text-[#663500] text-[10px] font-extrabold px-1.5 py-0.2 rounded-full leading-tight">
                          {unreadCount} New
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {hasUnread && (
                        <button
                          type="button"
                          onClick={markAllAsRead}
                          className="text-[11px] text-[#FE932C] hover:underline font-semibold cursor-pointer border-0 bg-transparent p-0"
                          title="Mark all notifications as read"
                        >
                          Mark all read
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setShowNotifications(false)}
                        className="border-0 bg-transparent p-0 text-[20px] leading-none text-white cursor-pointer hover:opacity-80"
                        aria-label="Close notifications"
                      >
                        ×
                      </button>
                    </div>
                  </div>

                  {/* NOTIFICATION ITEMS LIST */}
                  <div className="max-h-[320px] overflow-y-auto text-left divide-y divide-[#e5e9ee]">
                    {notifications.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => markAsRead(item.id)}
                        className={`px-4 py-3 transition-colors cursor-pointer ${
                          !item.read
                            ? "bg-[#f4f8ff] hover:bg-[#eaf1fc]"
                            : "bg-white hover:bg-[#f8fafc]"
                        }`}
                        title={item.read ? "Read notification" : "Click to mark as read"}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <div className="flex items-center gap-1.5 min-w-0">
                            {!item.read && (
                              <span
                                className="w-2 h-2 rounded-full bg-[#FE932C] shrink-0"
                                title="Unread"
                              />
                            )}
                            <span
                              className={`text-[12.5px] truncate ${
                                !item.read
                                  ? "font-bold text-[#102d4d]"
                                  : "font-semibold text-[#475569]"
                              }`}
                            >
                              {item.title}
                            </span>
                          </div>
                          {item.tag && (
                            <span className="text-[9.5px] font-bold text-[#64748b] bg-[#e2e8f0] px-1.5 py-0.5 rounded shrink-0">
                              {item.tag}
                            </span>
                          )}
                        </div>

                        <div
                          className={`text-[12px] leading-5 ${
                            !item.read ? "text-[#334155]" : "text-[#64748b]"
                          }`}
                        >
                          {item.message}
                        </div>

                        <div className="mt-1 flex items-center justify-between text-[10px] text-[#8a96a3]">
                          <span>{item.time}</span>
                          <span className="text-[10px] font-medium text-[#00664f]">
                            {!item.read ? "Click to mark read" : "✓ Read"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* POPUP FOOTER */}
                  <div className="px-4 py-2 bg-[#f8fafc] border-t border-[#e2e8f0] flex items-center justify-between text-[11px] text-[#64748b]">
                    <span>
                      {unreadCount === 0
                        ? "All notifications read"
                        : `${unreadCount} of ${notifications.length} unread`}
                    </span>
                    {hasUnread && (
                      <button
                        type="button"
                        onClick={markAllAsRead}
                        className="text-[11px] font-bold text-[#102d4d] hover:underline cursor-pointer border-0 bg-transparent p-0"
                      >
                        Clear All Unread
                      </button>
                    )}
                  </div>
                </div>
              )}
            </Box>

            {/* DESIGNATION (VISIBLE ON BIG SCREENS ONLY) -> NAVIGATES TO ADMIN PROFILE */}
            <Link
              href="/profile"
              className="no-underline hidden lg:flex flex-col items-end text-right cursor-pointer group"
              style={{ textDecoration: "none" }}
            >
              <Typography
                component="div"
                sx={{
                  color: "#ffffff",
                  fontSize: { md: "11.5px", lg: "12px" },
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  lineHeight: 1.2,
                  transition: "color 0.2s ease",
                  "&:hover": { color: "#FE932C" },
                }}
              >
                Prof. (Dr.) Executive VC / Dean
              </Typography>
              <Typography
                component="div"
                sx={{
                  color: "#FE932C",
                  fontSize: { md: "9px", lg: "9.5px" },
                  fontWeight: 700,
                  letterSpacing: "0.4px",
                  whiteSpace: "nowrap",
                  lineHeight: 1.2,
                  mt: "2px",
                }}
              >
                APEX ADMINISTRATIVE AUTHORITY
              </Typography>
            </Link>

            {/* PROFILE PICTURE WITH GOLD BORDER -> NAVIGATES TO ADMIN PROFILE */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Admin Profile (Executive VC / Dean)">
                <Link
                  href="/profile"
                  className="flex items-center no-underline cursor-pointer"
                  style={{ textDecoration: "none" }}
                >
                  <Avatar
                    alt="Prof. (Dr.) Executive VC / Dean"
                    src="/profile.jpg"
                    sx={{
                      width: { xs: 34, sm: 38, lg: 42 },
                      height: { xs: 34, sm: 38, lg: 42 },
                      border: "2px solid #d6a756",
                      bgcolor: "#d6a756",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        transform: "scale(1.06)",
                        boxShadow: "0 0 0 3px rgba(214, 167, 86, 0.4)",
                      },
                    }}
                  />
                </Link>
              </Tooltip>
            </Box>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
}
