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
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Delete {schedule ? "Schedule" : "All Schedules"}
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete{" "}
            {schedule ? "the schedule" : "all the schedules"}?
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
