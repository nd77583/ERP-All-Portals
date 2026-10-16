"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import * as XLSX from "xlsx";

// ============================================================================
// DATA TYPES (SRS FR-PLA-01 to FR-PLA-07)
// ============================================================================
export interface RecruitmentDrive {
  id: string;
  companyName: string;
  companyLogo: string;
  industrySector: string;
  roleTitle: string;
  packageCTC: string; // e.g. "₹ 12.5 LPA"
  location: string;
  driveDate: string;
  minCgpa: number;
  eligibleDegrees: string[];
  sportsDisciplineBonus: string;
  status: "Active" | "Shortlisting" | "Interviews Scheduled" | "Offers Released" | "Completed";
  applicantsCount: number;
  shortlistedCount: number;
  offersCount: number;
  rounds: string[];
}

export interface StudentCandidate {
  id: string;
  rollNo: string;
  name: string;
  avatar: string;
  degree: string;
  cgpa: number;
  sport: string;
  sportsAchievement: string;
  skills: string[];
  tpoVerified: boolean;
  placementStatus: "Placed" | "Shortlisted" | "Under Review" | "Available";
  placedCompany?: string;
  placedPackage?: string;
  resumeFileName: string;
}

export interface JobPosting {
  id: string;
  title: string;
  organization: string;
  type: "Full-Time" | "High-Performance Fellowship" | "Summer Internship" | "Govt Sports Quota";
  location: string;
  packageOrStipend: string;
  deadline: string;
  vacancies: number;
  tags: string[];
  description: string;
  applied?: boolean;
}

export interface AlumniRecord {
  id: string;
  name: string;
  batchYear: number;
  degree: string;
  sport: string;
  currentRole: string;
  currentOrg: string;
  location: string;
  avatar: string;
  achievements: string;
  isMentor: boolean;
  donorCategory?: string;
}

// ============================================================================
// INITIAL MOCK DATA (High-Performance Sports & Academic Universe)
// ============================================================================
const INITIAL_DRIVES: RecruitmentDrive[] = [
  {
    id: "DRV-2026-001",
    companyName: "JSW Sports (Inspire Institute)",
    companyLogo: "/Icon (6).png",
    industrySector: "Elite Sports Infrastructure & Tech",
    roleTitle: "Lead Performance Biomechanist & Conditioning Coach",
    packageCTC: "₹ 14.50 LPA",
    location: "Bellary / Patiala High-Altitude Hub",
    driveDate: "28 Feb 2026",
    minCgpa: 7.0,
    eligibleDegrees: ["M.Sc Sports Science", "B.P.Ed", "M.P.Ed"],
    sportsDisciplineBonus: "National / All-India Inter-University Medallists",
    status: "Active",
    applicantsCount: 42,
    shortlistedCount: 16,
    offersCount: 5,
    rounds: ["Kinematic Screening", "Biomechanics Lab Practical", "Dean Interview"],
  },
  {
    id: "DRV-2026-002",
    companyName: "Decathlon Sports India",
    companyLogo: "/Icon (7).png",
    industrySector: "Global Sports Retail & Operations",
    roleTitle: "Regional Sports Facility & Technical Leader",
    packageCTC: "₹ 8.80 LPA",
    location: "Chandigarh & NCR Region",
    driveDate: "05 Mar 2026",
    minCgpa: 6.5,
    eligibleDegrees: ["B.P.Ed", "MBA Sports Management", "B.Sc Sports"],
    sportsDisciplineBonus: "State / Inter-College Athletes",
    status: "Shortlisting",
    applicantsCount: 68,
    shortlistedCount: 24,
    offersCount: 8,
    rounds: ["Online Aptitude", "Physical Agility Assessment", "Store Leadership Viva"],
  },
  {
    id: "DRV-2026-003",
    companyName: "Sports Authority of India (SAI)",
    companyLogo: "/Icon (8).png",
    industrySector: "Statutory Apex Sports Organization",
    roleTitle: "Assistant Coach & High-Performance Talent Scout",
    packageCTC: "₹ 9.60 LPA",
    location: "NIS Patiala & SAI Regional Centers",
    driveDate: "12 Mar 2026",
    minCgpa: 7.2,
    eligibleDegrees: ["M.P.Ed", "B.P.Ed (NIS Diploma Equivalent)"],
    sportsDisciplineBonus: "Khelo India / Senior National Representation",
    status: "Interviews Scheduled",
    applicantsCount: 54,
    shortlistedCount: 18,
    offersCount: 6,
    rounds: ["Field Skill Drills", "Sports Law & Anti-Doping Viva", "Federation Interview"],
  },
  {
    id: "DRV-2026-004",
    companyName: "PUMA Performance India",
    companyLogo: "/Icon (9).png",
    industrySector: "Athletic Wear & Footwear Technology",
    roleTitle: "Athletic Footwear Wear-Testing & Product Analyst",
    packageCTC: "₹ 11.20 LPA",
    location: "Bengaluru HQ (Hybrid)",
    driveDate: "18 Mar 2026",
    minCgpa: 6.8,
    eligibleDegrees: ["B.Tech / M.Sc Sports Science", "B.P.Ed"],
    sportsDisciplineBonus: "Track & Field Sprinters / Jumpers Preferred",
    status: "Active",
    applicantsCount: 38,
    shortlistedCount: 12,
    offersCount: 4,
    rounds: ["Product Case Challenge", "Ground Force Plate Testing", "HR Discussion"],
  },
  {
    id: "DRV-2026-005",
    companyName: "Reliance Foundation Youth Sports (RFYS)",
    companyLogo: "/Icon00.png",
    industrySector: "Grassroots Athlete Development",
    roleTitle: "Athletics Program Manager & Scout",
    packageCTC: "₹ 10.50 LPA",
    location: "Mumbai / Pan-Punjab Circuit",
    driveDate: "24 Mar 2026",
    minCgpa: 6.5,
    eligibleDegrees: ["B.P.Ed", "MBA Sports Management"],
    sportsDisciplineBonus: "Athletics / Football Captains",
    status: "Active",
    applicantsCount: 49,
    shortlistedCount: 15,
    offersCount: 4,
    rounds: ["Curriculum Presentation", "Grassroots Video Assessment", "Panel Interview"],
  },
  {
    id: "DRV-2026-006",
    companyName: "Tata Trusts Sports Excellence Center",
    companyLogo: "/icon100.png",
    industrySector: "CSR High-Performance Academy",
    roleTitle: "Strength & Conditioning Specialist (Youth Cohort)",
    packageCTC: "₹ 12.00 LPA",
    location: "Jamshedpur Center of Excellence",
    driveDate: "15 Apr 2026",
    minCgpa: 7.5,
    eligibleDegrees: ["M.Sc Sports Science", "M.P.Ed"],
    sportsDisciplineBonus: "Certified NSCA / CSCS Preference",
    status: "Active",
    applicantsCount: 29,
    shortlistedCount: 9,
    offersCount: 3,
    rounds: ["Load Velocity Profiling Defense", "Hands-on Practical", "Board Interview"],
  },
];

