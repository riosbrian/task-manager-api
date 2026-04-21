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
