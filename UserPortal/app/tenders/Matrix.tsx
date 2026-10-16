const complianceItems = [
  {
    title: "Debarred / Blacklisted Entities Check",
    icon: <svg className="h-5 w-5 shrink-0 text-[#0f9d58]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="m8.5 12.5 2.5 2.5 5-6" /></svg>,
    content: "Any firm debarred by UGC, SAI, Sports Department Punjab, GeM, or Central/State Government agencies is barred from submitting bids. Real-time verification is cross-referenced with the National Debarment Database.",
  },
  {
    title: "Independent External Monitor (IEM)",
    icon: <img src="/tenders/hand.png" alt="" />,
    content: "For tenders over ₹2 Crores, Independent External Monitors (IEMs) nominated by the Punjab Vigilance Bureau oversee technical and financial evaluations to prevent corrupt or anti-competitive practices.",
  },
]

const Matrix = () => (
  <section className="mt-3 px-3 pb-4 sm:px-5">
    <div className="mx-auto grid w-full grid-cols-1 items-start gap-4 lg:grid-cols-12">
      <article className="flex min-w-0 flex-col justify-between gap-6 rounded-sm bg-white p-4 shadow-sm sm:p-5 lg:col-span-4">
        <div>
          <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#904d00]"><svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="12" cy="9" r="2.5" /><path d="M7.5 17c.8-2 2.3-3 4.5-3s3.7 1 4.5 3" /></svg><span>Statutory Nodal Authority</span></div>
          <h2 className="text-xl font-bold tracking-tight text-[#001229]">Chief Accounts Officer / Central Purchase Cell</h2>
          <p className="mt-3 text-base leading-5 text-[#44474d]">Designated First Appellate Authority under the Punjab Transparency in Public Procurement Act (PTPPA).</p>
          <ul className="mt-6 space-y-2 text-sm leading-5 text-[#0b1c30]">
            <li className="flex items-center gap-2">
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>
              <span>Administrative Block, 1st Floor, Room 108, MBSPSU Main Campus, Mohindra Kothi, Patiala - 147001</span>
            </li>
            <li className="flex items-center gap-2">
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 3a2 2 0 0 1-.6 1.7L7.1 10.3a16 16 0 0 0 6.6 6.6l1.9-1.9a2 2 0 0 1 1.7-.6l3 .5a2 2 0 0 1 1.7 2Z" /></svg>
              <span>+91-175-2920215 (Direct Procurement Line)</span>
            </li>
            <li className="flex items-center gap-2">
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
              <span><a href="mailto:purchase.tenders@mbspsu.ac.in" className="hover:underline">purchase.tenders@mbspsu.ac.in</a></span>
            </li>
            <li className="flex items-center gap-2">
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
              <span>Working Hours: Mon - Fri, 09:00 AM - 05:00 PM IST</span>
            </li>
          </ul>
        </div>
        <div className="rounded-sm bg-[#eff4ff] p-2">
          <h3 className="text-sm font-bold uppercase tracking-wide text-[#0b1c30]">Tender Inquiries Helpdesk</h3>
          <p className="text-sm leading-5 text-[#44474d]">Clarifications must be submitted via email 72 hours prior to pre-bid meeting.</p>
        </div>
      </article>

      <article className="flex min-w-0 flex-col justify-between gap-5 rounded-sm bg-white p-4 shadow-sm sm:p-5 lg:col-span-8">
        <div>
          <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ba1a1a]"><svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m12 2 2.3 2.1 3.1-.2.9 3 2.7 1.6-1 3 1 3-2.7 1.6-.9 3-3.1-.2L12 21l-2.3-2.1-3.1.2-.9-3L3 14.5l1-3-1-3 2.7-1.6.9-3 3.1.2L12 2Z" /><path d="m9 12 2 2 4-4" /></svg><span>Central Vigilance Commission (CVC) Mandatory Compliance</span></div>
          <h2 className="text-2xl font-bold tracking-tight text-[#001229]">Statutory Integrity Pact &amp; Vendor Debarment Verification</h2>
          <p className="mt-3 text-base leading-6 text-[#44474d]">In compliance with Central Vigilance Commission (CVC) Circular No. 02/01/2017 and Punjab Financial Rules, every bidder participating in MBSPSU tenders exceeding ₹10 Lakhs is strictly required to execute an official tripartite Integrity Pact on non-judicial stamp paper of ₹100/-.</p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {complianceItems.map((item) => (
            <div key={item.title} className="rounded-sm bg-[#eff4ff] p-3">
              <h3 className="mb-1 flex items-center gap-2 text-sm font-bold text-[#001229]">
                {item.icon}
                {item.title}
              </h3>
              <p className="text-sm leading-5 text-[#44474d]">{item.content}</p>
            </div>
          ))}
        </div>
        <div>
          <p className="mb-3 flex items-center gap-2 text-xs font-bold tracking-wide text-[#44474d]"><svg className="h-5 w-5 shrink-0 text-[#4edea3]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" /></svg>All procurement contracts fall under the exclusive jurisdiction of the District Courts, Patiala (Punjab).</p>
          <a href="#" className="inline-flex items-center gap-2 rounded-sm bg-[#dce9ff] px-3 py-1.5 text-sm font-semibold text-[#001229] shadow-sm hover:bg-[#cbdcff]"><svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5M12 15V3" /></svg>Download Standard Integrity Pact Format</a>
        </div>
      </article>
    </div>
  </section>
)

export default Matrix