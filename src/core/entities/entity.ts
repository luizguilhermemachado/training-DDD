import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export class Entity<Props> {
  private _id: UniqueEntityID
  protected props: Props

  protected constructor(props: Props, id?: UniqueEntityID) {
    this._id = id ?? new UniqueEntityID()
    this.props = props
  }

  get id(): UniqueEntityID {
    return this._id
  }
  
  equals(entity: Entity<any>): boolean {
    if (entity === this) {
      return true
    }

    if (entity.id.equals(this._id)) {
      return true
    }

    return false
  }
}
