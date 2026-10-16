"use client";

import AddStudent from "@/components/AddStudent";
import Link from "next/link";
import { useMemo, useRef, useState, type DragEvent } from "react";

export default function HostelPage() {
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [showOutPassPage, setShowOutPassPage] = useState(false);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFloor, setSelectedFloor] = useState("Floor 01");
  const [roomFilter, setRoomFilter] = useState("All");
  const [showRoomFilter, setShowRoomFilter] = useState(false);
  const [selectedBed, setSelectedBed] = useState<{
    room: string;
    bed: string;
  } | null>(null);

  const [athleteName, setAthleteName] = useState("");
  const [athleteId, setAthleteId] = useState("");
  const [athleteSport, setAthleteSport] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  type PassStatus = "Pending" | "Approved" | "Rejected";

  type PassRequest = {
    id: number;
    name: string;
    athleteId: string;
    sport: string;
    hostel: string;
    room: string;
    purpose: string;
    destination: string;
    outTime: string;
    returnTime: string;
    status: PassStatus;
    photo: string;
  };

  const [passRequests, setPassRequests] = useState<PassRequest[]>([
    {
      id: 1,
      name: "Rahul Kumar",
      athleteId: "ATH-2025-102",
      sport: "Athletics (100m)",
      hostel: "Milkha Singh",
      room: "Room 202-B",
      purpose: "Training Camp",
      destination: "National Sports Complex",
      outTime: "14:30",
      returnTime: "18:30",
      status: "Pending",
      photo: "/rahul.jpg",
    },

    {
      id: 2,
      name: "Navneet Kaur",
      athleteId: "ATH-2025-087",
      sport: "Boxing (Flyweight)",
      hostel: "Rani Rampal",
      room: "Room 203-A",
      purpose: "Medical",
      destination: "Rajindra Hospital",
      outTime: "15:00",
      returnTime: "20:00",
      status: "Pending",
      photo: "/navneet.jpg",
    },

    {
      id: 3,
      name: "Aman Verma",
      athleteId: "ATH-2025-095",
      sport: "Track (400m)",
      hostel: "Dhyan Chand",
      room: "Room 101-B",
      purpose: "Home Leave",
      destination: "Jalandhar",
      outTime: "16:00",
      returnTime: "22:00",
      status: "Pending",
      photo: "/aman.jpg",
    },

    {
      id: 4,
      name: "Simranjit Kaur",
      athleteId: "ATH-2025-111",
      sport: "Weightlifting (71kg)",
      hostel: "Milkha Singh",
      room: "Room 202-A",
      purpose: "Tournament",
      destination: "Lucknow (Nationals)",
      outTime: "13:45",
      returnTime: "21:00",
      status: "Pending",
      photo: "/simranjit.jpg",
    },

    {
      id: 5,
      name: "Harmanjot Singh",
      athleteId: "ATH-2025-076",
      sport: "Shot Put / Throws",
      hostel: "Balbir Singh",
      room: "Room 301-B",
      purpose: "Medical",
      destination: "MRI Scan (Rajindra)",
      outTime: "12:30",
      returnTime: "18:00",
      status: "Approved",
      photo: "/harman.jpg",
    },
    {
      id: 6,
      name: "Gurpreet Singh",
      athleteId: "ATH-2025-104",
      sport: "Wrestling (74kg)",
      hostel: "Dhyan Chand",
      room: "Room 105-A",
      purpose: "State Trials",
      destination: "Ludhiana Sports Complex",
      outTime: "11:00",
      returnTime: "19:00",
      status: "Pending",
      photo: "/gurpreet.jpg",
    },
    {
      id: 7,
      name: "Jasleen Kaur",
      athleteId: "ATH-2025-063",
      sport: "Archery (Recurve)",
      hostel: "Rani Rampal",
      room: "Room 112-B",
      purpose: "Equipment Service",
      destination: "Sector 17, Chandigarh",
      outTime: "10:30",
      returnTime: "16:00",
      status: "Pending",
      photo: "/profile.jpg",
    },
    {
      id: 8,
      name: "Manpreet Sharma",
      athleteId: "ATH-2025-082",
      sport: "Hockey (Midfield)",
      hostel: "Milkha Singh",
      room: "Room 304-A",
      purpose: "Family Visit",
      destination: "Amritsar",
      outTime: "08:00",
      returnTime: "22:00",
      status: "Approved",
      photo: "/rahul.jpg",
    },
    {
      id: 9,
      name: "Sneha Verma",
      athleteId: "ATH-2025-119",
      sport: "Shooting (10m Air Rifle)",
      hostel: "Rani Rampal",
      room: "Room 208-B",
      purpose: "National Camp",
      destination: "Dr. Karni Singh Range, Delhi",
      outTime: "06:00",
      returnTime: "21:30",
      status: "Pending",
      photo: "/navneet.jpg",
    },
    {
      id: 10,
      name: "Devinder Gill",
      athleteId: "ATH-2025-055",
      sport: "Javelin Throw",
      hostel: "Balbir Singh",
      room: "Room 204-B",
      purpose: "Physiotherapy",
      destination: "Fortis Escorts Hospital",
      outTime: "15:30",
      returnTime: "19:30",
      status: "Pending",
      photo: "/aman.jpg",
    },
  ]);

  const [outPassSearch, setOutPassSearch] = useState("");
  const [outPassFilter, setOutPassFilter] = useState("All Status");

  /* ================= SEARCH + FILTER ================= */
  type BedStatus = "occupied" | "vacant" | "reserved" | "maintenance";

  type Bed = {
    id: string;
    status: BedStatus;
    name?: string;
    athleteId?: string;
    sport?: string;
    roster?: string;
    arrival?: string;
    ticket?: string;
  };

  type Room = {
    id: string;
    floor: string;
    type: string;
    status: "occupied" | "vacant" | "reserved" | "maintenance";
    statusText: string;
    beds: Bed[];
  };
  const [rooms, setRooms] = useState<Room[]>([
    // ================= FLOOR 01 =================
    {
      id: "201",
      floor: "Floor 01",
      type: "DOUBLE",
      status: "occupied",
      statusText: "Full Occupancy",
      beds: [
        {
          id: "201-A",
          status: "occupied",
          name: "Gurpreet Singh",
          athleteId: "MBS-9421",
          sport: "Weightlifting (89kg)",
        },
        {
          id: "201-B",
          status: "occupied",
          name: "Aman Verma",
          athleteId: "MBS-8832",
          sport: "Track (400m Sprinter)",
        },
      ],
    },

    {
      id: "202",
      floor: "Floor 01",
      type: "DOUBLE",
      status: "vacant",
      statusText: "1 Vacancy",
      beds: [
        {
          id: "202-A",
          status: "occupied",
          name: "Navneet Kaur",
          athleteId: "MBS-7704",
          sport: "Boxing (Flyweight)",
        },
        {
          id: "202-B",
          status: "vacant",
        },
      ],
    },

    {
      id: "203",
      floor: "Floor 01",
      type: "DOUBLE",
      status: "reserved",
      statusText: "SAI National Camp",
      beds: [
        {
          id: "203-A",
          status: "reserved",
          roster: "Camp Roster #24",
          arrival: "12-Nov",
        },
        {
          id: "203-B",
          status: "reserved",
          roster: "Camp Roster #25",
          arrival: "12-Nov",
        },
      ],
    },

    {
      id: "204",
      floor: "Floor 01",
      type: "DOUBLE",
      status: "maintenance",
      statusText: "HVAC Servicing",
      beds: [
        {
          id: "204-A",
          status: "maintenance",
          ticket: "#MNT-9102",
        },
        {
          id: "204-B",
          status: "maintenance",
          ticket: "#MNT-9102",
        },
      ],
    },

    // ================= FLOOR 02 =================
    {
      id: "301",
      floor: "Floor 02 (Elite Athletes Wing)",
      type: "DOUBLE",
      status: "vacant",
      statusText: "2 Vacancies",
      beds: [
        {
          id: "301-A",
          status: "vacant",
        },
        {
          id: "301-B",
          status: "vacant",
        },
      ],
    },

    {
      id: "302",
      floor: "Floor 02 (Elite Athletes Wing)",
      type: "DOUBLE",
      status: "occupied",
      statusText: "Full Occupancy",
      beds: [
        {
          id: "302-A",
          status: "occupied",
          name: "Harpreet Singh",
          athleteId: "MBS-8211",
          sport: "Athletics",
        },
        {
          id: "302-B",
          status: "occupied",
          name: "Manpreet Sharma",
          athleteId: "MBS-8455",
          sport: "Archery",
        },
      ],
    },

    {
      id: "303",
      floor: "Floor 02 (Elite Athletes Wing)",
      type: "DOUBLE",
      status: "reserved",
      statusText: "National Camp",
      beds: [
        {
          id: "303-A",
          status: "reserved",
          roster: "Camp Roster #30",
          arrival: "15-Nov",
        },
        {
          id: "303-B",
          status: "reserved",
          roster: "Camp Roster #31",
          arrival: "15-Nov",
        },
      ],
    },

    {
      id: "304",
      floor: "Floor 02 (Elite Athletes Wing)",
      type: "DOUBLE",
      status: "vacant",
      statusText: "2 Vacancies",
      beds: [
        {
          id: "304-A",
          status: "vacant",
        },
        {
          id: "304-B",
          status: "vacant",
        },
      ],
    },

    // ================= FLOOR 03 =================
    {
      id: "401",
      floor: "Floor 03",
      type: "DOUBLE",
      status: "occupied",
      statusText: "Full Occupancy",
      beds: [
        {
          id: "401-A",
          status: "occupied",
          name: "Simranjit Kaur",
          athleteId: "MBS-9912",
          sport: "Weightlifting (71kg)",
        },
        {
          id: "401-B",
          status: "occupied",
          name: "Harmanjot Singh",
          athleteId: "MBS-7821",
          sport: "Shot Put / Throws",
        },
      ],
    },

    {
      id: "402",
      floor: "Floor 03",
      type: "DOUBLE",
      status: "vacant",
      statusText: "1 Vacancy",
      beds: [
        {
          id: "402-A",
          status: "occupied",
          name: "Sunita Devi",
          athleteId: "MBS-6643",
          sport: "Judo (63kg)",
        },
        {
          id: "402-B",
          status: "vacant",
        },
      ],
    },

    {
      id: "403",
      floor: "Floor 03",
      type: "DOUBLE",
      status: "reserved",
      statusText: "National Camp",
      beds: [
        {
          id: "403-A",
          status: "reserved",
          roster: "Camp Roster #40",
          arrival: "18-Nov",
        },
        {
          id: "403-B",
          status: "reserved",
          roster: "Camp Roster #41",
          arrival: "18-Nov",
        },
      ],
    },

    {
      id: "404",
      floor: "Floor 03",
      type: "DOUBLE",
      status: "maintenance",
      statusText: "Electrical Servicing",
      beds: [
        {
          id: "404-A",
          status: "maintenance",
          ticket: "#MNT-9204",
        },
        {
          id: "404-B",
          status: "maintenance",
          ticket: "#MNT-9204",
        },
      ],
    },
  ]);

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const floorMatch = room.floor === selectedFloor;

      const filterMatch = roomFilter === "All" || room.status === roomFilter;

      return floorMatch && filterMatch;
    });
  }, [rooms, selectedFloor, roomFilter]);

  const handleAllotBed = () => {
    if (!selectedBed) {
      return;
    }

    if (!athleteName || !athleteId || !athleteSport) {
      alert("Please enter athlete name, ID and sport.");
      return;
    }

    setRooms((previousRooms) =>
      previousRooms.map((room) => {
        if (room.id !== selectedBed.room) {
          return room;
        }

        const updatedBeds = room.beds.map((bed) => {
          if (bed.id !== selectedBed.bed) {
            return bed;
          }

          return {
            ...bed,
            status: "occupied" as BedStatus,
            name: athleteName,
            athleteId,
            sport: athleteSport,
          };
        });

        const vacantBeds = updatedBeds.filter(
          (bed) => bed.status === "vacant",
        ).length;

        return {
          ...room,
          beds: updatedBeds,
          status: vacantBeds === 0 ? "occupied" : "vacant",
          statusText:
            vacantBeds === 0
              ? "Full Occupancy"
              : `${vacantBeds} Vacancy${vacantBeds > 1 ? "ies" : ""}`,
        };
      }),
    );

    setSelectedBed(null);
    setAthleteName("");
    setAthleteId("");
    setAthleteSport("");

    alert("Bed allotted successfully.");
  };
  const filteredPassRequests = useMemo(() => {
    const searchText = outPassSearch.toLowerCase().trim();

    return passRequests.filter((request) => {
      const matchesSearch =
        request.name.toLowerCase().includes(searchText) ||
        request.athleteId.toLowerCase().includes(searchText) ||
        request.purpose.toLowerCase().includes(searchText);

      const matchesFilter =
        outPassFilter === "All Status" || request.status === outPassFilter;

      return matchesSearch && matchesFilter;
    });
  }, [passRequests, outPassSearch, outPassFilter]);

  /* ================= APPROVE ================= */

  const handleApprove = (id: number) => {
    setPassRequests((previousRequests) =>
      previousRequests.map((request) =>
        request.id === id
          ? {
            ...request,
            status: "Approved",
          }
          : request,
      ),
    );
  };

  /* ================= REJECT ================= */

  const handleReject = (id: number) => {
    setPassRequests((previousRequests) =>
      previousRequests.map((request) =>
        request.id === id
          ? {
            ...request,
            status: "Rejected",
          }
          : request,
      ),
    );
  };

  /* ================= EXCEL FILE ================= */

  const handleFile = (file: File) => {
    const isExcel =
      file.name.toLowerCase().endsWith(".xlsx") ||
      file.name.toLowerCase().endsWith(".xls");

    if (!isExcel) {
      alert("Please upload an Excel file (.xlsx or .xls)");
      return;
    }

    setSelectedFile(file);
  };

  /* ================= DRAG & DROP ================= */

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    setIsDragging(false);

    const file = e.dataTransfer.files[0];

    if (file) {
      handleFile(file);
    }
  };

  /* ================= EXCEL UPLOAD ================= */

  const handleUpload = () => {
    if (!selectedFile) {
      alert("Please select an Excel file first.");
      return;
    }

    alert(`${selectedFile.name} selected successfully.`);

    console.log("Excel file:", selectedFile);

    setSelectedFile(null);
    setShowBulkUpload(false);
  };
  const handleVacateBed = (roomId: string, bedId: string) => {
    const confirmVacate = window.confirm(
      "Are you sure you want to vacate this bed?",
    );

    if (!confirmVacate) {
      return;
    }

    setRooms((previousRooms) =>
      previousRooms.map((room) => {
        if (room.id !== roomId) {
          return room;
        }

        const updatedBeds = room.beds.map((bed) => {
          if (bed.id !== bedId) {
            return bed;
          }

          return {
            id: bed.id,
            status: "vacant" as BedStatus,
          };
        });

        const vacantBeds = updatedBeds.filter(
          (bed) => bed.status === "vacant",
        ).length;

        return {
          ...room,
          beds: updatedBeds,
          status: vacantBeds > 0 ? "vacant" : "occupied",
          statusText:
            vacantBeds > 0 ? `${vacantBeds} Vacancy` : "Full Occupancy",
        };
      }),
    );
  };
  const handleRemoveReservation = (roomId: string) => {
    const confirmRemove = window.confirm(
      "Are you sure you want to remove this room reservation?",
    );

    if (!confirmRemove) {
      return;
    }

    setRooms((previousRooms) =>
      previousRooms.map((room) => {
        if (room.id !== roomId) {
          return room;
        }

        return {
          ...room,
          status: "vacant",
          statusText: "Available",
          beds: room.beds.map((bed) => ({
            ...bed,
            status: "vacant" as BedStatus,
            name: undefined,
            athleteId: undefined,
            sport: undefined,
            roster: undefined,
            arrival: undefined,
            ticket: undefined,
          })),
        };
      }),
    );

    alert("Room reservation removed successfully.");
  };
  return (
    <>
      {showOutPassPage ? (
        <div className="outpass-page">
          <div className="outpass-header">
            <div>
              <span className="outpass-label">
                SUITE F: RESIDENTIAL & ATHLETE DINING
              </span>

              <h2>Digital Out-Pass Authorization</h2>

              <p>
                Biometric out-pass authorization and residential movement
                management.
              </p>
            </div>

            <button
              type="button"
              className="outpass-back"
              onClick={() => setShowOutPassPage(false)}
            >
              ← Back to Hostel
            </button>
          </div>
          <section className="passrequests" id="passrequests">
            <div className="passrequests-header">
              <div className="passrequests-title">
                <h2>☷ Pass Requests</h2>
                <span className="pass-request-counter">
                  {filteredPassRequests.length} {filteredPassRequests.length === 1 ? "Request" : "Requests"}
                </span>
              </div>

              <div className="passrequests-controls">
                <div className="pass-search">
                  <input
                    type="text"
                    placeholder="Search by name, ID or purpose..."
                    value={outPassSearch}
                    onChange={(e) => setOutPassSearch(e.target.value)}
                  />

                  <span>⌕</span>
                </div>

                <select
                  className="pass-status-filter"
                  value={outPassFilter}
                  onChange={(e) => setOutPassFilter(e.target.value)}
                >
                  <option value="All Status">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="pass-table-wrapper">
              <table className="pass-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Photo</th>
                    <th>Student Info</th>
                    <th>Hostel / Room</th>
                    <th>Purpose & Destination</th>

                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredPassRequests.length > 0 ? (
                    filteredPassRequests.map((request, index) => (
                      <tr key={request.id}>
                        <td>{index + 1}</td>

                        <td>
                          <img
                            src={request.photo}
                            alt={request.name}
                            className="pass-student-photo"
                          />
                        </td>

                        <td>
                          <div className="pass-student-info">
                            <strong>{request.name}</strong>
                            <span>{request.athleteId}</span>
                            <small>{request.sport}</small>
                          </div>
                        </td>

                        <td>
                          <div className="pass-hostel-info">
                            <strong>{request.hostel}</strong>
                            <span>{request.room}</span>
                          </div>
                        </td>

                        <td>
                          <div className="pass-purpose">
                            <strong>{request.purpose}</strong>
                            <span>{request.destination}</span>
                          </div>
                        </td>

                        <td>
                          <span
                            className={`pass-status ${request.status.toLowerCase()}`}
                          >
                            {request.status}
                          </span>
                        </td>

                        <td>
                          {request.status === "Pending" ? (
                            <div className="pass-actions">
                              <button
                                type="button"
                                className="approve-button"
                                onClick={() => handleApprove(request.id)}
                              >
                                ✓ Approve
                              </button>

                              <button
                                type="button"
                                className="reject-button"
                                onClick={() => handleReject(request.id)}
                              >
                                × Reject
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              className="view-pass-button"
                              onClick={() =>
                                alert(
                                  `Student: ${request.name}\nPass Status: ${request.status}\nPurpose: ${request.purpose}\nDestination: ${request.destination}`,
                                )
                              }
                            >
                              ◉ View
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="no-pass-results">
                        No pass requests found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="pass-table-footer">
              <span className="pass-footer-count">
                Showing <strong>{filteredPassRequests.length}</strong> of <strong>{passRequests.length}</strong> requests
              </span>
              {filteredPassRequests.length > 5 && (
                <span className="pass-slider-indicator">
                  <span className="pass-slider-icon">⇅</span> Use vertical slider to scroll through requests
                </span>
              )}
            </div>
          </section>
        </div>
      ) : (
        <div className="hostel-container">
          <div className="top">
            <div className="leftside">
              <div className="sync">
                <h3>SUITE F: RESIDENTIAL & ATHLETE DINING</h3>
                <span className="complaint">FR-HOS-01/08 COMPLIANT</span>
                <span className="live">
                  <span className="live-dot"></span>
                  LIVE SYNC
                </span>{" "}
              </div>
              <h2>
                Hostel Room/Bed Matrix & High-Performance Athlete Mess Vault
              </h2>
              <h4>
                Sovereign athlete residential allocation, biometric out-pass
                authorization engine, and sports science discipline caloric
                dispensation.
              </h4>
            </div>
            {/* Right Column: Statutory Action Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-center gap-1.5 sm:gap-2.5 shrink-0">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {/* Button 1: Issue Digital Out-Pass */}
                <button
                  type="button"
                  onClick={() => setShowOutPassPage(true)}
                  className="inline-flex h-[28px] sm:h-[34px] lg:h-[36px] items-center gap-1.5 sm:gap-2 rounded-[3px] sm:rounded-[4px] bg-[#FE932C] hover:bg-[#f59220] hover:brightness-105 hover:-translate-y-0.5 hover:shadow-[0px_6px_16px_rgba(0,18,41,0.14)] active:scale-[0.98] active:translate-y-0 px-2 sm:px-2.5 lg:px-3 font-['Inter',sans-serif] text-[9.5px] sm:text-[10.5px] lg:text-[11px] font-bold text-[#663500] leading-none transition-all duration-200 ease-out shadow-xs cursor-pointer"
                >
                  <img
                    src="/Container (7).png"
                    alt=""
                    className="object-contain w-[12px] h-[12px] sm:w-[15px] sm:h-[15px]"
                  />
                  Issue Digital Out-Pass
                </button>

                {/* Button 2: Add Student */}
                <button
                  type="button"
                  onClick={() => setShowAddStudent(true)}
                  className="inline-flex h-[28px] sm:h-[34px] lg:h-[36px] items-center gap-1.5 sm:gap-2 rounded-[3px] sm:rounded-[4px] bg-[#dce8fb] hover:bg-[#ccdcf5] hover:brightness-105 hover:-translate-y-0.5 hover:shadow-[0px_6px_16px_rgba(0,18,41,0.14)] active:scale-[0.98] active:translate-y-0 px-2 sm:px-2.5 lg:px-3 font-['Inter',sans-serif] text-[9.5px] sm:text-[10.5px] lg:text-[11px] font-bold text-[#102d4d] leading-none border border-[#c0d5f5] transition-all duration-200 ease-out shadow-xs cursor-pointer"
                >
                  <img
                    src="/add-user.png"
                    alt=""
                    className="object-contain w-[12px] h-[12px] sm:w-[15px] sm:h-[15px]"
                  />
                  Add Student
                </button>
              </div>

              {/* Button 3: Bulk Bed Allocation */}
              <button
                type="button"
                onClick={() => setShowBulkUpload(true)}
                className="inline-flex h-[28px] sm:h-[34px] lg:h-[36px] items-center gap-1.5 sm:gap-2 rounded-[3px] sm:rounded-[4px] bg-[#062344] hover:bg-[#0c3361] hover:brightness-105 hover:-translate-y-0.5 hover:shadow-[0px_6px_16px_rgba(0,18,41,0.14)] active:scale-[0.98] active:translate-y-0 px-2 sm:px-2.5 lg:px-3 font-['Inter',sans-serif] text-[9.5px] sm:text-[10.5px] lg:text-[11px] font-bold text-white leading-none transition-all duration-200 ease-out shadow-xs cursor-pointer"
              >
                <img
                  src="/bulk.png"
                  alt=""
                  className="object-contain w-[12px] h-[12px] sm:w-[15px] sm:h-[15px]"
                />
                Bulk Bed Allocation
              </button>
            </div>

          </div>

          {showAddStudent && (
            <AddStudent onClose={() => setShowAddStudent(false)} />
          )}

          {showBulkUpload && (
            <div className="bulk-upload-overlay">
              <div className="bulk-upload-modal">
                {/* HEADER */}
                <div className="bulk-upload-header">
                  <div>
                    <h3>Bulk Bed Allocation</h3>

                    <p>Upload Excel sheet to allocate beds in bulk</p>
                  </div>

                  <button
                    type="button"
                    className="bulk-upload-close"
                    onClick={() => {
                      setShowBulkUpload(false);
                      setSelectedFile(null);
                    }}
                  >
                    ×
                  </button>
                </div>

                {/* UPLOAD AREA */}
                <div className="bulk-upload-content">
                  <div
                    className={`excel-drop-zone ${isDragging ? "excel-drop-zone-active" : ""
                      }`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => {
                      setIsDragging(false);
                    }}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="excel-upload-icon">📊</div>

                    <h4>Drag & Drop your Excel file here</h4>

                    <p>or</p>

                    <button
                      type="button"
                      className="browse-excel-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                    >
                      Browse File
                    </button>

                    <span>Supported formats: .xlsx, .xls</span>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".xlsx,.xls"
                      hidden
                      onChange={(e) => {
                        const file = e.target.files?.[0];

                        if (file) {
                          handleFile(file);
                        }
                      }}
                    />
                  </div>

                  {/* SELECTED FILE */}
                  {selectedFile && (
                    <div className="selected-excel-file">
                      <div className="selected-file-info">
                        <span className="file-icon">📄</span>

                        <div>
                          <strong>{selectedFile.name}</strong>

                          <small>
                            {(selectedFile.size / 1024).toFixed(1)} KB
                          </small>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="remove-excel-file"
                        onClick={() => setSelectedFile(null)}
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>

                {/* FOOTER BUTTONS */}
                <div className="bulk-upload-footer">
                  <button
                    type="button"
                    className="bulk-cancel-button"
                    onClick={() => {
                      setShowBulkUpload(false);
                      setSelectedFile(null);
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="bulk-upload-button"
                    disabled={!selectedFile}
                    onClick={handleUpload}
                  >
                    Upload & Allocate
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="cards">
            <div className="card residents">
              <div className="card-header">
                <span>TOTAL HOSTEL RESIDENTS</span>
                <img src="/bed-icon.png" alt="" />
              </div>
              <div className="card-value">
                1,420 <span className="card-sub">/1,500</span>
              </div>
              <div className="card-detail">
                <span>94.6% Allotted</span>
                <span>80 Vacancies</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "94.6%" }} />
              </div>
              <p className="card-footnote">
                4 Blocks: Dhyan Chand, Milkha, Rani Rampal, Balbir Sr.
              </p>
            </div>

            <div className="card outpasses">
              <div className="card-header">
                <span>ACTIVE OUT-PASSES</span>
                <img src="/runner-icon.png" alt="" />
              </div>
              <div className="card-value">
                48 <span className="card-sub live">Live Authorized</span>
              </div>
              <div className="card-detail">
                <span>32 Tournament Camp</span>
                <span className="badge-breach">0 Overdue Breach</span>
              </div>
              <p className="card-footnote">16 Official Leave</p>
            </div>

            <div className="card caloric">
              <div className="card-header">
                <span>MESS CALORIC ADHERENCE</span>
                <img src="/fork-icon.png" alt="" />
              </div>
              <div className="card-value">
                98.2% <span className="card-sub">SLA</span>
              </div>
              <div className="card-detail">
                <span>Nutritional Protocol</span>
                <span>4,200 - 5,500 kcal</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "98.2%" }} />
              </div>
              <p className="card-footnote">
                FR-NUT-03 High Protein Vault Linked
              </p>
            </div>

            <div className="card turnstiles">
              <div className="card-header">
                <span>BIOMETRIC TURNSTILES</span>
                <img src="/turnstile-icon.png" alt="" />
              </div>
              <div className="card-value">
                100% <span className="card-sub">Online</span>
              </div>
              <div className="card-detail">
                <span>
                  <span className="dot-green" />
                  12 RFID Host Gates
                </span>
                <span>Latency &lt; 140ms</span>
              </div>
            </div>
          </div>

          <div className="final">
            <div className="left">
              <div className="hostel_name">
                <div className="rooms">
                  <h3>
                    <img src="/Container (13).png" alt="" /> Room & Bed
                    Allocation Matrix (FR- HOS-01)
                  </h3>
                  <h4>
                    Target Facility: Milkha Singh Hostel (Block A) — High-
                    Performance National Camps & University Elite Wings
                  </h4>
                </div>
                <div className="floor">
                  <select
                    className="dropdown"
                    value={selectedFloor}
                    onChange={(e) => setSelectedFloor(e.target.value)}
                  >
                    <option value="Floor 01">Floor 01</option>

                    <option value="Floor 02 (Elite Athletes Wing)">
                      Floor 02 (Elite Athletes Wing)
                    </option>

                    <option value="Floor 03">Floor 03</option>
                  </select>

                  <button
                    type="button"
                    className="filter"
                    onClick={() => setShowRoomFilter(!showRoomFilter)}
                  >
                    <img src="/Button.png" alt="Filter" />
                  </button>

                  {showRoomFilter && (
                    <div className="room-filter-menu">
                      <button
                        type="button"
                        onClick={() => {
                          setRoomFilter("All");
                          setShowRoomFilter(false);
                        }}
                      >
                        All Rooms
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setRoomFilter("occupied");
                          setShowRoomFilter(false);
                        }}
                      >
                        Occupied
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setRoomFilter("vacant");
                          setShowRoomFilter(false);
                        }}
                      >
                        Vacant
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setRoomFilter("reserved");
                          setShowRoomFilter(false);
                        }}
                      >
                        Reserved
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setRoomFilter("maintenance");
                          setShowRoomFilter(false);
                        }}
                      >
                        Maintenance
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {/* ================= LEGEND BAR ================= */}

              <div className="legend-bar">
                <div className="legend-item">
                  <span className="legend-color occupied"></span>

                  <span>
                    <strong>Allotted / Occupied</strong>
                    <br />
                    (38)
                  </span>
                </div>

                <div className="legend-item">
                  <span className="legend-color reserved"></span>

                  <span>
                    <strong>Reserved National Camp</strong>
                    <br />
                    (6)
                  </span>
                </div>

                <div className="legend-item">
                  <span className="legend-color vacant"></span>

                  <span>
                    <strong>Vacant Available</strong>
                    <br />
                    (4)
                  </span>
                </div>

                <div className="legend-item">
                  <span className="legend-color maintenance"></span>

                  <span>
                    <strong>Sanction Hold / Maintenance</strong>
                    <br />
                    (2)
                  </span>
                </div>
              </div>

              {/* ================= WING CAPACITY ================= */}

              <div className="wing-capacity">Wing Capacity: 50 Beds</div>

              {/* ================= ROOM MATRIX ================= */}

              <div className="rooms-grid">
                {filteredRooms.length === 0 ? (
                  <div className="no-rooms">
                    No rooms found for the selected floor/filter.
                  </div>
                ) : (
                  filteredRooms.map((room) => (
                    <div
                      className={`room-card room-${room.status}`}
                      key={room.id}
                    >
                      {/* ROOM HEADER */}
                      <div className="room-header">
                        <h3>
                          Room {room.id}
                          <span
                            className={`room-badge ${room.status === "reserved"
                              ? "reserved-badge"
                              : room.status === "maintenance"
                                ? "maintenance-badge"
                                : ""
                              }`}
                          >
                            {room.status === "reserved"
                              ? "RESERVED"
                              : room.status === "maintenance"
                                ? "MAINTENANCE"
                                : room.type}
                          </span>
                        </h3>

                        <span className={`${room.status}-status`}>
                          {room.statusText}
                        </span>
                      </div>

                      {/* BEDS */}
                      <div className="beds">
                        {room.beds.map((bed) => {
                          /* ================= OCCUPIED ================= */

                          if (bed.status === "occupied") {
                            return (
                              <div
                                className="bed"
                                key={bed.id}
                                onClick={() => handleVacateBed(room.id, bed.id)}
                                title="Click to vacate this bed"
                              >
                                <div className="bed-photo">
                                  <img
                                    src={
                                      bed.name === "Gurpreet Singh"
                                        ? "/gurpreet.jpg"
                                        : bed.name === "Aman Verma"
                                          ? "/aman.jpg"
                                          : bed.name === "Navneet Kaur"
                                            ? "/navneet.jpg"
                                            : "/profile.jpg"
                                    }
                                    alt={bed.name || "Athlete"}
                                  />
                                </div>

                                <div>
                                  <strong>{bed.name}</strong>

                                  <p className="sport">{bed.sport}</p>

                                  <p>
                                    Bed {bed.id} • ID: {bed.athleteId}
                                  </p>
                                </div>
                              </div>
                            );
                          }

                          /* ================= VACANT ================= */

                          if (bed.status === "vacant") {
                            return (
                              <button
                                type="button"
                                className="vacant-bed"
                                key={bed.id}
                                onClick={() =>
                                  setSelectedBed({
                                    room: room.id,
                                    bed: bed.id,
                                  })
                                }
                              >
                                <span className="plus">⊕</span>

                                <strong>Bed {bed.id} Vacant</strong>

                                <p>Click to Allot</p>
                              </button>
                            );
                          }

                          /* ================= RESERVED ================= */

                          if (bed.status === "reserved") {
                            return (
                              <div className="reserved-bed" key={bed.id}>
                                <div className="sai">SAI</div>

                                <div>
                                  <strong>Reserved SAI Athl</strong>

                                  <p>{bed.roster}</p>

                                  <p>
                                    Bed {bed.id} • Arr: {bed.arrival}
                                  </p>
                                </div>
                              </div>
                            );
                          }

                          /* ================= MAINTENANCE ================= */

                          return (
                            <div className="maintenance-bed" key={bed.id}>
                              <strong>Bed {bed.id} Locked</strong>

                              <p>Ticket {bed.ticket}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))
                )}
              </div>
              {selectedBed && (
                <div className="room-allocation-overlay">
                  <div className="room-allocation-modal">
                    <div className="room-allocation-header">
                      <div>
                        <span>BED ALLOCATION</span>

                        <h3>Allot Bed {selectedBed.bed}</h3>

                        <p>Room {selectedBed.room}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedBed(null)}
                      >
                        ×
                      </button>
                    </div>

                    <div className="room-allocation-form">
                      <label>
                        Athlete Name
                        <input
                          type="text"
                          value={athleteName}
                          onChange={(e) => setAthleteName(e.target.value)}
                          placeholder="Enter athlete name"
                        />
                      </label>

                      <label>
                        Athlete ID
                        <input
                          type="text"
                          value={athleteId}
                          onChange={(e) => setAthleteId(e.target.value)}
                          placeholder="Enter athlete ID"
                        />
                      </label>

                      <label>
                        Sport / Discipline
                        <input
                          type="text"
                          value={athleteSport}
                          onChange={(e) => setAthleteSport(e.target.value)}
                          placeholder="Enter sport"
                        />
                      </label>
                    </div>

                    <div className="room-allocation-footer">
                      <button
                        type="button"
                        className="allocation-cancel"
                        onClick={() => {
                          setSelectedBed(null);
                          setAthleteName("");
                          setAthleteId("");
                          setAthleteSport("");
                        }}
                      >
                        Cancel
                      </button>

                      <button
                        type="button"
                        className="allocation-confirm"
                        onClick={handleAllotBed}
                      >
                        ✓ Allot Bed
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ================= ATHLETE DIETARY MENUS & MESS DISPENSATION ================= */}

              <div className="dietary-section">
                {/* SECTION HEADER */}
                <div className="dietary-header">
                  <div className="dietary-title-area">
                    <h3>
                      <img src="/dietary.png" className="dietary-icon" alt="" />
                      Athlete Dietary Menus & Mess Dispensation Pipeline
                      <span className="dietary-code">(FR-HOS-04/05)</span>
                    </h3>

                    <p>
                      Discipline-Specific Caloric Allocation mapped with Sports
                      Science Faculty (FR-NUT-03).
                    </p>
                  </div>

                  {/* LIVE MEAL COUNTER */}
                  <div className="meal-counter">
                    <div className="meal-counter-title">
                      <span className="meal-status-dot"></span>
                      Lunch Session Active:
                    </div>

                    <div className="meal-counter-value">
                      <strong>1,120</strong> / 1,420
                    </div>

                    <div className="meal-counter-status">Served</div>
                  </div>
                </div>

                {/* ================= MEAL CARDS ================= */}

                <div className="meal-cards">
                  {/* BREAKFAST */}
                  <div className="meal-card breakfast">
                    <div className="meal-card-header">
                      <strong>BREAKFAST</strong>

                      <span className="meal-status closed">CLOSED</span>
                    </div>

                    <div className="meal-calories">1,200 kcal target</div>

                    <p className="meal-description">
                      High-protein rolled oats bowl, 6 egg whites / paneer
                      bhurji, banana-date smoothie, soaked almonds.
                    </p>

                    <div className="meal-footer">
                      <span>
                        Served:
                        <strong> 1,398</strong>
                      </span>

                      <span>
                        <strong>98.5%</strong>
                        <small> Turnout</small>
                      </span>
                    </div>
                  </div>

                  {/* LUNCH */}
                  <div className="meal-card lunch">
                    <div className="meal-card-header">
                      <strong>LUNCH</strong>

                      <span className="meal-status live-dispense">
                        LIVE DISPENSE
                      </span>
                    </div>

                    <div className="meal-calories">1,600 kcal target</div>

                    <p className="meal-description">
                      Tandoori lean chicken / marinated soya paneer, brown rice
                      pilaf, sprouted moong, curd, spinach dal.
                    </p>

                    <div className="meal-footer">
                      <span>
                        Verified:
                        <strong> 1,120</strong>
                      </span>

                      <span>
                        <strong>78.8%</strong>
                        <small> In Progress</small>
                      </span>
                    </div>
                  </div>

                  {/* PRE / POST WORKOUT */}
                  <div className="meal-card workout">
                    <div className="meal-card-header">
                      <strong>PRE/POST WORKOUT</strong>

                      <span className="meal-time">
                        16:30
                        <small>IST</small>
                      </span>
                    </div>

                    <div className="meal-calories">850 kcal target</div>

                    <p className="meal-description">
                      Electrolyte hydration punch, whey isolate recovery shake /
                      sattu recovery drink, boiled sweet potatoes.
                    </p>

                    <div className="meal-footer">
                      <span>
                        Scheduled:
                        <strong> 1,420</strong>
                      </span>

                      <span>
                        Kiosk
                        <small> Station 1-4</small>
                      </span>
                    </div>
                  </div>

                  {/* DINNER */}
                  <div className="meal-card dinner">
                    <div className="meal-card-header">
                      <strong>DINNER</strong>

                      <span className="meal-time">
                        19:30
                        <small>IST</small>
                      </span>
                    </div>

                    <div className="meal-calories">1,400 kcal target</div>

                    <p className="meal-description">
                      Steamed river fish / grilled tofu steak, multigrain
                      chapatis, broccoli saute, slow-digesting casein curd.
                    </p>

                    <div className="meal-footer">
                      <span>
                        Kitchen Prep
                        <small> Active</small>
                      </span>

                      <span>
                        Audited
                        <small> Menu</small>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* ================= RFID MESS TOKEN VERIFICATION LOG ================= */}

              <div className="rfid-log">
                {/* HEADER */}
                <div className="rfid-log-header">
                  <h3>
                    Real-Time RFID Mess Token Verification Log (FR-HOS-05)
                  </h3>

                  <span className="rfid-stream">
                    RFID Stream Host: 172.16.4.12
                  </span>
                </div>

                {/* TABLE */}
                <div className="rfid-table-wrapper">
                  <div className="rfid-table">
                    {/* TABLE HEADER */}
                    <div className="rfid-row rfid-table-header">
                      <div>TIME IST</div>

                      <div>ATHLETE NAME &amp; UID</div>

                      <div>
                        SPORT
                        <br />
                        DISCIPLINE
                      </div>

                      <div>CALORIC PROFILE</div>

                      <div>
                        TOKEN
                        <br />
                        STATUS
                      </div>

                      <div>VERIFICATION</div>
                    </div>

                    {/* ROW 1 */}
                    <div className="rfid-row">
                      <div className="rfid-time">13:14:02</div>

                      <div className="athlete-info">
                        <strong>Simranjit Kaur</strong>
                        <span>(MBS-9912)</span>
                      </div>

                      <div className="sport-info">
                        Weightlifting
                        <span>(71kg)</span>
                      </div>

                      <div className="caloric-info">
                        High Carb/Pro
                        <span>5,200 kcal</span>
                      </div>

                      <div>
                        <span className="token-dispensed">DISPENSED</span>
                      </div>

                      <div className="verification">
                        Turnstile Gate 02
                        <span>[OK]</span>
                      </div>
                    </div>

                    {/* ROW 2 */}
                    <div className="rfid-row">
                      <div className="rfid-time">13:13:48</div>

                      <div className="athlete-info">
                        <strong>Harmanjot Singh</strong>
                        <span>(MBS-7821)</span>
                      </div>

                      <div className="sport-info">Shot Put / Throws</div>

                      <div className="caloric-info">
                        Strength Hypertrophy
                        <span>5,400 kcal</span>
                      </div>

                      <div>
                        <span className="token-dispensed">DISPENSED</span>
                      </div>

                      <div className="verification">
                        Turnstile Gate 01
                        <span>[OK]</span>
                      </div>
                    </div>

                    {/* ROW 3 */}
                    <div className="rfid-row">
                      <div className="rfid-time">13:12:15</div>

                      <div className="athlete-info">
                        <strong>Sunita Devi</strong>
                        <span>(MBS-6643)</span>
                      </div>

                      <div className="sport-info">
                        Judo
                        <span>(63kg)</span>
                      </div>

                      <div className="caloric-info">
                        Weight Cut Regimen
                        <span>3,800 kcal</span>
                      </div>

                      <div>
                        <span className="token-rebate">
                          REBATE
                          <br />
                          APPLIED
                        </span>
                      </div>

                      <div className="verification">
                        Dietician
                        <span>Authorized</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ================= RIGHT REGION ================= */}

            <div className="right-region">
              {/* ================= BIOMETRIC OUT-PASS DESK ================= */}

              <section className="right-card biometric-card">
                <div className="right-card-header">
                  <div className="right-card-title">
                    <span className="right-card-icon">◉</span>

                    <h3>
                      Biometric Out-Pass Desk
                      <span>(FR-HOS-02)</span>
                    </h3>
                  </div>

                  <span className="active-badge">48 Active</span>
                </div>

                <p className="right-card-description">
                  Statutory Curfew: 21:00 IST. Strict biometric logging enforced
                  across main campus perimeter.
                </p>

                {/* PASS 1 */}

                <div className="outpass-item">
                  <div className="outpass-main">
                    <strong>Simranjit Kaur (Weightlifting)</strong>

                    <span className="outpass-meta">
                      Patiala District Camp · Pass #OP-25-881
                    </span>

                    <span className="outpass-expiry">
                      Exp: Today, 21:00 IST · Auth: Dr. H. Sandhu (Warden)
                    </span>
                  </div>

                  <span className="outpass-status approved">APPROVED</span>
                </div>

                {/* PASS 2 */}

                <div className="outpass-item">
                  <div className="outpass-main">
                    <strong>Harpreet Singh (Athletics)</strong>

                    <span className="outpass-meta">
                      Rajindra Hospital MRI Scan · Pass #OP-25-883
                    </span>

                    <span className="outpass-expiry">
                      Exp: Today, 18:30 IST · Auth: Medical Superintendent
                    </span>
                  </div>

                  <span className="outpass-status medical">
                    MEDICAL
                    <br />
                    LEAVE
                  </span>
                </div>

                {/* PASS 3 */}

                <div className="outpass-item">
                  <div className="outpass-main">
                    <strong>Manpreet Sharma (Archery)</strong>

                    <span className="outpass-meta">
                      Home Leave (Jalandhar) · Pass #OP-25-870
                    </span>

                    <span className="outpass-expiry">
                      Return: 14-Nov, 18:00 IST · Auth: Dean Student Welfare
                    </span>
                  </div>

                  <span className="outpass-status home">
                    HOME
                    <br />
                    LEAVE
                  </span>
                </div>
              </section>

              {/* ================= MESS FEE & SBPAY ================= */}

              <section className="right-card fee-card">
                <div className="right-card-header">
                  <div className="right-card-title">
                    <span className="right-card-icon fee-icon">▣</span>

                    <h3>
                      Mess Fee &amp; SBPAY
                      <span>(FR-HOS-03)</span>
                    </h3>
                  </div>

                  <span className="fee-month">
                    Nov
                    <br />
                    2025
                  </span>
                </div>

                <div className="fee-label">AUTOMATED TOURNAMENT REBATE</div>

                <div className="fee-amount">₹1,42,000</div>

                <p className="fee-description">
                  Automatically credited across 38 athletes representing Punjab
                  in 36th National Games &amp; Senior Athletics Federation Cup.
                </p>

                <div className="fee-row">
                  <span>Mess Operating Ledger Intake</span>
                  <strong>₹68,40,000</strong>
                </div>

                <div className="fee-row">
                  <span>Caution Deposits in Sovereign Escrow</span>
                  <strong>₹35,50,000</strong>
                </div>

                <div className="fee-row">
                  <span>Unreconciled SBPAY Dues</span>
                  <strong className="orange-value">₹14,200 (4 Trainees)</strong>
                </div>

                <button className="reconcile-button">
                  ▣ &nbsp; Reconcile SBPAY Daily Ledger
                </button>
              </section>

              {/* ================= WARDEN INCIDENT SLA ================= */}

              <section className="right-card incident-card">
                <div className="right-card-header">
                  <div className="right-card-title">
                    <span className="right-card-icon incident-icon">⊘</span>

                    <h3>
                      Warden Incident SLA
                      <span>(FR-HOS-06)</span>
                    </h3>
                  </div>

                  <span className="incident-badge">
                    2
                    <br />
                    Open
                  </span>
                </div>

                {/* INCIDENT 1 */}

                <div className="incident-item">
                  <div className="incident-main">
                    <strong>Room 204: AC Calibration (Sports Recovery)</strong>

                    <span>Milkha Singh Block · Assigned: PWD Estate Unit</span>
                  </div>

                  <div className="incident-sla critical">
                    SLA: 2h 15m
                    <small>High Priority</small>
                  </div>
                </div>

                {/* INCIDENT 2 */}

                <div className="incident-item">
                  <div className="incident-main">
                    <strong>Balbir Singh Wing: Commercial Geyser</strong>

                    <span>
                      Floor 01 Bath Unit 4 · Assigned: Sanitation Cell
                    </span>
                  </div>

                  <div className="incident-sla warning">
                    SLA: 5h 40m
                    <small>Normal</small>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
