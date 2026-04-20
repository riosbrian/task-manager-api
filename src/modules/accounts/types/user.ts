import type { RegisterUserInput } from "@/modules/accounts/schemas/auth.schema.js";

export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
};

export type UniqueUserKeys = keyof Pick<User, "id" | "email">;

export type Criteria = {
  by: UniqueUserKeys;
  value: string;
};

export interface UserRepository {
  create: (user: RegisterUserInput) => Promise<User>;
  findByUnique: (criteria: Criteria) => Promise<User | null>;
}
