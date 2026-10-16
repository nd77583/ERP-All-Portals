import React from "react";

const Announcement = () => {
  return (
    <section className="box-border flex min-h-[29px] w-full items-center justify-center border-t border-[rgba(196,198,206,0.2)] bg-[#E5EEFF] px-5 py-[6px]">
      <div className="flex w-full w-full items-center gap-2">
        <span className="flex shrink-0 items-center gap-1 rounded-[2px] bg-[#BA1A1A] px-2 py-[4px] text-[10px] font-bold uppercase leading-3 tracking-[0.5px] text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className ="lucide lucide-megaphone preview-icon h-3 w-3 shrink-0"
          >
            <path d="M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
            <path d="M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14" />
            <path d="M8 6v8" />
          </svg>
          Latest Announcements
        </span>
        <p className="min-w-0 flex-1 text-xs font-normal leading-4 text-[#0B1C30]">
          Physical Fitness Test &amp; Sports Trials Schedule for B.P.Ed &amp;
          M.Sc Sports Science AY 2025-26 published. Verify test venue guidelines
          and reporting times.
        </p>
        <a
          href="#"
          className="shrink-0 text-[10px] font-bold uppercase leading-3 tracking-[0.5px] text-[#904D00] font-bold underline"
        >
          View Circular
        </a>
      </div>
    </section>
  );
};

export default Announcement;
