import { InMemoryUserRepository } from '@/test/repositories/in-memory-user-repository'
import { CreateUserUseCase } from './create-user'
import { FindAllUsersUseCase } from './find-all-users'
import { FindUserByIdUseCase } from './find-user-by-id'
import { User } from '@/domain/user/entities/user'

let usersRepository: InMemoryUserRepository
let sut: FindUserByIdUseCase

describe('Find all users', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    sut = new FindUserByIdUseCase(usersRepository)
  })

  it('should be find all users', async () => {
    const user = new User({ name: 'John Doe', email: 'john@example.com' })

    await usersRepository.create(user)


    const response = await sut.execute({id: user.id.toString()})
    expect(response?.user.id).toBe(user.id)

  })

  it('should return null if user does not exist', async () => {
    await expect(
      sut.execute({ id: 'non-existing-id' })
    ).rejects.toBeInstanceOf(Error)
  })
})


