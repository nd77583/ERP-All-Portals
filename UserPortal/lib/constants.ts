// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Constants for the application
export const SPORTS_LIST = [
  "Basketball",
  "Football",
  "Volleyball",
  "Tennis",
  "Swimming",
  "Track & Field",
  "Badminton",
  "Table Tennis",
  "Cricket",
  "Hockey",
];

export const USER_ROLES = ["Admin", "Manager", "Coordinator", "Coach"];

export const EVENT_STATUS = [
  "Upcoming",
  "Ongoing",
  "Completed",
  "Cancelled",
];

export const GRADES = [
  "9A",
  "9B",
  "9C",
  "10A",
  "10B",
  "10C",
  "11A",
  "11B",
  "11C",
  "12A",
  "12B",
  "12C",
];

export const NAVIGATION_LINKS = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: "📊",
  },
  {
    name: "Sports & Teams",
    href: "/sports",
    icon: "⚽",
  },
  {
    name: "Students",
    href: "/students",
    icon: "👥",
  },
  {
    name: "Events",
    href: "/events",
    icon: "📅",
  },
  {
    name: "Reports",
    href: "/reports",
    icon: "📈",
  },
  {
    name: "Settings",
    href: "/settings",
    icon: "⚙️",
  },
];
