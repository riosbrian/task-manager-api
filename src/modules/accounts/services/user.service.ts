import {
  UserModel,
  type UserDocument,
} from "@/modules/accounts/models/user-mongo.model.js";
import type { Criteria, User } from "@/modules/accounts/types/user.js";
import type { UserRepository } from "@/modules/accounts/types/user.js";
import type { RegisterUserInput } from "@/modules/accounts/schemas/auth.schema.js";

function mapToResponse(doc: UserDocument): User {
  return {
    id: doc._id.toString(),
    username: doc.username,
    email: doc.email,
    password: doc.password,
    createdAt: doc.createdAt,
  };
}

export function userService(): UserRepository {
  return {
    async create(user: RegisterUserInput): Promise<User> {
      const newUser = await UserModel.create(user);
      return mapToResponse(newUser);
    },

    async findByUnique(criteria: Criteria): Promise<User | null> {
      const user = await UserModel.findOne({ [criteria.by]: criteria.value });
      if (!user) return null;
      return mapToResponse(user);
    },
  };
}
