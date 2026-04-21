import { UserMongoRepository } from "@/modules/accounts/repositories/user-mongo.repository.js";
import { AuthServiceImpl } from "@/modules/accounts/services/auth.service.js";

const userRepository = new UserMongoRepository();
const authService = new AuthServiceImpl(userRepository);

export { authService };
