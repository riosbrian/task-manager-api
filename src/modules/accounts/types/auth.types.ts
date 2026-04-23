import type { LoginInput, RegisterInput } from "@/modules/accounts/schemas/auth.schema.js";

export type AuthTokens = {
  accessToken: string;
  refreshToken?: string;
};

export interface AuthService {
  register(input: RegisterInput): Promise<void>;
  login(input: LoginInput): Promise<AuthTokens>;
}
