import { Either, right } from "@/core/either"
import { Client } from "../../enterprise/entities/client"
import { ClientRepository } from "../repositories/client-repository"

interface CreateClienteUseCaseRequest{
    name: string
    email: string
    telephone: string
}

type CreateClientUseCaseResponse = Either<null, {
    client: Client
}>

export class CreateClientUseCase{
    constructor(private clientRepository: ClientRepository){}

    async execute({
        name,
        email,
        telephone,
    }: CreateClienteUseCaseRequest): Promise<CreateClientUseCaseResponse>{
        const client = Client.create({
            name,
            email,
            telephone
        })

        await this.clientRepository.create(client)

        return right({
            client
        })
    }
}