import Image from "next/image";

type LibraryMetricCardProps = {
  title: string;
  value: string;
  description: string;
  icon: string;
  iconAlt: string;
  iconBg: string;
  topBorder: string;
  footerBg: string;
  footerLeft: string;
  footerRight: string;
  footerLeftColor: string;
  footerRightColor: string;
};

export default function LibraryMetricCard({
  title,
  value,
  description,
  icon,
  iconAlt,
  iconBg,
  topBorder,
  footerBg,
  footerLeft,
  footerRight,
  footerLeftColor,
  footerRightColor,
}: LibraryMetricCardProps) {
  return (
    <div
      className={`flex min-h-[148px] h-full flex-col justify-between rounded-[8px] border border-[#e0e7f1] border-t-[3px] bg-white p-3 sm:p-3.5 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0px_8px_18px_rgba(0,18,41,0.08)] ${topBorder}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="font-['Inter'] text-[9.5px] sm:text-[10px] font-bold tracking-[0.5px] text-[#596979] uppercase truncate">
            {title}
          </h3>

          <p className="mt-1 font-['Public_Sans'] text-[18px] sm:text-[20px] lg:text-[22px] font-extrabold text-[#102d4d] leading-tight tracking-[-0.3px]">
            {value}
          </p>

          <p className="mt-1 text-[11px] sm:text-[11.5px] font-normal leading-snug text-[#596979] line-clamp-2">
            {description}
          </p>
        </div>

        <div
          className={`flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[6px] ${iconBg}`}
        >
          <Image
            src={icon}
            alt={iconAlt}
            width={16}
            height={16}
            className="object-contain"
          />
        </div>
      </div>

      <div
        className={`mt-2.5 flex h-[26px] items-center justify-between rounded-[4px] px-2.5 ${footerBg}`}
      >
        <span
          className={`font-['Inter'] text-[9.5px] sm:text-[10px] font-semibold truncate ${footerLeftColor}`}
        >
          {footerLeft}
        </span>

        <span
          className={`font-['Inter'] text-[9.5px] sm:text-[10px] font-semibold shrink-0 ml-1.5 ${footerRightColor}`}
        >
          {footerRight}
        </span>
      </div>
    </div>
  );
}