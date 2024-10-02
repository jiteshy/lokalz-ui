import { TimeUnits } from "@/types/schedule";
import { clsx, type ClassValue } from "clsx";
import { addHours, addMinutes } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const addHoursAndMinutes = (
  date: number,
  hours: string,
  minutes: string,
  unit: TimeUnits,
): number => {
  const fromHours = unit === "PM" ? Number(hours) + 12 : Number(hours);
  const fromWithHours = addHours(date, fromHours);
  return addMinutes(fromWithHours, Number(minutes)).getTime();
};
