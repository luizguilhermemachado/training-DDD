import { User } from '@/domain/user/entities/user'
import { UsersRepository } from '../repositories/users-repository'

interface FindUserByIdUseCaseRequest{
  id: string
}

interface FindUserByIdUseCaseResponse {
  user: User
}

export class FindUserByIdUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({id}: FindUserByIdUseCaseRequest): Promise<FindUserByIdUseCaseResponse> {
    const user = await this.usersRepository.findById(id)

    if(!user){
        throw new Error("User doenst exists")
    }

    return { user }
  }
}
