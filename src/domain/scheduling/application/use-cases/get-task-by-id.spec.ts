import { InMemoryTasksRepository } from "@/test/repositories/in-memory-tasks-repository"
import { CreateTaskUseCase } from "./create-tasks"
import { GetTaskUseCase } from "./get-task-by-id"
import { makeTask } from "@/test/factories/make-task"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { ResourceNotFound } from "../errors/resource-not-found"


let inMemoryTasksRepository: InMemoryTasksRepository
let sut: GetTaskUseCase

describe('Get task', () => {
  beforeEach(() => {
    inMemoryTasksRepository = new InMemoryTasksRepository()
    sut = new GetTaskUseCase(inMemoryTasksRepository)
  })

  it('should be able to get a task by id', async () => {
    const newTask = makeTask({}, new UniqueEntityID('task-01'))

    await inMemoryTasksRepository.create(newTask)

    const result = await sut.execute({
        taskId: newTask.id.toString()
    })
    
    expect(result.isRight()).toBe(true)
        
    if (result.isRight()) {
      expect(result.value.task).toEqual(newTask)
      expect(result.value.task.id).toEqual(newTask.id)
    }
  })

  it('should return error when task does not exist', async () => {
    const result = await sut.execute({
      taskId: 'non-existent-id',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFound)
  })
})