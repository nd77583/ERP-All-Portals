"use client"

import { useEffect, useState } from "react"
import { getHeroSection } from "../api/rti/HeroSection"

type HeroData = {
  disclosureBadge?: string
  title?: string
  description?: string
  submitButton?: string
  trackButton?: string
  compendiumButton?: string
}

const defaultData = {
  disclosureBadge: 'Mandatory Proactive Disclosure • Section 4(1)(b) of RTI Act, 2005 • GIGW 3.0 & Punjab Transparency Directives',
  title: 'Right to Information (RTI) & Statutory Disclosures Portal',
  description: 'In statutory accordance with Section 4(1)(b) of the Right to Information Act, 2005 and Punjab State Transparency Guidelines, Maharaja Bhupinder Singh Punjab Sports University (MBSPSU) provides proactive institutional disclosures, verified officer directories, real-time petition status tracking, and auditable governance records.',
  submitButton: 'Submit Online RTI',
  trackButton: 'Track Request',
  compendiumButton: 'Suo-Motu Compendium (PDF)',
}

const HeroSection = () => {
  const [data, setData] = useState<HeroData>({})

  useEffect(() => {
    getHeroSection().then((res) => {
      const item = Array.isArray(res) ? res[0] : res
      if (item) setData(item)
    })
  }, [])

  const content = {
    disclosureBadge: data.disclosureBadge || defaultData.disclosureBadge,
    title: data.title || defaultData.title,
    description: data.description || defaultData.description,
    submitButton: data.submitButton || defaultData.submitButton,
    trackButton: data.trackButton || defaultData.trackButton,
    compendiumButton: data.compendiumButton || defaultData.compendiumButton,
  }

  return (
    <section className="w-full border-b border-[#c4c6ce]/20 bg-[#eff4ff] px-5 py-6">
      <div className="mx-auto flex w-full flex-col gap-3">
        <div className="flex w-fit items-center gap-1 rounded-[2px] bg-[#001229] px-3 text-[10px] font-bold uppercase leading-3 tracking-[0.5px] text-white shadow-sm">
          <svg className="h-6 w-[10px] shrink-0 text-[#fe932c]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2 3 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-9-4Zm-1.1 15.2-4-4 1.42-1.42 2.58 2.58 5.78-5.78 1.42 1.42-7.2 7.2Z" />
          </svg>
          <span className="p-2">{content.disclosureBadge}</span>
        </div>

        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div className="flex max-w-[896px] flex-col gap-1">
            <h1 className="max-w-[658px] text-[32px] font-bold leading-[40px] tracking-[-0.8px] text-[#001229]">
              {content.title}
            </h1>
            <p className="max-w-[658px] text-[15px] leading-6 text-[#44474d]">
              {content.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a href="#submit-rti" className="inline-flex h-8 items-center gap-1 rounded-[2px] bg-[#001229] px-4 text-[13px] font-semibold tracking-[0.13px] text-white shadow-sm hover:bg-[#102b49]">
              <svg className="h-[15px] w-[15px] text-[#fe932c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8M14 2v6h6M14 2l6 6" />
                <path d="m16 18 2 2 4-4" />
              </svg>
              {content.submitButton}
            </a>
            <a href="#track-request" className="inline-flex h-[34px] items-center gap-1 rounded-[2px] border border-[#c4c6ce] bg-white px-3 text-[13px] font-semibold tracking-[0.13px] text-[#001229] shadow-sm hover:bg-blue-100">
              <svg className="h-[14px] w-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <circle cx="10.8" cy="10.8" r="6.8" />
                <path d="m16 16 5 5" />
              </svg>
              {content.trackButton}
            </a>
            <a href="#suomotu-compendium" className="inline-flex h-[34px] items-center gap-1 rounded-[2px] border border-[#c4c6ce] bg-white px-3 text-[13px] font-semibold tracking-[0.13px] text-[#904d00] shadow-sm hover:bg-blue-100">
              <svg className="h-[15px] w-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v10m-4-4 4 4 4-4" />
              </svg>
              {content.compendiumButton}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection