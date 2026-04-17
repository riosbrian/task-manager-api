import mongoose, { Schema, Types, type InferSchemaType } from "mongoose";
import { TASK_PRIORITIES } from "../types/task.js";

const taskSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  description: { type: String, default: null },
  priority: {
    type: String,
    enum: Object.values(TASK_PRIORITIES),
    default: TASK_PRIORITIES.MEDIUM,
  },
  completed: { type: Boolean, default: false },
});

export type TaskDocument = InferSchemaType<typeof taskSchema> & {
  _id: Types.ObjectId;
};

export const TaskModel = mongoose.model("Task", taskSchema);
