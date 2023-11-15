import { z } from "zod";

export const RoomSchema = z.object({
  key: z.coerce.string().min(2),
  name: z.coerce.string().min(2),
  type: z.enum(["HOME", "HOTEL"]),
  capacity: z.coerce.number().min(2),
});

declare type RoomDocument = { _id: string; createdAt: string };
export declare type RoomBody = z.infer<typeof RoomSchema>;
export declare type Room = RoomBody & RoomDocument;
