import { z } from "zod";

const credentialsSchema = z.object({
  email: z.email({ error: "Invalid email format" }),
  password: z.string().min(8, { error: "Password must be at least 8 characters" }),
});

const registerSchema = credentialsSchema.merge(
  z.object({
    username: z.string().min(3, { error: "Username must be at least 3 characters" }),
  })
);

export const loginSchema = z.object({
  body: credentialsSchema,
});

export const registerSchema = z.object({
  body: registerSchemaBase,
});

export type LoginInput = z.infer<typeof credentialsSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
