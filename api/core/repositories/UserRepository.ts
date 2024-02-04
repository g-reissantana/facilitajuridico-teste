import User from "../domain/User"

export default interface UserRepository {
    findByEmail(email: string): Promise<User[] | void[]>
    findByPhone(phone: string): Promise<User[] | void[]>
    findByName(name: string): Promise<User[] | void[]>
    create(user: User): Promise<void>
}