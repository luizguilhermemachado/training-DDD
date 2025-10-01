import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface UserProps {
  name: string
  email: string
  createdAt?: Date
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get createdAt() {
    return this.props.createdAt
  }

  update(props: Partial<UserProps>){
    if(props.name){
      this.props.name = props.name
    }

     if(props.email){
      this.props.email = props.email
    }
  }

  static create(props: Omit<UserProps, 'createdAt'>, id?: UniqueEntityID) {
    const user = new User(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return user
  }
}
