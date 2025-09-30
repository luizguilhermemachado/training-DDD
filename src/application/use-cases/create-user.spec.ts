import { InMemoryUserRepository } from '@/test/repositories/in-memory-user-repository'
import { CreateUserUseCase } from './create-user'

let usersRepository: InMemoryUserRepository
let sut: CreateUserUseCase

describe('Create user', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    sut = new CreateUserUseCase(usersRepository)
  })

  it('should be create a new user', async () => {
    const { user } = await sut.execute({
      name: 'Maria',
      email: 'maria@example.com',
    })

    expect(user).toHaveProperty('id')
    expect(user.name).toBe('Maria')
    expect(user.email).toBe('maria@example.com')
  })

  it('should be not allowed to create a user with duplicade email', async () => {
    await sut.execute({
      name: 'Maria',
      email: 'maria@example.com',
    })

    await expect(
      sut.execute({
        name: 'Luiz',
        email: 'maria@example.com',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
