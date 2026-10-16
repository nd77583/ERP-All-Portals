// Types for the application
export interface Student {
  id: number;
  name: string;
  grade: string;
  sports: string[];
  email?: string;
  phone?: string;
  joinDate?: string;
}

export interface Sport {
  id: number;
  name: string;
  teams: number;
  students: number;
  description?: string;
  coach?: string;
}

export interface Team {
  id: number;
  name: string;
  sport: string;
  coach: string;
  students: Student[];
  wins?: number;
  losses?: number;
}

export interface SportsEvent {
  id: number;
  name: string;
  date: string;
  location: string;
  status: "Upcoming" | "Ongoing" | "Completed" | "Cancelled";
  sport: string;
  teams?: string[];
  description?: string;
}

export interface Report {
  id: number;
  title: string;
  description: string;
  icon: string;
  type: string;
  generatedDate?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Manager" | "Coordinator" | "Coach";
  phone?: string;
  joinDate?: string;
}

export interface Dashboard {
  totalStudents: number;
  activeTeams: number;
  upcomingEvents: number;
  sportsCategories: number;
  recentActivity: Activity[];
}

export interface Activity {
  id: number;
  title: string;
  timestamp: string;
  type: string;
}

export type LayoutProps<T extends string> = {
  children: React.ReactNode;
};
