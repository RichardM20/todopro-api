import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";

import connectDB from "../config/database.config";
import ENV from "../config/env.config";
import AuthController from "../controllers/auth.controller";
import TasksController from "../controllers/task.controller";
import TypeController from "../controllers/type.controller";
import AuthRoutes from "../routes/auth.route";
import TaskRoutes from "../routes/tasks.route";
import TypeRoutes from "../routes/type.route";
import AuthService from "../services/auth.service";
import TasksService from "../services/task.service";
import TypeService from "../services/type.service";
import logger from "../utils/logger";

class Server {
  private app: Application;
  private port: string | number;
  private paths: { [key: string]: string };

  constructor() {
    this.app = express();
    this.port = ENV.PORT;
    this.paths = {
      auth: "/api/auth",
      tasks: "/api/tasks",
      type: "/api/types",
    };
    this.connectDB();
    this.middleware();
    this.routes();
  }

  private async connectDB(): Promise<void> {
    await connectDB();
  }

  private middleware(): void {
    this.app.use(express.json());
    this.app.use(cookieParser());

    this.app.use(
      cors({
        origin: ENV.FRONT_END,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );

    this.app.use(
      helmet({
        crossOriginResourcePolicy: { policy: "cross-origin" },
      })
    );
  }

  private routes(): void {
    const authService = new AuthService();
    const authController = new AuthController(authService);
    const authRoutes = AuthRoutes(authController);

    //taks ->

    const tasksService = new TasksService();
    const tasksController = new TasksController(tasksService);
    const taskRoutes = TaskRoutes(tasksController);

    // types ->

    const typeService = new TypeService();
    const typeController = new TypeController(typeService);
    const typeRoutes = TypeRoutes(typeController);

    this.app.use(this.paths.auth, authRoutes);
    this.app.use(this.paths.tasks, taskRoutes);
    this.app.use(this.paths.type, typeRoutes);
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      logger.info(`Server running on port ${this.port}`);
    });
  }
}

export default Server;
