import { Either, left, right } from "@/core/either";
import { Task } from "../../enterprise/entities/task";
import { TasksRepository } from "../repositories/task-repository";
import { ResourceNotFound } from "../errors/resource-not-found";

interface CreateTaskUseCaseRequest{
    taskId: string
}

type CreateTaskUseCaseResponse = Either<ResourceNotFound, { 
    task: Task
}>

export class GetTaskUseCase{
    constructor(private tasksRepository: TasksRepository){}

    async execute({taskId}: CreateTaskUseCaseRequest): Promise<CreateTaskUseCaseResponse>{
        const task = await this.tasksRepository.findById(taskId)

        if(!task){
            return left(new ResourceNotFound())
        }

        return right({task})
    }
}