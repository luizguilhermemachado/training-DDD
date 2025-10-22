import { Either, left, right } from "@/core/either"
import { Client } from "../../enterprise/entities/client"
import { ClientRepository } from "../repositories/client-repository"

interface GetClienteUseCaseRequest{
    id: string
}

type GetClientUseCaseResponse = Either<Error, {
    client: Client
}>

export class GetClientUseCase{
    constructor(private clientRepository: ClientRepository){}

    async execute({
        id
    }:   GetClienteUseCaseRequest): Promise<  GetClientUseCaseResponse>{
        const client = await this.clientRepository.findById(id)

        if(!client){
            return left(new Error('Resource not found'))
        }

        return right({
            client
        })
    }
}