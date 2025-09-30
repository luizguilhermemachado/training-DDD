import { InMemoryUserRepository } from '@/test/repositories/in-memory-user-repository'
import { CreateUserUseCase } from './create-user'
import { FindAllUsersUseCase } from './find-all-users'
import { FindUserByIdUseCase } from './find-user-by-id'

let usersRepository: InMemoryUserRepository
let createUser: CreateUserUseCase
let sut: FindUserByIdUseCase

describe('Find all users', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    createUser = new CreateUserUseCase(usersRepository)
    sut = new FindUserByIdUseCase(usersRepository)
  })

  it('should be find all users', async () => {
    await createUser.execute({
      name: 'Maria',
      email: 'maria@example.com',
    })

    const { users } = await sut.execute()


    expect(users).toHaveLength(3)

  })


})
