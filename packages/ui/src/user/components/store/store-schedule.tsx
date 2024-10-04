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
      <div className="ui-flex ui-flex-col">
        <div className="ui-text-left ui-w-full ui-text-deep-purple-accent-400 ui-font-sans ui-text-3xl ui-font-bold ui-leading-none ui-tracking-tight ui-mb-5">
          <FontAwesomeIcon icon={faCalendarDays} />
        </div>
        {storeSchedules.length === 0 && (
          <div className="ui-bg-slate-50 ui-border-l-8 ui-border-l-slate-300 ui-p-2 ui-pt-4 ui-min-h-[72px] ui-text-center ui-w-full ui-mb-2 ui-shadow ui-rounded">
            <div className="ui-flex ui-gap-3 ui-items-center">
              <div className="ui-text-slate-500 ui-text-3xl ui-w-16 ui-text-center">
                <FontAwesomeIcon icon={faBan} />
              </div>
              <div>
                <div className="ui-text-lg ui-text-slate-800 ui-mb-2 ui-text-left">
                  <div>No schedule available</div>
                  <div className="ui-text-sm ui-text-slate-500">
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
