import { UniqueEntityID } from "@/core/entities/unique-entity-id"

export class Entity<Props>{
    private _id: UniqueEntityID
    protected props: Props

    constructor(props: Props, id?: UniqueEntityID){
        this._id = id ?? new UniqueEntityID()
        this.props = props
    }

    get id(): UniqueEntityID{
        return this._id
    }
}