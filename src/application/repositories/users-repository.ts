import { User } from "@/domain/user/entities/user";

export interface UsersRepository{
    create(user: User): Promise<void>
    findByEmail(email: string): Promise<User | null>
}