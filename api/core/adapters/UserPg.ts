import { Client } from 'pg'
import User from '../domain/User'
import UserRepository from '../repositories/UserRepository'

export default class UserPg implements UserRepository {
    constructor(private readonly driver: Client) {}
    async findByAll(input: string): Promise<User[] | void[]> {
        const queryResult = await this.driver.query(
            'SELECT * FROM users WHERE email = $1 OR phone = $2 OR name = $3',
            [input, input, input]
        )

        const users: User[] | [] = queryResult.rows

        return users
    }

    async findByEmail(email: string): Promise<User[] | void[]> {
        const queryResult = await this.driver.query(
            `SELECT * FROM users WHERE email = '${email}'`
        )

        const users: User[] | [] = queryResult.rows

        return users
    }
    async findByPhone(phone: string): Promise<User[] | void[]> {
        const queryResult = await this.driver.query(
            `SELECT * FROM users WHERE phone = '${phone}'`
        )

        const users: User[] | [] = queryResult.rows

        return users
    }
    async findByName(name: string): Promise<User[] | void[]> {
        const queryResult = await this.driver.query(
            `SELECT * FROM users WHERE email = '${name}'`
        )

        const users: User[] | [] = queryResult.rows

        return users
    }
    async create(user: User): Promise<void> {
        const result = await this.driver.query(
            'INSERT INTO users (name, email, phone, address) VALUES ($1, $2, $3, $4) RETURNING *',
            [
                user.name,
                user.email.value,
                user.phone.value,
                JSON.stringify(user.address),
            ]
        )
    }
}
