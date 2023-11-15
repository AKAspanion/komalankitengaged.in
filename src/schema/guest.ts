import { z } from "zod";
import { Room } from "./room";

const GuestSideSchema = z.enum(["Komal", "Ankit"]);

export const GuestSchema = z.object({
  name: z.coerce.string().min(5),
  phoneNo: z.optional(z.number()),
  room: z.optional(z.string()),
  side: GuestSideSchema,
});

declare type GuestDocument = { _id: string; createdAt: string };
export declare type GuestSide = z.infer<typeof GuestSideSchema>;
export declare type GuestBody = z.infer<typeof GuestSchema>;
export declare type Guest = GuestBody & GuestDocument;
export declare type CompleteGuest = Guest & { roomData: Room };
