import Task from "../models/task.model";
import { ITask, ITasksPaginated } from "../types/task.type";
import { BadRequestError } from "../utils/errors/api_errors";
import { mapMongoId } from "../utils/mongoById";

class TasksService {
  async getTasks(
    userId: string,
    limit: number,
    offset: number
  ): Promise<ITasksPaginated> {
    if (isNaN(limit) || isNaN(offset)) {
      throw new BadRequestError("The limit and offset must be numbers");
    }

    const query = { userId };

    const [tasks, total] = await Promise.all([
      Task.find(query).skip(offset).limit(limit).lean(),
      Task.countDocuments(query),
    ]);

    const tasksModified = tasks.map((task) =>
      mapMongoId({
        ...task,
        type: {
          id: task.type.id,
          name: task.type.name,
        },
      })
    );

    return {
      limit,
      offset,
      total,
      tasks: tasksModified ?? [],
    };
  }

  async addTasks(userId: string, task: ITask): Promise<void> {
    if (!task) {
      throw new BadRequestError("You are trying to add an empty list of tasks");
    }

    const now = Date.now();

    const taskToInsert = {
      ...task,
      userId,
      createdAt: task.createdAt ?? now,
      updatedAt: task.updatedAt ?? now,
    };

    await Task.insertOne(taskToInsert);
  }

  async deleteTask(userId: string, id: string): Promise<void> {
    const query = { userId, _id: id };

    const deleted = await Task.findOneAndDelete(query);

    if (!deleted) {
      throw new BadRequestError("Unable to delete task, it may not exist");
    }
  }

  async updateTask(userId: string, id: string, task: ITask): Promise<void> {
    const query = { userId, _id: id };
    const { createdAt, updatedAt, ...rest } = task;

    const updatedTask = {
      ...rest,
      updatedAt: updatedAt && updatedAt !== createdAt ? updatedAt : Date.now(),
    };

    const updated = await Task.findOneAndUpdate(query, updatedTask);

    if (!updated) {
      throw new BadRequestError("Unable to update task, it may not exist");
    }
  }
}

export default TasksService;
