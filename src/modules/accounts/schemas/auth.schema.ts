import { z } from "zod";

const loginSchema = z.object({
  email: z.email({ error: "Invalid email format" }),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters" }),
});

const registerSchema = loginSchema.extend({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
});

export const loginBodySchema = z.object({
  body: loginSchema,
});

export const registerBodySchema = z.object({
  body: registerSchema,
});

export type LoginInput = z.infer<typeof registerSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
