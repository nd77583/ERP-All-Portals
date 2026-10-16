"use client";

import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { fetchSectionApi } from "@/lib/useSectionApi";

export type DispatchNotification = {
  notificationId: number | string;
  category: string;
  message: string;
  url?: string;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const getStringField = (
  record: Record<string, unknown>,
  keys: string[],
): string | undefined => {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) return value;
  }
};

const getNotificationList = (payload: unknown): DispatchNotification[] => {
  let list: unknown = payload;
  if (!Array.isArray(list) && isRecord(payload)) {
    list = ["data", "notices", "results", "items"]
      .map((key) => payload[key])
      .find(Array.isArray);
  }

  if (!Array.isArray(list)) {
    throw new TypeError("ERP notices response must contain a list of notices.");
  }

  return list.map((item: unknown, index: number) => {
    if (typeof item === "string" && item.trim()) {
      return {
        notificationId: index,
        category: "NOTICE",
        message: item,
      };
    }
    if (!isRecord(item)) {
      throw new TypeError(`ERP notice at index ${index} is not an object.`);
    }

    const message = getStringField(item, [
      "message",
      "notice_message",
      "noticeMessage",
      "title",
      "notice_title",
      "noticeTitle",
      "description",
      "notice_description",
      "noticeDescription",
      "content",
      "body",
      "text",
    ]);
    if (!message) {
      throw new TypeError(
        `ERP notice at index ${index} has no message field (received: ${Object.keys(item).join(", ")}).`,
      );
    }

    const notificationId =
      typeof item.notificationId === "number" ||
        typeof item.notificationId === "string"
        ? item.notificationId
        : typeof item.notification_id === "number" ||
          typeof item.notification_id === "string"
          ? item.notification_id
          : typeof item.id === "number" || typeof item.id === "string"
            ? item.id
            : index;

    return {
      notificationId,
      category:
        getStringField(item, [
          "category",
          "notice_category",
          "noticeCategory",
          "type",
          "notice_type",
          "noticeType",
        ]) ?? "NOTICE",
      message,
      url: getStringField(item, [
        "url",
        "notice_url",
        "noticeUrl",
        "link",
        "href",
      ]),
    };
  });
};


const MOCK_NOTIFICATIONS: DispatchNotification[] = [
  {
    notificationId: 1,
    category: "EXAMINATIONS",
    message:
      "End Semester Examination Schedule for AY 2025-26 has been published.",
    url: "#",
  },
  {
    notificationId: 2,
    category: "ADMISSIONS",
    message:
      "Admission Counselling Schedule for B.P.Ed & M.Sc Sports Science has been released.",
    url: "#",
  },
  {
    notificationId: 3,
    category: "SPORTS",
    message:
      "Inter-College Sports Competition Registration for AY 2025-26 is now open.",
    url: "#",
  },
];


const ErpDispatchBanner = () => {
  const [notifications, setNotifications] = useState<DispatchNotification[]>(
    [],
  );
  const [dispatchTitle, setDispatchTitle] = useState("ERP Live Dispatch");

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const erpDispatch = await fetchSectionApi<import("@/lib/cms-types").HomeData["erpDispatch"]>("home", "erpDispatch");
        if (erpDispatch.dispatchTitle?.trim()) setDispatchTitle(erpDispatch.dispatchTitle);
        if (!erpDispatch.isEnabled) {
          setNotifications([]);
          return;
        }
        if (erpDispatch?.items && erpDispatch.items.length > 0) {
          const cmsItems: DispatchNotification[] = erpDispatch.items
            .filter((item) => item.isActive !== false)
            .map((item, idx) => ({
              notificationId: item.id || idx + 1,
              category: item.category || "NOTICE",
              message: item.message,
              url: item.url || "#",
            }));
          setNotifications(cmsItems);
          return;
        }

        setNotifications(MOCK_NOTIFICATIONS);
      } catch (err) {
        setNotifications(MOCK_NOTIFICATIONS);
      }
    };

    loadNotifications();
  }, []);

  const isScrolling = notifications.length > 1;
  const marqueeNotifications = isScrolling ? [...notifications, ...notifications] : notifications;

  return (
    <div className="w-full border border-[#dfe7f5] bg-[#DCE9FF]">
      <style>{`
        @keyframes dispatch-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .dispatch-marquee { animation: dispatch-marquee 50s linear infinite; }
        .dispatch-marquee:hover { animation-play-state: paused; }
      `}</style>

      <div className="w-full flex flex-col gap-1.5 px-4 py-2 sm:gap-2 sm:px-5 lg:flex-row lg:items-center lg:justify-between lg:gap-3 xl:gap-4">
        <div className="flex min-w-0 w-full flex-row items-center gap-2 sm:gap-3 lg:w-full lg:flex-1 xl:flex-1">
          <div className="inline-flex shrink-0 items-center gap-2 rounded-sm bg-[#001229] px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.06em] text-white sm:px-3 sm:text-[11px] sm:tracking-[0.08em]">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#ff9a2f]" />
            {dispatchTitle}
          </div>

          <div className="min-w-0 w-0 flex-1 overflow-hidden sm:w-auto">
            <div
              className={`flex w-max items-center gap-5 text-[10px] sm:gap-8 sm:text-[11px] lg:gap-8 xl:gap-10 xl:text-xs 2xl:gap-12 ${isScrolling ? "dispatch-marquee" : ""
                }`}
            >
              {marqueeNotifications.map((notification, index) => (
                <div
                  key={`${notification.notificationId}-${index}`}
                  className="flex shrink-0 items-center gap-2"
                >
                  <span className="shrink-0 rounded bg-[#f3d5a3] px-1.5 py-0.5 text-[10px] font-bold uppercase text-[#904D00]">
                    [{notification.category}]
                  </span>
                  {notification.url ? (
                    <Link
                      href={notification.url}
                      className="whitespace-nowrap text-[#1d2a3a] hover:underline"
                    >
                      {notification.message}
                    </Link>
                  ) : (
                    <p className="whitespace-nowrap text-[#1d2a3a]">
                      {notification.message}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex w-full shrink-0 flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-[#c6d7f1] pt-2 text-[9px] font-semibold uppercase tracking-[0.03em] text-[#1b2a3b] sm:text-[10px] sm:tracking-[0.04em] md:gap-3 md:border-0 md:pt-0 lg:w-auto lg:flex-nowrap xl:gap-4">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-[#904D00] sm:h-4 sm:w-4" />
            <span>GIGW &amp; WCAG 2.1 AA Compliant</span>
          </div>
          <span className="hidden text-[#9aa7bd] xl:inline">|</span>
          <span className="whitespace-nowrap">GATE DESK: NIS Campus</span>
        </div>
      </div>
    </div>
  );
};

export default ErpDispatchBanner;
