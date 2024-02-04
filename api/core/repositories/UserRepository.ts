import User from "../domain/User"

export default interface UserRepository {
    filterByEmail(email: string): Promise<User[] | void[]>
    filterByPhone(phone: string): Promise<User[] | void[]>
    filterByName(name: string): Promise<User[] | void[]>
    filterByAll(input: string): Promise<User[] | void[]>
    create(user: User): Promise<void>
}