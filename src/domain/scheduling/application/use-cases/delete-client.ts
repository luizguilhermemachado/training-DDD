import { Either, left, right } from "@/core/either"
import { ClientRepository } from "../repositories/client-repository"
import { ResourceNotFound } from "../errors/resource-not-found"
interface DeleteClienteUseCaseRequest{
    id: string
}

type DeleteClientUseCaseResponse = Either<ResourceNotFound, object>

export class DeleteClientUseCase{
    constructor(private clientRepository: ClientRepository){}

    async execute({
        id
    }:   DeleteClienteUseCaseRequest): Promise<DeleteClientUseCaseResponse>{
         const client = await this.clientRepository.findById(id)

        if(!client){
            return left(new ResourceNotFound())
        }

        await this.clientRepository.delete(id)

        return right({
            
        })
    }
}