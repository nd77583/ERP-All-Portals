"use client";
import * as XLSX from "xlsx";
import BookCard from "@/components/booksCard";
import Image from "next/image";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LibraryMetricCard from "../../components/LibraryMetricCard";
export default function LibraryPage() {
  const [currentBook, setCurrentBook] = useState(0);
  const [checkoutConfirmed, setCheckoutConfirmed] = useState(false);
  const [isSliderHovered, setIsSliderHovered] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("Exercise Physiology");
  const [ledgerPage, setLedgerPage] = useState(1);
  const [selectedFormat, setSelectedFormat] = useState("All Formats");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchText, setSearchText] = useState("");

  const [selectedCircStatus, setSelectedCircStatus] = useState("All Books");
  const books = [
    {
      image: "/book1.jpg",
      callNo: "612.76 B615S",
      title:
        "Biomechanical Analysis of Sprint Acceleration in Elite Track Athletes",
      status: "Available (3 of 4)",
      statusType: "available" as const,
      author: "Dr. Harish Dhillon, Ph.D.",
      isbn: "ISBN 978-93-89241-12-8",
      subject: "Sprint Mechanics & Kinetic Forces",
      publisher: "MBSPSU Press, Patiala",
      location: "Stack 3B - Sports Biomechanics",
      extraInfo: "RFID: E2801307000000214",
      button1: "Reserve Copy",
      button2: "Instant Issue (RFID)",
    },
    {
      image: "/book1.jpg",
      callNo: "612.76 B615S",
      title:
        "Biomechanical Analysis of Sprint Acceleration in Elite Track Athletes",
      status: "Available (3 of 4)",
      statusType: "available" as const,
      author: "Dr. Harish Dhillon, Ph.D.",
      isbn: "ISBN 978-93-89241-12-8",
      subject: "Sprint Mechanics & Kinetic Forces",
      publisher: "MBSPSU Press, Patiala",
      location: "Stack 3B - Sports Biomechanics",
      extraInfo: "RFID: E2801307000000214",
      button1: "Reserve Copy",
      button2: "Instant Issue (RFID)",
    },

    {
      image: "/book2.jpg",
      callNo: "796.015 N959H",
      title:
        "Applied Nutrition and Hydration Protocols in High-Altitude Athletic Endurance",
      status: "In-Use (Stack Desk)",
      statusType: "inuse" as const,
      author: "Prof. (Dr.) Gurmeet Kaur",
      isbn: "ISBN 978-01-9874-902-1",
      subject: "Metabolic Loading, Electrolytes & Recovery",
      publisher: "New Delhi: Sports Science Bureau",
      location: "Stack 1A - Sports Medicine",
      extraInfo: "Full-Text PDF (IP-Auth)",
      button1: "View e-ShodhSindhu",
      button2: "Track Physical Copy",
    },
    {
      image: "/book1.jpg",
      callNo: "612.76 B615S",
      title:
        "Biomechanical Analysis of Sprint Acceleration in Elite Track Athletes",
      status: "Available (3 of 4)",
      statusType: "available" as const,
      author: "Dr. Harish Dhillon, Ph.D.",
      isbn: "ISBN 978-93-89241-12-8",
      subject: "Sprint Mechanics & Kinetic Forces",
      publisher: "MBSPSU Press, Patiala",
      location: "Stack 3B - Sports Biomechanics",
      extraInfo: "RFID: E2801307000000214",
      button1: "Reserve Copy",
      button2: "Instant Issue (RFID)",
    },
    {
      image: "/book1.jpg",
      callNo: "612.76 B615S",
      title:
        "Biomechanical Analysis of Sprint Acceleration in Elite Track Athletes",
      status: "Available (3 of 4)",
      statusType: "available" as const,
      author: "Dr. Harish Dhillon, Ph.D.",
      isbn: "ISBN 978-93-89241-12-8",
      subject: "Sprint Mechanics & Kinetic Forces",
      publisher: "MBSPSU Press, Patiala",
      location: "Stack 3B - Sports Biomechanics",
      extraInfo: "RFID: E2801307000000214",
      button1: "Reserve Copy",
      button2: "Instant Issue (RFID)",
    },
    {
      image: "/book1.jpg",
      callNo: "612.76 B615S",
      title:
        "Biomechanical Analysis of Sprint Acceleration in Elite Track Athletes",
      status: "Available (3 of 4)",
      statusType: "available" as const,
      author: "Dr. Harish Dhillon, Ph.D.",
      isbn: "ISBN 978-93-89241-12-8",
      subject: "Sprint Mechanics & Kinetic Forces",
      publisher: "MBSPSU Press, Patiala",
      location: "Stack 3B - Sports Biomechanics",
      extraInfo: "RFID: E2801307000000214",
      button1: "Reserve Copy",
      button2: "Instant Issue (RFID)",
    },
  ];
  const filteredBooks = books.filter((book) => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) return true;

    return (
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.callNo.toLowerCase().includes(query) ||
      book.isbn.toLowerCase().includes(query) ||
      book.subject.toLowerCase().includes(query) ||
      book.publisher.toLowerCase().includes(query) ||
      book.location.toLowerCase().includes(query)
    );
  });
  const metricCards = [
    {
      title: "TOTAL ACCESSIONED TITLES",
      value: "42,850 Volumes",
      description:
        "14,200 Sports Science, Kinesiology, Biomechanics & Sports Law core",
      icon: "/bookk.png",
      iconAlt: "Book",
      iconBg: "bg-[#e5efff]",
      topBorder: "border-t-[#0F2744]",
      footerBg: "bg-[#eef3ff]",
      footerLeft: "KOHA I LMS Synced",
      footerRight: "+184 this term",
      footerLeftColor: "text-[#596979]",
      footerRightColor: "text-[#102d4d]",
    },

    {
      title: "LIVE ACTIVE CIRCULATION",
      value: "1,240 Issued",
      description:
        "96.4% on-time return rate, 42 Overdue notifications auto-dispatched",
      icon: "/arrow.png",
      iconAlt: "Arrow",
      iconBg: "bg-[#fff0dc]",
      topBorder: "border-t-[#FE932C]",
      footerBg: "bg-[#EFF4FF]",
      footerLeft: "42 Overdue Alert SLA:",
      footerRight: "14-Day Cycle",
      footerLeftColor: "text-[#ef4444]",
      footerRightColor: "text-[brown]",
    },

    {
      title: "DIGITAL LIBRARY / E-JOURNALS",
      value: "8,600+ Full-Text",
      description:
        "ShodhSindhu, PubMed Sports, ScienceDirect, ProQuest Sports Medicine",
      icon: "/cloud.png",
      iconAlt: "Cloud",
      iconBg: "bg-[#e5fff5]",
      topBorder: "border-t-[#0F2744]",
      footerBg: "bg-[#EFF4FF]",
      footerLeft: "EZproxy Gateway Active",
      footerRight: "3.8k hits/wk",
      footerLeftColor: "text-[#19b77a]",
      footerRightColor: "text-[#102d4d]",
    },

    {
      title: "SMART SELF-CHECKOUT KIOSKS",
      value: "3 Units Active",
      description: "Average checkout speed 4.2 seconds via RFID UHF antennas",
      icon: "/pointer.png",
      iconAlt: "Pointer",
      iconBg: "bg-[#e5efff]",
      topBorder: "border-t-[#0F2744]",
      footerBg: "bg-[#EFF4FF]",
      footerLeft: "Antenna Gates: Zero Fault",
      footerRight: "865–868 MHz",
      footerLeftColor: "text-[#19b77a]",
      footerRightColor: "text-[#102d4d]",
    },
  ];
  const ledgerEntries = [
    {
      name: "Navneet Singh",
      reg: "2023-BPEd-042",
      discipline: "Athletics (400m)",
      title: "Kinesiology & Body Mechanics in Sprinting",
      accNo: "ACC-54129",
      dueDate: "28-Oct-2025",
      rfid: "TAG-UHF-8821",
      status: "Returned",
      statusClass: "bg-[#6FFBBE] text-black",
      overdue: false,
    },
    {
      name: "Simranjeet Kaur",
      reg: "2024-MSc-SPM-008",
      discipline: "Archery Compound",
      title: "Sports Biomechanics of...",
      accNo: "ACC-61092",
      dueDate: "04-Nov-2025",
      rfid: "TAG-UHF-9043",
      status: "In Circulation",
      statusClass: "bg-[#FFDCC3] text-black",
      overdue: false,
    },
    {
      name: "Amanjot Varma",
      reg: "2022-PhD-SPO-003",
      discipline: "High Performance",
      title: "WADA Code & Legal...",
      accNo: "ACC-39811",
      dueDate: "12-Nov-2025",
      rfid: "TAG-UHF-1102",
      status: "Renewed",
      statusClass: "bg-[#D3E4FE] text-black",
      overdue: false,
    },
    {
      name: "Rajwinder Singh",
      reg: "2023-BPEd-119",
      discipline: "Judo / Combat",
      title: "Physiological Responses",
      accNo: "ACC-48201",
      dueDate: "18-Oct-2025",
      rfid: "TAG-UHF-3390",
      status: "Overdue",
      statusClass: "bg-[#d62828] text-white",
      overdue: true,
    },
    {
      name: "Gurpreet Singh",
      reg: "2024-BPEd-076",
      discipline: "Weightlifting",
      title: "Strength Training Methods",
      accNo: "ACC-52031",
      dueDate: "22-Nov-2025",
      rfid: "TAG-UHF-4451",
      status: "Returned",
      statusClass: "bg-[#6FFBBE] text-black",
      overdue: false,
    },
    {
      name: "Harpreet Kaur",
      reg: "2023-MSc-SPM-021",
      discipline: "Boxing",
      title: "Sports Psychology &...",
      accNo: "ACC-57621",
      dueDate: "25-Nov-2025",
      rfid: "TAG-UHF-5520",
      status: "In Circulation",
      statusClass: "bg-[#FFDCC3] text-black",
      overdue: false,
    },
    {
      name: "Manpreet Singh",
      reg: "2022-BPEd-091",
      discipline: "Wrestling",
      title: "Advanced Wrestling...",
      accNo: "ACC-63108",
      dueDate: "29-Nov-2025",
      rfid: "TAG-UHF-6732",
      status: "Renewed",
      statusClass: "bg-[#D3E4FE] text-black",
      overdue: false,
    },
    {
      name: "Jaspreet Kaur",
      reg: "2024-BA-SPO-014",
      discipline: "Swimming",
      title: "Aquatic Training Science",
      accNo: "ACC-69420",
      dueDate: "02-Dec-2025",
      rfid: "TAG-UHF-7811",
      status: "Returned",
      statusClass: "bg-[#6FFBBE] text-black",
      overdue: false,
    },
    {
      name: "Jaspreet Kaur",
      reg: "2024-BA-SPO-014",
      discipline: "Swimming",
      title: "Aquatic Training Science",
      accNo: "ACC-69420",
      dueDate: "02-Dec-2025",
      rfid: "TAG-UHF-7811",
      status: "Returned",
      statusClass: "bg-[#6FFBBE] text-black",
      overdue: false,
    },
  ];

  const itemsPerPage = 4;
  const booksPerPage = 2;
  const totalBookPages = Math.ceil(books.length / booksPerPage);

  const filteredLedgerEntries =
    selectedCircStatus === "All Books"
      ? ledgerEntries
      : ledgerEntries.filter((item) => item.status === selectedCircStatus);

  const paginateLedgerEnteries = filteredLedgerEntries.slice(
    (ledgerPage - 1) * itemsPerPage,
    ledgerPage * itemsPerPage,
  );
  const downloadLedgerData = () => {
    const excelData = filteredLedgerEntries.map((item) => ({
      "Patron / Scholar": item.name,
      Registration: item.reg,
      Discipline: item.discipline,
      Title: item.title,
      "Accession No": item.accNo,
      "Due Date": item.dueDate,
      "RFID Hash": item.rfid,
      "CIRC Status": item.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Circulation Ledger");

    XLSX.writeFile(
      workbook,
      `library-circulation-${selectedCircStatus
        .toLowerCase()
        .replace(/\s+/g, "-")}.xlsx`,
    );
  };

  const rfidBooks = [
    {
      title: "Biomechanics in Swimming Strokes (Vol II)",
      tagId: "E280-9921",
    },
    {
      title: "Cardiovascular Conditioning in Wrestling",
      tagId: "E280-4402",
    },
    {
      title: "Sports Law & CAS Arbitral Awards 2024",
      tagId: "E280-7719",
    },
    {
      title: "Advanced Sports Physiology",
      tagId: "E280-8821",
    },
    {
      title: "Olympic Training Methodology",
      tagId: "E280-9234",
    },
    {
      title: "Strength & Conditioning for Athletes",
      tagId: "E280-6642",
    },
  ];
  useEffect(() => {
    if (rfidBooks.length <= 3 || isSliderHovered) return;

    const interval = setInterval(() => {
      setCurrentBook((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [rfidBooks.length, isSliderHovered]);

  useEffect(() => {
    if (currentBook === rfidBooks.length) {
      const resetTimer = setTimeout(() => {
        setCurrentBook(0);
      }, 700);

      return () => clearTimeout(resetTimer);
    }
  }, [currentBook, rfidBooks.length]);  return (
    <div className="library-container">
      {/* TOP HEADER / BANNER */}
      <div className="library-top flex w-full flex-col justify-between gap-4 rounded-[8px] border border-[#dce5f2] bg-[#f8faff] p-3.5 shadow-[0_1px_4px_rgba(15,39,68,0.05)] sm:rounded-[10px] sm:p-4 md:p-5 xl:flex-row xl:items-center min-w-0">
        <div className="lib-left min-w-0 flex-1">
          <div className="lib-starter flex flex-wrap items-center gap-2">
            <span className="rounded-[4px] bg-[#001229] px-2 py-1 text-[9.5px] font-bold uppercase leading-[12px] tracking-[0.5px] text-white sm:text-[10px]">
              PROTOCOL FR-LIB-01/08
            </span>

            <span className="rounded-[4px] bg-[#f5a623] px-2 py-1 text-[9.5px] font-bold uppercase leading-[12px] tracking-[0.5px] text-[#001229] sm:text-[10px]">
              MARC21 STANDARDIZED
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-[4px] bg-[#dcefe8] px-2 py-1 text-[9.5px] font-bold text-[#15803d] sm:text-[10px]">
              <span className="h-2 w-2 rounded-full bg-[#16a34a] shadow-[0_0_0_2px_rgba(22,163,74,0.2)]"></span>
              INFLIBNET Node: PB-PAT-9082
            </span>
          </div>

          <h2 className="mt-2 font-['Public_Sans'] text-[18px] font-bold leading-[1.3] tracking-[-0.4px] text-[#102d4d] sm:text-[20px] md:text-[22px] break-words">
            SUITE F: CENTRAL LIBRARY &amp; KNOWLEDGE REPOSITORY
          </h2>

          <h4 className="mt-1 max-w-[720px] font-['Public_Sans'] text-[11.5px] font-normal leading-[1.5] text-[#596979] sm:text-[12.5px] break-words">
            RFID &amp; Barcode Circulation Engine, MARC21 Cataloguing, ShodhSindhu
            E-Resources &amp; Automated Fine Ledgers. Sovereign academic sports
            research repository of MBSPSU Patiala.
          </h4>
        </div>

        {/* RIGHT SIDE ACTIONS */}
        <div className="lib-right flex shrink-0 flex-wrap items-center gap-2 xl:justify-end">
          <button
            type="button"
            className="inline-flex h-[32px] items-center gap-2 rounded-md bg-[#dbe9ff] px-3 text-[11.5px] font-semibold text-[#102d4d] transition-transform hover:-translate-y-0.5 hover:shadow-sm"
          >
            <Image
              src="/Container (14).png"
              alt=""
              width={15}
              height={15}
              className="h-3.5 w-3.5 object-contain"
            />
            New MARC21 Accession
          </button>

          <button
            type="button"
            className="inline-flex h-[32px] items-center gap-2 rounded-md bg-[#dbe9ff] px-3 text-[11.5px] font-semibold text-[#102d4d] transition-transform hover:-translate-y-0.5 hover:shadow-sm"
          >
            <Image
              src="/Container (15).png"
              alt=""
              width={15}
              height={15}
              className="h-3.5 w-3.5 object-contain"
            />
            Bulk RFID Tagging Station
          </button>

          <button
            type="button"
            className="inline-flex h-[32px] items-center gap-2 rounded-md bg-[#102d4d] px-3.5 text-[11.5px] font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5 hover:brightness-110"
          >
            <Image
              src="/Container (16).png"
              alt=""
              width={15}
              height={15}
              className="h-3.5 w-3.5 object-contain"
            />
            Circulation Desk (Issue/Return)
          </button>
        </div>
      </div>

      {/* METRICS KPI CARDS */}
      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {metricCards.map((card) => (
          <LibraryMetricCard key={card.title} {...card} />
        ))}
      </div>

      {/* MAIN TWO-COLUMN SPLIT */}
      <div className="grid w-full min-w-0 grid-cols-1 items-start gap-3.5 sm:gap-4 lg:grid-cols-[minmax(0,1.75fr)_minmax(310px,1fr)] xl:grid-cols-[minmax(0,1.85fr)_minmax(330px,1fr)]">
        {/* LEFT COLUMN: OPAC EXPLORER & CIRCULATION LEDGER */}
        <div className="flex min-w-0 flex-col gap-3.5 sm:gap-4">
          {/* OPAC PUBLIC CATALOG CARD */}
          <div className="min-w-0 rounded-[8px] border border-[#d9e2ee] bg-white p-3 shadow-[0_1px_3px_rgba(15,39,68,0.05)] sm:p-4">
            <div className="flex flex-col justify-between gap-2.5 sm:flex-row sm:items-center">
              <div className="flex min-w-0 items-center gap-2">
                <Image
                  src="/bookicon.png"
                  alt="Book icon"
                  width={20}
                  height={20}
                  className="h-5 w-5 shrink-0 object-contain"
                />
                <div className="min-w-0">
                  <h2 className="truncate font-['Public_Sans'] text-[15px] font-bold leading-tight tracking-[-0.2px] text-[#102d4d] sm:text-[16px]">
                    OPAC Public Catalog &amp; MARC21 Explorer
                  </h2>

                  <p className="mt-0.5 font-['Inter'] text-[9.5px] font-bold tracking-[0.4px] text-[#596979] uppercase sm:text-[10px]">
                    STATUTORY TENDER SPECS: FR-LIB-01 / FR-LIB-02
                  </p>
                </div>
              </div>

              <span className="self-start whitespace-nowrap rounded-[4px] bg-[#e5efff] px-2.5 py-1 font-['Inter'] text-[11px] font-semibold text-[#163f67] sm:self-auto">
                ● Z39.50 Connected
              </span>
            </div>

            {/* SEARCH */}
            <div className="mt-3 flex h-[36px] items-center gap-2 rounded-[6px] border border-[#dfe5ed] bg-white px-2.5 shadow-inner">
              <span className="text-[15px] text-[#697687]">⌕</span>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Biomechanics, Exercise Physiology, Sports Medicine..."
                className="min-w-0 flex-1 bg-transparent font-['Inter'] text-[11.5px] text-[#102d4d] outline-none placeholder:text-[#596979]"
              />

              <button
                type="button"
                onClick={() => setSearchQuery(searchText)}
                className="flex h-[26px] items-center justify-center rounded-[4px] bg-[#102d4d] px-3 font-['Inter'] text-[10px] font-semibold text-white transition-opacity hover:opacity-90"
              >
                Search
              </button>
            </div>

            {/* SUBJECT FILTER TAGS */}
            <div className="mt-2.5">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="mr-0.5 font-['Inter'] text-[8.5px] font-bold text-[#596979] uppercase">
                  SUBJECT:
                </span>

                {[
                  "Exercise Physiology",
                  "Sports Medicine",
                  "Biomechanics",
                  "Coaching Pedagogy",
                  "Sports Law",
                ].map((subject) => (
                  <button
                    key={subject}
                    type="button"
                    onClick={() => setSelectedSubject(subject)}
                    className={`rounded-[4px] px-2 py-1 font-['Inter'] text-[10px] font-semibold transition-colors ${
                      selectedSubject === subject
                        ? "bg-[#102d4d] text-white"
                        : "bg-[#e5efff] text-[#102d4d] hover:bg-[#d8e6fc]"
                    }`}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>

            {/* FORMAT FILTER TAGS */}
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              <span className="mr-0.5 font-['Inter'] text-[8.5px] font-bold text-[#596979] uppercase">
                FORMAT:
              </span>

              {[
                "All Formats",
                "Print Hardcover (18)",
                "E-Book (Full-Text)",
                "Master Thesis (MBSPSU Repo)",
                "120fps Coaching Video",
              ].map((format) => (
                <button
                  key={format}
                  type="button"
                  onClick={() => setSelectedFormat(format)}
                  className={`rounded-[4px] px-2 py-1 font-['Inter'] text-[10px] font-semibold transition-colors ${
                    selectedFormat === format
                      ? "bg-[#102d4d] text-white"
                      : "bg-[#e5efff] text-[#102d4d] hover:bg-[#d8e6fc]"
                  }`}
                >
                  {format}
                </button>
              ))}
            </div>

            {/* BOOKS LIST (SCROLL CONTAINER) */}
            <div
              className="mt-3 flex max-h-[500px] flex-col gap-2.5 overflow-y-auto overscroll-contain pr-1
              [scrollbar-width:thin] [scrollbar-color:#102d4d_#e5efff]
              [&::-webkit-scrollbar]:w-[5px]
              [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#e5efff]
              [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#102d4d]"
            >
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book, i) => (
                  <div key={`${book.callNo}-${i}`}>
                    <BookCard {...book} />
                  </div>
                ))
              ) : (
                <div className="flex h-[140px] items-center justify-center">
                  <p className="font-['Inter'] text-[12px] font-semibold text-[#596979]">
                    No books found for &ldquo;{searchQuery}&rdquo;
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* AUTOMATED CIRCULATION & RFID PATRON LEDGER */}
          <div className="flex flex-col justify-between min-w-0 rounded-[8px] border border-[#d9e2ee] bg-white p-3 shadow-[0_1px_3px_rgba(15,39,68,0.05)] sm:p-4 h-[475px] min-h-[475px]">
            {/* CARD TOP HEADER */}
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center shrink-0">
              <div className="flex items-start gap-2.5">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center">
                  <span className="text-[19px] leading-none text-[#102d4d]">
                    ▣
                  </span>
                </div>

                <div>
                  <h2 className="font-['Public_Sans'] text-[15px] font-bold leading-tight tracking-[-0.2px] text-[#102d4d] sm:text-[16px]">
                    Automated Circulation &amp; RFID Patron Ledger
                  </h2>

                  <p className="mt-0.5 font-['Inter'] text-[9px] font-bold tracking-[0.5px] text-[#596979] uppercase sm:text-[9.5px]">
                    LIVE RFID GATE TRANSPONDER FEED (FR-LIB-03)
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={selectedCircStatus}
                  onChange={(e) => {
                    setSelectedCircStatus(e.target.value);
                    setLedgerPage(1);
                  }}
                  className="h-[30px] rounded-[5px] border border-[#d7e3f5] bg-[#e5efff] px-2.5 font-['Inter'] text-[10.5px] font-semibold text-[#102d4d] outline-none"
                >
                  <option value="All Books">CIRC: All Books</option>
                  <option value="Returned">Returned</option>
                  <option value="In Circulation">In Circulation</option>
                  <option value="Renewed">Renewed</option>
                  <option value="Overdue">Overdue</option>
                </select>

                <button
                  type="button"
                  onClick={downloadLedgerData}
                  className="inline-flex h-[30px] items-center gap-1.5 rounded-[5px] bg-[#102d4d] px-3 font-['Inter'] text-[10.5px] font-semibold text-white transition-opacity hover:opacity-90"
                >
                  <Image
                    src="/Container (9).png"
                    alt=""
                    width={13}
                    height={13}
                    className="h-[13px] w-[13px] object-contain brightness-0 invert"
                  />
                  Download Excel
                </button>
              </div>
            </div>

            {/* RESPONSIVE TABLE WRAPPER - EXACT LOCKED HEIGHT OF 292PX */}
            <div className="mt-3.5 w-full overflow-x-auto rounded-[6px] border border-[#dfe5ed] h-[292px] min-h-[292px] max-h-[292px]">
              <table className="w-full min-w-[680px] table-fixed border-collapse text-left">
                <colgroup>
                  <col className="w-[145px]" />
                  <col className="w-[110px]" />
                  <col className="w-[195px]" />
                  <col className="w-[95px]" />
                  <col className="w-[85px]" />
                  <col className="w-[90px]" />
                </colgroup>
                <thead className="h-[44px]">
                  <tr className="bg-[#E5EEFF] h-[44px]">
                    <th className="px-3 py-2 font-['Inter'] text-[10.5px] font-bold tracking-wider text-[#404b59] uppercase align-middle">
                      PATRON /<br />
                      SCHOLAR
                    </th>
                    <th className="px-3 py-2 font-['Inter'] text-[10.5px] font-bold tracking-wider text-[#404b59] uppercase align-middle">
                      DISCIPLINE
                    </th>
                    <th className="px-3 py-2 font-['Inter'] text-[10.5px] font-bold tracking-wider text-[#404b59] uppercase align-middle">
                      TITLE &amp; ACC #
                    </th>
                    <th className="px-3 py-2 font-['Inter'] text-[10.5px] font-bold tracking-wider text-[#404b59] uppercase align-middle">
                      DUE DATE
                    </th>
                    <th className="px-3 py-2 font-['Inter'] text-[10.5px] font-bold tracking-wider text-[#404b59] uppercase align-middle">
                      RFID<br />
                      HASH
                    </th>
                    <th className="px-3 py-2 font-['Inter'] text-[10.5px] font-bold tracking-wider text-[#404b59] uppercase align-middle">
                      CIRC
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#edf1f5]">
                  {paginateLedgerEnteries.length > 0 ? (
                    <>
                      {paginateLedgerEnteries.map((item, index) => (
                        <tr
                          key={index}
                          className={`h-[62px] max-h-[62px] ${
                            item.overdue
                              ? "bg-[#fff7f7] hover:bg-[#ffeded]"
                              : "bg-white hover:bg-[#f8fafd]"
                          }`}
                        >
                          <td className="h-[62px] px-3 py-2 align-middle">
                            <div className="flex h-[46px] flex-col justify-center">
                              <p
                                className="truncate font-['Public_Sans'] text-[12px] font-bold leading-tight text-[#102d4d]"
                                title={item.name}
                              >
                                {item.name}
                              </p>
                              <p className="mt-1 truncate font-['Inter'] text-[10.5px] font-medium leading-tight text-[#404b59]">
                                REG: {item.reg}
                              </p>
                            </div>
                          </td>
                          <td className="h-[62px] px-3 py-2 align-middle">
                            <div className="flex h-[46px] items-center">
                              <span className="truncate inline-block rounded-[3px] bg-[#e5efff] px-2 py-1 font-['Inter'] text-[10px] font-bold text-[#102d4d]">
                                {item.discipline}
                              </span>
                            </div>
                          </td>
                          <td className="h-[62px] px-3 py-2 align-middle">
                            <div className="flex h-[46px] flex-col justify-center min-w-0">
                              <p
                                className="truncate font-['Inter'] text-[10.5px] font-semibold leading-tight text-[#102d4d]"
                                title={item.title}
                              >
                                {item.title}
                              </p>
                              <p className="mt-1 truncate font-['Inter'] text-[10px] font-medium leading-tight text-[#b56b00]">
                                {item.accNo}
                              </p>
                            </div>
                          </td>
                          <td className="h-[62px] px-3 py-2 align-middle">
                            <div className="flex h-[46px] flex-col justify-center">
                              <span className="font-['Inter'] text-[11px] font-medium leading-tight text-[#102d4d]">
                                {item.dueDate}
                              </span>
                              {item.overdue ? (
                                <span className="mt-1 font-['Inter'] text-[9.5px] font-bold leading-tight text-[#d62828]">
                                  (Overdue)
                                </span>
                              ) : (
                                <span className="mt-1 font-['Inter'] text-[9.5px] leading-tight text-transparent select-none">
                                  &nbsp;
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="h-[62px] px-3 py-2 align-middle">
                            <div className="flex h-[46px] items-center">
                              <span
                                className={`truncate font-['Inter'] text-[11px] font-medium ${
                                  item.overdue ? "text-[#BA2323]" : "text-[#596979]"
                                }`}
                              >
                                {item.rfid}
                              </span>
                            </div>
                          </td>
                          <td className="h-[62px] px-3 py-2 align-middle">
                            <div className="flex h-[46px] items-center">
                              <span
                                className={`truncate inline-block rounded-[3px] px-2 py-1 font-['Inter'] text-[10px] font-bold ${item.statusClass}`}
                              >
                                {item.status}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {/* PLACEHOLDER ROWS TO MAINTAIN IDENTICAL SIZE ACROSS ALL THREE PAGES */}
                      {Array.from({
                        length: Math.max(0, itemsPerPage - paginateLedgerEnteries.length),
                      }).map((_, emptyIdx) => (
                        <tr
                          key={`empty-${emptyIdx}`}
                          className="h-[62px] max-h-[62px] bg-white pointer-events-none"
                          aria-hidden="true"
                        >
                          <td className="h-[62px] px-3 py-2 align-middle">
                            <div className="h-[46px] select-none text-transparent">-</div>
                          </td>
                          <td className="h-[62px] px-3 py-2 align-middle">
                            <div className="h-[46px] select-none text-transparent">-</div>
                          </td>
                          <td className="h-[62px] px-3 py-2 align-middle">
                            <div className="h-[46px] select-none text-transparent">-</div>
                          </td>
                          <td className="h-[62px] px-3 py-2 align-middle">
                            <div className="h-[46px] select-none text-transparent">-</div>
                          </td>
                          <td className="h-[62px] px-3 py-2 align-middle">
                            <div className="h-[46px] select-none text-transparent">-</div>
                          </td>
                          <td className="h-[62px] px-3 py-2 align-middle">
                            <div className="h-[46px] select-none text-transparent">-</div>
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <tr className="h-[248px] bg-white">
                      <td
                        colSpan={6}
                        className="text-center align-middle font-['Inter'] text-[12px] font-medium text-[#596979]"
                      >
                        No circulation records found for &ldquo;{selectedCircStatus}&rdquo;
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* TABLE FOOTER SUMMARY */}
            <div className="mt-2.5 flex h-[28px] shrink-0 items-center justify-between rounded-[4px] bg-[#e5efff] px-3">
              <span className="font-['Inter'] text-[10px] font-bold tracking-[0.4px] text-[#596979]">
                Showing {paginateLedgerEnteries.length} of{" "}
                {filteredLedgerEntries.length} records • Filter:{" "}
                {selectedCircStatus} • Auto-refreshed via RFID reader bus
              </span>
            </div>

            {/* PAGINATION */}
            <div className="mt-3 flex h-[38px] shrink-0 items-center justify-center">
              {Math.ceil(filteredLedgerEntries.length / itemsPerPage) > 1 && (
                <Pagination
                  count={Math.ceil(filteredLedgerEntries.length / itemsPerPage)}
                  page={ledgerPage}
                  onChange={(_, nextPage) => setLedgerPage(nextPage)}
                  renderItem={(item) => (
                    <PaginationItem
                      slots={{
                        previous: ArrowBackIcon,
                        next: ArrowForwardIcon,
                      }}
                      {...item}
                    />
                  )}
                />
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN CARDS */}
        <div className="flex min-w-0 flex-col gap-3.5 sm:gap-4">
          {/* SMART RFID CIRCULATION DESK */}
          <div className="min-w-0 rounded-[8px] border border-[#1e3a5f] bg-[#102d4d] p-3 text-white shadow-[0_1px_4px_rgba(15,39,68,0.12)] sm:p-4">
            {/* HEADER */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2">
                <Image
                  src="/icon100.png"
                  alt="RFID icon"
                  width={17}
                  height={20}
                  className="mt-0.5 h-5 w-4 object-contain"
                />
                <div className="min-w-0">
                  <h2 className="font-['Public_Sans'] text-[15px] font-bold leading-tight tracking-[-0.2px] text-[#f8fafc] sm:text-[16px]">
                    Smart RFID Circulation Desk
                  </h2>

                  <p className="mt-0.5 font-['Inter'] text-[9.5px] font-bold uppercase tracking-[0.5px] text-[#829fca] sm:text-[10px]">
                    ANTENNA NODE: GATE-EAST-UHF
                  </p>
                </div>
              </div>

              <span className="shrink-0 rounded-[3px] bg-[#35e9b0] px-2 py-0.5 font-['Inter'] text-[8.5px] font-bold text-[#102d4d]">
                865.6 MHz
              </span>
            </div>

            {/* RFID STATUS */}
            <div className="mt-2.5 flex flex-col gap-1.5 rounded-[5px] bg-[#00152f] p-2.5 sm:p-3">
              <div className="flex items-center justify-between gap-2">
                <span className="font-['Public_Sans'] text-[10px] font-bold text-[#829fca]">
                  UHF RFID Multi-Tag Reader Pad:
                </span>

                <span className="shrink-0 font-['Inter'] text-[10px] font-bold text-[#35e9b0]">
                  Online • 0.24ms Read
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="font-['Inter'] text-[8.5px] font-semibold text-[#829fca]">
                  EAS Anti-Theft Acoustic Gates:
                </span>
                <span className="shrink-0 font-['Inter'] text-[9.5px] font-bold uppercase text-[#f3d6c0]">
                  ARMED / ACTIVE
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="font-['Inter'] text-[8.5px] font-medium text-[#829fca]">
                  Patron Biometric / Smart-Card Interface:
                </span>
                <span className="shrink-0 font-['Inter'] text-[9.5px] font-bold text-white">
                  MBSPSU Card OK
                </span>
              </div>
            </div>

            {/* MULTI BOOK TRAY */}
            <div className="mt-2.5 overflow-hidden rounded-[5px] bg-white p-2.5 sm:p-3 text-[#102d4d]">
              {/* TRAY HEADER */}
              <div className="flex items-center justify-between gap-2">
                <span className="font-['Inter'] text-[9.5px] font-bold uppercase tracking-[0.4px] text-[#404b59]">
                  MULTI-BOOK BATCH CHECKOUT TRAY
                </span>

                <span className="shrink-0 rounded-[3px] bg-[#e5efff] px-2 py-0.5 font-['Inter'] text-[11px] font-bold text-[#102d4d]">
                  {rfidBooks.length} {rfidBooks.length === 1 ? "Item" : "Items"}{" "}
                  Detected
                </span>
              </div>

              {/* VERTICAL RFID BOOK SLIDER */}
              <div
                className="mt-2 h-[108px] overflow-hidden"
                onMouseEnter={() => setIsSliderHovered(true)}
                onMouseLeave={() => setIsSliderHovered(false)}
              >
                <div
                  className="transition-transform duration-700 ease-in-out"
                  style={{
                    transform: `translateY(-${currentBook * 36}px)`,
                  }}
                >
                  {[...rfidBooks, ...rfidBooks.slice(0, 3)].map(
                    (book, index) => (
                      <div
                        key={`${book.tagId}-${index}`}
                        className="mb-1 flex h-[32px] items-center justify-between gap-2 rounded-[3px] bg-[#e5efff] px-2"
                      >
                        <span className="flex min-w-0 items-center font-['Inter'] text-[11.5px] font-medium text-[#102d4d]">
                          <span className="mr-1 text-[#ec8829]">✓✓</span>
                          <span className="truncate">{book.title}</span>
                        </span>

                        <span className="shrink-0 font-['Inter'] text-[11px] font-medium text-[#596979]">
                          {book.tagId}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* SLIDER CONTROLS + PATRON */}
              <div className="mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-[#edf1f5] pt-2">
                <span className="min-w-0 font-['Inter'] text-[11.5px] font-medium text-[#404b59]">
                  Patron:{" "}
                  <span className="font-bold text-[#102d4d]">
                    Harmanpreet K. (Coach)
                  </span>
                </span>

                <button
                  type="button"
                  onClick={() => setCheckoutConfirmed(true)}
                  className="shrink-0 rounded-[4px] bg-[#102d4d] px-2.5 py-1 font-['Inter'] text-[10.5px] font-bold text-white transition-opacity hover:opacity-90"
                >
                  {checkoutConfirmed ? "Confirmed (EAS Disarmed)" : "Confirm & Disarm EAS"}
                </button>
              </div>
            </div>
          </div>

          {/* AUTOMATED OVERDUE RECOVERY */}
          <div className="min-w-0 rounded-[8px] border border-[#d9e2ee] bg-white p-3 shadow-[0_1px_3px_rgba(15,39,68,0.05)] sm:p-4">
            {/* HEADER */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-start gap-2">
                <Image src="/icon1100.png" alt="" width={20} height={20} className="h-5 w-5 object-contain" />

                <div>
                  <h2 className="font-['Public_Sans'] text-[15px] font-bold leading-tight tracking-[-0.2px] text-[#102d4d] sm:text-[16px]">
                    Automated Overdue Recovery
                  </h2>

                  <p className="mt-0.5 font-['Inter'] text-[9.5px] font-bold uppercase tracking-[0.5px] text-[#596979] sm:text-[10px]">
                    SBPAY / FR-DIN-07 GATEWAY
                  </p>
                </div>
              </div>

              <span className="shrink-0 rounded-[3px] bg-[#ffe8d4] px-2 py-0.5 font-['Inter'] text-[11px] font-bold text-[#b56b00]">
                ₹5 / Day Rate
              </span>
            </div>

            {/* SUMMARY */}
            <div className="mt-2.5 flex flex-col gap-1 rounded-[5px] bg-[#EFF4FF] p-2.5 text-[11.5px] sm:text-[12px]">
              <p className="font-['Inter'] text-[#596979]">
                Auto-SMS Dispatched:
                <span className="ml-1 font-bold text-[#102d4d]">
                  89 Reminders (WhatsApp/SMS)
                </span>
              </p>

              <p className="font-['Inter'] text-[#596979]">
                Auto-Debit Pending:
                <span className="ml-1 font-bold text-[#b56b00]">
                  ₹14,850 Across 42 Patrons
                </span>
              </p>

              <p className="font-['Inter'] text-[#596979]">
                Exemption Waivers:
                <span className="ml-1 font-bold text-[#102d4d]">
                  4 (National Camp)
                </span>
              </p>
            </div>

            {/* FLAGGED PATRONS */}
            <div className="mt-2.5">
              <p className="font-['Inter'] text-[9.5px] font-bold uppercase tracking-[0.4px] text-[#596979]">
                HIGH OVERDUE RECOVERY FLAGGED FOR SBPAY
              </p>

              {/* PERSON 1 */}
              <div className="mt-2 flex flex-wrap items-center justify-between gap-2 rounded-[4px] bg-[#E5EEFF] p-2">
                <div>
                  <p className="font-['Inter'] text-[12px] font-bold text-[#102d4d]">
                    Jasmeet Singh
                  </p>
                  <p className="font-['Inter'] text-[11px] text-[#596979]">
                    21 Days Overdue • ACC #3390
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-['Inter'] text-[12px] font-bold text-[#d62828]">
                    ₹105.00
                  </span>
                  <button
                    type="button"
                    className="rounded-[3px] bg-[#102d4d] px-2 py-1 font-['Inter'] text-[10px] font-bold text-white transition-opacity hover:opacity-90"
                  >
                    Deduct SBPAY
                  </button>
                </div>
              </div>

              {/* PERSON 2 */}
              <div className="mt-1.5 flex flex-wrap items-center justify-between gap-2 rounded-[4px] bg-[#E5EEFF] p-2">
                <div>
                  <p className="font-['Inter'] text-[12px] font-bold text-[#102d4d]">
                    Pooja Rani (Gymnastics)
                  </p>
                  <p className="font-['Inter'] text-[11px] text-[#596979]">
                    14 Days Overdue • ACC #8812
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-['Inter'] text-[12px] font-bold text-[#d62828]">
                    ₹70.00
                  </span>
                  <button
                    type="button"
                    className="rounded-[3px] bg-[#102d4d] px-2 py-1 font-['Inter'] text-[10px] font-bold text-white transition-opacity hover:opacity-90"
                  >
                    Deduct SBPAY
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* E-RESOURCE FEDERATED HUB */}
          <div className="min-w-0 rounded-[8px] border border-[#d9e2ee] bg-white p-3 shadow-[0_1px_3px_rgba(15,39,68,0.05)] sm:p-4">
            {/* HEADER */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-start gap-2">
                <Image
                  src="/fedrated.png"
                  alt="E-Resource Federated Hub"
                  width={20}
                  height={20}
                  className="h-5 w-5 object-contain"
                />

                <div>
                  <h2 className="font-['Public_Sans'] text-[15px] font-bold leading-tight tracking-[-0.2px] text-[#102d4d] sm:text-[16px]">
                    E-Resource Federated Hub
                  </h2>

                  <p className="mt-0.5 font-['Inter'] text-[9.5px] font-bold uppercase tracking-[0.5px] text-[#596979] sm:text-[10px]">
                    INFLIBNET / REMOTEXS GATEWAY
                  </p>
                </div>
              </div>

              <span className="h-2 w-2 rounded-full bg-[#35d49a] shadow-[0_0_0_2px_rgba(53,212,154,0.3)]" />
            </div>

            {/* RESOURCE 1 */}
            <div className="mt-3">
              <div className="flex items-center justify-between gap-2">
                <span className="font-['Inter'] text-[11.5px] font-medium text-[#102d4d]">
                  ScienceDirect (Sports Medicine)
                </span>
                <span className="font-['Inter'] text-[11.5px] font-bold text-[#102d4d]">
                  1,840 Downloads
                </span>
              </div>
              <div className="mt-1 h-1.5 w-full rounded-full bg-[#dce9ff]">
                <div className="h-full w-[76%] rounded-full bg-[#102d4d]" />
              </div>
            </div>

            {/* RESOURCE 2 */}
            <div className="mt-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="font-['Inter'] text-[11.5px] font-medium text-[#102d4d]">
                  PubMed Central &amp; SPORTDiscus
                </span>
                <span className="font-['Inter'] text-[11.5px] font-bold text-[#102d4d]">
                  1,420 Sessions
                </span>
              </div>
              <div className="mt-1 h-1.5 w-full rounded-full bg-[#dce9ff]">
                <div className="h-full w-[58%] rounded-full bg-[#ec8829]" />
              </div>
            </div>

            {/* RESOURCE 3 */}
            <div className="mt-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="font-['Inter'] text-[11.5px] font-medium text-[#102d4d]">
                  INFLIBNET e-ShodhSindhu
                </span>
                <span className="font-['Inter'] text-[11.5px] font-bold text-[#102d4d]">
                  960 Citations
                </span>
              </div>
              <div className="mt-1 h-1.5 w-full rounded-full bg-[#dce9ff]">
                <div className="h-full w-[42%] rounded-full bg-[#16845b]" />
              </div>
            </div>

            {/* MOST DOWNLOADED */}
            <div className="mt-3 rounded-[5px] bg-[#EFF4FF] p-2.5">
              <p className="font-['Inter'] text-[9.5px] font-bold uppercase tracking-[0.5px] text-[#596979]">
                MOST DOWNLOADED THIS WEEK
              </p>
              <p className="mt-1 truncate font-['Inter'] text-[11.5px] font-medium text-[#102d4d]">
                📄 Wearable Sensors for Real-time ACL Tear Prediction
              </p>
              <p className="mt-0.5 truncate font-['Inter'] text-[11.5px] font-medium text-[#102d4d]">
                📄 Kinematic Evaluation of High-Jump Flop Technique
              </p>
            </div>
          </div>

          {/* NAAC CRITERION 4.2 AUDIT */}
          <div className="flex min-w-0 flex-col justify-between gap-3 rounded-[8px] border border-[#bcd3f7] bg-[#eef4ff] p-3 shadow-sm sm:flex-row sm:items-center sm:p-3.5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[#102d4d] shadow-xs">
                <span className="text-[18px] leading-none">✥</span>
              </div>

              <div>
                <p className="font-['Inter'] text-[11.5px] font-bold uppercase tracking-[0.3px] text-[#102d4d]">
                  NAAC Criterion 4.2 Library Audit
                </p>
                <p className="mt-0.5 font-['Inter'] text-[11px] font-medium text-[#596979]">
                  Annual Book Expenditure &amp; Subscription Compliance
                </p>
              </div>
            </div>

            <button
              type="button"
              className="shrink-0 self-start rounded-[4px] bg-[#102d4d] px-3 py-1.5 font-['Inter'] text-[10.5px] font-semibold text-white transition-opacity hover:opacity-90 sm:self-auto"
            >
              Export SSR Annexure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