const INITIAL_CANDIDATES: StudentCandidate[] = [
  {
    id: "CAND-01",
    rollNo: "MBSPSU-2022-BPED-014",
    name: "Rahul Kumar",
    avatar: "/rahul.jpg",
    degree: "B.P.Ed (Final Year)",
    cgpa: 8.74,
    sport: "Athletics (100m / 200m Sprint)",
    sportsAchievement: "All-India Inter-University Gold Medal (10.42s) • Khelo India University Games Champion",
    skills: ["Dartfish Biomechanics Video Analysis", "Sprint Start Periodization", "Strength & Conditioning", "Team Captaincy"],
    tpoVerified: true,
    placementStatus: "Placed",
    placedCompany: "JSW Sports",
    placedPackage: "₹ 14.50 LPA",
    resumeFileName: "Rahul_Kumar_MBSPSU_Verified_Resume.pdf",
  },
  {
    id: "CAND-02",
    rollNo: "MBSPSU-2022-BPED-028",
    name: "Simranjit Kaur",
    avatar: "/simranjit.jpg",
    degree: "B.P.Ed (Final Year)",
    cgpa: 9.12,
    sport: "Weightlifting (64kg Category)",
    sportsAchievement: "National Games Silver Medallist • Commonwealth Youth Representation",
    skills: ["Kinematic Snatch Analysis", "Olympic Barbell Coaching", "Sports Nutrition Planning", "First-Aid CPR Certified"],
    tpoVerified: true,
    placementStatus: "Placed",
    placedCompany: "Sports Authority of India",
    placedPackage: "₹ 9.60 LPA",
    resumeFileName: "Simranjit_Kaur_Verified_Dossier.pdf",
  },
  {
    id: "CAND-03",
    rollNo: "MBSPSU-2024-MSCS-008",
    name: "Gurpreet Singh Dhillon",
    avatar: "/gurpreet.jpg",
    degree: "M.Sc Sports Science",
    cgpa: 8.92,
    sport: "Boxing (75kg Middleweight)",
    sportsAchievement: "Senior State Champion • All-India Inter-Uni Bronze",
    skills: ["Cosmed K5 Metabolic Analyzer", "Force Plate Kinetic Profiling", "GPS Catapult Telematics", "Python Data Analytics"],
    tpoVerified: true,
    placementStatus: "Shortlisted",
    resumeFileName: "Gurpreet_Dhillon_SportsScience_CV.pdf",
  },
  {
    id: "CAND-04",
    rollNo: "MBSPSU-2022-BPED-045",
    name: "Amanpreet Sharma",
    avatar: "/aman.jpg",
    degree: "B.P.Ed (Final Year)",
    cgpa: 7.85,
    sport: "Football (Goalkeeper)",
    sportsAchievement: "North Zone Inter-University Winner • Punjab State Super League Best Keeper",
    skills: ["Goalkeeper Reaction Drills", "Sports Facility Management", "Event Protocol", "Youth Mentoring"],
    tpoVerified: true,
    placementStatus: "Under Review",
    resumeFileName: "Amanpreet_Sharma_Profile.pdf",
  },
  {
    id: "CAND-05",
    rollNo: "MBSPSU-2024-MSCS-012",
    name: "Navneet Kaur",
    avatar: "/navneet.jpg",
    degree: "M.Sc Sports Science",
    cgpa: 9.35,
    sport: "Badminton",
    sportsAchievement: "National University Quarterfinalist",
    skills: ["Isokinetic Dynamometry (Biodex)", "Electromyography (EMG)", "Sports Ergonomics", "Research Methodologies"],
    tpoVerified: true,
    placementStatus: "Shortlisted",
    resumeFileName: "Navneet_Kaur_ScientificDossier.pdf",
  },
  {
    id: "CAND-06",
    rollNo: "MBSPSU-2022-BPED-062",
    name: "Harman Singh Sandhu",
    avatar: "/harman.jpg",
    degree: "B.P.Ed (Final Year)",
    cgpa: 7.60,
    sport: "Hockey (Midfielder)",
    sportsAchievement: "Junior National Hockey Championship Gold • MBSPSU University Captain",
    skills: ["Tactical GPS Telemetry", "Fitness Testing Batteries", "School Physical Education Curriculum", "English & Punjabi Fluent"],
    tpoVerified: true,
    placementStatus: "Available",
    resumeFileName: "Harman_Singh_Hockey_CV.pdf",
  },
];

const INITIAL_JOBS: JobPosting[] = [
  {
    id: "JOB-2026-101",
    title: "High-Performance Strength & Conditioning Coach",
    organization: "Abhinav Bindra Targeting Performance (ABTP)",
    type: "Full-Time",
    location: "Mohali / New Delhi",
    packageOrStipend: "₹ 9.50 – ₹ 12.00 LPA",
    deadline: "10 Mar 2026",
    vacancies: 4,
    tags: ["Strength Periodization", "Force Plates", "Olympic Athletes"],
    description: "Lead daily biomechanical and loading sessions for national-tier shooting, archery, and track athletes. Operate cutting-edge sensory and balance diagnostic suites.",
  },
  {
    id: "JOB-2026-102",
    title: "Summer High-Performance Sports Fellow (Stipendiary)",
    organization: "National Institute of Sports (NIS) Patiala",
    type: "High-Performance Fellowship",
    location: "Patiala Campus",
    packageOrStipend: "₹ 45,000 / month Stipend",
    deadline: "15 Mar 2026",
    vacancies: 6,
    tags: ["Fellowship", "Olympic Camp", "Sports Nutrition"],
    description: "6-month rigorous fellowship supporting national camp athletes preparing for Asian Games and World Championships. Full lodging and certification provided.",
  },
  {
    id: "JOB-2026-103",
    title: "Head of Physical Education & Sports Academy Director",
    organization: "Yadavindra Public School (YPS) Patiala",
    type: "Full-Time",
    location: "Patiala, Punjab",
    packageOrStipend: "₹ 8.50 – ₹ 10.00 LPA + Campus Quarters",
    deadline: "20 Mar 2026",
    vacancies: 2,
    tags: ["K-12 Sports", "Curriculum Design", "Inter-School Tournaments"],
    description: "Administer the premier boarding school sports complex, athletics tracks, and multi-sport tournaments. B.P.Ed / M.P.Ed required.",
  },
  {
    id: "JOB-2026-104",
    title: "Sports Technology & Wearable Analytics Intern",
    organization: "Stupa Sports Analytics",
    type: "Summer Internship",
    location: "Remote / Hybrid (Delhi NCR)",
    packageOrStipend: "₹ 30,000 / month Stipend",
    deadline: "25 Mar 2026",
    vacancies: 5,
    tags: ["Computer Vision", "Table Tennis / Badminton", "AI Tracking"],
    description: "Annotation and biomechanical validation of player trajectories using camera telemetry and wearable inertial measurement units (IMUs).",
  },
  {
    id: "JOB-2026-105",
    title: "Sub-Inspector / Sports Officer (Punjab Police Sports Quota)",
    organization: "Govt of Punjab Home Affairs & Sports Dept",
    type: "Govt Sports Quota",
    location: "Statewide Punjab",
    packageOrStipend: "Pay Matrix Level-7 (₹ 44,900 – ₹ 1,42,400)",
    deadline: "31 Mar 2026",
    vacancies: 12,
    tags: ["Govt Officer", "Direct Recruitment", "Medallists Only"],
    description: "Direct officer recruitment under Punjab Sports Quota 2026. Reserved strictly for graduates with All-India Inter-University, National, or International medals.",
  },
];

