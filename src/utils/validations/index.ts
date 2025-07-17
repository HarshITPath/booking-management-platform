import { z } from "zod";
import { regex } from "./regex";

export const booingFormSchema = z
  .object({
    first_name: z.string().trim().min(1, "First name is required"),
    last_name: z.string().trim().min(1, "Last name is required"),
    phone_number: z
      .string()
      .trim()
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number cannot exceed 15 digits")
      .regex(regex.onlyNumbers, "Phone number must contain only digits"),
    email_id: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Invalid email format"),
    
    message: z.string().trim().min(1, "Message is required"),
  })
  .loose();

