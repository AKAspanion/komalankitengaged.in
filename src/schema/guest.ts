import { z } from "zod";
import { Room } from "./room";

export const GuestSchema = z.object({
  name: z.coerce.string().min(5),
  peopleCount: z.optional(z.number()),
  phoneNo: z.optional(z.number()),
  room: z.optional(z.string()),
});

declare type GuestDocument = { _id: string; createdAt: string };
export declare type GuestBody = z.infer<typeof GuestSchema>;
export declare type Guest = GuestBody & GuestDocument;
export declare type CompleteGuest = Guest & { roomData: Room };
