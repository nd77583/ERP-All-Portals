"use client"

import { PersonStanding } from 'lucide-react'
import React, { useState } from 'react'
import { useSectionApi } from '@/lib/useSectionApi'

type BannerContent = {
  title: string
  description: string
  highContrastLabel: string
  screenReaderLabel: string
  certificateLabel: string
}

const MOCK_BANNER: BannerContent = {
  title: 'Govt. of India GIGW 3.0 & WCAG 2.1 Level AA Compliance',
  description: 'Official portal complies with STQC certification benchmarks. Screen reader accessible across English, Punjabi, and Hindi.',
  highContrastLabel: 'High Contrast',
  screenReaderLabel: 'Screen Reader',
  certificateLabel: 'STQC CERTIFICATE',
}
const hasCompleteBanner = (value: BannerContent) =>
  [value.title, value.description, value.highContrastLabel, value.screenReaderLabel, value.certificateLabel]
    .every((field) => typeof field === 'string' && field.trim().length > 0)

const Banner = () => {
  const content = useSectionApi<BannerContent>('home', 'accessibilityBanner', MOCK_BANNER, hasCompleteBanner)
  const [selectedAction, setSelectedAction] = useState<'high-contrast' | 'screen-reader' | 'stqc' | null>('stqc')
  const isDark = selectedAction === 'high-contrast'

  const buttonClass = (action: NonNullable<typeof selectedAction>) =>
    `cursor-pointer rounded-[4px] px-2 py-1.5 text-[10px] font-bold uppercase tracking-[0.28px] transition-colors duration-200 ${
      selectedAction === action
        ? 'bg-[#904D00] text-white'
        : 'bg-[#E9F0FF] text-[#001229] hover:bg-[#904D00] hover:text-white'
    }`

  const handleActionClick = (action: 'high-contrast' | 'screen-reader' | 'stqc') => {
    setSelectedAction((currentAction) => (currentAction === action ? null : action))
  }

  return (
    <div
      className={`box-border w-full min-w-0 max-w-none self-stretch transition-colors duration-200 ${
        isDark ? 'bg-[#1F1F1F]' : 'bg-[#FFF8F1]'
      } px-4 py-3 sm:px-5 sm:py-3.5`}
    >
      <div className='flex w-full flex-col items-start gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-4'>
        <div className='flex w-full min-w-0 flex-1 items-start gap-3'>
            <div className='mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] bg-[#FFDCC3] p-1.5'>
                <PersonStanding  className='h-5 w-5 text-[#2F1500]'/>
            </div>
            <div className='min-w-0'>
                <h3 className={`text-[15px] sm:text-[16px] font-bold ${isDark ? 'text-[#FFFFFF]' : 'text-[#001229]'}`}>{content.title}</h3>
                <span className={`mt-1 block text-[11px] sm:text-[12px] leading-[1.5] ${isDark ? 'text-[#D0D0D0]' : 'text-[#44474D]'}`}>{content.description}</span>
            </div>
        </div>
        <div className='grid w-full min-w-0 grid-cols-1 gap-2 min-[420px]:grid-cols-3 lg:w-auto lg:shrink-0'>
            <button
              type='button'
              aria-pressed={selectedAction === 'high-contrast'}
              onClick={() => handleActionClick('high-contrast')}
              className={`${buttonClass('high-contrast')} w-full min-w-0 text-center lg:w-auto`}
            >
              {content.highContrastLabel}
            </button>
            <button
              type='button'
              aria-pressed={selectedAction === 'screen-reader'}
              onClick={() => handleActionClick('screen-reader')}
              className={`${buttonClass('screen-reader')} w-full min-w-0 text-center lg:w-auto`}
            >
              {content.screenReaderLabel}
            </button>
            <button
              type='button'
              aria-pressed={selectedAction === 'stqc'}
              onClick={() => handleActionClick('stqc')}
              className={`${buttonClass('stqc')} w-full min-w-0 text-center lg:w-auto`}
            >
              {content.certificateLabel}
            </button>
        </div>
      </div>
    </div>
  )
}

export default Banner
