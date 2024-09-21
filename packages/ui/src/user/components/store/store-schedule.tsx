import { faCalendarDays, faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StoreScheduleItem } from "@repo/ui/types";
import { ScheduleItem } from "./store-schedule-item";

export const Schedule = ({
  storeSchedules,
}: {
  storeSchedules: StoreScheduleItem[];
}) => {
  const sortedSchedules: StoreScheduleItem[] = storeSchedules
    ?.filter(
      (schedule: StoreScheduleItem) => new Date(schedule.from) >= new Date(),
    )
    ?.sort(
      (schedule1: StoreScheduleItem, schedule2: StoreScheduleItem) =>
        schedule1.from - schedule2.from,
    );

  return (
    <>
      <div className="flex flex-col">
        <div className="text-left w-full text-deep-purple-accent-400 font-sans text-3xl font-bold leading-none tracking-tight mb-5">
          <FontAwesomeIcon icon={faCalendarDays} />
        </div>
        {storeSchedules.length === 0 && (
          <div className="bg-slate-50 border-l-8 border-l-slate-300 p-2 pt-4 min-h-[72px] text-center w-full mb-2 shadow rounded">
            <div className="flex gap-3 items-center">
              <div className="text-slate-500 text-3xl w-16 text-center">
                <FontAwesomeIcon icon={faBan} />
              </div>
              <div>
                <div className="text-lg text-slate-800 mb-2 text-left">
                  <div>No schedule available</div>
                  <div className="text-sm text-slate-500">
                    Please check back later.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {sortedSchedules?.map((schedule: StoreScheduleItem) => (
          <ScheduleItem key={schedule.date} storeScheduleItem={schedule} />
        ))}
      </div>
    </>
  );
};
