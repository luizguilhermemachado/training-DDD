import { Either, left, right } from "@/core/either"
import { Client } from "../../enterprise/entities/client"
import { ClientRepository } from "../repositories/client-repository"
import { ResourceNotFound } from "../errors/resource-not-found"

interface UpdateClienteUseCaseRequest{
    id: string
    email: string
    telephone: string
}

type UpdateClientUseCaseResponse = Either<ResourceNotFound, {
    client: Client
}>

export class UpdateClientUseCase{
    constructor(private clientRepository: ClientRepository){}

    async execute({
        id,
        email,
        telephone,
    }: UpdateClienteUseCaseRequest): Promise<UpdateClientUseCaseResponse>{
        const client = await this.clientRepository.findById(id)

        if(!client){
            return left(new ResourceNotFound())
        }

        client.updateContact(email, telephone)

        await this.clientRepository.save(client)

        return right({
            client
        })
    }
}