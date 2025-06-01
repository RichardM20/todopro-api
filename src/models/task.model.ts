import { model, Schema } from "mongoose";
import { ITask } from "../types/task.type";

const taskSechema = new Schema<ITask>({
  userId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    required: true,
    type: Date,
    default: Date.now(),
  },
  type: {
    type: Object,
    required: true,
  },
  updatedAt: {
    type: Date,
  },
});

taskSechema.set("toJSON", {
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  },
});


const Task = model("Task", taskSechema);

export default Task;
