import { InMemoryClientRepository } from "@/test/repositories/in-memory-client-repository"
import { GetClientUseCase } from "./get-client-by-id"
import { makeClient } from "@/test/factories/make-client"
import { ResourceNotFound } from "../errors/resource-not-found"
import { DeleteClientUseCase } from "./delete-client"

let inMemoryClientRepository: InMemoryClientRepository
let sut: DeleteClientUseCase

describe('Delete client', () =>{
    beforeEach(()=>{
        inMemoryClientRepository = new InMemoryClientRepository()
        sut = new DeleteClientUseCase(inMemoryClientRepository)
    })

    it('should be able to delete a client by id', async () =>{
        const client = makeClient()

        await inMemoryClientRepository.create(client)

        const result = await sut.execute({
            id: client.id.toString()
        })

        expect(result.isRight()).toBe(true)
        expect(inMemoryClientRepository.items).toHaveLength(0)
    })

    it('should return error when client does not exist', async () =>{

        const result = await sut.execute({
            id: 'non-existent id'
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(ResourceNotFound)
    })
})