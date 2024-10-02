import { addHoursAndMinutes } from "@/lib/utils";
import { ZIPCODE_REGEX } from "@repo/ui/config";
import { z } from "zod";

export const scheduleFormSchema = z
  .object({
    fromHour: z.enum([
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ]),
    fromMinute: z.enum(["00", "15", "30", "45"]),
    fromUnit: z.enum(["AM", "PM"]),
    toHour: z.enum(
      ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
      { message: "" },
    ),
    toMinute: z.enum(["00", "15", "30", "45"]),
    toUnit: z.enum(["AM", "PM"]),
    address: z.object({
      street: z.string().min(1, { message: "Street address is required." }),
      city: z.string().min(1, { message: "City is required." }),
      state: z.string().min(1, { message: "State is required." }),
      zipCode: z
        .string()
        .min(1, { message: "" })
        .regex(ZIPCODE_REGEX, { message: "Zipcode is invalid." }),
    }),
  })
  .refine(
    (schema) => {
      const fromTime = addHoursAndMinutes(
        new Date().getTime(),
        schema.fromHour,
        schema.fromMinute,
        schema.fromUnit,
      );
      const toTime = addHoursAndMinutes(
        new Date().getTime(),
        schema.toHour,
        schema.toMinute,
        schema.toUnit,
      );
      return toTime > fromTime;
    },
    {
      message: "End time should be higher than start time.",
      path: ["toHour"],
    },
  );
