import { z } from "zod";

export const GuestSchema = z.object({
  name: z.optional(z.string()),
  peopleCount: z.optional(z.number()),
  phoneNo: z.optional(z.number()),
});

declare type GuestDocument = { _id: string };
export declare type Guest = z.infer<typeof GuestSchema> & GuestDocument;
