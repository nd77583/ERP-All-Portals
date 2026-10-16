"use client";

import Image from "next/image";

type BookProps = {
  image: string;
  callNo: string;
  title: string;
  status: string;
  statusType: "available" | "inuse";
  author: string;
  isbn: string;
  subject: string;
  publisher: string;
  location: string;
  extraInfo: string;
  button1: string;
  button2: string;
};

export default function BookCard({
  image,
  callNo,
  title,
  status,
  statusType,
  author,
  isbn,
  subject,
  publisher,
  location,
  extraInfo,
  button1,
  button2,
}: BookProps) {
  return (
    <div className="mt-2.5 flex flex-col sm:flex-row gap-3 rounded-[6px] border border-[#dfe5ed] bg-[#f8faff] p-2.5 sm:p-3 hover:border-[#bfdbfe] transition-all duration-150">
      {/* BOOK IMAGE */}
      <div className="flex h-[110px] sm:h-[116px] w-full sm:w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-[4px] bg-[#e8eef7]">
        <Image
          src={image}
          alt="Book cover"
          width={80}
          height={116}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        {/* TITLE + STATUS */}
        <div className="flex flex-wrap sm:flex-nowrap items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="font-['Inter'] text-[10.5px] font-bold leading-tight text-[#b56b00] uppercase tracking-wide">
              CALL NO: {callNo}
            </p>

            <h3 className="mt-0.5 font-['Public_Sans'] text-[13.5px] sm:text-[14.5px] font-bold leading-snug text-[#102d4d]">
              {title}
            </h3>
          </div>

          <span
            className={`shrink-0 rounded-[3px] px-2 py-1 font-['Inter'] text-[9.5px] font-bold leading-none tracking-wide text-[#102d4d] ${
              statusType === "available"
                ? "bg-[#35d49a]"
                : "bg-[#e5efff]"
            }`}
          >
            {status}
          </span>
        </div>

        {/* MARC21 DETAILS */}
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1.5 rounded-[4px] border border-[#edf2f7] bg-white p-2 sm:p-2.5 text-[9.5px] sm:text-[10px]">
          <p className="font-['Inter'] font-semibold leading-tight text-[#596979] truncate">
            <b className="text-[#b56b00] font-bold">100 $a</b> {author}
          </p>

          <p className="font-['Inter'] font-semibold leading-tight text-[#596979] truncate">
            <b className="text-[#b56b00] font-bold">020 $a</b> {isbn}
          </p>

          <p className="font-['Inter'] font-semibold leading-tight text-[#596979] truncate">
            <b className="text-[#b56b00] font-bold">245 $a</b> {subject}
          </p>

          <p className="font-['Inter'] font-semibold leading-tight text-[#596979] truncate">
            <b className="text-[#b56b00] font-bold">260 $a</b> {publisher}
          </p>
        </div>

        {/* LOCATION / EXTRA INFO */}
        <div className="mt-1.5 flex flex-wrap items-center gap-2 font-['Inter'] text-[9.5px] sm:text-[10px] font-medium text-[#596979]">
          <span className="flex items-center gap-1">▣ {location}</span>
          <span className="text-slate-300">•</span>
          <span>{extraInfo}</span>
        </div>

        {/* BUTTONS */}
        <div className="mt-2 flex flex-wrap gap-2">
          <button className="rounded-[4px] bg-[#dce9ff] hover:bg-[#c9ddfe] px-2.5 py-1 font-['Inter'] text-[10px] font-semibold text-[#0b1c30] transition-colors">
            {button1}
          </button>

          <button
            className={`rounded-[4px] px-2.5 py-1 font-['Inter'] text-[10px] font-semibold transition-colors ${
              statusType === "available"
                ? "bg-[#102d4d] hover:bg-[#1a3d66] text-white"
                : "bg-[#ec8829] hover:bg-[#dd7a1e] text-[#663500]"
            }`}
          >
            {button2}
          </button>
        </div>
      </div>
    </div>
  );
}