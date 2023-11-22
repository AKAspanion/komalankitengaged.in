import { boolean, z } from "zod";
import { Room } from "./room";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
const GuestSideSchema = z.optional(z.enum(["Komal", "Ankit"]));
const RSVPTypeSchema = z.optional(z.enum(["yes", "no"]));

export const GuestSchema = z.object({
  name: z.coerce.string().min(5, "Must be more than 5 characters"),
  phoneNo: z.optional(
    z.string().min(10, { message: "Must be a valid mobile number" })
  ),
  room: z.optional(z.string()),
  side: GuestSideSchema,
  rsvp: RSVPTypeSchema,
  rsvpForm: z.optional(z.boolean()),
});

declare type GuestDocument = { _id: string; createdAt: string };
export declare type RSVPType = z.infer<typeof RSVPTypeSchema>;
export declare type GuestSide = z.infer<typeof GuestSideSchema>;
export declare type GuestBody = z.infer<typeof GuestSchema>;
export declare type Guest = GuestBody & GuestDocument;
export declare type CompleteGuest = Guest & { roomData: Room };
