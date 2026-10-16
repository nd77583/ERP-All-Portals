const Authorities = () => {
  return (
  <section className="w-full rounded-sm border border-[#c4c6ce]/40 bg-white p-3 shadow-sm sm:max-w-[780px]" aria-labelledby="authorities-heading">
    <header className="mb-1 flex items-center justify-between border-b border-[#c4c6ce]/40 pb-2">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.5px] text-[#904d00]">Designated Officials</p>
        <h1 id="authorities-heading" className="text-base font-bold tracking-tight text-[#001229]">Statutory RTI Authorities Directory</h1>
      </div>
      <img src="/rti/idCard.png" alt="ID Card Icon" className="h-6 w-6 shrink-0 text-[#001229]"/>
    </header>

    <div className="flex flex-col gap-4 pt-3">
      <article className="flex min-h-[147px] items-start gap-3 rounded-sm border-l-4 border-l-[#001229] bg-[#eff4ff] p-3 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)] hover: border-[#D9E7FF]">
        <img src="/rti/a1.png" alt="" className="mt-1 h-12 w-12 shrink-0 rounded-sm object-cover shadow-sm" />
        <div className="min-w-0 flex-1 pt-1">
          <span className="inline-block rounded-sm bg-[#001229] px-1.5 py-0.5 text-[10px] font-bold uppercase leading-3 tracking-[0.5px] text-white">
            First Appellate Authority (FAA)
          </span>
          <h2 className="mt-2 text-base font-bold leading-6 tracking-tight text-[#001229]">Prof. (Dr.) Gurvinder Singh</h2>
          <p className="text-[12px] leading-4 text-[#0b1c30]">Registrar, MBSPSU Patiala</p>
          <div className="mt-1.5 space-y-1 text-[12px] leading-4">
            <p className="flex items-start gap-1.5 text-[#0b1c30]"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#904D00]"><path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-5h6v5M8 10h.01M12 10h.01M16 10h.01M8 13h.01M16 13h.01" /></svg><span>Administrative Block, Room 102, Mohindra Kothi Campus</span></p>
            <a className="flex items-center gap-1.5 text-[#55585e] hover:underline" href="mailto:registrar@mbspsu.ac.in"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4 shrink-0 text-[#904D00]"><rect x="3" y="5" width="18" height="14" rx="1" /><path d="m3 7 9 6 9-6" /></svg>registrar@mbspsu.ac.in</a>
            <a className="flex items-center gap-1.5 text-[#55585e] hover:underline" href="tel:+91-175-2920201"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4 shrink-0 text-[#904D00]"><path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 3a14 14 0 0 1-7-7l3-2-2-5Z " /></svg>+91-175-2920201</a>
          </div>
        </div>
      </article>

      <article className="flex min-h-[147px] items-start gap-3 rounded-sm border-l-4 border-l-[#fe932c] bg-[#eff4ff] p-3 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)] hover: border-[#D9E7FF]">
        <img src="/rti/a2.png" alt="" className="mt-1 h-12 w-12 shrink-0 rounded-sm object-cover shadow-sm" />
        <div className="min-w-0 flex-1 pt-1">
          <span className="inline-block rounded-sm bg-[#fe932c] px-1.5 py-0.5 text-[10px] font-bold uppercase leading-3 tracking-[0.5px] text-[#663500]">
            Central Public Information Officer (CPIO)
          </span>
          <h2 className="mt-2 text-base font-bold leading-6 tracking-tight text-[#001229]">Sh. Harpreet Singh</h2>
          <p className="text-[12px] leading-4 text-[#0b1c30]">Deputy Registrar (General Administration)</p>
          <div className="mt-1.5 space-y-1 text-[12px] leading-4">
            <p className="flex items-start gap-1.5 text-[#0b1c30]"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#904D00]"><path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-5h6v5M8 10h.01M12 10h.01M16 10h.01M8 13h.01M16 13h.01" /></svg><span>Syndicate Secretariat Wing, Mohindra Kothi</span></p>
            <a className="flex items-center gap-1.5 text-[#55585e] hover:underline" href="mailto:cpio.rti@mbspsu.ac.in"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4 shrink-0 text-[#904D00]"><rect x="3" y="5" width="18" height="14" rx="1" /><path d="m3 7 9 6 9-6" /></svg>cpio.rti@mbspsu.ac.in</a>
            <a className="flex items-center gap-1.5 text-[#55585e] hover:underline" href="tel:+91-175-2920208"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4 shrink-0 text-[#904D00]"><path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 3a14 14 0 0 1-7-7l3-2-2-5Z " /></svg>+91-175-2920208</a>
          </div>
        </div>
      </article>

      <article className="flex min-h-[147px] items-start gap-3 rounded-sm border-l-4 border-l-[#74777e] bg-[#eff4ff] p-3 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)] hover: border-[#D9E7FF]">
        <img src="/rti/a3.png" alt="" className="mt-1 h-12 w-12 shrink-0 rounded-sm object-cover shadow-sm" />
        <div className="min-w-0 flex-1 pt-1">
          <span className="inline-block rounded-sm bg-[#dce9ff] px-1.5 py-0.5 text-[10px] font-bold uppercase leading-3 tracking-[0.5px] text-[#0b1c30]">
            Assistant PIO (APIO)
          </span>
          <h2 className="mt-2 text-base font-bold leading-6 tracking-tight text-[#001229]">Dr. Manpreet Kaur</h2>
          <p className="text-[12px] leading-4 text-[#0b1c30]">Asst. Director of Sports &amp; Student Affairs</p>
          <div className="mt-1.5 space-y-1 text-[12px] leading-4">
            <p className="flex items-start gap-1.5 text-[#0b1c30]"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#904D00]"><path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-5h6v5M8 10h.01M12 10h.01M16 10h.01M8 13h.01M16 13h.01" /></svg><span>Gymnasium Road Sports Complex, Patiala</span></p>
            <a className="flex items-center gap-1.5 text-[#55585e] hover:underline" href="mailto:apio.rti@mbspsu.ac.in"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4 shrink-0 text-[#904D00]"><rect x="3" y="5" width="18" height="14" rx="1" /><path d="m3 7 9 6 9-6" /></svg>apio.rti@mbspsu.ac.in</a>
            <a className="flex items-center gap-1.5 text-[#55585e] hover:underline" href="tel:+91-175-2920215"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4 shrink-0 text-[#904D00]"><path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 3a14 14 0 0 1-7-7l3-2-2-5Z " /></svg>+91-175-2920215</a>
          </div>
        </div>
      </article>
    </div>
  </section>
)}

export default Authorities










