import React from 'react'

const GRAdvisory = () => {
  return (
    <section className="w-full bg-[#f8f9ff] px-5 pb-6" aria-label="Regulatory advisory">
      <div className="mx-auto flex w-full w-full flex-col gap-3">
        <div className="flex flex-col justify-between gap-3 rounded-[2px] border-l-4 border-[#904d00] bg-[#dce9ff] p-3 sm:flex-row sm:items-center">
          <div className="flex min-w-0 items-start gap-3">
            <svg className="mt-0.5 h-10 w-10 shrink-0 text-[#904d00]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path d="M12 11v6m0-10h.01" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <div>
              <h2 className="text-base font-bold leading-6 tracking-[-0.08px] text-[#001229]">
                Statutory Grievance &amp; Redressal Advisory
              </h2>
              <p className="mt-1 text-xs leading-4 text-[#44474d]">
                The Right to Information Act is exclusively designated for accessing records and verified institutional documents. Employee service grievances, athlete selection disputes, sexual harassment complaints (POSH Act), and student anti-ragging complaints must be filed directly via the respective statutory grievance channels for expedited legal action.
              </p>
            </div>
          </div>
          <nav className="flex shrink-0 flex-wrap gap-1 sm:justify-end" aria-label="Statutory grievance channels">
            <a href="#posh-vault" className="rounded-sm border border-[#c4c6ce] bg-white px-3 py-1 text-center text-[11px] leading-[14px] font-bold tracking-[0.275px] text-[#001229] shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#904d00]">
              POSH Vault
            </a>
            <a href="#anti-ragging-cell" className="rounded-sm border border-[#c4c6ce] bg-white px-3 py-1 text-center text-[11px] leading-[14px] font-bold tracking-[0.275px] text-[#001229] shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#904d00]">
              Anti-Ragging Cell
            </a>
            <a href="#grievance-redressal" className="rounded-sm border border-[#c4c6ce] bg-white px-3 py-1 text-center text-[11px] leading-[14px] font-bold tracking-[0.275px] text-[#001229] shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#904d00]">
              Grievance Redressal
            </a>
          </nav>
        </div>

        <div className="flex flex-col justify-between gap-3 rounded-[2px] border border-[rgba(196,198,206,0.3)] bg-white px-4 py-3 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] leading-3 font-bold tracking-[0.5px] text-[#44474d]">
            <span className="inline-flex items-center gap-2 text-[#001229]">
              <svg className="h-[13.33px] w-[10.67px] text-[#002d1c]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2 3 5v6c0 5.4 3.8 9.5 9 11 5.2-1.5 9-5.6 9-11V5l-9-3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <circle cx="11" cy="11" r="3.2" stroke="currentColor" strokeWidth="2" />
                <path d="m13.5 13.5 2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              GIGW 3.0 Certified
            </span>
            <span aria-hidden="true">•</span>
            <span>STQC &amp; WCAG 2.1 AA Accessibility Checked</span>
            <span aria-hidden="true">•</span>
            <span>Digital Signature Authenticated (SHA-256)</span>
          </div>
          <p className="text-[10px] leading-3 font-bold tracking-[0.5px] text-[#44474d] sm:text-right">
            Statutory Nodal Officer: Joint Registrar (Transparency &amp; Legal Cell), MBPSU Patiala
          </p>
        </div>
      </div>
    </section>
  )
}

export default GRAdvisory































