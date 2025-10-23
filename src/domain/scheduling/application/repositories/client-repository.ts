import { Client } from "../../enterprise/entities/client";

export interface ClientRepository{
    create(client: Client): Promise<void>
    findById(id: string): Promise<Client | null>
    save(client: Client): Promise<void>
    delete(id: string): Promise<void | null>
}