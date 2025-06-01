import { IType } from "./type.types";

export interface ITask {
  id?: string;
  userId?: string;
  type: IType;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITasksPaginated {
  total: number;
  offset: number;
  limit: number;
  tasks: ITask[];
}
