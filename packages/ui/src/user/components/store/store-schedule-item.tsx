"use client";

import { ReactNode, useCallback, useEffect, useState } from "react";
import { StoreScheduleItem } from "@repo/ui/types";

type FormattedSchedule = {
  date: number;
  month: string;
  day: string;
  fromTime: string;
  toTime: string;
  isToday: boolean;
  street: string;
  city: string;
  zipCode: string;
};

export const ScheduleItem = ({
  storeScheduleItem,
  children,
}: {
  storeScheduleItem: StoreScheduleItem;
  children?: ReactNode;
}) => {
  const isToday = useCallback((date: Date) => {
    const now = new Date();

    return (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  }, []);

  const getTime = useCallback(
    (date: number) =>
      new Date(date).toLocaleTimeString("en-us", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    [],
  );

  const date = new Date(storeScheduleItem.from);
  const formattedSchedule: FormattedSchedule = {
    date: date.getDate(),
    month: date.toLocaleDateString("en-us", {
      month: "short",
    }),
    day: date.toLocaleDateString("en-us", {
      weekday: "long",
    }),
    fromTime: getTime(storeScheduleItem.from),
    toTime: getTime(storeScheduleItem.to),
    isToday: isToday(date),
    street: storeScheduleItem.address?.street
      ? storeScheduleItem.address?.street
      : "--",
    city: storeScheduleItem.address?.city
      ? storeScheduleItem.address?.city
      : "--",
    zipCode: storeScheduleItem.address?.zipCode
      ? storeScheduleItem.address?.zipCode?.toString()
      : "--",
  };

  return (
    <div
      className={`relative p-2 min-h-[72px] text-center w-full mb-2 shadow rounded border-l-8 ${formattedSchedule.isToday ? "border-l-deep-purple-accent-400 bg-indigo-50 pt-3" : "border-l-slate-300 bg-slate-50"}`}
    >
      <div className="flex gap-3 items-center">
        <div className="w-16 text-center">
          {formattedSchedule.isToday ? (
            <div className="text-xl">Today</div>
          ) : (
            <div>
              <div className="text-slate-800 text-2xl font-medium">
                {formattedSchedule.date}
              </div>
              <div className="text-slate-500">{formattedSchedule.month}</div>
            </div>
          )}
        </div>
        <div className="text-sm text-left">
          <div className="text-lg text-slate-800 mb-2">
            <div>{formattedSchedule.day}</div>
            <div className="text-xs text-slate-500">
              {formattedSchedule.fromTime} to {formattedSchedule.toTime}
            </div>
          </div>
          <div className="text-sm text-slate-600">
            <div>{formattedSchedule.street}</div>
            <div>
              {formattedSchedule.city}
              {formattedSchedule.zipCode && ", " + formattedSchedule.zipCode}
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};
