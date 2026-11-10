import "server-only";
import { z } from "zod";

const schema = z.object({
  MONGODB_URI: z
    .string()
    .regex(/^mongodb(\+srv)?:\/\//, "Use a MongoDB connection URI")
    .optional(),
  MONGODB_DB: z.string().min(1).default("offhour_dev"),
});

// Parse lazily: the scaffold builds without integration credentials.
export function getDatabaseEnv() {
  return schema.parse({
    MONGODB_URI: process.env.MONGODB_URI || undefined,
    MONGODB_DB: process.env.MONGODB_DB || undefined,
  });
}
