"use client"
import { useState } from "react"

const requests = [
  {
    reference: "MBSPSU/RTI/2025/084",
    subject: "High-Performance Biomechanics Lab Equipment Tenders",
    stage: "In-Triage Stage",
    day: 11,
    totalDays: 30,
    currentStep: 3,
    steps: [
      { label: "Received", status: "completed" },
      { label: "CPIO Validated", status: "completed" },
      { label: "Record Triage", status: "active" },
      { label: "Dispatched", status: "pending" },
    ],
  },
]

const TracKRequest = () => {
  const [reference, setReference] = useState("")
  const [trackedReference, setTrackedReference] = useState("")
  const request = requests.find((item) => item.reference === trackedReference)

  return (
    <section className="w-full rounded-sm border border-[#c4c6ce]/40 bg-white p-3 shadow-sm sm:p-6">
      <header className="flex items-center justify-between border-b border-[#c4c6ce]/40">
        <div className="flex gap-3 sm:gap-4" role="tablist" aria-label="RTI request options">
          <button type="button" role="tab" aria-selected="true" className="border-b-2 border-[#001229] px-1 pb-2 text-sm font-bold text-[#001229] sm:text-base cursor-pointer">Track Existing Request</button>
          <button type="button" role="tab" aria-selected="false" className="border-b-2 border-transparent px-1 pb-2 text-sm font-semibold text-[#44474d] sm:text-base cursor-pointer">Statutory Fee Structure</button>
        </div>
        <svg className="mb-2 h-6 w-6 shrink-0 text-[#904d00]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M14 3H5v18h12v-5M14 3l5 5h-5V3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="16" cy="14" r="3" stroke="currentColor" strokeWidth="2" />
          <path d="m18.3 16.3 2.2 2.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </header>

      <div className="mt-6 space-y-3">
        <label htmlFor="rti-reference" className="block text-sm font-bold tracking-wide text-[#44474d] sm:text-base">RTI APPLICATION REFERENCE NUMBER</label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input id="rti-reference" type="text" value={reference} onChange={(event) => setReference(event.target.value)} className="min-w-0 flex-1 rounded-sm border border-[#c4c6ce] bg-[#eff4ff] px-3 py-2 text-base text-[#001229] outline-none focus:border-[#001229] focus:ring-1 focus:ring-[#001229] sm:text-lg" />
          <button type="button" onClick={() => setTrackedReference(reference.trim())} className="rounded-sm bg-[#001229] px-4 py-2 text-sm font-bold tracking-wide text-white hover:bg-[#102b49] sm:text-base">Track Status</button>
        </div>
        {request && (
          <article className="rounded-sm bg-[#eff4ff] p-4 text-[#001229]" aria-live="polite">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h2 className="text-lg font-bold leading-tight tracking-[-0.02em] text-[#001229] sm:text-2xl">{request.reference}</h2>
              <span className="rounded-sm bg-[#ffdfc1] px-3 py-1 text-[10px] font-bold tracking-[0.5px] text-[#462100] sm:text-[12px]">{request.stage}</span>
            </div>
            <p className="mt-1 text-sm font-normal leading-relaxed text-[#0b1c30] sm:text-base">Subject: {request.subject}</p>

            <div className="mt-5 border-t border-[#c4c6ce]/50 pt-3">
              <div className="grid grid-cols-4 items-start text-center">
                {request.steps.map((step, index) => (
                  <div key={step.label} className="relative flex flex-col items-center">
                    {index > 0 && <span className={`absolute right-1/2 top-5 h-1 w-full sm:top-6 ${index < request.currentStep ? "bg-[#001229]" : index === request.currentStep - 1 ? "bg-[#ff982e]" : "bg-[#dce1eb]"}`} />}
                    <span className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full text-base font-bold sm:h-12 sm:w-12 sm:text-xl ${step.status === "completed" ? "bg-[#001229] text-white" : step.status === "active" ? "bg-[#ff982e] text-[#462100]" : "bg-[#dce8ff] text-[#44474d]"}`}>
                      {step.status === "completed" ? "✓" : index + 1}
                    </span>
                    <span className={`mt-1 text-[10px] font-bold tracking-[0.5px] sm:text-[10px] ${step.status === "active" ? "text-[#904d00]" : step.status === "completed" ? "text-[#001229]" : "text-[#44474d]"}`}>{step.label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-1 rounded-sm bg-[#e5eeff] px-2 py-1 text-[10px] font-bold tracking-[0.5px] text-[#44474d] sm:px-3 sm:text-[10px]">
                <span className="inline-flex items-center"><span className="mr-2 inline-flex h-4 w-4 shrink-0 text-[#904d00]" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full"><circle cx="12" cy="12" r="10"/><path d="M12 6v6H8"/></svg></span>Statutory SLA Burn:</span>
                <span className="text-[#001229]">Day {request.day} of {request.totalDays} ({request.totalDays - request.day} Days Remaining)</span>
              </div>
            </div>
          </article>
        )}
        <div className="rounded-sm bg-[#e5eeff] p-2 text-sm font-bold leading-5 text-[#001229] sm:text-base">
          Statutory SLA Norms: <span className="text-[#44474d]">30 Calendar Days for regular inquiries under Section 7(1). Matters involving life or personal liberty resolved within </span><span className="text-red-700">48 hours.</span>
        </div>
      </div>
    </section>
  )
}

export default TracKRequest




























