import { Task } from "../../enterprise/entities/task";

export interface TasksRepository{
    create(task: Task): Promise<void>
    findById(id: string): Promise<Task | null>
}