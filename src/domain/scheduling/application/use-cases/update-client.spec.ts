import { InMemoryClientRepository } from "@/test/repositories/in-memory-client-repository"
import { GetClientUseCase } from "./get-client-by-id"
import { makeClient } from "@/test/factories/make-client"
import { ResourceNotFound } from "../errors/resource-not-found"
import { UpdateClientUseCase } from "./update-client"

let inMemoryClientRepository: InMemoryClientRepository
let sut: UpdateClientUseCase

describe('Update client', () =>{
    beforeEach(()=>{
        inMemoryClientRepository = new InMemoryClientRepository()
        sut = new UpdateClientUseCase(inMemoryClientRepository)
    })

    it('should to be update a client', async () =>{
        const newClient = makeClient()

        await inMemoryClientRepository.create(newClient)
        const result = await sut.execute({
            id: newClient.id.toString(),
            email: 'gui@gmail.com',
            telephone: '999999'
        })

        expect(result.isRight()).toBe(true)
        if(result.isRight()){
            expect(result.value.client).toEqual(
                expect.objectContaining({
                    email: 'gui@gmail.com',
                    telephone: '999999'
                }),
            )
        }
    })

    it('should return error when client does not exist', async () =>{

       const result = await sut.execute({
            id: 'non-existent-id',
            email: 'any@email.com',
            telephone: '999999'
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(ResourceNotFound)
    })
})