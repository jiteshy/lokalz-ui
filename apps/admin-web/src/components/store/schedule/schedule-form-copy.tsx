"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckIcon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DateRange } from "react-day-picker";
import { FixedScheduleCalendar } from "./fixed-schedule-calendar";
import { RecurringScheduleCalendar } from "./recurring-schedule-calendar";
import { ScheduleCalendarHeader } from "./schedule-calendar-header";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useToast } from "@/hooks/use-toast";
import { StoreSchedule, StoreScheduleItem } from "@repo/ui/types";
import { ScheduleItem } from "@repo/ui/user/components";
import { ScheduleDelete } from "./schedule-delete";
import { ScheduleEdit, TimeUnits } from "./schedule-edit";
import { addHours, addMinutes } from "date-fns";
import { scheduleFormSchema } from "./schedule-form-schema";
import { z } from "zod";
import useSWR from "swr";
import { ADMIN_APIS, USER_APIS } from "@repo/ui/config";
import Loading from "@/app/loading";
import { useAxios } from "@/hooks/use-axios";

export const ScheduleForm = ({ storeId }: { storeId: string }) => {
  const { toast } = useToast();
  const axios = useAxios();
  const [dates, setDates] = useState<Date[] | undefined>([]);
  const [disabledDates, setDisabledDates] = useState<Date[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [month, setMonth] = useState<Date>(new Date());
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [scheduleType, setScheduleType] = useState<"fixed" | "recurring">(
    "fixed",
  );
  // Use ADMIN API - getting cors
  let sampleData: StoreScheduleItem[] = [
    {
      from: 1727197200000,
      to: 1727211600000,
      date: 1727150400000,
      address: {
        street: "12000 test 1",
        city: "Jacksonville 1",
        state: "CO",
        zipCode: 11111,
      },
    },
    {
      from: 1727370000000,
      to: 1727384400000,
      date: 1727323200000,
      address: {
        street: "12000 test 2",
        city: "Jacksonville 2",
        state: "CO",
        zipCode: 11112,
      },
    },
    {
      from: 1727542800000,
      to: 1727557200000,
      date: 1727496000000,
      address: {
        street: "12000 test 3",
        city: "Jacksonville 3",
        state: "CO",
        zipCode: 11113,
      },
    },
  ];
  const {
    data: scheduleData,
    isLoading: isScheduleLoading,
    mutate,
  } = useSWR<StoreSchedule>(
    `${USER_APIS.STORE.STORE_DETAILS}/${storeId}/schedule/weekly`,
  );
  const [schedules, setSchedules] = useState<StoreScheduleItem[]>([]);
  const [submittingSchedule, setSubmittingSchedule] = useState<boolean>(false);

  useEffect(() => {
    // if (scheduleData?.schedules?.length) {
    //   setSchedules(scheduleData.schedules);
    //   setCalendarInitialDates();
    // }
    sampleData.forEach((schedule) => {
      schedule.existing = true;
    });
    setSchedules(sampleData);
    setCalendarInitialDates(sampleData);
  }, [scheduleData]);

  useEffect(() => {
    if (dates?.length) {
      const selectedSchedules: StoreScheduleItem[] = [];
      dates.forEach((date: Date) => {
        const existingSchedule = schedules.filter(
          (schedule) => schedule.date === date.getTime(),
        )[0];
        if (!existingSchedule) {
          selectedSchedules.push({
            from: date.getTime(),
            to: date.getTime(),
            date: date.getTime(),
            address: {
              street: "",
              city: "",
              state: "",
              zipCode: 0,
            },
          });
        } else {
          selectedSchedules.push(existingSchedule);
        }
      });
      selectedSchedules.sort(
        (schedule1: StoreScheduleItem, schedule2: StoreScheduleItem) =>
          schedule1.from - schedule2.from,
      );
      setSchedules(selectedSchedules);
    }
  }, [dates]);

  const setCalendarInitialDates = (existingSchedules: StoreScheduleItem[]) => {
    const alreadySavedDates: Date[] = existingSchedules.map(
      (schedule) => new Date(schedule.date),
    );
    setDates(alreadySavedDates);
    setDisabledDates(alreadySavedDates);
  };

  const resetCalendar = () => {
    setCalendarInitialDates(sampleData);
    setMonth(new Date());
    setDateRange(undefined);
    setWeekDays([]);
  };

  const handleScheduleTabChange = (value: string) => {
    setScheduleType(value as "fixed" | "recurring");
    resetCalendar();
  };

  const validateRecurringSelections = (): string => {
    if (!(dateRange?.from && dateRange?.to)) {
      return "Select a date range with a minimum of 2 weeks.";
    }
    if (!weekDays?.length) {
      return "Select at least one week day.";
    }
    return "";
  };
  const createRecurringSchedules = () => {};

  const handleCreateSchedule = () => {
    const error = validateRecurringSelections();
    if (error) {
      toast({
        variant: "destructive",
        duration: 5000,
        title: "Invalid Selections!",
        description: error,
      });
    } else {
      createRecurringSchedules();
    }
  };

  const onScheduleDelete = (schedule?: StoreScheduleItem) => {
    if (schedule) {
      setSchedules((current) =>
        current.filter(
          (currentSchedule) => currentSchedule.date !== schedule.date,
        ),
      );
      setDates((current) =>
        current?.filter(
          (currentDate) => currentDate.getTime() !== schedule.date,
        ),
      );
    } else {
      setSchedules([]);
      setDates([]);
    }
  };

  const addHoursAdnMinutes = (
    date: number,
    hours: string,
    minutes: string,
    unit: TimeUnits,
  ): number => {
    const fromHours = unit === "PM" ? Number(hours) + 12 : Number(hours);
    const fromWithHours = addHours(date, fromHours);
    return addMinutes(fromWithHours, Number(minutes)).getTime();
  };

  const onScheduleEdit = (
    scheduleForm: z.infer<typeof scheduleFormSchema>,
    schedule: StoreScheduleItem,
  ) => {
    const currentSchedule = schedules.filter(
      (scheduleItem) => scheduleItem.from === schedule.from,
    )[0];
    currentSchedule.from = addHoursAdnMinutes(
      currentSchedule.date,
      scheduleForm.fromHour,
      scheduleForm.fromMinute,
      scheduleForm.fromUnit,
    );
    currentSchedule.to = addHoursAdnMinutes(
      currentSchedule.date,
      scheduleForm.toHour,
      scheduleForm.toMinute,
      scheduleForm.toUnit,
    );
    currentSchedule.address = {
      ...scheduleForm.address,
      zipCode: Number(scheduleForm.address.zipCode),
    };
    setSchedules([...schedules]);
    return true;
  };

  const onAllSchedulesEdit = (
    scheduleForm: z.infer<typeof scheduleFormSchema>,
  ) => {
    const updatedSchedules: StoreScheduleItem[] = schedules.map(
      (scheduleItem) => {
        return {
          ...scheduleItem,
          from: addHoursAdnMinutes(
            scheduleItem.date,
            scheduleForm.fromHour,
            scheduleForm.fromMinute,
            scheduleForm.fromUnit,
          ),
          to: addHoursAdnMinutes(
            scheduleItem.date,
            scheduleForm.toHour,
            scheduleForm.toMinute,
            scheduleForm.toUnit,
          ),
          address: {
            ...scheduleForm.address,
            zipCode: Number(scheduleForm.address.zipCode),
          },
        };
      },
    );
    setSchedules(updatedSchedules);
    return true;
  };

  const handleScheduleSave = () => {
    console.log(schedules);
    // setSubmittingSchedule(true);
    // const storeSchedule: StoreSchedule = {
    //   storeId,
    //   schedules: schedules,
    // };
    // axios.put(`/store/${storeId}/schedule`, storeSchedule).then(
    //   async () => {
    //     await mutate();
    //     toast({
    //       title: "Success!",
    //       duration: 5000,
    //       description: `Store menu updated successfully.`,
    //     });
    //     setSubmittingSchedule(false);
    //     setScheduleChanged(false);
    //   },
    //   () => {
    //     toast({
    //       variant: "destructive",
    //       duration: 5000,
    //       title: "Failure!",
    //       description: `Store menu update failed.`,
    //     });
    //     setSubmittingSchedule(false);
    //   }
    // );
  };

  return isScheduleLoading || submittingSchedule ? (
    <Loading />
  ) : (
    <div className="sm:max-w-screen-lg m-auto pt-3">
      <div className="flex items-center justify-between pb-2 border-b border-b-slate-200">
        <h4 className="text-xl">
          Store Schedule
          <span className="text-xs text-slate-500 pl-2">
            (Create/update your schedule below.)
          </span>
        </h4>
        <div className="flex items-center gap-3">
          <Button type="submit" onClick={handleScheduleSave}>
            <CheckIcon className="w-5 h-5" />
            <span className="pl-2">Save Schedule</span>
          </Button>
        </div>
      </div>
      <div className="w-full text-right text-xs italic text-red-accent-400 h-5 pt-1">
        {dates?.length !== disabledDates.length
          ? "Schedules in yellow are unsaved changes. Click Save Schedule above when you're done."
          : ""}
      </div>
      <div className="pb-6 pt-3 flex gap-8">
        <div className="min-w-[360px]">
          <Tabs value={scheduleType} onValueChange={handleScheduleTabChange}>
            <TabsList className="grid w-full grid-cols-1">
              <TabsTrigger value="fixed">Fixed Schedule</TabsTrigger>
              {/* <TabsTrigger value="recurring">Recurring Schedule</TabsTrigger> */}
            </TabsList>
            <TabsContent value="fixed">
              <ScheduleCalendarHeader
                type="fixed"
                showResetBtn={dates?.length !== disabledDates.length}
                onReset={resetCalendar}
              />
              <FixedScheduleCalendar
                month={month}
                setMonth={setMonth}
                dates={dates}
                setDates={setDates}
                disabledDates={disabledDates}
              />
            </TabsContent>
            <TabsContent value="recurring">
              <ScheduleCalendarHeader
                type="recurring"
                onReset={resetCalendar}
              />
              <div className="py-3 px-5">
                <ToggleGroup
                  type="multiple"
                  className="flex justify-between w-full"
                  value={weekDays}
                  onValueChange={setWeekDays}
                >
                  <ToggleGroupItem
                    value="sunday"
                    className="border border-slate-400 rounded-full data-[state=on]:text-white data-[state=on]:bg-deep-purple-accent-700"
                  >
                    S
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="monday"
                    className="border border-slate-400 rounded-full data-[state=on]:text-white data-[state=on]:bg-deep-purple-accent-700"
                  >
                    M
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="tueday"
                    className="border border-slate-400 rounded-full data-[state=on]:text-white data-[state=on]:bg-deep-purple-accent-700"
                  >
                    T
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="wednesday"
                    className="border border-slate-400 rounded-full data-[state=on]:text-white data-[state=on]:bg-deep-purple-accent-700"
                  >
                    W
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="thursday"
                    className="border border-slate-400 rounded-full data-[state=on]:text-white data-[state=on]:bg-deep-purple-accent-700"
                  >
                    T
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="friday"
                    className="border border-slate-400 rounded-full data-[state=on]:text-white data-[state=on]:bg-deep-purple-accent-700"
                  >
                    F
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="saturday"
                    className="border border-slate-400 rounded-full data-[state=on]:text-white data-[state=on]:bg-deep-purple-accent-700"
                  >
                    S
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
              <RecurringScheduleCalendar
                month={month}
                setMonth={setMonth}
                dateRange={dateRange}
                setDateRange={setDateRange}
              />
              <Button onClick={handleCreateSchedule} className="w-full mt-6">
                Create Schedule
              </Button>
            </TabsContent>
          </Tabs>
        </div>
        <div className="w-full">
          {schedules.length === 0 && (
            <div className="bg-slate-100 flex items-center justify-center w-full rounded h-full">
              No schedule found. Please create one now.
            </div>
          )}
          {schedules.length > 0 && (
            <>
              <div className="min-h-12 flex items-center justify-between pb-3">
                <div className="text-xl text-slate-900">Schedules</div>
                {schedules.length > 1 && (
                  <div className="flex items-center">
                    <ScheduleEdit
                      schedule={schedules[0]}
                      onScheduleEdit={onAllSchedulesEdit}
                    >
                      <Button
                        variant="link"
                        className="flex items-center gap-2 text-sm underline !pr-0"
                      >
                        Update All Schedules
                      </Button>
                    </ScheduleEdit>
                    {/* <ScheduleDelete onScheduleDelete={onScheduleDelete}>
                      <Button
                        variant="link"
                        className="flex items-center gap-2 text-sm underline text-red-accent-700"
                      >
                        Delete All
                      </Button>
                    </ScheduleDelete> */}
                  </div>
                )}
              </div>
              {schedules.map((schedule: StoreScheduleItem) => (
                <ScheduleItem
                  key={schedule.date}
                  storeScheduleItem={schedule}
                  className={
                    !schedule.existing ? "border-l-amber-700 bg-amber-50" : ""
                  }
                >
                  <>
                    <div className="absolute top-1 right-4 flex items-center">
                      <ScheduleEdit
                        schedule={schedule}
                        onScheduleEdit={onScheduleEdit}
                      >
                        <Button
                          variant="link"
                          className="flex items-center gap-2 text-sm !pr-0"
                        >
                          <Pencil2Icon className="w-4 h-4" />
                          Edit
                        </Button>
                      </ScheduleEdit>
                      <ScheduleDelete
                        schedule={schedule}
                        onScheduleDelete={onScheduleDelete}
                      >
                        <Button
                          variant="link"
                          className="flex items-center gap-2 text-sm text-red-accent-700 !pr-0"
                        >
                          <TrashIcon className="w-4 h-4" />
                          Delete
                        </Button>
                      </ScheduleDelete>
                    </div>
                  </>
                </ScheduleItem>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
