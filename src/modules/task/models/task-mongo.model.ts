import mongoose, {
  Schema,
  type HydratedDocument,
  type InferSchemaType,
} from "mongoose";
import { TASK_PRIORITIES } from "../types/task.js";

const taskSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, default: null },
  priority: {
    type: String,
    enum: Object.values(TASK_PRIORITIES),
    default: TASK_PRIORITIES.MEDIUM,
  },
  completed: { type: Boolean, default: false },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export type TaskDocument = HydratedDocument<InferSchemaType<typeof taskSchema>>;

export const TaskModel = mongoose.model("Task", taskSchema);
