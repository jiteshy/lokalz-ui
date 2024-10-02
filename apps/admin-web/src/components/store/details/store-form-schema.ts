import { ZIPCODE_REGEX } from "@repo/ui/config";
import { z } from "zod";

export const storeFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required." })
    .max(100, { message: "Name should be max 100 chars." }),
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Email is invalid." }),
  phone: z
    .string()
    .min(1, { message: "Phone no is required." })
    .regex(/^(?:\+1)?\s?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/, {
      message: "Phone no is invalid.",
    }),
  type: z.enum(["FOOD_TRUCK", "SHOP", "HOME_VENDOR", "OTHER"], {
    message: "Store type is invalid.",
  }),
  tags: z.string().min(1, { message: "Tag/s is/are required." }),
  description: z
    .string()
    .min(1, { message: "Description is required." })
    .max(1000, { message: "Description should be max 1000 chars." }),
  address: z.object({
    street: z.string().min(1, { message: "Street address is required." }),
    city: z.string().min(1, { message: "City is required." }),
    state: z.string().min(1, { message: "State is required." }),
    zipCode: z
      .string()
      .min(1, { message: "Zipcode is required." })
      .regex(ZIPCODE_REGEX, { message: "Zipcode is invalid." }),
  }),
});
