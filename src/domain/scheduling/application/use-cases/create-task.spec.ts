import { InMemoryTasksRepository } from "@/test/repositories/in-memory-tasks-repository"
import { CreateTaskUseCase } from "./create-tasks"


let inMemoryTasksRepository: InMemoryTasksRepository
let sut: CreateTaskUseCase

describe('Create task', () => {
  beforeEach(() => {
    inMemoryTasksRepository = new InMemoryTasksRepository()
    sut = new CreateTaskUseCase(inMemoryTasksRepository)
  })

  it('should be able to create a task', async () => {
    const result = await sut.execute({
      title: 'Study DDD',
      description: 'Read chapter 3',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryTasksRepository.items[0]).toEqual(result.value?.task)
    expect(inMemoryTasksRepository.items[0].isCompleted).toBe(false)
  })
})