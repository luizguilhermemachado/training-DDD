import { Optional } from "@/core/@types/optional"
import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

export interface ClientProps{
    name: string
    email: string
    telephone: string
    createdAt: Date
    updatedAt?: Date
}


export class Client extends Entity<ClientProps>{
    
private constructor(props: ClientProps, id?: UniqueEntityID) {
    super(props, id)
}
    
    get name(){
        return this.props.name
    }
    
    get email(){
        return this.props.email
    }

    get telephone(){
        return this.props.telephone
    }

     updateEmail(email: string) {
        this.props.email = email
        this.touch()
    }
    
    updateTelephone(telephone: string) {
        this.props.telephone = telephone
        this.touch()
    }

    updateContact(email: string, telephone: string) {
        this.props.email = email
        this.props.telephone = telephone
        this.touch()
    }
    
    private touch(){
        this.props.updatedAt = new Date()
    }

    static create(
        props: Optional<ClientProps, 'createdAt'>, 
        id?: UniqueEntityID
    ) {
        const client = new Client({
            ...props,
            createdAt: props.createdAt ?? new Date()
        }, id)

        return client
    }
}