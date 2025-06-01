import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(3, "Password must be at least 3 characters")
    .nonempty("Password is required"),
});

export const registerSchema = z.object({
  name: z.string().nonempty('Name is required'),
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(3, "Password must be at least 3 characters")
    .nonempty("Password is required"),
});
