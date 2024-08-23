import {
  faLocationDot,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ScheduleItem, StoreAddress, StoreSchedule } from "@repo/ui/types";

export const Schedule = ({
  storeSchedule,
}: {
  storeSchedule: StoreSchedule;
}) => {
  const formatAddress = (address: StoreAddress) =>
    `${address.street}${address.city && ", " + address.city}`;

  const getDate = (date: number) => new Date(date).getDate();
  const getMonth = (date: number) =>
    new Date(date).toLocaleDateString("en-us", {
      month: "short",
    });
  const getDay = (date: number) =>
    new Date(date).toLocaleDateString("en-us", {
      weekday: "long",
    });
  const getTime = (date: number) =>
    new Date(date).toLocaleTimeString("en-us", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  return (
    <>
      <div className="flex flex-col">
        <div className="text-left w-full text-deep-purple-accent-400 font-sans text-3xl font-bold leading-none tracking-tight mb-5">
          <FontAwesomeIcon icon={faCalendarDays} />
        </div>
        {storeSchedule?.schedules?.map(
          (schedule: ScheduleItem, index: number) => (
            <div
              key={index}
              className={`p-2 min-h-[72px] text-center w-full mb-2 shadow rounded border-l-8 ${index === 0 ? "border-l-deep-purple-accent-400 bg-indigo-50 pt-3" : "border-l-slate-300 bg-slate-50"}`}
            >
              <div className="flex gap-3 items-center">
                <div className="w-16 text-center">
                  {index === 0 ? (
                    <div className="text-xl">Today</div>
                  ) : (
                    <div>
                      <div className="text-slate-800 text-2xl font-medium">
                        {getDate(schedule.date)}
                      </div>
                      <div className="text-slate-500">
                        {getMonth(schedule.date)}
                      </div>
                    </div>
                  )}
                </div>
                <div className="text-sm text-left">
                  <div className="text-lg text-slate-800 mb-2">
                    <div>{getDay(schedule.date)}</div>
                    <div className="text-xs text-slate-500">
                      {getTime(schedule.from)} to {getTime(schedule.to)}
                    </div>
                  </div>
                    <div className="text-sm text-slate-600">
                      <div>
                        {schedule.address.street}
                      </div>
                      <div>
                        {schedule.address.city}{schedule.address.zipCode && ", " + schedule.address.zipCode}
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
