import { z } from "zod";

export const UserSchema = z.object({
  email: z.coerce.string().email().min(5),
  name: z.coerce.string().min(5),
  role: z.coerce.string().min(5),
});

declare type UserDocument = { _id: string; createdAt: string };
export declare type UserBody = z.infer<typeof UserSchema>;
export declare type User = UserBody & UserDocument;

export declare type UserWithPassword = UserBody &
  UserDocument & { password: string };

export const UserLoginSchema = z.object({
  email: z.coerce.string().email().min(5),
  password: z.coerce.string().min(5),
});
