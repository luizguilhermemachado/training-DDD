import { User } from "@/domain/user/entities/user"
import { UsersRepository } from "../repositories/users-repository"

interface CreateUserUseCaseRequest{
    name: string,
    email: string
}

interface CreateUserUseCaseResponse{
    user: User
}

export class CreateUserUseCase{
    constructor(private usersRepository: UsersRepository){}

    async execute({
        name,
        email
    }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse>{
        const userAlreadyExists = await this.usersRepository.findByEmail(email)  
        
        if(userAlreadyExists){
            throw new Error('Users already exists')
        }

        const user = User.create({ name, email})

        await this.usersRepository.create(user)

        return {
            user,
        }
    }

    
}