const INITIAL_ALUMNI: AlumniRecord[] = [
  {
    id: "ALM-2020-001",
    name: "Dr. Sandeep Singh Sandhu",
    batchYear: 2021,
    degree: "Ph.D. Sports Biomechanics (Founding Batch)",
    sport: "Athletics (Javelin Throw)",
    currentRole: "Lead Biomechanics Consultant",
    currentOrg: "Athletics Federation of India (AFI)",
    location: "New Delhi / Patiala",
    avatar: "/rahul.jpg",
    achievements: "Olympics Biomechanics Advisory Committee • Asian Athletics Gold Medal Mentor",
    isMentor: true,
    donorCategory: "Patron Donor (₹ 5.0 L Track Endowment)",
  },
  {
    id: "ALM-2022-014",
    name: "Gurleen Kaur",
    batchYear: 2023,
    degree: "B.P.Ed",
    sport: "Archery (Recurve)",
    currentRole: "Regional Sports Operations Manager",
    currentOrg: "Decathlon Sports India",
    location: "Ludhiana & Chandigarh",
    avatar: "/navneet.jpg",
    achievements: "National Games Bronze • Decathlon Best Young Manager Award 2025",
    isMentor: true,
  },
  {
    id: "ALM-2021-042",
    name: "Manpreet Singh Cheema",
    batchYear: 2022,
    degree: "M.P.Ed",
    sport: "Shooting (10m Air Rifle)",
    currentRole: "Deputy Superintendent of Police (Sports Quota)",
    currentOrg: "Punjab Police",
    location: "Patiala Headquarters",
    avatar: "/aman.jpg",
    achievements: "Commonwealth Games Team Silver • Maharaja Ranjit Singh Awardee",
    isMentor: true,
    donorCategory: "Athlete Welfare Fund Contributor",
  },
  {
    id: "ALM-2023-088",
    name: "Jasnoor Singh Bhasin",
    batchYear: 2024,
    degree: "M.Sc Sports Science",
    sport: "Rowing / Kayaking",
    currentRole: "Senior Sports Data Analyst",
    currentOrg: "JSW Bengaluru Football Club (BFC)",
    location: "Bengaluru",
    avatar: "/harman.jpg",
    achievements: "ISL Championship Performance Data Team • Published 3 Papers on Athlete GPS Load",
    isMentor: false,
  },
];

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
export default function PlacementPage() {
  // Navigation Tabs: 'drives' | 'candidates' | 'jobs' | 'alumni' | 'compliance'
  const [activeTab, setActiveTab] = useState<"drives" | "candidates" | "jobs" | "alumni" | "compliance">("drives");

  // State collections
  const [drives, setDrives] = useState<RecruitmentDrive[]>(INITIAL_DRIVES);
  const [candidates, setCandidates] = useState<StudentCandidate[]>(INITIAL_CANDIDATES);
  const [jobs, setJobs] = useState<JobPosting[]>(INITIAL_JOBS);
  const [alumni] = useState<AlumniRecord[]>(INITIAL_ALUMNI);

  // Filters
  const [driveSearch, setDriveSearch] = useState("");
  const [driveSectorFilter, setDriveSectorFilter] = useState("All");
  const [candidateSearch, setCandidateSearch] = useState("");
  const [candidateSportFilter, setCandidateSportFilter] = useState("All");
  const [alumniSearch, setAlumniSearch] = useState("");
  const [alumniBatchFilter, setAlumniBatchFilter] = useState("All");

  // Modals
  const [isDriveModalOpen, setIsDriveModalOpen] = useState(false);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isMisModalOpen, setIsMisModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<StudentCandidate | null>(null);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // --------------------------------------------------------------------------
  // ACTIONS & HANDLERS
  // --------------------------------------------------------------------------
  const handleCreateDrive = (newDrive: RecruitmentDrive) => {
    setDrives((prev) => [newDrive, ...prev]);
    setIsDriveModalOpen(false);
    showToast(`Recruitment Drive for "${newDrive.companyName}" successfully scheduled!`);
  };

  const handleCreateJob = (newJob: JobPosting) => {
    setJobs((prev) => [newJob, ...prev]);
    setIsJobModalOpen(false);
    showToast(`New Opportunity "${newJob.title}" posted to student portal!`);
  };

  const handleApplyJob = (jobId: string) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, applied: true } : j))
    );
    showToast("Application submitted with your TPO-verified Sports & Academic resume!");
  };

  const handleShortlistCandidate = (candId: string) => {
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === candId ? { ...c, placementStatus: "Shortlisted" } : c
      )
    );
    showToast("Candidate successfully shortlisted for interview rounds!");
  };

  // Export NAAC Table 5.2.1 to Real Excel (FR-PLA-06)
  const handleExportNaacExcel = () => {
    const naacRows = [
      {
        "Academic Year": "2025-26",
        "Number of Outgoing Students Eligible": 387,
        "Number of Students Placed": 342,
        "Placement Percentage (%)": "88.37%",
        "Median Salary (INR LPA)": "8.40",
        "Highest Salary (INR LPA)": "24.50",
        "Sports Industry / Federation Placements": 108,
        "Corporate / Tech Placements": 212,
        "Govt Sports Quota Placements": 22,
      },
      {
        "Academic Year": "2024-25",
        "Number of Outgoing Students Eligible": 340,
        "Number of Students Placed": 298,
        "Placement Percentage (%)": "87.65%",
        "Median Salary (INR LPA)": "7.35",
        "Highest Salary (INR LPA)": "19.00",
        "Sports Industry / Federation Placements": 92,
        "Corporate / Tech Placements": 188,
        "Govt Sports Quota Placements": 18,
      },
      {
        "Academic Year": "2023-24",
        "Number of Outgoing Students Eligible": 295,
        "Number of Students Placed": 251,
        "Placement Percentage (%)": "85.08%",
        "Median Salary (INR LPA)": "6.80",
        "Highest Salary (INR LPA)": "16.50",
        "Sports Industry / Federation Placements": 76,
        "Corporate / Tech Placements": 160,
        "Govt Sports Quota Placements": 15,
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(naacRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "NAAC_5.2.1_NIRF_Placement");
    XLSX.writeFile(workbook, "MBSPSU_Placement_MIS_NAAC_NIRF_2026.xlsx");
    showToast("Official NAAC 5.2.1 / NIRF Placement MIS Spreadsheet downloaded!");
    setIsMisModalOpen(false);
  };

  // Filtered queries
  const filteredDrives = useMemo(() => {
    return drives.filter((d) => {
      const matchSearch =
        d.companyName.toLowerCase().includes(driveSearch.toLowerCase()) ||
        d.roleTitle.toLowerCase().includes(driveSearch.toLowerCase()) ||
        d.location.toLowerCase().includes(driveSearch.toLowerCase());
      const matchSector =
        driveSectorFilter === "All" || d.industrySector.includes(driveSectorFilter);
      return matchSearch && matchSector;
    });
  }, [drives, driveSearch, driveSectorFilter]);

  const filteredCandidates = useMemo(() => {
    return candidates.filter((c) => {
      const matchSearch =
        c.name.toLowerCase().includes(candidateSearch.toLowerCase()) ||
        c.rollNo.toLowerCase().includes(candidateSearch.toLowerCase()) ||
        c.skills.some((s) => s.toLowerCase().includes(candidateSearch.toLowerCase()));
      const matchSport =
        candidateSportFilter === "All" || c.sport.toLowerCase().includes(candidateSportFilter.toLowerCase());
      return matchSearch && matchSport;
    });
  }, [candidates, candidateSearch, candidateSportFilter]);

  const filteredAlumni = useMemo(() => {
    return alumni.filter((a) => {
      const matchSearch =
        a.name.toLowerCase().includes(alumniSearch.toLowerCase()) ||
        a.currentOrg.toLowerCase().includes(alumniSearch.toLowerCase()) ||
        a.currentRole.toLowerCase().includes(alumniSearch.toLowerCase()) ||
        a.sport.toLowerCase().includes(alumniSearch.toLowerCase());
      const matchBatch =
        alumniBatchFilter === "All" || a.batchYear.toString() === alumniBatchFilter;
      return matchSearch && matchBatch;
    });
  }, [alumni, alumniSearch, alumniBatchFilter]);

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] text-[#1e293b] p-3 sm:p-5 lg:p-6 transition-all font-['Inter',sans-serif]">
      {/* TOAST ALERT */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2.5 rounded-md bg-[#0F2744] text-white px-4 py-3 shadow-xl border-l-4 border-[#ff9f2d] animate-fade-in text-xs sm:text-sm">
          <svg className="w-5 h-5 text-[#ff9f2d] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* ======================================================================
          SECTION 1: STATUTORY HEADER BANNER (SUITE F • FR-PLA-01/07)
          ====================================================================== */}
      <div className="w-full rounded-lg bg-[#eef3ff] border border-[#d6e3fb] p-4 sm:p-5 lg:p-6 mb-5 transition-all shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          {/* Left Column: Titles & Badges */}
          <div className="flex-1 min-w-0">
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-[3px] bg-[#001229] px-2.5 py-1 font-['Inter',sans-serif] text-[10px] font-bold leading-tight tracking-[0.5px] text-white uppercase shadow-xs">
                SUITE F • FR-PLA-01/07
              </span>

              <span className="rounded-[3px] bg-[#dce7fa] px-2.5 py-1 font-['Inter',sans-serif] text-[10px] font-bold leading-tight tracking-[0.5px] text-[#29466d] uppercase border border-[#c5d8f7]">
                AICTE / UGC TPO &amp; NAAC CRITERION V (5.2.1) COMPLIANT
              </span>
            </div>

            {/* Central TPO Telemetry Status */}
            <div className="mt-2.5 inline-flex items-center gap-2 rounded-[3px] bg-[#00664f] px-2.5 py-1 text-white shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#7ff0c9] animate-pulse"></span>
              <span className="font-['Inter',sans-serif] text-[12px] sm:text-[13px] font-bold tracking-[0.3px] text-[#7ff0c9]">
                • Central TPO Server: Active Drives Live (Sync 1.2s)
              </span>
            </div>

            {/* Main Title */}
            <h1 className="mt-2.5 font-['Public_Sans',sans-serif] text-[20px] sm:text-[23px] lg:text-[25px] font-bold leading-tight tracking-[-0.5px] text-[#102d4d]">
              Placement, Corporate Career Hub &amp; Alumni Relations
            </h1>

            {/* Subtitle */}
            <p className="mt-1 font-['Inter',sans-serif] text-[12px] sm:text-[13px] leading-relaxed text-[#596979] max-w-3xl">
              Corporate Campus Recruitment, Sports Science &amp; Federation Pathways, Athlete Corporate Transition, Verified Resume Vault, and Lifelong Alumni Network.
            </p>
          </div>

          {/* Right Column: Statutory Action Buttons (Exact two-tier format with hover) */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-center gap-1.5 sm:gap-2.5 shrink-0">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {/* Button 1: Schedule Campus Drive (Orange) */}
              <button
                type="button"
                onClick={() => setIsDriveModalOpen(true)}
                className="inline-flex h-[28px] sm:h-[34px] lg:h-[36px] items-center gap-1.5 sm:gap-2 rounded-[3px] sm:rounded-[4px] bg-[#FE932C] hover:bg-[#f59220] hover:brightness-105 hover:-translate-y-0.5 hover:shadow-[0px_6px_16px_rgba(0,18,41,0.14)] active:scale-[0.98] active:translate-y-0 px-2 sm:px-2.5 lg:px-3 font-['Inter',sans-serif] text-[9.5px] sm:text-[10.5px] lg:text-[11px] font-bold text-[#663500] leading-none transition-all duration-200 ease-out shadow-xs cursor-pointer"
              >
                <img
                  src="/Container (18).png"
                  alt=""
                  className="object-contain w-[12px] h-[12px] sm:w-[15px] sm:h-[15px]"
                />
                Schedule Campus Drive
              </button>

              {/* Button 2: Post Opportunity (Light Blue) */}
              <button
                type="button"
                onClick={() => setIsJobModalOpen(true)}
                className="inline-flex h-[28px] sm:h-[34px] lg:h-[36px] items-center gap-1.5 sm:gap-2 rounded-[3px] sm:rounded-[4px] bg-[#dce8fb] hover:bg-[#ccdcf5] hover:brightness-105 hover:-translate-y-0.5 hover:shadow-[0px_6px_16px_rgba(0,18,41,0.14)] active:scale-[0.98] active:translate-y-0 px-2 sm:px-2.5 lg:px-3 font-['Inter',sans-serif] text-[9.5px] sm:text-[10.5px] lg:text-[11px] font-bold text-[#102d4d] leading-none border border-[#c0d5f5] transition-all duration-200 ease-out shadow-xs cursor-pointer"
              >
                <img
                  src="/add-user.png"
                  alt=""
                  className="object-contain w-[12px] h-[12px] sm:w-[15px] sm:h-[15px]"
                />
                Post Opportunity
              </button>
            </div>

            {/* Button 3: Generate NAAC/NIRF Placement MIS (Dark Navy) */}
            <button
              type="button"
              onClick={() => setIsMisModalOpen(true)}
              className="inline-flex h-[28px] sm:h-[34px] lg:h-[36px] items-center gap-1.5 sm:gap-2 rounded-[3px] sm:rounded-[4px] bg-[#062344] hover:bg-[#0c3361] hover:brightness-105 hover:-translate-y-0.5 hover:shadow-[0px_6px_16px_rgba(0,18,41,0.14)] active:scale-[0.98] active:translate-y-0 px-2 sm:px-2.5 lg:px-3 font-['Inter',sans-serif] text-[9.5px] sm:text-[10.5px] lg:text-[11px] font-bold text-white leading-none transition-all duration-200 ease-out shadow-xs cursor-pointer"
            >
              <img
                src="/bulk.png"
                alt=""
                className="object-contain w-[12px] h-[12px] sm:w-[15px] sm:h-[15px]"
              />
              Generate NAAC/NIRF Placement MIS
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================================
          SECTION 2: TOP 4 STATUTORY KPI METRIC CARDS (FR-PLA-06, FR-PLA-07)
          ====================================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
        {/* CARD 1: OVERALL PLACEMENT RATE */}
        <div className="flex min-h-[148px] h-full flex-col justify-between rounded-[8px] border border-[#e0e7f1] border-t-[3px] border-t-[#102d4d] bg-white p-3 sm:p-3.5 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0px_8px_18px_rgba(0,18,41,0.08)]">
          <div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-['Inter',sans-serif] text-[10px] font-bold tracking-[0.5px] text-[#596979] uppercase">
                  OVERALL PLACEMENT RATE
                </h3>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span className="font-['Public_Sans',sans-serif] text-[22px] sm:text-[24px] font-extrabold text-[#102d4d] leading-none">
                    88.4%
                  </span>
                  <span className="text-[12px] font-semibold text-[#16a34a]">
                    (342 / 387)
                  </span>
                </div>
              </div>
              <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[6px] bg-[#e8f0ff]">
                <img src="/Icon (1).png" alt="" className="w-[18px] h-[18px] object-contain" />
              </div>
            </div>

            {/* Ratio Bar */}
            <div className="mt-3">
              <div className="flex items-center justify-between text-[10.5px] font-semibold text-[#102d4d] mb-1">
                <span>Corp 62% • Sports Fed 28% • Govt 10%</span>
                <span className="font-bold text-[#00664f]">NAAC V</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#e2e8f0] overflow-hidden flex">
                <div className="h-full bg-[#102d4d] w-[62%]" title="Corporate 62%"></div>
                <div className="h-full bg-[#ff9f2d] w-[28%]" title="Sports Federations 28%"></div>
                <div className="h-full bg-[#00664f] w-[10%]" title="Govt Quota 10%"></div>
              </div>
            </div>
          </div>

          <div className="mt-2.5 pt-2 border-t border-[#f1f5f9] flex items-center justify-between text-[11px] text-[#596979]">
            <span>Convocation 2026 Cohort</span>
            <span className="font-bold text-[#102d4d]">+6.2% YoY</span>
          </div>
        </div>

        {/* CARD 2: MEDIAN COMPENSATION (NIRF) */}
        <div className="flex min-h-[148px] h-full flex-col justify-between rounded-[8px] border border-[#e0e7f1] border-t-[3px] border-t-[#ff9f2d] bg-white p-3 sm:p-3.5 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0px_8px_18px_rgba(0,18,41,0.08)]">
          <div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-['Inter',sans-serif] text-[10px] font-bold tracking-[0.5px] text-[#596979] uppercase">
                  MEDIAN SALARY (NIRF / NAAC)
                </h3>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span className="font-['Public_Sans',sans-serif] text-[22px] sm:text-[24px] font-extrabold text-[#102d4d] leading-none">
                    ₹ 8.40
                  </span>
                  <span className="text-[12px] font-semibold text-[#596979]">
                    LPA
                  </span>
                </div>
              </div>
              <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[6px] bg-[#fff5ea]">
                <img src="/Icon (7).png" alt="" className="w-[18px] h-[18px] object-contain" />
              </div>
            </div>

            <div className="mt-3">
              <div className="flex items-center justify-between text-[11px] font-medium text-[#596979]">
                <span>Highest CTC Offered:</span>
                <span className="font-bold text-[#102d4d]">₹ 24.50 LPA</span>
              </div>
              <div className="mt-1 flex items-center justify-between text-[11px] font-medium text-[#596979]">
                <span>Average Stipend:</span>
                <span className="font-bold text-[#102d4d]">₹ 38,000 / mo</span>
              </div>
            </div>
          </div>

          <div className="mt-2.5 pt-2 border-t border-[#f1f5f9] flex items-center justify-between text-[11px] text-[#596979]">
            <span className="text-[#00664f] font-semibold">Verified CTC Audit</span>
            <span className="font-bold text-[#663500] bg-[#fff0db] px-1.5 py-0.2 rounded text-[10px]">Tier-1 Accredited</span>
          </div>
        </div>

        {/* CARD 3: RECRUITER VISITS & DRIVES */}
        <div className="flex min-h-[148px] h-full flex-col justify-between rounded-[8px] border border-[#e0e7f1] border-t-[3px] border-t-[#00664f] bg-white p-3 sm:p-3.5 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0px_8px_18px_rgba(0,18,41,0.08)]">
          <div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-['Inter',sans-serif] text-[10px] font-bold tracking-[0.5px] text-[#596979] uppercase">
                  ACTIVE RECRUITERS &amp; MOUS
                </h3>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span className="font-['Public_Sans',sans-serif] text-[22px] sm:text-[24px] font-extrabold text-[#102d4d] leading-none">
                    48
                  </span>
                  <span className="text-[12px] font-semibold text-[#596979]">
                    Corporate Partners
                  </span>
                </div>
              </div>
              <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[6px] bg-[#e6f7f2]">
                <img src="/Icon (8).png" alt="" className="w-[18px] h-[18px] object-contain" />
              </div>
            </div>

            <div className="mt-3 flex items-center gap-1.5 flex-wrap">
              <span className="rounded bg-[#f1f5f9] px-1.5 py-0.5 text-[10px] font-bold text-[#102d4d]">JSW Sports</span>
              <span className="rounded bg-[#f1f5f9] px-1.5 py-0.5 text-[10px] font-bold text-[#102d4d]">Decathlon</span>
              <span className="rounded bg-[#f1f5f9] px-1.5 py-0.5 text-[10px] font-bold text-[#102d4d]">SAI</span>
              <span className="rounded bg-[#f1f5f9] px-1.5 py-0.5 text-[10px] font-bold text-[#102d4d]">PUMA</span>
            </div>
          </div>

          <div className="mt-2.5 pt-2 border-t border-[#f1f5f9] flex items-center justify-between text-[11px] text-[#596979]">
            <span>12 Drives In Progress</span>
            <span className="font-bold text-[#00664f]">100% Verified</span>
          </div>
        </div>

        {/* CARD 4: ALUMNI ENGAGEMENT & ENDOWMENT */}
        <div className="flex min-h-[148px] h-full flex-col justify-between rounded-[8px] border border-[#e0e7f1] border-t-[3px] border-t-[#64748b] bg-white p-3 sm:p-3.5 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0px_8px_18px_rgba(0,18,41,0.08)]">
          <div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-['Inter',sans-serif] text-[10px] font-bold tracking-[0.5px] text-[#596979] uppercase">
                  ALUMNI NETWORK &amp; GIVING
                </h3>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span className="font-['Public_Sans',sans-serif] text-[22px] sm:text-[24px] font-extrabold text-[#102d4d] leading-none">
                    1,840
                  </span>
                  <span className="text-[12px] font-semibold text-[#596979]">
                    Graduates
                  </span>
                </div>
              </div>
              <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[6px] bg-[#f1f5f9]">
                <img src="/Icon (9).png" alt="" className="w-[18px] h-[18px] object-contain" />
              </div>
            </div>

            <div className="mt-3">
              <div className="flex items-center justify-between text-[11px] font-medium text-[#596979]">
                <span>Endowment Fund:</span>
                <span className="font-bold text-[#102d4d]">₹ 42.50 Lakhs</span>
              </div>
              <div className="mt-1 flex items-center justify-between text-[11px] font-medium text-[#596979]">
                <span>Active Alumni Mentors:</span>
                <span className="font-bold text-[#00664f]">126 Mentors</span>
              </div>
            </div>
          </div>

          <div className="mt-2.5 pt-2 border-t border-[#f1f5f9] flex items-center justify-between text-[11px] text-[#596979]">
            <span>SBIePay Integrated</span>
            <span className="font-bold text-[#102d4d]">82 International Medals</span>
          </div>
        </div>
      </div>

      {/* ======================================================================
          SECTION 3: INTERACTIVE NAVIGATION TABS
          ====================================================================== */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-5 border-b border-[#e2e8f0] pb-2">
        <button
          type="button"
          onClick={() => setActiveTab("drives")}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-bold rounded-t-md transition-all cursor-pointer ${
            activeTab === "drives"
              ? "bg-[#102d4d] text-white shadow-xs"
              : "bg-white text-[#596979] hover:bg-[#f1f5f9] border border-[#e2e8f0]"
          }`}
        >
          <span>Recruitment Drives</span>
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded-full ${
              activeTab === "drives" ? "bg-[#ff9f2d] text-[#663500]" : "bg-[#e2e8f0] text-[#102d4d]"
            }`}
          >
            {drives.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("candidates")}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-bold rounded-t-md transition-all cursor-pointer ${
            activeTab === "candidates"
              ? "bg-[#102d4d] text-white shadow-xs"
              : "bg-white text-[#596979] hover:bg-[#f1f5f9] border border-[#e2e8f0]"
          }`}
        >
          <span>Athlete Resume Vault (FR-PLA-01)</span>
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded-full ${
              activeTab === "candidates" ? "bg-[#ff9f2d] text-[#663500]" : "bg-[#e2e8f0] text-[#102d4d]"
            }`}
          >
            {candidates.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("jobs")}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-bold rounded-t-md transition-all cursor-pointer ${
            activeTab === "jobs"
              ? "bg-[#102d4d] text-white shadow-xs"
              : "bg-white text-[#596979] hover:bg-[#f1f5f9] border border-[#e2e8f0]"
          }`}
        >
          <span>Opportunity Board</span>
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded-full ${
              activeTab === "jobs" ? "bg-[#ff9f2d] text-[#663500]" : "bg-[#e2e8f0] text-[#102d4d]"
            }`}
          >
            {jobs.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("alumni")}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-bold rounded-t-md transition-all cursor-pointer ${
            activeTab === "alumni"
              ? "bg-[#102d4d] text-white shadow-xs"
              : "bg-white text-[#596979] hover:bg-[#f1f5f9] border border-[#e2e8f0]"
          }`}
        >
          <span>Alumni Directory &amp; Hall of Fame</span>
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded-full ${
              activeTab === "alumni" ? "bg-[#ff9f2d] text-[#663500]" : "bg-[#e2e8f0] text-[#102d4d]"
            }`}
          >
            {alumni.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("compliance")}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-bold rounded-t-md transition-all cursor-pointer ${
            activeTab === "compliance"
              ? "bg-[#102d4d] text-white shadow-xs"
              : "bg-white text-[#596979] hover:bg-[#f1f5f9] border border-[#e2e8f0]"
          }`}
        >
          <span>NAAC &amp; NIRF MIS Datasets (FR-PLA-06)</span>
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded-full ${
              activeTab === "compliance" ? "bg-[#ff9f2d] text-[#663500]" : "bg-[#e2e8f0] text-[#102d4d]"
            }`}
          >
            5.2.1
          </span>
        </button>
      </div>

      {/* ======================================================================
          TAB 1: RECRUITMENT DRIVES LIFECYCLE (FR-PLA-02)
          ====================================================================== */}
      {activeTab === "drives" && (
        <div className="space-y-4">
          {/* Filter and Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-lg border border-[#e0e7f1]">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search drive by recruiter, role title, or city..."
                value={driveSearch}
                onChange={(e) => setDriveSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-[#cbd5e1] rounded-md focus:outline-none focus:ring-1 focus:ring-[#102d4d]"
              />
              <svg className="w-4 h-4 text-[#94a3b8] absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#596979]">Sector:</span>
              <select
                value={driveSectorFilter}
                onChange={(e) => setDriveSectorFilter(e.target.value)}
                className="text-xs border border-[#cbd5e1] rounded-md px-2.5 py-2 bg-white text-[#102d4d] font-medium focus:outline-none cursor-pointer"
              >
                <option value="All">All Sectors</option>
                <option value="Elite Sports">Elite Sports &amp; Academies</option>
                <option value="Retail">Sports Retail &amp; Gear</option>
                <option value="Statutory">Statutory / SAI</option>
                <option value="Wearable">Wearable &amp; Tech</option>
              </select>
            </div>
          </div>

          {/* Drives Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDrives.map((drive) => (
              <div
                key={drive.id}
                className="rounded-lg border border-[#e0e7f1] bg-white p-4 flex flex-col justify-between transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0px_8px_18px_rgba(0,18,41,0.08)]"
              >
                <div>
                  {/* Top line: Logo, Company & Status */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="h-10 w-10 rounded-md bg-[#eef3ff] flex items-center justify-center p-1.5 border border-[#d6e3fb]">
                        <img src={drive.companyLogo} alt="" className="h-6 w-6 object-contain" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#102d4d] leading-tight">
                          {drive.companyName}
                        </h4>
                        <span className="text-[11px] font-medium text-[#64748b]">
                          {drive.industrySector}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        drive.status === "Active"
                          ? "bg-[#dcfce7] text-[#15803d]"
                          : drive.status === "Shortlisting"
                          ? "bg-[#fff7ed] text-[#c2410c]"
                          : "bg-[#e0e7ff] text-[#3730a3]"
                      }`}
                    >
                      {drive.status}
                    </span>
                  </div>

                  {/* Role and CTC */}
                  <div className="mt-3 pb-3 border-b border-[#f1f5f9]">
                    <h5 className="text-xs sm:text-[13px] font-bold text-[#1e293b]">
                      {drive.roleTitle}
                    </h5>
                    <div className="mt-1 flex items-center gap-3 text-xs">
                      <span className="font-extrabold text-[#00664f] bg-[#e6f7f2] px-2 py-0.5 rounded">
                        {drive.packageCTC}
                      </span>
                      <span className="text-[#64748b] flex items-center gap-1">
                        📍 {drive.location}
                      </span>
                    </div>
                  </div>

                  {/* Eligibility criteria */}
                  <div className="mt-2.5 space-y-1.5 text-[11px] text-[#596979]">
                    <div className="flex items-center justify-between">
                      <span>Cut-off CGPA:</span>
                      <span className="font-bold text-[#102d4d]">≥ {drive.minCgpa}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Degrees:</span>
                      <span className="font-semibold text-[#102d4d] text-right">
                        {drive.eligibleDegrees.join(", ")}
                      </span>
                    </div>
                    <div className="flex items-start justify-between gap-1">
                      <span>Sports Weightage:</span>
                      <span className="font-bold text-[#b45309] text-right">
                        {drive.sportsDisciplineBonus}
                      </span>
                    </div>
                  </div>

                  {/* Drive Rounds Progress */}
                  <div className="mt-3 pt-2.5 border-t border-[#f1f5f9]">
                    <div className="text-[10.5px] font-semibold text-[#64748b] mb-1">
                      Selection Pathway:
                    </div>
                    <div className="flex items-center gap-1 flex-wrap">
                      {drive.rounds.map((round, rIdx) => (
                        <span
                          key={rIdx}
                          className="bg-[#f8fafc] text-[#334155] border border-[#e2e8f0] px-1.5 py-0.5 rounded text-[10px] font-medium"
                        >
                          {rIdx + 1}. {round}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Metrics & Actions */}
                <div className="mt-4 pt-3 border-t border-[#f1f5f9] flex items-center justify-between gap-2">
                  <div className="text-[11px] text-[#596979]">
                    <span className="font-bold text-[#102d4d]">{drive.applicantsCount}</span> Applied •{" "}
                    <span className="font-bold text-[#00664f]">{drive.offersCount}</span> Offered
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("candidates");
                      showToast(`Viewing eligible athlete candidates for ${drive.companyName}`);
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#102d4d] bg-[#dce8fb] hover:bg-[#c9ddf8] px-2.5 py-1.5 rounded transition-all cursor-pointer"
                  >
                    View Candidates →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================================
          TAB 2: VERIFIED ATHLETE RESUME VAULT (FR-PLA-01, FR-PLA-05)
          ====================================================================== */}
      {activeTab === "candidates" && (
        <div className="space-y-4">
          {/* Candidate Search & Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-lg border border-[#e0e7f1]">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search athlete by student name, roll number, or technical skills..."
                value={candidateSearch}
                onChange={(e) => setCandidateSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-[#cbd5e1] rounded-md focus:outline-none focus:ring-1 focus:ring-[#102d4d]"
              />
              <svg className="w-4 h-4 text-[#94a3b8] absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#596979]">Sport:</span>
              <select
                value={candidateSportFilter}
                onChange={(e) => setCandidateSportFilter(e.target.value)}
                className="text-xs border border-[#cbd5e1] rounded-md px-2.5 py-2 bg-white text-[#102d4d] font-medium focus:outline-none cursor-pointer"
              >
                <option value="All">All Disciplines</option>
                <option value="Athletics">Athletics / Track &amp; Field</option>
                <option value="Weightlifting">Weightlifting</option>
                <option value="Boxing">Boxing</option>
                <option value="Football">Football</option>
                <option value="Badminton">Badminton</option>
                <option value="Hockey">Hockey</option>
              </select>
            </div>
          </div>

          {/* Candidates List / Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCandidates.map((cand) => (
              <div
                key={cand.id}
                className="rounded-lg border border-[#e0e7f1] bg-white p-4 flex flex-col justify-between transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0px_8px_18px_rgba(0,18,41,0.08)]"
              >
                <div>
                  <div className="flex items-start gap-3">
                    <img
                      src={cand.avatar}
                      alt={cand.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#102d4d]"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-[#102d4d] truncate">
                          {cand.name}
                        </h4>
                        {cand.tpoVerified && (
                          <span className="text-[10px] font-bold bg-[#e6f7f2] text-[#00664f] px-1.5 py-0.5 rounded flex items-center gap-0.5">
                            ✓ TPO Verified
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] font-medium text-[#64748b]">
                        {cand.rollNo} • {cand.degree}
                      </p>
                      <p className="text-[11px] font-bold text-[#00664f]">
                        CGPA: {cand.cgpa.toFixed(2)} / 10.0
                      </p>
                    </div>
                  </div>

                  {/* Sport & Accolades */}
                  <div className="mt-3 rounded-md bg-[#fffbeb] p-2.5 border border-[#fef3c7]">
                    <div className="text-[10px] font-bold text-[#92400e] uppercase tracking-wider">
                      🏅 {cand.sport}
                    </div>
                    <div className="text-[11.5px] font-semibold text-[#78350f] mt-0.5 leading-snug">
                      {cand.sportsAchievement}
                    </div>
                  </div>

                  {/* Verified Skills */}
                  <div className="mt-3">
                    <span className="text-[10.5px] font-semibold text-[#596979]">
                      Core Technical Skills:
                    </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {cand.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="bg-[#f1f5f9] text-[#334155] px-1.5 py-0.5 rounded text-[10px] font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Status & CTA */}
                <div className="mt-4 pt-3 border-t border-[#f1f5f9] flex items-center justify-between">
                  <div>
                    {cand.placementStatus === "Placed" ? (
                      <span className="text-[11px] font-bold text-[#15803d] bg-[#dcfce7] px-2 py-0.5 rounded">
                        Placed • {cand.placedCompany} ({cand.placedPackage})
                      </span>
                    ) : cand.placementStatus === "Shortlisted" ? (
                      <span className="text-[11px] font-bold text-[#1d4ed8] bg-[#dbeafe] px-2 py-0.5 rounded">
                        Shortlisted for Interview
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-[#596979] bg-[#f1f5f9] px-2 py-0.5 rounded">
                        Ready for Drives
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setSelectedCandidate(cand)}
                      className="px-2.5 py-1 text-[11px] font-bold text-[#102d4d] bg-[#dce8fb] hover:bg-[#ccdcf5] rounded transition-all cursor-pointer"
                    >
                      Dossier
                    </button>
                    {cand.placementStatus !== "Placed" && (
                      <button
                        type="button"
                        onClick={() => handleShortlistCandidate(cand.id)}
                        className="px-2.5 py-1 text-[11px] font-bold text-white bg-[#00664f] hover:bg-[#00523f] rounded transition-all cursor-pointer"
                      >
                        Shortlist
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================================
          TAB 3: JOB & INTERNSHIP OPPORTUNITY BOARD (FR-PLA-01)
          ====================================================================== */}
      {activeTab === "jobs" && (
        <div className="space-y-4">
          <div className="bg-[#ffffff] p-4 rounded-lg border border-[#e0e7f1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-[#102d4d]">
                Active Campus Opportunities &amp; Fellowships
              </h3>
              <p className="text-xs text-[#596979]">
                Verified openings across Sports Industry, SAI, CSR Academies, and Govt Sports Quota.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsJobModalOpen(true)}
              className="px-3 py-1.5 text-xs font-bold text-white bg-[#102d4d] hover:bg-[#0c233c] rounded transition-all cursor-pointer shrink-0"
            >
              + Post New Vacancy
            </button>
          </div>

          <div className="space-y-3">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white p-4 rounded-lg border border-[#e0e7f1] flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0px_8px_18px_rgba(0,18,41,0.08)]"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        job.type === "Govt Sports Quota"
                          ? "bg-[#fef2f2] text-[#991b1b] border border-[#fecaca]"
                          : job.type === "High-Performance Fellowship"
                          ? "bg-[#fffbeb] text-[#92400e] border border-[#fef3c7]"
                          : "bg-[#eff6ff] text-[#1e40af] border border-[#dbeafe]"
                      }`}
                    >
                      {job.type}
                    </span>
                    <span className="text-xs font-semibold text-[#64748b]">
                      Deadline: {job.deadline}
                    </span>
                    <span className="text-xs font-semibold text-[#00664f]">
                      • {job.vacancies} Openings
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-[#102d4d]">
                    {job.title}
                  </h4>
                  <div className="text-xs font-semibold text-[#475569] mt-0.5">
                    {job.organization} • 📍 {job.location}
                  </div>

                  <p className="text-xs text-[#596979] mt-2 line-clamp-2 max-w-3xl">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {job.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="bg-[#f1f5f9] text-[#475569] px-2 py-0.5 rounded text-[10.5px] font-medium"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex md:flex-col items-center md:items-end justify-between gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-[#f1f5f9]">
                  <div className="text-right">
                    <span className="text-[10.5px] text-[#64748b] block">Package / Stipend</span>
                    <span className="text-xs sm:text-sm font-extrabold text-[#102d4d]">
                      {job.packageOrStipend}
                    </span>
                  </div>

                  {job.applied ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-[#15803d] bg-[#dcfce7] rounded">
                      ✓ Application Submitted
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleApplyJob(job.id)}
                      className="px-4 py-1.5 text-xs font-bold text-white bg-[#00664f] hover:bg-[#004d3b] rounded transition-all shadow-xs cursor-pointer active:scale-95"
                    >
                      Apply with Dossier
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================================
          TAB 4: ALUMNI DIRECTORY & HALL OF FAME (FR-PLA-03, FR-PLA-07)
          ====================================================================== */}
      {activeTab === "alumni" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-lg border border-[#e0e7f1]">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search alumni by name, current organization, designation, or sport..."
                value={alumniSearch}
                onChange={(e) => setAlumniSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-[#cbd5e1] rounded-md focus:outline-none focus:ring-1 focus:ring-[#102d4d]"
              />
              <svg className="w-4 h-4 text-[#94a3b8] absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#596979]">Batch:</span>
              <select
                value={alumniBatchFilter}
                onChange={(e) => setAlumniBatchFilter(e.target.value)}
                className="text-xs border border-[#cbd5e1] rounded-md px-2.5 py-2 bg-white text-[#102d4d] font-medium focus:outline-none cursor-pointer"
              >
                <option value="All">All Batches</option>
                <option value="2021">Batch 2021</option>
                <option value="2022">Batch 2022</option>
                <option value="2023">Batch 2023</option>
                <option value="2024">Batch 2024</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAlumni.map((alum) => (
              <div
                key={alum.id}
                className="bg-white p-4 rounded-lg border border-[#e0e7f1] flex flex-col justify-between transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0px_8px_18px_rgba(0,18,41,0.08)]"
              >
                <div>
                  <div className="flex items-start gap-3">
                    <img
                      src={alum.avatar}
                      alt={alum.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#ff9f2d]"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-[#102d4d]">
                          {alum.name}
                        </h4>
                        <span className="text-[10px] font-bold bg-[#eef3ff] text-[#102d4d] px-2 py-0.5 rounded">
                          Class of {alum.batchYear}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-[#00664f]">
                        {alum.currentRole} • {alum.currentOrg}
                      </p>
                      <p className="text-[11px] text-[#64748b]">
                        📍 {alum.location} • Degree: {alum.degree}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 p-2.5 bg-[#f8fafc] rounded border border-[#e2e8f0]">
                    <div className="text-[10px] font-bold text-[#596979] uppercase">
                      Sport &amp; Hall of Fame Citation (FR-PLA-07):
                    </div>
                    <div className="text-xs font-semibold text-[#1e293b] mt-0.5">
                      {alum.sport} • {alum.achievements}
                    </div>
                  </div>

                  {alum.donorCategory && (
                    <div className="mt-2 text-[10.5px] font-bold text-[#b45309] bg-[#fffbeb] px-2 py-1 rounded border border-[#fde68a] inline-flex items-center gap-1">
                      ⭐ {alum.donorCategory}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-[#f1f5f9] flex items-center justify-between">
                  <span className="text-[11px] text-[#64748b]">
                    {alum.isMentor ? "✅ Available for Athlete Mentorship" : "Alumni Network Member"}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      showToast(`Mentorship request dispatched to ${alum.name}!`)
                    }
                    className="px-3 py-1 text-xs font-bold text-[#102d4d] bg-[#dce8fb] hover:bg-[#ccdcf5] rounded transition-all cursor-pointer"
                  >
                    Request Mentorship
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================================
          TAB 5: ACCREDITATION & NIRF MIS COMPLIANCE (FR-PLA-06)
          ====================================================================== */}
      {activeTab === "compliance" && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border border-[#e0e7f1]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#f1f5f9] gap-3">
              <div>
                <h3 className="text-base font-bold text-[#102d4d]">
                  Statutory Accreditation MIS • NAAC Metric 5.2.1 &amp; NIRF
                </h3>
                <p className="text-xs text-[#596979]">
                  Live calculation from University SIS (FR-SIS) and Placement Master Records (FR-PLA).
                </p>
              </div>

              <button
                type="button"
                onClick={handleExportNaacExcel}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-[#00664f] hover:bg-[#004d3b] rounded transition-all shadow-xs cursor-pointer shrink-0"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export NAAC / NIRF Excel
              </button>
            </div>

            {/* Table */}
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-xs text-[#1e293b] border-collapse">
                <thead>
                  <tr className="bg-[#f8fafc] text-[#475569] font-bold border-b border-[#cbd5e1]">
                    <th className="py-2.5 px-3">Year</th>
                    <th className="py-2.5 px-3">Eligible Outgoing</th>
                    <th className="py-2.5 px-3">Placed Graduates</th>
                    <th className="py-2.5 px-3 text-[#00664f]">Placement %</th>
                    <th className="py-2.5 px-3">Median CTC</th>
                    <th className="py-2.5 px-3">Sports Fed Placed</th>
                    <th className="py-2.5 px-3">Corporate Placed</th>
                    <th className="py-2.5 px-3">Govt Sports Quota</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f1f5f9]">
                  <tr className="hover:bg-[#f8fafc]">
                    <td className="py-3 px-3 font-bold text-[#102d4d]">2025–26 (Current)</td>
                    <td className="py-3 px-3 font-semibold">387</td>
                    <td className="py-3 px-3 font-semibold text-[#15803d]">342</td>
                    <td className="py-3 px-3 font-extrabold text-[#00664f]">88.37%</td>
                    <td className="py-3 px-3 font-bold">₹ 8.40 LPA</td>
                    <td className="py-3 px-3">108 (31.5%)</td>
                    <td className="py-3 px-3">212 (62.0%)</td>
                    <td className="py-3 px-3">22 (6.5%)</td>
                  </tr>
                  <tr className="hover:bg-[#f8fafc]">
                    <td className="py-3 px-3 font-bold text-[#102d4d]">2024–25</td>
                    <td className="py-3 px-3 font-semibold">340</td>
                    <td className="py-3 px-3 font-semibold text-[#15803d]">298</td>
                    <td className="py-3 px-3 font-extrabold text-[#00664f]">87.65%</td>
                    <td className="py-3 px-3 font-bold">₹ 7.35 LPA</td>
                    <td className="py-3 px-3">92 (30.8%)</td>
                    <td className="py-3 px-3">188 (63.1%)</td>
                    <td className="py-3 px-3">18 (6.1%)</td>
                  </tr>
                  <tr className="hover:bg-[#f8fafc]">
                    <td className="py-3 px-3 font-bold text-[#102d4d]">2023–24</td>
                    <td className="py-3 px-3 font-semibold">295</td>
                    <td className="py-3 px-3 font-semibold text-[#15803d]">251</td>
                    <td className="py-3 px-3 font-extrabold text-[#00664f]">85.08%</td>
                    <td className="py-3 px-3 font-bold">₹ 6.80 LPA</td>
                    <td className="py-3 px-3">76 (30.2%)</td>
                    <td className="py-3 px-3">160 (63.7%)</td>
                    <td className="py-3 px-3">15 (6.0%)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-3 bg-[#eef3ff] rounded border border-[#d6e3fb] text-[11px] text-[#29466d] flex items-center justify-between">
              <span>
                • In compliance with Section 4.3.6.4 FR-PLA-06, all graduating students transition directly from SIS into alumni records upon graduation clearance.
              </span>
              <span className="font-bold">DPDP Act 2023 Compliant</span>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================================
          MODALS
          ====================================================================== */}
      {/* 1. SCHEDULE CAMPUS DRIVE MODAL */}
      {isDriveModalOpen && (
        <DriveModal
          onClose={() => setIsDriveModalOpen(false)}
          onSubmit={handleCreateDrive}
        />
      )}

      {/* 2. POST OPPORTUNITY MODAL */}
      {isJobModalOpen && (
        <JobModal
          onClose={() => setIsJobModalOpen(false)}
          onSubmit={handleCreateJob}
        />
      )}

      {/* 3. CANDIDATE DOSSIER MODAL */}
      {selectedCandidate && (
        <CandidateModal
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          onShortlist={() => {
            handleShortlistCandidate(selectedCandidate.id);
            setSelectedCandidate(null);
          }}
        />
      )}

      {/* 4. NAAC MIS EXPORT MODAL */}
      {isMisModalOpen && (
        <MisExportModal
          onClose={() => setIsMisModalOpen(false)}
          onExport={handleExportNaacExcel}
        />
      )}
    </div>
  );
}

// ============================================================================
// MODAL COMPONENTS (Self-contained in file)
// ============================================================================

function DriveModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (drive: RecruitmentDrive) => void;
}) {
  const [companyName, setCompanyName] = useState("");
  const [roleTitle, setRoleTitle] = useState("");
  const [industrySector, setIndustrySector] = useState("Elite Sports Infrastructure & Tech");
  const [packageCTC, setPackageCTC] = useState("₹ 10.00 LPA");
  const [location, setLocation] = useState("Patiala / NCR");
  const [driveDate, setDriveDate] = useState("10 Apr 2026");
  const [minCgpa, setMinCgpa] = useState("7.0");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !roleTitle) return;

    const newDrive: RecruitmentDrive = {
      id: `DRV-2026-${Math.floor(100 + Math.random() * 900)}`,
      companyName,
      companyLogo: "/Icon (6).png",
      industrySector,
      roleTitle,
      packageCTC,
      location,
      driveDate,
      minCgpa: parseFloat(minCgpa) || 6.5,
      eligibleDegrees: ["B.P.Ed", "M.Sc Sports Science"],
      sportsDisciplineBonus: "State / Inter-University Representation",
      status: "Active",
      applicantsCount: 0,
      shortlistedCount: 0,
      offersCount: 0,
      rounds: ["Screening", "Technical Practical", "HR Interview"],
    };
    onSubmit(newDrive);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full p-5 border border-[#cbd5e1] animate-scale-up">
        <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0]">
          <h3 className="text-base font-bold text-[#102d4d]">
            Schedule Corporate / Sports Campus Drive
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 font-bold text-lg"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="block text-xs font-bold text-[#334155] mb-1">
              Recruiter / Organization Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Inspire Institute of Sport / PUMA"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full text-xs border border-[#cbd5e1] rounded px-3 py-2 focus:ring-1 focus:ring-[#102d4d]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#334155] mb-1">
                Role Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Sports Analyst"
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                className="w-full text-xs border border-[#cbd5e1] rounded px-3 py-2 focus:ring-1 focus:ring-[#102d4d]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#334155] mb-1">
                Package (CTC) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. ₹ 9.50 LPA"
                value={packageCTC}
                onChange={(e) => setPackageCTC(e.target.value)}
                className="w-full text-xs border border-[#cbd5e1] rounded px-3 py-2 focus:ring-1 focus:ring-[#102d4d]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#334155] mb-1">
                Drive Date
              </label>
              <input
                type="text"
                value={driveDate}
                onChange={(e) => setDriveDate(e.target.value)}
                className="w-full text-xs border border-[#cbd5e1] rounded px-3 py-2 focus:ring-1 focus:ring-[#102d4d]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#334155] mb-1">
                Cut-off CGPA
              </label>
              <input
                type="number"
                step="0.1"
                value={minCgpa}
                onChange={(e) => setMinCgpa(e.target.value)}
                className="w-full text-xs border border-[#cbd5e1] rounded px-3 py-2 focus:ring-1 focus:ring-[#102d4d]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#334155] mb-1">
              Location / Mode
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full text-xs border border-[#cbd5e1] rounded px-3 py-2 focus:ring-1 focus:ring-[#102d4d]"
            />
          </div>

          <div className="pt-3 border-t border-[#e2e8f0] flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-semibold text-[#64748b] hover:bg-[#f1f5f9] rounded cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-bold text-white bg-[#102d4d] hover:bg-[#0c233c] rounded shadow-xs cursor-pointer"
            >
              Schedule Drive
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function JobModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (job: JobPosting) => void;
}) {
  const [title, setTitle] = useState("");
  const [organization, setOrganization] = useState("");
  const [type, setType] = useState<JobPosting["type"]>("Full-Time");
  const [location, setLocation] = useState("Punjab / Delhi NCR");
  const [packageOrStipend, setPackageOrStipend] = useState("₹ 8.00 LPA");
  const [deadline, setDeadline] = useState("20 Apr 2026");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !organization) return;

    const newJob: JobPosting = {
      id: `JOB-2026-${Math.floor(100 + Math.random() * 900)}`,
      title,
      organization,
      type,
      location,
      packageOrStipend,
      deadline,
      vacancies: 3,
      tags: ["High-Performance", "Campus Verified"],
      description: description || "Immediate opening for university graduates with sports credentials.",
    };
    onSubmit(newJob);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full p-5 border border-[#cbd5e1] animate-scale-up">
        <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0]">
          <h3 className="text-base font-bold text-[#102d4d]">
            Post New Opportunity / Sports Quota
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 font-bold text-lg"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="block text-xs font-bold text-[#334155] mb-1">
              Opportunity / Role Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Strength & Conditioning Coach"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs border border-[#cbd5e1] rounded px-3 py-2 focus:ring-1 focus:ring-[#102d4d]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#334155] mb-1">
                Hiring Organization *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. SAI / Tata Trusts"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="w-full text-xs border border-[#cbd5e1] rounded px-3 py-2 focus:ring-1 focus:ring-[#102d4d]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#334155] mb-1">
                Opportunity Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as JobPosting["type"])}
                className="w-full text-xs border border-[#cbd5e1] rounded px-3 py-2 bg-white"
              >
                <option value="Full-Time">Full-Time</option>
                <option value="High-Performance Fellowship">Fellowship</option>
                <option value="Summer Internship">Summer Internship</option>
                <option value="Govt Sports Quota">Govt Sports Quota</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#334155] mb-1">
                Package / Stipend
              </label>
              <input
                type="text"
                value={packageOrStipend}
                onChange={(e) => setPackageOrStipend(e.target.value)}
                className="w-full text-xs border border-[#cbd5e1] rounded px-3 py-2 focus:ring-1 focus:ring-[#102d4d]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#334155] mb-1">
                Application Deadline
              </label>
              <input
                type="text"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full text-xs border border-[#cbd5e1] rounded px-3 py-2 focus:ring-1 focus:ring-[#102d4d]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#334155] mb-1">
              Role Summary &amp; Eligibility
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief details of responsibilities and sport requirements..."
              className="w-full text-xs border border-[#cbd5e1] rounded px-3 py-2 focus:ring-1 focus:ring-[#102d4d]"
            />
          </div>

          <div className="pt-3 border-t border-[#e2e8f0] flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-semibold text-[#64748b] hover:bg-[#f1f5f9] rounded cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-bold text-white bg-[#00664f] hover:bg-[#00523f] rounded shadow-xs cursor-pointer"
            >
              Post Opportunity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function CandidateModal({
  candidate,
  onClose,
  onShortlist,
}: {
  candidate: StudentCandidate;
  onClose: () => void;
  onShortlist: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full p-5 border border-[#cbd5e1] animate-scale-up">
        <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0]">
          <h3 className="text-base font-bold text-[#102d4d]">
            Verified Athlete Candidate Dossier
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 font-bold text-lg"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-3 p-3 bg-[#f8fafc] rounded-lg border border-[#e2e8f0]">
            <img
              src={candidate.avatar}
              alt=""
              className="w-16 h-16 rounded-full object-cover border-2 border-[#102d4d]"
            />
            <div>
              <h4 className="text-base font-bold text-[#102d4d]">
                {candidate.name}
              </h4>
              <p className="text-xs text-[#596979]">
                Roll No: {candidate.rollNo} • {candidate.degree}
              </p>
              <p className="text-xs font-extrabold text-[#00664f]">
                Cumulative Grade Point Average: {candidate.cgpa} / 10.0
              </p>
            </div>
          </div>

          <div className="p-3 bg-[#fffbeb] rounded border border-[#fde68a]">
            <span className="text-[10px] font-bold text-[#92400e] uppercase">
              Athletic Record &amp; Medals (SIS Synchronized)
            </span>
            <p className="text-xs font-bold text-[#78350f] mt-1">
              {candidate.sport}: {candidate.sportsAchievement}
            </p>
          </div>

          <div>
            <span className="text-xs font-bold text-[#334155]">
              Validated Competencies &amp; Lab Certifications:
            </span>
            <div className="flex flex-wrap gap-1 mt-1.5">
              {candidate.skills.map((s, idx) => (
                <span
                  key={idx}
                  className="bg-[#eef3ff] text-[#102d4d] px-2 py-0.5 rounded text-xs font-semibold"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="p-2.5 bg-[#f1f5f9] rounded text-[11px] text-[#475569] flex items-center justify-between">
            <span>📄 {candidate.resumeFileName}</span>
            <span className="font-bold text-[#00664f]">e-Sign Verified ✓</span>
          </div>

          <div className="pt-3 border-t border-[#e2e8f0] flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-semibold text-[#64748b] hover:bg-[#f1f5f9] rounded cursor-pointer"
            >
              Close
            </button>
            {candidate.placementStatus !== "Placed" && (
              <button
                type="button"
                onClick={onShortlist}
                className="px-4 py-1.5 text-xs font-bold text-white bg-[#00664f] hover:bg-[#004d3b] rounded shadow-xs cursor-pointer"
              >
                Shortlist for Active Drive
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MisExportModal({
  onClose,
  onExport,
}: {
  onClose: () => void;
  onExport: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-5 border border-[#cbd5e1] animate-scale-up">
        <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0]">
          <h3 className="text-base font-bold text-[#102d4d]">
            NAAC Metric 5.2.1 / NIRF Export
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 font-bold text-lg"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 space-y-3 text-xs text-[#334155]">
          <p>
            Generate official University statutory placement datasets for NAAC SSR / AQAR Criterion 5 (Student Support and Progression) and NIRF India Rankings.
          </p>

          <div className="p-3 bg-[#f8fafc] rounded border border-[#e2e8f0] space-y-1">
            <div className="flex justify-between font-medium">
              <span>Selected Cohort:</span>
              <span className="font-bold text-[#102d4d]">2025–26 (Convocation Batch)</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Overall Placement:</span>
              <span className="font-bold text-[#00664f]">88.37% (342 / 387 Placed)</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Median Compensation:</span>
              <span className="font-bold text-[#102d4d]">₹ 8.40 LPA</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Format:</span>
              <span className="font-bold text-[#64748b]">Microsoft Excel (.xlsx)</span>
            </div>
          </div>

          <div className="pt-3 border-t border-[#e2e8f0] flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-semibold text-[#64748b] hover:bg-[#f1f5f9] rounded cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onExport}
              className="px-4 py-1.5 text-xs font-bold text-white bg-[#00664f] hover:bg-[#004d3b] rounded shadow-xs cursor-pointer"
            >
              Download Official Excel File
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
