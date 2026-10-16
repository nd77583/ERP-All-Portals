"use client";

import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { getCmsSection } from "@/lib/cmsClient";
import { AdmissionsStatutoryData, AdmissionsStatutoryRow } from "@/lib/cms-types";

const defaultStatutoryData: AdmissionsStatutoryData = {
  tag: "Governance Directives",
  title: "Statutory Reservation & Sports Quota Distribution",
  actBadge: "ACT 11 OF 2019",
  rows: [
    {
      id: "stat-1",
      category: "State Domicile Pool (Punjab)",
      description: "Permanent residents of Punjab with valid Tehsildar certificate",
      allocation: "85% Total Intake",
      benchmark: "Punjab Inter-District or Inter-College Participant",
      fee: "Standard Scale",
    },
    {
      id: "stat-2",
      category: "National / International Champions Quota",
      description: "Olympic / Commonwealth / Asian Games / Senior National Medalists",
      allocation: "Supernumerary (10)",
      benchmark: "Gold, Silver, Bronze in SAI/IOA Approved Events",
      fee: "100% Full Waiver",
      feeBadge: "bg-[#6ffbbe] text-[#002113]",
    },
    {
      id: "stat-3",
      category: "Scheduled Castes / Scheduled Tribes (SC/ST)",
      description: "As per Punjab Govt. Reservation Notification",
      allocation: "25% Statutory",
      benchmark: "Qualifying 50% Trial Aggregate + State Participation",
      fee: "Post-Matric Sch.",
      feeBadge: "bg-[#FFDCC3] text-[#2f1500]",
    },
    {
      id: "stat-4",
      category: "Wards of Armed Forces & Punjab Police",
      description: "Gallantry awardees & active defense personnel dependents",
      allocation: "2% Horizontal",
      benchmark: "AAHPER Standard Test cleared with Grade 'B'",
      fee: "50% Tuition Relief",
    },
    {
      id: "stat-5",
      category: "All-India Open Merit",
      description: "Candidates from all States & Union Territories",
      allocation: "15% Intake",
      benchmark: "National School Games / SGFI / All-India Inter-University",
      fee: "Standard Scale",
    },
  ],
};

const rowsPerPage = 4;

const Statutory = () => {
  const [statutory, setStatutory] = useState<AdmissionsStatutoryData>(defaultStatutoryData);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadData() {
      try {
        const admissions = await getCmsSection("admissions");
        if (admissions?.statutory) {
          setStatutory((prev) => ({
            ...prev,
            ...admissions.statutory,
            rows:
              Array.isArray(admissions.statutory.rows) && admissions.statutory.rows.length > 0
                ? admissions.statutory.rows
                : prev.rows,
          }));
        }
      } catch {
        // Fallback gracefully
      }
    }
    loadData();
  }, []);

  const rows = statutory.rows || [];
  const paginatedRows = rows.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <section className="w-full rounded bg-white p-4 shadow-sm">
      <header className="mb-4 flex flex-wrap items-center justify-between gap-3 pb-2">
        <div>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.5px] text-[#904d00]">
            {statutory.tag}
          </p>
          <h2 className="text-xl font-bold tracking-tight text-[#001229] sm:text-2xl">
            {statutory.title}
          </h2>
        </div>
        <span className="rounded-sm bg-[#0f2744] px-2 py-1 text-[10px] font-bold tracking-[0.5px] text-white">
          {statutory.actBadge}
        </span>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] table-fixed border-collapse text-left">
          <thead className="bg-[#eff4ff] text-[11px] font-bold uppercase tracking-[0.55px] text-[#001229]">
            <tr>
              <th className="w-[34%] px-3 py-3">Seat Category &amp; Designation</th>
              <th className="w-[19%] px-3 py-2">Statutory Allocation</th>
              <th className="w-[31%] px-3 py-3">Minimum Athletic Benchmarks</th>
              <th className="w-[16%] px-3 py-2 text-right">Fee Entitlement</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRows.map((row) => {
              const isChampion =
                row.category === "National / International Champions Quota" ||
                row.fee.includes("100%");
              const isScSt =
                row.category === "Scheduled Castes / Scheduled Tribes (SC/ST)" ||
                row.fee.includes("Post-Matric");
              const isArmedForces =
                row.category === "Wards of Armed Forces & Punjab Police";

              const allocationColor = isChampion
                ? "text-[#002d1c]"
                : row.category === "All-India Open Merit"
                ? "text-[#001229]"
                : "text-[#904d00]";

              const feeBadge =
                row.feeBadge ||
                (isChampion
                  ? "bg-[#6ffbbe] text-[#002113]"
                  : isScSt
                  ? "bg-[#FFDCC3] text-[#2f1500]"
                  : "");

              return (
                <tr
                  key={row.id || row.category}
                  className={`${
                    isChampion || isArmedForces ? "bg-[rgba(239,244,255,0.2)]" : ""
                  } transition-colors duration-200 hover:bg-[#e8f0ff]`}
                >
                  <td className="px-3 py-3 align-middle">
                    <div className="text-xs font-bold text-[#001229]">{row.category}</div>
                    <div className="mt-1 text-[11px] leading-4 text-[#44474d]">
                      {row.description}
                    </div>
                  </td>
                  <td className={`px-3 py-3 text-xs font-bold ${allocationColor}`}>
                    {row.allocation}
                  </td>
                  <td
                    className={`px-3 py-3 text-xs leading-4 ${
                      isChampion ? "text-[#00a16f]" : "text-[#0b1c30]"
                    }`}
                  >
                    {row.benchmark}
                  </td>
                  <td className="px-3 py-3 text-right text-xs text-[#0b1c30]">
                    {feeBadge ? (
                      <span
                        className={`inline-block max-w-full rounded-sm px-2 py-1 font-bold ${feeBadge}`}
                      >
                        {row.fee}
                      </span>
                    ) : (
                      row.fee
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {Math.ceil(rows.length / rowsPerPage) > 1 && (
        <Stack className="mt-4 items-center">
          <Pagination
            count={Math.ceil(rows.length / rowsPerPage)}
            page={page}
            onChange={(_, nextPage) => setPage(nextPage)}
            renderItem={(item) => (
              <PaginationItem
                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                {...item}
              />
            )}
          />
        </Stack>
      )}
    </section>
  );
};

export default Statutory;