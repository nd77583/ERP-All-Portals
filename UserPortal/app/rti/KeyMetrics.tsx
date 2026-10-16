const KeyMetrics = () => {
  return (
    <section aria-label="Key metrics and statutory benchmarks" className="w-full border-b border-[#c4c6ce]/30 bg-white px-5 py-4">
      <div className="mx-auto grid w-full w-full grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <article className="flex h-[97px] flex-col justify-between gap-0.5 rounded-sm border-t-2 border-t-[#001229] bg-[#EFF4FF] p-3 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)] hover: border-[#D9E7FF]">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.275px] text-[#44474D]">Disposal Compliance</h2>
            <img className="h-[15px] w-[15px] object-contain" src="/rti/i1.png" alt="" />
          </div>
          <div className="flex flex-wrap items-baseline gap-1">
            <span className="text-[24px] font-bold leading-8 tracking-[-0.36px] text-[#001229]">97.4%</span>
            <span className="text-[10px] font-bold tracking-[0.5px] leading-[18px] text-[#44474D]">SLA Bound</span>
          </div>
          <div className="flex flex-wrap items-center gap-1 text-[12px] leading-4 text-[#44474D]">
            <span className="font-semibold text-[#002D1C]">Strict 30-Day Limit</span>
            <span className="font-normal text-[#44474D]">Under RTI Section 7(1)</span>
          </div>
        </article>
        <article className="flex h-[97px] flex-col justify-between gap-0.5 rounded-sm border-t-2 border-t-[#FE932C] bg-[#EFF4FF] p-3 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)] hover: border-[#D9E7FF]">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.275px] text-[#44474D]">Avg. Turnaround</h2>
            <img className="h-[15px] w-[15px] object-contain" src="/rti/i2.png" alt="" />
          </div>
          <div className="flex flex-wrap items-baseline gap-1">
            <span className="text-[24px] font-bold leading-8 tracking-[-0.36px] text-[#001229]">18.2</span>
            <span className="text-[13px] font-semibold leading-[18px] text-[#44474D]">Working Days</span>
          </div>
          <div className="flex flex-wrap items-center gap-1 text-[12px] leading-4 text-[#44474D]">
            <span className="font-normal text-[#44474D]">National Target: </span>
            <span className="font-normal text-[#44474D]">&lt;30 Days (40% Faster)</span>
          </div>
        </article>
        <article className="flex h-[97px] flex-col justify-between gap-0.5 rounded-sm border-t-2 border-t-[#001229] bg-[#EFF4FF] p-3 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)] hover: border-[#D9E7FF]">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.275px] text-[#44474D]">Volume (AY 2024–25)</h2>
            <img className="h-[15px] w-[15px] object-contain" src="/rti/i3.png" alt="" />
          </div>
          <div className="flex flex-wrap items-baseline gap-1">
            <span className="text-[24px] font-bold leading-8 tracking-[-0.36px] text-[#001229]">142</span>
            <span className="text-[10px] font-bold tracking-[0.5px] leading-[18px] text-[#44474D]">Applications</span>
          </div>
          <div className="flex flex-wrap items-center gap-1 text-[12px] leading-4 text-[#44474D]">
            <span className="rounded-sm bg-[#E5EEFF] px-1 py-0.5 font-bold text-[#001229]">138 Disposed</span>
            <span className="font-bold text-[#001229] text-lg">·</span>
            <span className="font-semibold text-[#904D00]">04 Active</span>
          </div>
        </article>
        <article className="flex h-[97px] flex-col justify-between gap-0.5 rounded-sm border-t-2 border-t-[#904D00] bg-[#EFF4FF] p-3 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0px_12px_24px_rgba(0,18,41,0.12)] hover: border-[#D9E7FF]">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.275px] text-[#44474D]">First Appeals</h2>
            <img className="h-[15px] w-[15px] object-contain" src="/rti/i4.png" alt="" />
          </div>
          <div className="flex flex-wrap items-baseline gap-1">
            <span className="text-[24px] font-bold leading-8 tracking-[-0.36px] text-[#001229]">03 / 03</span>
            <span className="text-[10px] font-bold tracking-[0.5px] leading-[18px] text-[#44474D]">Settled</span>
          </div>
          <div className="flex flex-wrap items-center gap-1 text-[12px] leading-4 text-[#44474D]">
            <span className="font-normal text-[#44474D]">100% Resolved by </span>
            <span className="font-normal text-[#44474D]">First Appellate Authority</span>
          </div>
        </article>
      </div>
    </section>
  );
};

export default KeyMetrics;
