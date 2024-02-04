import User from '../../domain/User'
import UserRepository from '../../repositories/UserRepository'
import UseCase from '../UseCase'

type Input = User

export default class UserCreate implements UseCase<Input, void> {
    constructor(private readonly repository: UserRepository) {}

    async exec(user: Input): Promise<void> {
        const userExists = await this.repository.findByEmail(user.email.value)
        
        if (userExists.length > 0) throw new Error('User already exists') // return user exists

        const { name, email, phone, address } = user

        return this.repository.create({
            name,
            address,
            phone,
            email,
        })
    }
}
