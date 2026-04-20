import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("invalid email format"),
  password: z.string().min(8, "password must be greater than 8 characters"),
});

export const registerSchema = loginSchema.extend({
  username: z
    .string("username is mandatory")
    .min(3, "username must be greather than 3 characters"),
});

export type RegisterUserInput = z.infer<typeof registerSchema>;
export type LoginUserInput = z.infer<typeof loginSchema>;
