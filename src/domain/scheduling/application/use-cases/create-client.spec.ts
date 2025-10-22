import { InMemoryClientRepository } from "@/test/repositories/in-memory-client-repository"
import { CreateClientUseCase } from "./create-client"

let inMemoryClientRepository: InMemoryClientRepository
let sut: CreateClientUseCase

describe('Create client', () =>{
    beforeEach(()=>{
        inMemoryClientRepository = new InMemoryClientRepository()
        sut = new CreateClientUseCase(inMemoryClientRepository)
    })

    it('should be able to create a client', async () =>{
        const result = await sut.execute({
            name: 'luiz',
            email: 'gui@gmail.com',
            telephone: '35997549760',

        })

        expect(result.isRight()).toBe(true)
        expect(inMemoryClientRepository.items[0]).toEqual(result.value?.client)
    })
})