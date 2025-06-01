import { Response } from "express";
import TasksService from "../services/task.service";
import { AuthRequest } from "../types/auth.type";
import { ITask } from "../types/task.type";
import BaseController from "./base.controller";

class TasksController extends BaseController {
  private tasksService: TasksService;

  constructor(tasksService: TasksService) {
    super();
    this.tasksService = tasksService;
  }

  async getTasks(req: AuthRequest, res: Response) {
    const uid = req.uid;
    const { limit = 100, offset = 0 } = req.params;

    await this.executeAction(res, async () => {
      const tasks = await this.tasksService.getTasks(
        uid!,
        Number(limit),
        Number(offset)
      );
      this.handleResponse(res, 200, "success", tasks);
    });
  }

  async addTasks(req: AuthRequest, res: Response) {
    const tasks: ITask = req.body;
    const userId = req.uid ?? "";

    await this.executeAction(res, async () => {
      await this.tasksService.addTasks(userId, tasks);
      this.handleResponse(res, 200, "success", true);
    });
  }

  async deleteTask(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const userId = req.uid ?? "";

    await this.executeAction(res, async () => {
      await this.tasksService.deleteTask(userId, id);
      this.handleResponse(res, 200, "success", true);
    });
  }

  async updateTask(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const userId = req.uid ?? "";
    const task: ITask = req.body;

    await this.executeAction(res, async () => {
      await this.tasksService.updateTask(userId, id, task);
      this.handleResponse(res, 200, "success", true);
    });
  }
}

export default TasksController;
