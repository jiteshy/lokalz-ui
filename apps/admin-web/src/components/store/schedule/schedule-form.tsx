"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CheckIcon,
  ExclamationTriangleIcon,
  Pencil2Icon,
  ReloadIcon,
  ResetIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { FixedScheduleCalendar } from "./fixed-schedule-calendar";
import { useToast } from "@/hooks/use-toast";
import { StoreSchedule, StoreScheduleItem } from "@repo/ui/types";
import { ScheduleItem } from "@repo/ui/user/components";
import { ScheduleDelete } from "./schedule-delete";
import { ScheduleEdit } from "./schedule-edit";
import { scheduleFormSchema } from "./schedule-form-schema";
import { z } from "zod";
import useSWR from "swr";
import { ADMIN_APIS } from "@repo/ui/config";
import Loading from "@/app/loading";
import { useAxios } from "@/hooks/use-axios";
import { addHoursAndMinutes } from "@/lib/utils";

export const ScheduleForm = ({ storeId }: { storeId: string }) => {
  const { toast } = useToast();
  const axios = useAxios();
  const [dates, setDates] = useState<Date[] | undefined>([]);
  const [disabledDates, setDisabledDates] = useState<Date[]>([]);
  const [month, setMonth] = useState<Date>(new Date());
  // Use ADMIN API - getting cors
  const {
    data: scheduleData,
    isLoading: isScheduleLoading,
    mutate,
  } = useSWR<StoreSchedule>(
    `${ADMIN_APIS.STORE.STORE_DETAILS}/${storeId}/schedule/monthly`,
  );
  const [schedules, setSchedules] = useState<StoreScheduleItem[]>([]);
  const [submittingSchedule, setSubmittingSchedule] = useState<boolean>(false);

  useEffect(() => {
    if (scheduleData?.schedules?.length) {
      scheduleData.schedules.forEach((schedule) => {
        schedule.existing = true;
      });
      setSchedules(scheduleData.schedules);
      setCalendarInitialDates(scheduleData.schedules);
    }
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
    } else {
      setSchedules(scheduleData?.schedules || []);
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
    setCalendarInitialDates(scheduleData?.schedules || []);
    setMonth(new Date());
  };

  const onScheduleDelete = (schedule?: StoreScheduleItem) => {
    if (schedule) {
      if (schedule.existing) {
        toggleMarkForDeletion(schedule);
      } else {
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
      }
    } else {
      setSchedules([]);
      setDates([]);
    }
  };

  const toggleMarkForDeletion = (schedule: StoreScheduleItem) => {
    setSchedules((current) => {
      const updatedSchedules = [];
      for (const item of current) {
        if (item.id === schedule.id) {
          item.markedForDeletion = !item.markedForDeletion;
        }
        updatedSchedules.push({ ...item });
      }
      return updatedSchedules;
    });
  };

  const onScheduleEdit = (
    scheduleForm: z.infer<typeof scheduleFormSchema>,
    schedule: StoreScheduleItem,
  ) => {
    const currentSchedule = schedules.filter(
      (scheduleItem) => scheduleItem.from === schedule.from,
    )[0];
    currentSchedule.from = addHoursAndMinutes(
      currentSchedule.date,
      scheduleForm.fromHour,
      scheduleForm.fromMinute,
      scheduleForm.fromUnit,
    );
    currentSchedule.to = addHoursAndMinutes(
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
          from: addHoursAndMinutes(
            scheduleItem.date,
            scheduleForm.fromHour,
            scheduleForm.fromMinute,
            scheduleForm.fromUnit,
          ),
          to: addHoursAndMinutes(
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

  const areSchedulesValid = () => {
    const invalidSchedules =
      !schedules.length ||
      schedules.some(
        (schedule) =>
          !schedule.date ||
          !schedule.from ||
          !schedule.to ||
          !schedule.address.city ||
          !schedule.address.state ||
          !schedule.address.street ||
          !schedule.address.zipCode,
      );
    if (invalidSchedules) {
      toast({
        variant: "destructive",
        duration: 5000,
        title: "Validation Failed!",
        description: !schedules.length
          ? "Store schedules missing. Please add schedules and try again."
          : "Store schedule missing information. Please update schedule and try again.",
      });
    }
    return !invalidSchedules;
  };

  const handleScheduleSave = () => {
    if (areSchedulesValid()) {
      setSubmittingSchedule(true);
      const filteredSchedules = schedules.filter(
        (item) => !item.markedForDeletion,
      );
      const storeSchedule: StoreSchedule = {
        storeId,
        schedules: filteredSchedules,
      };
      axios.put(`/store/${storeId}/schedule`, storeSchedule).then(
        async () => {
          await mutate();
          toast({
            title: "Success!",
            duration: 5000,
            description: `Store schedule updated successfully.`,
          });
          setSubmittingSchedule(false);
        },
        () => {
          toast({
            variant: "destructive",
            duration: 5000,
            title: "Failure!",
            description: `Store schedule update failed.`,
          });
          setSubmittingSchedule(false);
        },
      );
    }
  };

  return isScheduleLoading || submittingSchedule ? (
    <Loading />
  ) : (
    <div className="sm:max-w-screen-lg m-auto pt-3">
      <div className="flex items-center justify-between pb-2 border-b border-b-slate-200 dark:border-strokedark">
        <h4 className="text-xl flex flex-col gap-2 md:flex-row md:items-center">
          Store Schedule
          <span className="text-xs text-slate-500 dark:text-slate-400">
            (Create/update your schedules below.)
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
      <div className="pb-6 flex flex-col md:flex-row gap-8">
        <div className="max-w-[360px] mx-auto">
          <div className="pb-3 flex justify-end">
            <ScheduleDelete onScheduleDelete={resetCalendar}>
              <Button
                variant={"link"}
                disabled={dates?.length === disabledDates.length}
                className="text-sm underline flex gap-2 items-center !pr-0 text-slate-900 dark:text-slate-200"
              >
                <ReloadIcon className="w-3 h-3" />
                Reset Calendar
              </Button>
            </ScheduleDelete>
          </div>
          <FixedScheduleCalendar
            month={month}
            setMonth={setMonth}
            dates={dates}
            setDates={setDates}
            disabledDates={disabledDates}
          />
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
                <div className="text-xl text-slate-900 dark:text-slate-200">
                  Schedules
                </div>
                {schedules.length > 1 && (
                  <div className="flex items-center">
                    <ScheduleEdit
                      schedule={schedules[0]}
                      onScheduleEdit={onAllSchedulesEdit}
                    >
                      <Button
                        variant="link"
                        className="flex items-center gap-2 text-sm underline !pr-0 dark:text-slate-200"
                      >
                        Update All Schedules
                      </Button>
                    </ScheduleEdit>
                  </div>
                )}
              </div>
              {schedules.map((schedule: StoreScheduleItem) => (
                <ScheduleItem
                  key={schedule.id || schedule.date}
                  storeScheduleItem={schedule}
                  className={
                    !schedule.existing
                      ? "border-l-amber-700 bg-amber-50"
                      : schedule.markedForDeletion
                        ? "border-l-red-accent-700 bg-red-50 relative after:content-[''] after:bg-red-50 after:absolute after:left-0 after:right-1/4 after:bottom-0 after:top-0 after:opacity-50"
                        : ""
                  }
                >
                  <>
                    <div className="absolute top-1 right-4 flex items-center opacity-100">
                      {!schedule.markedForDeletion && (
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
                      )}
                      {!schedule.markedForDeletion ? (
                        <ScheduleDelete
                          schedule={schedule}
                          onScheduleDelete={onScheduleDelete}
                        >
                          <Button
                            variant="link"
                            className="flex items-center gap-1 text-sm text-red-accent-700 !pr-0"
                          >
                            <TrashIcon className="w-4 h-4" />
                            Delete
                          </Button>
                        </ScheduleDelete>
                      ) : (
                        <Button
                          variant="link"
                          className="flex items-center gap-1 text-sm !pr-0"
                          onClick={() => toggleMarkForDeletion(schedule)}
                        >
                          <ResetIcon className="w-4 h-4" />
                          Restore
                        </Button>
                      )}
                    </div>
                    {!schedule.existing && (
                      <div className="absolute bottom-2 right-4 text-red-accent-700 text-xs flex items-center gap-2">
                        <ExclamationTriangleIcon className="h-4 w-4" /> Newly
                        Added
                      </div>
                    )}
                    {schedule.markedForDeletion && (
                      <div className="absolute bottom-2 right-4 text-red-accent-700 text-xs flex items-center gap-2">
                        <ExclamationTriangleIcon className="h-4 w-4" /> Marked
                        For Deletion
                      </div>
                    )}
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
