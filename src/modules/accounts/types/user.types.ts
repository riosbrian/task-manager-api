export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
};

export type UserFilters = Partial<Pick<User, "id" | "email" | "username">>;

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findOne(filters: UserFilters): Promise<User | null>;
  save(user: Omit<User, "id" | "createdAt">): Promise<User>;
  update(id: string, data: Partial<Omit<User, "id">>): Promise<User>;
  delete(id: string): Promise<void>;
}
