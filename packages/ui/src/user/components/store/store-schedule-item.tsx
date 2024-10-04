import { ReactNode, useCallback } from "react";
import { StoreScheduleItem } from "@repo/ui/types";
import { cn } from "@repo/ui/utils";

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
  className,
  children,
}: {
  storeScheduleItem: StoreScheduleItem;
  className?: string;
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
      className={`ui-relative ui-p-2 ui-min-h-[72px] ui-text-center ui-w-full ui-mb-2 ui-shadow ui-rounded ui-border-l-8 ${className || (formattedSchedule.isToday ? "ui-border-l-deep-purple-accent-400 ui-bg-indigo-50" : "ui-border-l-slate-300 ui-bg-slate-50")}`}
    >
      <div className="ui-flex ui-gap-3 ui-items-center">
        <div className="ui-w-16 ui-text-center">
          {formattedSchedule.isToday ? (
            <div className="ui-text-xl">Today</div>
          ) : (
            <>
              <div className="ui-text-slate-800 ui-text-2xl ui-font-medium">
                {formattedSchedule.date}
              </div>
              <div className="ui-text-slate-500">{formattedSchedule.month}</div>
            </>
          )}
        </div>
        <div className="ui-text-sm ui-text-left">
          <div className="ui-text-lg ui-text-slate-800 ui-mb-2">
            <div>{formattedSchedule.day}</div>
            <div className="ui-text-xs ui-text-slate-500">
              {formattedSchedule.fromTime} to {formattedSchedule.toTime}
            </div>
          </div>
          <div className="ui-text-sm ui-text-slate-600">
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
