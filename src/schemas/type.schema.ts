import { z } from "zod";

export const typeSchema = z.object({
  name: z.string().nonempty("Name type is required"),
});
