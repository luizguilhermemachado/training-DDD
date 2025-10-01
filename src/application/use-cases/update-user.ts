import { User } from '@/domain/user/entities/user'
import { UsersRepository } from '../repositories/users-repository'

interface UpdateUserUseCaseRequest {
  id: string,
  name? : string,
  email? : string,
}

interface UpdateUserUseCaseResponse {
    user: User
}

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
    name,
    email,
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {

    const user  = await this.usersRepository.findById(id)

     if (!user) {
      throw new Error("User doesn't exist")
    }

    user?.update({name, email})


    await this.usersRepository.updateUser(user)


    return { user }
  }
}