import { z } from "zod";

export const taskSchema = z.object({
  id: z
    .string()
    .regex(/^[a-f\d]{24}$/i, "Invalid MongoDB ObjectId")
    .optional(),
  content: z.string().nonempty("Content is required"),
  type: z.object({
    name: z.string().nonempty("Type name is required"),
  }),
});
