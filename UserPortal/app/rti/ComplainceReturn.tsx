 const returnsArray = [
    { quarter: 'Q4 Return (Jan–Mar 2025)', acknowledgement: 'PSIC/RET/2025/0914', date: '12 Apr 2025' },
    { quarter: 'Q3 Return (Oct–Dec 2024)', acknowledgement: 'PSIC/RET/2024/4811', date: '09 Jan 2025' },
    { quarter: 'Q2 Return (Jul–Sep 2024)', acknowledgement: 'PSIC/RET/2024/3102', date: '11 Oct 2024' },
    { quarter: 'Q1 Return (Apr–Jun 2024)', acknowledgement: 'PSIC/RET/2024/1822', date: '08 Jul 2024' },
  ]

const ComplainceReturn = () => {
  return (
    <section className="flex w-full flex-col gap-3 rounded-sm border border-[#c4c6ce]/30 bg-white p-3 shadow-sm">
      <header className="flex items-center justify-between border-b border-[#c4c6ce]/30 pb-3">
        <div>
          <p className="font-sans text-[10px] font-bold uppercase leading-3 tracking-[0.5px] text-[#904d00]">
            Compliance returns
          </p>
          <h2 className="font-sans text-base font-bold leading-6 tracking-[-0.08px] text-[#001229]">
            Punjab SIC Submissions
          </h2>
        </div>
        <svg
          aria-hidden="true"
          className="h-6 w-6 shrink-0 text-[#002d1c]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="m12 2 2.4 2.1 3.2-.2.9 3.1 2.7 1.8-1.2 3 1.2 3-2.7 1.8-.9 3.1-3.2-.2L12 22l-2.4-2.1-3.2.2-.9-3.1L2.8 15l1.2-3-1.2-3 2.7-1.8.9-3.1 3.2.2L12 2Z" />
          <path d="m8.5 12 2.2 2.2 4.8-5" />
        </svg>
      </header>

      <div className="flex flex-col gap-2">
        {returnsArray.map(({ quarter, acknowledgement, date }) => (
          <div
            key={quarter}
            className="flex min-h-9 items-center justify-between gap-3 rounded-sm bg-[#eff4ff] p-2"
          >
            <div className="min-w-0">
              <h3 className="font-sans text-xs font-bold leading-4 text-[#001229]">
                {quarter}
              </h3>
              <p className="font-sans text-[10px] font-bold leading-3 tracking-[0.5px] text-[#44474d]">
                Ack: {acknowledgement} <span aria-hidden="true">•</span> {date}
              </p>
            </div>
            <a
              href="#"
              aria-label={`Download ${quarter} PDF`}
              className="flex shrink-0 items-center gap-1 font-sans text-[10px] font-bold leading-3 tracking-[0.5px] text-[#001229] hover:underline cursor-pointer"
            >
              <svg
                aria-hidden="true"
                className="h-[11px] w-[11px]"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 1v7m-3-3 3 3 3-3M1 9v2h10V9" />
              </svg>
              PDF
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ComplainceReturn
































