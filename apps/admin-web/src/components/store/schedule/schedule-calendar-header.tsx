import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

export const ScheduleCalendarHeader = ({
  type,
  onReset,
}: {
  type: "fixed" | "recurring";
  onReset: () => void;
}) => (
  <>
    <div className="pb-1 text-md text-slate-900 font-medium">
      {type === "fixed"
        ? "Create schedule for fixed dates."
        : "Create repeated schedule for weekdays."}
    </div>
    <div className="text-xs text-slate-600">
      {type === "fixed"
        ? `Example: Create schedule for 1st, 3rd, 10th, 12th of the next month.`
        : `Example: Create schedule for every Monday and Thursday between current month and December.`}
      <div className="font-medium text-deep-purple-accent-700 flex justify-between items-center">
        {type === "fixed"
          ? "Select minimum 1 day"
          : "Select minimum 1 week day & 2 weeks"}
        <Button
          onClick={onReset}
          variant={"link"}
          className="text-md underline flex gap-2 items-center !pr-0"
        >
          <ReloadIcon className="w-3 h-3" />
          Reset Calendar
        </Button>
      </div>
    </div>
  </>
);
