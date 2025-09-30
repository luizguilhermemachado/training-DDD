import { User } from '@/domain/user/entities/user'
import { UsersRepository } from '../repositories/users-repository'

interface FindAllUsersUseCaseResponse {
  users: User[]
}

export class FindAllUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<FindAllUsersUseCaseResponse> {
    const users = await this.usersRepository.findAllUsers()

    return { users }
  }
}
