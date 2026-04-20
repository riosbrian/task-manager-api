import type {
  AuthRepository,
  AuthTokens,
} from "@/modules/accounts/types/auth.js";
import type { UserRepository } from "@/modules/accounts/types/user.js";
import type {
  RegisterUserInput,
  LoginUserInput,
} from "@/modules/accounts/schemas/auth.schema.js";
import { AuthError } from "@/modules/accounts/types/auth.errors.js";
import {
  comparePassword,
  hashPassword,
} from "@/modules/accounts/utils/password-hasher.util.js";
import { signToken } from "@/modules/accounts/utils/jwt.util.js";

type AuthPayload = { userId: string };

async function signAuthTokens(payload: AuthPayload) {
  const accessToken = await signToken(payload, "accessToken");
  const refreshToken = await signToken(payload, "refreshToken");
  return { accessToken, refreshToken };
}

export function authService(repository: UserRepository): AuthRepository {
  return {
    async register(input: RegisterUserInput): Promise<void> {
      const userExist = await repository.findByUnique({
        by: "email",
        value: input.email,
      });
      if (userExist) throw AuthError.userAlreadyRegistered();

      const hashedPassword = await hashPassword(input.password);

      await repository.create({
        ...input,
        password: hashedPassword,
      });
    },

    async login(input: LoginUserInput): Promise<AuthTokens> {
      const user = await repository.findByUnique({
        by: "email",
        value: input.email,
      });

      if (!user) throw AuthError.notFoundUser();

      const isPasswordValid = await comparePassword(
        user.password,
        input.password,
      );
      if (!isPasswordValid) throw AuthError.invalidCredentials();

      const { accessToken, refreshToken } = await signAuthTokens({
        userId: user.id,
      });

      return { accessToken, refreshToken };
    },
  };
}
