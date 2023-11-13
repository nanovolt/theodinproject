import { z } from "zod";

export const ServerValidationErrorSchema = z.object({
  status: z.number(),
  data: z.object({
    message: z.string(),
    errors: z.array(
      z.object({
        location: z.string(),
        msg: z.string(),
        path: z.string(),
        type: z.string(),
        value: z.string(),
      })
    ),
  }),
});

export const ServerErrorSchema = z.object({
  status: z.number(),
  data: z.object({
    message: z.string(),
    error: z.string(),
  }),
});
