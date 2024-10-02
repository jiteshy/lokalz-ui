"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import { StoreScheduleItem } from "@repo/ui/types";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { US_STATES } from "@repo/ui/config";
import { scheduleFormSchema } from "./schedule-form-schema";
import { Hours, Minutes, TimeUnits } from "@/types/schedule";

const createScheduelFormData = (
  schedule: StoreScheduleItem,
): z.infer<typeof scheduleFormSchema> => {
  const fromDate = new Date(schedule.from);
  const toDate = new Date(schedule.to);
  let fromHours = fromDate.getHours();
  let fromUnit: TimeUnits = "AM";
  if (fromHours > 12) {
    fromHours = fromHours - 12;
    fromUnit = "PM";
  }
  let toHours = toDate.getHours();
  let toUnit: TimeUnits = "AM";
  if (toHours > 12) {
    toHours = toHours - 12;
    toUnit = "PM";
  }
  return {
    fromHour: fromHours.toString().padStart(2, "0") as Hours,
    fromMinute: fromDate.getMinutes().toString().padStart(2, "0") as Minutes,
    fromUnit: fromUnit,
    toHour: toHours.toString().padStart(2, "0") as Hours,
    toMinute: toDate.getMinutes().toString().padStart(2, "0") as Minutes,
    toUnit: toUnit,
    address: {
      street: schedule.address.street,
      city: schedule.address.city,
      state: schedule.address.state,
      zipCode: schedule.address.zipCode
        ? schedule.address.zipCode.toString()
        : "",
    },
  };
};

type ScheduleEditProps = {
  schedule: StoreScheduleItem;
  onScheduleEdit: (
    scheduleForm: z.infer<typeof scheduleFormSchema>,
    schedule: StoreScheduleItem,
  ) => boolean;
  children: ReactNode;
};

export const ScheduleEdit = ({
  schedule,
  onScheduleEdit,
  children,
}: ScheduleEditProps) => {
  const [open, setOpen] = useState(false);
  const initialFormData: z.infer<typeof scheduleFormSchema> = useMemo(
    () => createScheduelFormData(schedule),
    [schedule],
  );
  const scheduleForm = useForm<z.infer<typeof scheduleFormSchema>>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: initialFormData,
  });

  useEffect(() => {
    scheduleForm.reset(initialFormData);
  }, [schedule]);

  const onSubmit = (values: z.infer<typeof scheduleFormSchema>) => {
    const success = onScheduleEdit(values, schedule);
    if (success) {
      setOpen(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader className="pb-2 border-b border-b-slate-200">
          <SheetTitle>Update Schedule</SheetTitle>
          <SheetDescription>
            Update Schedule details. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <Form {...scheduleForm}>
          <form
            onSubmit={scheduleForm.handleSubmit(onSubmit)}
            className="space-y-3 pt-3"
          >
            <FormLabel
              className={`font-normal ${scheduleForm.formState.errors.fromHour ? "text-destructive" : ""}`}
            >
              Start Time*
            </FormLabel>
            <div className="flex gap-1 pb-3">
              <FormField
                control={scheduleForm.control}
                name="fromHour"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal text-xs">Hour</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="min-w-[60px]">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="01">01</SelectItem>
                          <SelectItem value="02">02</SelectItem>
                          <SelectItem value="03">03</SelectItem>
                          <SelectItem value="04">04</SelectItem>
                          <SelectItem value="05">05</SelectItem>
                          <SelectItem value="06">06</SelectItem>
                          <SelectItem value="07">07</SelectItem>
                          <SelectItem value="08">08</SelectItem>
                          <SelectItem value="09">09</SelectItem>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="11">11</SelectItem>
                          <SelectItem value="12">12</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={scheduleForm.control}
                name="fromMinute"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal text-xs">
                      Minute
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="min-w-[60px]">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="00">00</SelectItem>
                          <SelectItem value="15">15</SelectItem>
                          <SelectItem value="30">30</SelectItem>
                          <SelectItem value="45">45</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={scheduleForm.control}
                name="fromUnit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal text-xs">Unit</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="min-w-[60px]">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="AM">AM</SelectItem>
                          <SelectItem value="PM">PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormLabel
              className={`font-normal ${scheduleForm.formState.errors.toHour ? "text-destructive" : ""}`}
            >
              End Time*
            </FormLabel>
            <div className="flex gap-1">
              <FormField
                control={scheduleForm.control}
                name="toHour"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal text-xs">Hour</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="min-w-[60px]">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="01">01</SelectItem>
                          <SelectItem value="02">02</SelectItem>
                          <SelectItem value="03">03</SelectItem>
                          <SelectItem value="04">04</SelectItem>
                          <SelectItem value="05">05</SelectItem>
                          <SelectItem value="06">06</SelectItem>
                          <SelectItem value="07">07</SelectItem>
                          <SelectItem value="08">08</SelectItem>
                          <SelectItem value="09">09</SelectItem>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="11">11</SelectItem>
                          <SelectItem value="12">12</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={scheduleForm.control}
                name="toMinute"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal text-xs">
                      Minute
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="min-w-[60px]">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="00">00</SelectItem>
                          <SelectItem value="15">15</SelectItem>
                          <SelectItem value="30">30</SelectItem>
                          <SelectItem value="45">45</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={scheduleForm.control}
                name="toUnit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal text-xs">Unit</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="min-w-[60px]">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="AM">AM</SelectItem>
                          <SelectItem value="PM">PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={scheduleForm.control}
              name="address.street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">Street*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter street" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={scheduleForm.control}
              name="address.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">City*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter city" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={scheduleForm.control}
              name="address.state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">State*</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a state" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(US_STATES).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={scheduleForm.control}
              name="address.zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">Zipcode*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter zipcode" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="min-h-8">
              <div className="font-medium text-sm text-destructive">
                {scheduleForm.formState.errors.address?.zipCode?.message ||
                  scheduleForm.formState.errors.toHour?.message}
              </div>
            </div>
            <SheetFooter>
              <Button
                className="-mt-3"
                type="submit"
                onClick={() => console.log(scheduleForm.formState.errors)}
              >
                Save changes
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};
