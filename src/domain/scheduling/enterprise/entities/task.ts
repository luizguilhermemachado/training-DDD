import { Optional } from "@/core/@types/optional";
import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export interface TaskProps{
    title: string,
    description?: string
    isCompleted: boolean
    createdAt: Date
    updatedAt?: Date
}

export class Task extends Entity<TaskProps>{
    constructor(props: TaskProps, id?: UniqueEntityID){
        super(props, id)
    }

    get title(){
        return this.props.title
    }

    get description(){
        return this.props.description
    }
    get isCompleted(){
        return this.props.isCompleted
    }

    get createdAt(){
        return this.props.createdAt
    }

    get updatedAt(){
        return this.props.updatedAt
    }

    updateTitle(title: string){
        this.props.title = title
        this.touch()
    }

    updateDescription(description: string){
        this.props.description = description
        this.touch()
    }

    complete(){
        this.props.isCompleted = true
        this.touch()
    }

    unComplete(){
        this.props.isCompleted = false
        this.touch()
    }

    touch(){
        this.props.updatedAt = new Date()
    }

    static create(props: Optional<TaskProps, 'createdAt' | 'isCompleted'>, id?: UniqueEntityID){
        const task = new Task({
            ...props,
            isCompleted: props.isCompleted ?? false,
            createdAt: props.createdAt ?? new Date()
        }, id)

        return task
    }
    

    
}