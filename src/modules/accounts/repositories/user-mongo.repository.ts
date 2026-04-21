import {
  UserModel,
  type UserDocument,
} from "@/modules/accounts/models/user-mongo.model.js";
import type {
  User,
  UserFilters,
  UserRepository,
} from "@/modules/accounts/types/user.types.js";

const toUser = (doc: UserDocument): User => ({
  id: doc._id.toString(),
  username: doc.username,
  email: doc.email,
  password: doc.password,
  createdAt: doc.createdAt,
});

export class UserMongoRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    const doc = await UserModel.findById(id);
    return doc ? toUser(doc) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const doc = await UserModel.findOne({ email });
    return doc ? toUser(doc) : null;
  }

  async findOne(filters: UserFilters): Promise<User | null> {
    const doc = await UserModel.findOne(filters);
    return doc ? toUser(doc) : null;
  }

  async save(user: Omit<User, "id" | "createdAt">): Promise<User> {
    const doc = await new UserModel(user).save();
    return toUser(doc);
  }

  update(): Promise<User> {
    throw new Error("Not implemented");
  }

  delete(): Promise<void> {
    throw new Error("Not implemented");
  }
}
