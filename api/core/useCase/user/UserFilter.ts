import User from '../../domain/User'
import Email from '../../domain/valueObjects/Email'
import UserRepository from '../../repositories/UserRepository'
import UseCase from '../UseCase'

// Use TypeFilter and Input in front-end
export enum TypeFilter {
    ALL = 'All',
    NAME = 'Name',
    PHONE = 'Phone',
    EMAIL = 'Email',
}

// type Input = {
//     type?: TypeFilter
//     value: string
// }

type Input = {
    name: string
    phone: string
    email: string
}

type Output = User[] | void[]

export default class UserFilter implements UseCase<Input, Output> {
    constructor(private readonly repository: UserRepository) {}

    async exec(search: Input) {
        
        const users = await this.repository.filter(search)

        if (users) return users

        return []
    }
}
