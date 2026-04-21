import type {
  LoginUserInput,
  RegisterUserInput,
} from "@/modules/accounts/schemas/auth.schema.js";

export type AuthTokens = {
  accessToken: string;
  refreshToken?: string;
};

export interface AuthService {
  register(input: RegisterUserInput): Promise<void>;
  login(input: LoginUserInput): Promise<AuthTokens>;
}
