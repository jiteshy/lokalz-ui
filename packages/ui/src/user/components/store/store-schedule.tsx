import { useCallback } from "react";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ScheduleItem, StoreSchedule } from "@repo/ui/types";

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

export const Schedule = ({
  storeSchedule,
}: {
  storeSchedule: StoreSchedule;
}) => {
  const currentDate = new Date();

  const isToday = useCallback((date: Date) => {
    const now = new Date();

    return (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  }, []);
  
  const getTime = useCallback((date: number) =>
    new Date(date).toLocaleTimeString("en-us", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }), []);

  const formattedSchedules: FormattedSchedule[] = storeSchedule?.schedules
    ?.filter((schedule: ScheduleItem) => new Date(schedule.from) >= currentDate)
    ?.sort(
      (schedule1: ScheduleItem, schedule2: ScheduleItem) =>
        schedule1.from - schedule2.from,
    )
    ?.map((schedule: ScheduleItem) => {
      const date = new Date(schedule.from);
      return {
        date: date.getDate(),
        month: date.toLocaleDateString("en-us", {
          month: "short",
        }),
        day: date.toLocaleDateString("en-us", {
          weekday: "long",
        }),
        fromTime: getTime(schedule.from),
        toTime: getTime(schedule.to),
        isToday: isToday(date),
        street: schedule.address?.street,
        city: schedule.address?.city,
        zipCode: schedule.address?.zipCode?.toString(),
      };
    });

  return (
    <>
      <div className="flex flex-col">
        <div className="text-left w-full text-deep-purple-accent-400 font-sans text-3xl font-bold leading-none tracking-tight mb-5">
          <FontAwesomeIcon icon={faCalendarDays} />
        </div>
        {formattedSchedules?.map(
          (schedule: FormattedSchedule, index: number) => (
            <div
              key={index}
              className={`p-2 min-h-[72px] text-center w-full mb-2 shadow rounded border-l-8 ${schedule.isToday ? "border-l-deep-purple-accent-400 bg-indigo-50 pt-3" : "border-l-slate-300 bg-slate-50"}`}
            >
              <div className="flex gap-3 items-center">
                <div className="w-16 text-center">
                  {schedule.isToday ? (
                    <div className="text-xl">Today</div>
                  ) : (
                    <div>
                      <div className="text-slate-800 text-2xl font-medium">
                        {schedule.date}
                      </div>
                      <div className="text-slate-500">{schedule.month}</div>
                    </div>
                  )}
                </div>
                <div className="text-sm text-left">
                  <div className="text-lg text-slate-800 mb-2">
                    <div>{schedule.day}</div>
                    <div className="text-xs text-slate-500">
                      {schedule.fromTime} to {schedule.toTime}
                    </div>
                  </div>
                  <div className="text-sm text-slate-600">
                    <div>{schedule.street}</div>
                    <div>
                      {schedule.city}
                      {schedule.zipCode && ", " + schedule.zipCode}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ),
        )}
      </div>
    </>
  );
};
