import { StoreScheduleItem } from "@repo/ui/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

export const ScheduleDelete = ({
  schedule,
  onScheduleDelete,
  children,
}: {
  schedule?: StoreScheduleItem;
  onScheduleDelete: (schedule?: StoreScheduleItem) => void;
  children: ReactNode;
}) => {
  const dateStr = (date: number) => {
    const dateObj = new Date(date);
    return `${dateObj.getDate()} ${dateObj.toLocaleDateString("en-us", {
      month: "short",
    })}`;
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Delete {schedule ? "Schedule" : "All Schedules"}
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to{" "}
            {schedule
              ? `delete the schedule for ${dateStr(schedule.date)}`
              : "remove all the newly added schedules"}
            ?{" "}
            <span className="pt-3 block text-red-accent-400">
              {schedule?.existing
                ? "This will mark the schedule for deletion. Please click Save Schedule button to permanently delete it."
                : "This will discard the newly added schedule right away."}
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="pt-5">
          <DialogClose asChild>
            <Button type="button" variant={"secondary"}>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" onClick={() => onScheduleDelete(schedule)}>
              Yes, Delete {schedule ? "Schedule" : "All Schedules"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
