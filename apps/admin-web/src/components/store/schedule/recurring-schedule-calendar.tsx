import { Calendar } from "@/components/ui/calendar";
import { addDays } from "date-fns";
import { Dispatch, SetStateAction } from "react";
import { DateRange } from "react-day-picker";

export const RecurringScheduleCalendar = ({
  month,
  setMonth,
  dateRange,
  setDateRange,
}: {
  month: Date;
  setMonth: Dispatch<SetStateAction<Date>>;
  dateRange: DateRange | undefined;
  setDateRange: Dispatch<SetStateAction<DateRange | undefined>>;
}) => {
  return (
    <Calendar
      mode="range"
      disabled={{ before: new Date(), after: addDays(new Date(), 60) }}
      selected={dateRange}
      month={month}
      onMonthChange={setMonth}
      onSelect={setDateRange}
      min={14}
      max={60}
      className="rounded-md border"
      classNames={{
        day_today: "border bg-deep-purple-accent-400 text-white",
        root: "shadow-md",
        day: "w-12 h-12",
        caption_label: "text-xl",
        head_cell: "w-12 h-12 font-normal",
      }}
      footer={
        dateRange?.from &&
        dateRange?.to && (
          <div className="text-xs text-center w-full pt-3 text-deep-purple-accent-700 font-medium">
            <span className="text-slate-600 font-normal">
              Selected Date Range:
            </span>{" "}
            {dateRange.from?.toLocaleDateString("en-us", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }) +
              " - " +
              dateRange.to?.toLocaleDateString("en-us", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
          </div>
        )
      }
    />
  );
};
