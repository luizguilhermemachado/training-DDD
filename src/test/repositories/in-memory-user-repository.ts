import { UsersRepository } from '@/application/repositories/users-repository'
import { User } from '@/domain/user/entities/user'

export class InMemoryUserRepository implements UsersRepository {
  
  private items: User[] = []

  async create(user: User): Promise<void> {
    this.items.push(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findAllUsers(): Promise<User[]> {
    return this.items
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find(item => item.id.toString() === id)

    if(!user){
      return null
    }

    return user
  }
}
