import { z } from "zod";

export const variantIdSchema = z
  .string()
  .regex(/^[a-f\d]{24}$/i, "Invalid variant ID");
export const cartLineSchema = z
  .object({
    variantId: variantIdSchema,
    quantity: z.number().int().min(1).max(5),
  })
  .strict();
