import { InMemoryUserRepository } from '@/test/repositories/in-memory-user-repository'
import { CreateUserUseCase } from './create-user'
import { UpdateUserUseCase } from './update-user'

let usersRepository: InMemoryUserRepository
let createUser: CreateUserUseCase
let sut: UpdateUserUseCase

describe('Create user', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    createUser = new CreateUserUseCase(usersRepository)
    sut = new UpdateUserUseCase(usersRepository)
  })

  it('should be create a new user', async () => {
    const { user } = await createUser.execute({
      name: 'Maria',
      email: 'maria@example.com',
    })

     await sut.execute({
      id: user.id.toString(),
      name: 'John Updated',
      email: 'john.updated@example.com',
    })

    const updatedUser = await usersRepository.findById(user.id.toString())

    expect(updatedUser).not.toBeNull()
    expect(updatedUser?.name).toBe('John Updated')
    expect(updatedUser?.email).toBe('john.updated@example.com')
  })

  it('should be not allowed to create a user with duplicade email', async () => {

    await expect(
      sut.execute({
        id: 'non-existing-id',
        name: 'Luiz',
        email: 'maria@example.com',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
