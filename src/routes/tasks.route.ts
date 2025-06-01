import { Router } from "express";

import TasksController from "../controllers/task.controller";
import validateJWT from "../middlewares/validate_jwt.middlewere";
import validateMongoID from "../middlewares/validate_mongo_id_middlewere";
import { validateRequest } from "../middlewares/validate_req.middlewere";
import { taskSchema } from "../schemas/task.schema";

const TaskRoutes = (taskController: TasksController) => {
  const router = Router();

  router.get("/", validateJWT, (req, res) => taskController.getTasks(req, res));

  router.post(
    "/",
    [validateJWT, validateRequest(taskSchema, "body")],
    (req, res) => taskController.addTasks(req, res)
  );

  router.delete("/:id", [validateMongoID, validateJWT], (req, res) =>
    taskController.deleteTask(req, res)
  );

  router.put(
    "/:id",
    [validateMongoID, validateJWT, validateRequest(taskSchema, "body")],
    (req, res) => taskController.updateTask(req, res)
  );

  return router;
};

export default TaskRoutes;
