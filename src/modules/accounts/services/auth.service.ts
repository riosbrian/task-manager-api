import { AuthError } from "@/modules/accounts/errors/auth.errors.js";
import type {
  LoginUserInput,
  RegisterUserInput,
} from "@/modules/accounts/schemas/auth.schema.js";
import type {
  AuthService,
  AuthTokens,
} from "@/modules/accounts/types/auth.types.js";
import type {
  User,
  UserRepository,
} from "@/modules/accounts/types/user.types.js";
import {
  comparePassword,
  hashPassword,
} from "@/modules/accounts/utils/password-hasher.util.js";
import { signToken } from "@/shared/utils/jwt.util.js";

export class AuthServiceImpl implements AuthService {
  constructor(private readonly repository: UserRepository) {}

  async register(input: RegisterUserInput): Promise<void> {
    await this.verifyUserIsNotRegistered(input.email);

    const hashedPassword = await hashPassword(input.password);

    await this.repository.save({
      ...input,
      password: hashedPassword,
    });
  }

  async login(input: LoginUserInput): Promise<AuthTokens> {
    const user = await this.getAuthenticatedUser(input.email, input.password);
    const authTokens = await this.signAuthTokens({ userId: user.id });
    return authTokens;
  }

  private async verifyUserIsNotRegistered(email: string): Promise<void> {
    const user = await this.repository.findByEmail(email);
    if (user) throw AuthError.userAlreadyRegistered();
  }

  private async getAuthenticatedUser(
    email: string,
    hashedPassword: string,
  ): Promise<User> {
    const user = await this.repository.findByEmail(email);

    if (!user || !(await comparePassword(hashedPassword, user.password))) {
      throw AuthError.invalidCredentials();
    }

    return user;
  }

  private async signAuthTokens(payload: { userId: string }) {
    const accessToken = await signToken(payload, "accessToken");
    const refreshToken = await signToken(payload, "refreshToken");

    return { accessToken, refreshToken };
  }

  // private sanitizeResponse(user: User): Omit<User, "password"> {
  //   const { password, ...cleanUser } = user;
  //   return cleanUser;
  // }
}
