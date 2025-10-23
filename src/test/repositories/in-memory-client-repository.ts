import { ClientRepository } from "@/domain/scheduling/application/repositories/client-repository";
import { Client } from "@/domain/scheduling/enterprise/entities/client";

export class InMemoryClientRepository implements ClientRepository{
    public items: Client[] = []

    async create(client: Client) {
        this.items.push(client);
    }

    async findById(id: string){
        const client = this.items.find((item) => item.id.toString() === id)

        if(!client){
            return null
        }

        return client
    }

    async save(client: Client){
        const index = this.items.findIndex((item) => item.id.toString() === client.id.toString())

        this.items[index] = client
    }

   async delete(id: string): Promise<void> {
        const itemIndex = this.items.findIndex(item => item.id.toString() === id)
        
        this.items.splice(itemIndex, 1)
    }
    
}