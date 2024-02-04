import User from "../domain/User"

export default interface UserRepository {
    findByEmail(email: string): Promise<User[] | null>
    findByPhone(phone: string): Promise<User[] | null>
    findByName(name: string): Promise<User[] | null>
    create(user: User): Promise<void>
}