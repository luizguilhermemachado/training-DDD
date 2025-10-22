import { ClientRepository } from "@/domain/scheduling/application/repositories/client-repository";
import { Client } from "@/domain/scheduling/enterprise/entities/client";

export class InMemoryClientRepository implements ClientRepository{
    public items: Client[] = []

    async create(client: Client) {
        this.items.push(client);
    }
    
}