import { Optional } from "@/core/@types/optional"
import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

export interface ProfessionalProps{
    name: string
    email: string
    specialties: string[]
    isActive: boolean
    createdAt: Date
    updatedAt?: Date
}


export class Professional extends Entity<ProfessionalProps>{
    
private constructor(props: ProfessionalProps, id?: UniqueEntityID) {
    super(props, id)
}
    
    get name(){
        return this.props.name
    }
    
    get email(){
        return this.props.email
    }

    get specialties(){
        return this.props.specialties
    }

    get isActive(){
        return this.props.isActive
    }

    updateEmail(email: string) {
        this.props.email = email
        this.touch()
    }
    
    addSpecialty(specialty: string){
        if (!this.props.specialties.includes(specialty)) {
            this.props.specialties.push(specialty)
            this.touch()
        }
    }

    removeSpecialty(specialty: string){
        const index = this.props.specialties.findIndex(s => s === specialty)

        if (index !== -1) {
        this.props.specialties.splice(index, 1)
        this.touch() 
    }

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
        props: Optional<ProfessionalProps, 'createdAt' | 'isActive'>, 
        id?: UniqueEntityID
    ) {
        const professional = new Professional({
            ...props,
            isActive: props.isActive ?? true,
            createdAt: props.createdAt ?? new Date()
        }, id)

        return professional
    }
}