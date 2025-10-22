import { Optional } from "@/core/@types/optional"
import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

export interface ServiceProps{
    name: string
    description?: string      
    durationInMinutes: number 
    priceInCents: number      
    isActive: boolean         
    createdAt: Date
    updatedAt?: Date
}


export class Service extends Entity<ServiceProps>{
    
private constructor(props: ServiceProps, id?: UniqueEntityID) {
    super(props, id)
}
    
    get name(){
        return this.props.name
    }
    
    get description(){
        return this.props.description
    }

    get durationInMinutes(){
        return this.props.durationInMinutes
    }

    get priceInCents(){
        return this.props.priceInCents
    }

    get isActive(){
        return this.props.isActive
    }

    get createdAt() {
        return this.props.createdAt
    }

get updatedAt() {
    return this.props.updatedAt
}

    updatePrice(priceInCents: number) {
        this.props.priceInCents = priceInCents
        this.touch()
    }

    updateDuration(durationInMinutes: number) {
        this.props.durationInMinutes = durationInMinutes
        this.touch()
    }

    updateDescription(description: string) {
    this.props.description = description
    this.touch()
}

    activate() {
        this.props.isActive = true
        this.touch()
    }

    deactivate(){
        this.props.isActive = false
        this.touch()
    }


    private touch(){
        this.props.updatedAt = new Date()
    }

    static create(
        props: Optional<ServiceProps, 'createdAt' | 'isActive'>, 
        id?: UniqueEntityID
    ) {
        const service = new Service({
            ...props,
            isActive: props.isActive ?? true,
            createdAt: props.createdAt ?? new Date()
        }, id)

        return service
    }
}