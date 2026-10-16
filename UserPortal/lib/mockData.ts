// Mock data for development

import { Student, Sport, SportsEvent, User } from "./types";

export const mockStudents: Student[] = [
  {
    id: 1,
    name: "John Smith",
    grade: "10A",
    sports: ["Basketball", "Tennis"],
    email: "john.smith@school.com",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    grade: "11B",
    sports: ["Volleyball", "Swimming"],
    email: "sarah.johnson@school.com",
  },
  {
    id: 3,
    name: "Mike Davis",
    grade: "10C",
    sports: ["Football", "Track & Field"],
    email: "mike.davis@school.com",
  },
];

export const mockSports: Sport[] = [
  {
    id: 1,
    name: "Basketball",
    teams: 6,
    students: 120,
    coach: "Coach Anderson",
  },
  {
    id: 2,
    name: "Football",
    teams: 8,
    students: 160,
    coach: "Coach Thompson",
  },
  {
    id: 3,
    name: "Volleyball",
    teams: 4,
    students: 80,
    coach: "Coach Martinez",
  },
];

export const mockEvents: SportsEvent[] = [
  {
    id: 1,
    name: "Basketball Regional Championship",
    date: "2024-03-15",
    location: "Main Arena",
    status: "Upcoming",
    sport: "Basketball",
  },
  {
    id: 2,
    name: "Swimming State Finals",
    date: "2024-03-20",
    location: "Indoor Pool",
    status: "Upcoming",
    sport: "Swimming",
  },
];

export const mockUsers: User[] = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@sportportal.com",
    role: "Admin",
  },
  {
    id: 2,
    name: "Coach Manager",
    email: "coach@sportportal.com",
    role: "Manager",
  },
];
