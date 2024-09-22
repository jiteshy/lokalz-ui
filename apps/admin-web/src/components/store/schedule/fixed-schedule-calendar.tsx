"use client";

import { Calendar } from "@/components/ui/calendar";
import { addDays } from "date-fns";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const FixedScheduleCalendar = ({
  month,
  setMonth,
  dates,
  setDates,
  disabledDates,
}: {
  month: Date;
  setMonth: Dispatch<SetStateAction<Date>>;
  dates: Date[] | undefined;
  setDates: Dispatch<SetStateAction<Date[] | undefined>>;
  disabledDates: Date[];
}) => {
  const [datesStr, setDatesStr] = useState<string>("");

  useEffect(() => {
    if (dates?.length) {
      const datesStr = dates.reduce((agg, curr, index) => {
        return (
          (index === 0 ? "" : agg + ", ") +
          curr.toLocaleDateString("en-us", {
            day: "2-digit",
            month: "short",
          })
        );
      }, "");
      setDatesStr(datesStr);
    } else {
      setDatesStr("");
    }
  }, [dates]);

  return (
    <Calendar
      mode="multiple"
      disabled={[
        { before: new Date() },
        { after: addDays(new Date(), 30) },
        ...disabledDates,
      ]}
      selected={dates}
      month={month}
      onMonthChange={setMonth}
      onSelect={setDates}
      className="rounded-md border"
      classNames={{
        day_today: "border bg-deep-purple-accent-400 text-white",
        root: "shadow-md",
        day: "w-12 h-12",
        caption_label: "text-xl",
        head_cell: "w-12 h-12 font-normal",
      }}
      footer={
        datesStr && (
          <div className="text-xs text-center w-full pt-3 text-deep-purple-accent-700 font-medium">
            <span className="text-slate-600 font-normal">Selected Dates:</span>{" "}
            {datesStr}
          </div>
        )
      }
    />
  );
};
