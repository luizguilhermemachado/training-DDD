import { InMemoryUserRepository } from '@/test/repositories/in-memory-user-repository'
import { CreateUserUseCase } from './create-user'
import { FindAllUsersUseCase } from './find-all-users'

let usersRepository: InMemoryUserRepository
let createUser: CreateUserUseCase
let sut: FindAllUsersUseCase

describe('Find all users', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    createUser = new CreateUserUseCase(usersRepository)
    sut = new FindAllUsersUseCase(usersRepository)
  })

  it('should be find all users', async () => {
    await createUser.execute({
      name: 'Maria',
      email: 'maria@example.com',
    })

    await createUser.execute({
      name: 'Marcos',
      email: 'Marcos@example.com',
    })

    await createUser.execute({
      name: 'Luiz',
      email: 'Luiz@example.com',
    })

    const { users } = await sut.execute()


    expect(users).toHaveLength(3)

  })


})
