"use client";

import {
  BadgeCheck,
  ChevronDown,
  Lock,
  Menu,
  Phone,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "../ThemeToggle";
import { getCmsSection } from "@/lib/cmsClient";
import type { HeaderData } from "@/lib/cms-types";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About MBSPSU" },
  { href: "/academic", label: "Academic Programmes" },
  { href: "/sportsinfrastructure", label: "Sports Infrastructure" },
  { href: "/admissions", label: "Admissions 2025-26" },
  { href: "/researchAndLabs", label: "Research & Labs" },
  { href: "/tenders", label: "Tenders & Notices" },
  { href: "/rti", label: "RTI & Disclosures" },
];

// Shared by the real links and the hidden measuring row so widths match exactly.
const linkClass =
  "shrink-0 whitespace-nowrap rounded-[4px] px-2.5 py-2 text-[#798FB1] transition hover:bg-[#001229] hover:text-[#FFFFFF] 2xl:px-4";
const rowClass =
  "text-[12px] font-semibold gap-x-6 2xl:gap-x-8 2xl:text-[13px]";
const MENU_WIDTH = 260;

const NavLinks = ({
  links = NAV_LINKS,
}: {
  links?: Array<{ href: string; label: string }>;
}) => {
  const currentNavLinks = links.length > 0 ? links : NAV_LINKS;
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);

  const [visibleCount, setVisibleCount] = useState(currentNavLinks.length);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [alignRight, setAlignRight] = useState(false);

  const isActiveLink = (href: string) =>
    (href === "/" && (pathname === "/" || pathname === "/dashboard")) ||
    (href !== "/" && (pathname === href || pathname.startsWith(`${href}/`)));

  // Work out how many links fit. xl and above always shows all of them;
  // below xl, only the links that don't fit move into the dropdown.
  useEffect(() => {
    const calculate = () => {
      const container = containerRef.current;
      const measure = measureRef.current;
      if (!container || !measure) return;

      if (window.matchMedia("(min-width: 1280px)").matches) {
        setVisibleCount(currentNavLinks.length);
        setReady(true);
        return;
      }

      const gap = parseFloat(getComputedStyle(measure).columnGap) || 0;
      const available = container.clientWidth;
      const items = Array.from(measure.children) as HTMLElement[];
      const linkWidths = items
        .slice(0, currentNavLinks.length)
        .map((el) => el.offsetWidth);
      const moreWidth = items[currentNavLinks.length]?.offsetWidth ?? 90;

      const total =
        linkWidths.reduce((a, b) => a + b, 0) + gap * (linkWidths.length - 1);

      if (total <= available) {
        setVisibleCount(currentNavLinks.length);
      } else {
        let used = moreWidth;
        let count = 0;
        for (const w of linkWidths) {
          if (used + gap + w > available) break;
          used += gap + w;
          count++;
        }
        setVisibleCount(count);
      }
      setReady(true);
    };

    calculate();
    const ro = new ResizeObserver(calculate);
    if (containerRef.current) ro.observe(containerRef.current);
    if (measureRef.current) ro.observe(measureRef.current);
    window.addEventListener("resize", calculate);
    document.fonts?.ready.then(calculate);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", calculate);
    };
  }, [currentNavLinks]);

  // Close the dropdown when the route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on outside click / Escape
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent | TouchEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("touchstart", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("touchstart", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const visible = currentNavLinks.slice(0, visibleCount);
  const hidden = currentNavLinks.slice(visibleCount);
  const hasActiveHiddenLink = hidden.some(({ href }) => isActiveLink(href));
  const showOnlyMenu = visibleCount === 0;

  const toggleMenu = () => {
    if (!open && moreRef.current) {
      // Open towards the left if the menu would run off the right edge
      const rect = moreRef.current.getBoundingClientRect();
      setAlignRight(rect.left + MENU_WIDTH > window.innerWidth - 12);
    }
    setOpen((o) => !o);
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex min-w-0 flex-1 items-center text-white dark:text-[#798FB1] ${rowClass} ${ready ? "" : "invisible"
        }`}
    >
      {/* Hidden measuring row (same styles as the real links) */}
      <div
        ref={measureRef}
        aria-hidden="true"
        className={`pointer-events-none invisible absolute left-0 top-0 -z-10 flex h-0 w-max overflow-hidden ${rowClass}`}
      >
        {currentNavLinks.map((l) => (
          <span key={l.href} className={linkClass}>
            {l.label}
          </span>
        ))}
        <span className={`${linkClass} inline-flex items-center gap-1`}>
          More <ChevronDown size={14} />
        </span>
      </div>

      {visible.map((l) => {
        const isActive = isActiveLink(l.href);
        return (
          <Link
            key={l.href}
            href={l.href}
            aria-current={isActive ? "page" : undefined}
            className={`${linkClass} ${isActive ? "bg-[#001229] text-white" : ""
              }`}
          >
            {l.label}
          </Link>
        );
      })}

      {hidden.length > 0 && (
        <div ref={moreRef} className="relative shrink-0">
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={open}
            onClick={toggleMenu}
            className={`${linkClass} inline-flex items-center gap-1.5 ${open || hasActiveHiddenLink
              ? "bg-[#001229] text-white dark:text-white"
              : ""
              }`}
          >
            {showOnlyMenu && <Menu size={16} />}
            {showOnlyMenu ? "Menu" : "More"}
            <ChevronDown
              size={14}
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>

          {open && (
            <div
              role="menu"
              className={`absolute top-full z-50 mt-1 w-[260px] max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-[4px] border border-[#C4C6CE4D] bg-[#437cc7] py-1 shadow-lg dark:border-[#1d3557] dark:bg-[#0b1f3a] ${alignRight ? "right-0" : "left-0"
                }`}
            >
              {hidden.map((l) => {
                const isActive = isActiveLink(l.href);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    role="menuitem"
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`block whitespace-nowrap px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[#001229] hover:text-white dark:text-[#798FB1] dark:hover:text-white ${isActive ? "bg-[#001229] text-white dark:text-white" : ""
                      }`}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Header = () => {
  const [headerData, setHeaderData] = useState<HeaderData | null>(null);

  useEffect(() => {
    const loadHeader = async () => {
      try {
        const data = await getCmsSection("header");
        if (data) setHeaderData(data);
      } catch {
        // use fallback static
      }
    };
    loadHeader();
  }, []);

  const topBar = headerData?.topBar;
  const branding = headerData?.branding;
  const navigation = headerData?.navigation;

  const dynamicNavLinks = navigation?.links
    ? navigation.links
        .filter((l) => l.isActive)
        .map((l) => ({ href: l.href, label: l.label }))
    : NAV_LINKS;

  const showDignitary = branding?.showDignitary ?? true;

  return (
    <header className="w-full bg-white shadow-sm">
      <div className=" bg-[#437cc7] dark:bg-[#001229] text-white">
        <div className="box-border flex w-full min-w-0 items-center justify-between gap-4 px-4 py-2 text-xs max-xl:flex-wrap max-xl:items-center max-xl:gap-x-3 max-xl:gap-y-2 max-xl:px-3 max-xl:py-2 max-[700px]:gap-x-2">
          <div className="flex min-w-0 items-center gap-3 max-xl:flex-wrap max-xl:gap-2">
            <span className="font-bold uppercase tracking-wide text-[#FFDCC3]">
              {topBar?.govtTag || "GOVT. OF PUNJAB"}
            </span>

            <span className="hidden h-4 w-px bg-white/30 min-[720px]:block" />

            <div className="hidden items-center gap-1 text-[#D3E4FE] min-[720px]:flex">
              <Phone size={12} />
              <span>
                {topBar?.tollFreeLabel || "Toll-Free Admissions:"}{" "}
                {topBar?.tollFreePhone || "1800-180-2019"}
              </span>
            </div>

            <span className="hidden h-4 w-px bg-white/30 min-[640px]:block" />

            <div className="hidden items-center gap-1 min-[640px]:flex text-[#D3E4FE]">
              <BadgeCheck size={12} />
              <span>{topBar?.portalBadgeLabel || "NIRF Portal"}</span>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-4 max-xl:gap-2 max-sm:ml-auto">
            <div className="flex items-center gap-2">
              {(topBar?.showFontResizers ?? true) &&
                ["A-", "A", "A+"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="flex h-6 w-6 items-center justify-center rounded-sm bg-[#0F2744] text-[12px] font-bold text-white hover:bg-[#103d73]"
                  >
                    {item}
                  </button>
                ))}

              {(topBar?.showThemeToggle ?? true) && (
                <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-[#0F2744] text-[12px] text-white hover:bg-[#103d73]">
                  <ThemeToggle />
                </div>
              )}
            </div>

            <span className="hidden h-4 w-px bg-white/30 sm:block" />

            <nav
              className="flex items-center gap-4 text-[10px] font-bold uppercase max-xl:gap-2 max-[380px]:hidden"
              aria-label="Language selectors"
            >
              {topBar?.languages && topBar.languages.length > 0 ? (
                topBar.languages
                  .filter((l) => l.isActive)
                  .map((l, i) => (
                    <Link
                      key={l.code}
                      href={l.href || "/"}
                      className={i === 0 ? "text-[#FFDCC3]" : "text-[#D3E4FE]"}
                    >
                      {l.label}
                    </Link>
                  ))
              ) : (
                <>
                  <Link href="/" className="text-[#FFDCC3]">
                    English
                  </Link>
                  <Link href="/" className="text-[#D3E4FE]">
                    ਪੰਜਾਬੀ
                  </Link>
                  <Link href="/" className="text-[#D3E4FE]">
                    हिन्दी
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </div>

      <div className="box-border flex w-full min-w-0 items-center justify-between gap-4 px-4 py-3 max-xl:gap-3 max-xl:px-3 max-xl:py-4">
        <div className="flex min-w-0 flex-1 items-center gap-8 max-xl:gap-3">
          <Image
            src={branding?.logoUrl || "/dashboard/MBSPSU_logo.svg"}
            alt={branding?.logoAlt || "MBSPSU Patiala Executive Governance Portal"}
            width={210}
            height={56}
            priority
            className="h-auto w-[76px] shrink-0 sm:w-[86px] md:w-[100px] min-[1024px]:w-[120px] min-[1441px]:w-[180px]"
          />

          <div className="min-w-0 flex-1">
            <h1
              className="min-w-0 break-words font-public-sans font-bold weight-700 uppercase leading-tight text-[#001229] max-xl:leading-snug"
              style={{ fontSize: "clamp(12px, 1.5vw, 25px)" }}
            >
              {branding?.universityTitle ||
                "Maharaja Bhupinder Singh Punjab Sports University"}
            </h1>
            <p className="mt-1 text-[14px] font-inter text-[#44474D] md:text-[11px] tracking-[0.28] max-xl:text-[10px] max-xl:leading-relaxed max-xl:tracking-normal max-sm:text-[11px]">
              {branding?.universitySubtitle ||
                "State Apex Collegiate & Olympic High-Performance Center • Patiala • Established under Punjab Act No. 11 of 2019"}
            </p>
          </div>
        </div>

        {showDignitary && (
          <div className="flex shrink-0 items-center gap-4 max-xl:gap-2">
            <div className="flex shrink-0 items-center gap-4 rounded border border-[#C4C6CE4D] bg-[#EFF4FF] px-4 py-2 max-[1024px]:gap-0 max-[1024px]:px-2">
              <div className="text-right max-[1024px]:hidden">
                <p className="text-[10px] font-bold font-inter uppercase tracking-wide text-[#44474D]">
                  {branding?.dignitaryRole || "Chancellor • Governor of Punjab"}
                </p>
                <p className="text-[12px] font-bold text-[#001229]">
                  {branding?.dignitaryName || "Gulab Chand Kataria"}
                </p>
              </div>
              <Image
                src={branding?.dignitaryIcon || "/dashboard/Icon1.svg"}
                alt=""
                aria-hidden="true"
                width={22}
                height={22}
                className="shrink-0"
              />
            </div>
          </div>
        )}
      </div>

      <nav className="w-full bg-[#437cc7] dark:bg-[#0b1f3a]">
        <div className="box-border flex w-full min-w-0 max-w-none items-center justify-between gap-4 px-4 py-2 md:px-6 max-xl:px-3">
          <NavLinks links={dynamicNavLinks} />

          {navigation?.showSsoButton && (
            <Link
              href={navigation.ssoButtonUrl || "/"}
              className="ml-auto inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-[4px] bg-[#a35d12] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-white shadow-sm transition hover:bg-[#b96716]"
            >
              <Lock className="h-4 w-4" />
              {navigation.ssoButtonLabel || "ERP Portal SSO"}
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
