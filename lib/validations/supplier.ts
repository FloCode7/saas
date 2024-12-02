import { z } from "zod";

export const createSupplierSchema = z.object({
  companyName: z
    .string()
    .min(1, "Company name is required")
    .max(100, "Company name is too long"),

  contactName: z
    .string()
    .min(1, "Contact name is required")
    .max(100, "Contact name is too long")
    .regex(
      /^[a-zA-Z\s-']+$/,
      "Contact name should only contain letters, spaces, hyphens and apostrophes"
    ),

  email: z
    .string()
    .email("Invalid email address")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    ),

  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^[\d\s\-\+\(\)\.]+$/, // Format plus souple
      "Phone number can only contain digits, spaces, +, -, (, ), and ."
    ),
});

export type CreateSupplierInput = z.infer<typeof createSupplierSchema>;
