import { UserMongoRepository } from "@/modules/accounts/repositories/user-mongo.repository.js";
import { AuthServiceImpl } from "@/modules/accounts/services/auth.service.js";
import { TaskMongoRepository } from "@/modules/task/repositories/task-mongo.repository.js";
import { TaskServiceImpl } from "@/modules/task/services/task.service.js";

const userRepository = new UserMongoRepository();
const authService = new AuthServiceImpl(userRepository);

const taskRepository = new TaskMongoRepository();
const taskService = new TaskServiceImpl(taskRepository);

export { authService, taskService };
