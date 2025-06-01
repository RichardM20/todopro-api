import z from "zod";

const dateSchema = z.union([
  z.date(),
  z
    .string()
    .refine(
      (val) => {
        const timestamp = Number(val);
        return !isNaN(timestamp) && isFinite(timestamp) && timestamp > 0;
      },
      {
        message: "The date format must be a valid timestamp (e.g., Date.now())",
      }
    )
    .transform((val) => new Date(Number(val))),
]);

export default dateSchema;