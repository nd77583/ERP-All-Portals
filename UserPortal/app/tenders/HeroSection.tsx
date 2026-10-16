const tenderStats = [
  {
    label: "Active e-Tenders",
    value: "14",
    detail: "₹8.42 Cr Cumulative",
    icon: (
      <svg className="h-[17px] w-[17px] text-[#001229]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
        <path d="M9 4h6l1 2h4v15H4V6h4l1-2Z" />
        <path d="m8 13 3 3 5-6" />
      </svg>
    ),
  },
  {
    label: "GeM Custom Bids",
    value: "06",
    detail: "Ministry Category L1",
    icon: (
      <svg className="h-[17px] w-[17px] text-[#904D00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
        <path d="M3 4h2l2.5 11h11L21 8H7" />
        <path d="M10 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM18 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM14 4l4 4-4 4M18 8h-7" />
      </svg>
    ),
  },
  {
    label: "Gazette Circulars",
    value: "38",
    detail: "Updated Today",
    icon: (
      <svg className="h-[17px] w-[17px] text-[#00A16F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
        <path d="M5 3h10l5 5v13H5V3Z" />
        <path d="M15 3v6h5M8 13h9M8 17h9" />
      </svg>
    ),
  },
  {
    label: "Corrigenda Issued",
    value: "03",
    detail: "Critical Extensions",
    icon: <img src="/tenders/paper.png" alt="Corrigenda Icon" className="h-[16px] w-[16px]" />,
    valueClass: "text-[#BA1A1A]",
  },
]

const getStatClasses = (label: string) => {
  switch (label) {
    case "Active e-Tenders":
      return { detail: "text-[#904D00]", accent: "before:bg-[#001229]" }
    case "GeM Custom Bids":
      return { detail: "text-[#44474D]", accent: "before:bg-[#FE932C]" }
    case "Gazette Circulars":
      return { detail: "text-[#00A16F]", accent: "before:bg-[#002D1C]" }
    case "Corrigenda Issued":
      return { detail: "text-[#BA1A1A]", accent: "before:bg-[#BA1A1A]" }
    default:
      return { detail: "", accent: "" }
  }
}

const HeroSection = () => (
  <section className="flex min-h-[233px] w-full flex-col gap-4 bg-white px-4 py-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:px-5">
    <div className="flex w-full flex-col items-start justify-between gap-4 lg:min-h-[96px] lg:flex-row lg:items-center lg:gap-6">
      <div className="flex w-full min-w-0 max-w-[896px] flex-col gap-1">
        <div className="flex items-center gap-1 text-[#904D00]">
          <svg className="h-[14px] w-[12px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M12 3 20 6v5c0 5-3.4 8.2-8 10-4.6-1.8-8-5-8-10V6l8-3Z" />
            <path d="m8.5 11.5 2.3 2.3 4.8-5" />
          </svg>
          <p className="font-[Inter] text-[10px] font-bold uppercase leading-3 tracking-[0.5px]">
            Statutory Oversight Cell • Department of Purchase &amp; Works
          </p>
        </div>
        <h1 className="font-['Public_Sans'] text-xl font-bold leading-7 tracking-[-0.6px] text-[#001229] sm:text-2xl sm:leading-8">
          Official Statutory Procurement Tenders, GeM Notices &amp; Institutional Gazette
        </h1>
        <p className="font-['Public_Sans'] text-[13px] leading-[21px] text-[#44474D]">
          Administered strictly under Rule 144 to 175 of the Punjab Financial Rules (PFR Vol. I) and Central Vigilance Commission (CVC) e-Tendering Directives.
          <br className="hidden sm:block" />
          All high-value bids require two-tier digital evaluation, encrypted submission on Punjab Tender Portal / GeM, and statutory integrity pact undertaking.
        </p>
      </div>

      <div className="flex w-full flex-col items-stretch gap-1 sm:flex-row sm:flex-wrap lg:w-[245px] lg:shrink-0 lg:flex-col lg:items-end">
        <a href="#" className="flex h-[22px] w-full items-center gap-1 rounded-[2px] bg-[#001229] px-3 text-white hover:bg-[#002D1C]">
          <svg className="h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M14 4h6v6M20 4 10 14" />
            <path d="M18 13v6H5V6h6" />
          </svg>
          <span className="font-[Inter] text-[11px] font-semibold leading-[14px] tracking-[0.275px]">Punjab e-Procurement Portal (eProc)</span>
        </a>
        <a href="#" className="flex h-[22px] w-full items-center gap-1 rounded-[2px] bg-[#DCE9FF] px-3 text-[#001229] shadow-sm hover:bg-[#C8DCFF] sm:w-[214px]">
          <img src="/tenders/home.png" alt="GeM Logo" className="h-3 w-3" />
          <span className="font-[Inter] text-[11px] font-semibold leading-[14px] tracking-[0.275px]">GeM MBSPSU Secondary Vault</span>
        </a>
      </div>
    </div>

    <div className="grid w-full grid-cols-1 gap-3 pt-1 sm:grid-cols-2 lg:grid-cols-4 lg:pt-3">
      {tenderStats.map((stat) => {
        const classes = getStatClasses(stat.label)

        return (
        <article key={stat.label} className={`relative flex h-[77px] flex-1 flex-col gap-1 overflow-hidden rounded-[2px] bg-[#EFF4FF] p-3 shadow-sm before:absolute before:inset-x-0 before:top-0 before:h-[2px] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)] hover: border-[#D9E7FF] ${classes.accent}`}>
          <div className="flex items-center justify-between">
            <p className="font-[Inter] text-[11px] font-semibold uppercase leading-[14px] tracking-[0.275px] text-[#44474D]">{stat.label}</p>
            {stat.icon}
          </div>
          <p className={`flex items-baseline gap-1 font-['Public_Sans'] text-2xl font-bold leading-8 tracking-[-0.36px] ${stat.valueClass ?? "text-[#001229]"}`}>
            {stat.value}
            <span className={`font-[Inter] text-[10px] font-bold leading-3 tracking-[0.5px] ${classes.detail}`}>{stat.detail}</span>
          </p>
        </article>
        )
      })}
    </div>
  </section>
)

export default HeroSection