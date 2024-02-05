import { Client } from 'pg'
import User from '../domain/User'
import UserRepository from '../repositories/UserRepository'

export default class UserPg implements UserRepository {
    constructor(private readonly driver: Client) {}

    async filter(filters: {
        name: string
        email: string
        phone: string
    }): Promise<User[] | void[]> {
        if (!filters.name && !filters.email && !filters.phone) return []

        let query = `SELECT * FROM users WHERE`
        let queryIndex = 1
        let queryArray = []

        for (let [index, key] of Object.keys(filters).entries()) {
            const keyWithType = key as keyof typeof filters

            if (!filters[keyWithType]) continue
            if (queryIndex == 1) {
                query += ` ${key} = $${queryIndex}`
                queryArray.push(filters[keyWithType])
                queryIndex++
                continue
            }

            query += ` AND ${key} = $${queryIndex}`
            queryArray.push(filters[keyWithType])
            queryIndex++
        }

        const queryResult = await this.driver.query(query, queryArray)

        const users: User[] | [] = queryResult.rows

        return users
    }

    async getAll(): Promise<User[] | void[]> {
        const queryResult = await this.driver.query('SELECT * FROM users')

        const users: User[] | [] = queryResult.rows

        return users
    }

    async filterByAll(input: string): Promise<User[] | void[]> {
        const queryResult = await this.driver.query(
            'SELECT * FROM users WHERE email = $1 OR phone = $2 OR name = $3',
            [input, input, input]
        )

        const users: User[] | [] = queryResult.rows

        return users
    }

    async filterByEmail(email: string): Promise<User[] | void[]> {
        const queryResult = await this.driver.query(
            `SELECT * FROM users WHERE email = $1`,
            [email]
        )

        const users: User[] | [] = queryResult.rows

        return users
    }
    async filterByPhone(phone: string): Promise<User[] | void[]> {
        const queryResult = await this.driver.query(
            `SELECT * FROM users WHERE phone = $1`,
            [phone]
        )

        const users: User[] | [] = queryResult.rows

        return users
    }
    async filterByName(name: string): Promise<User[] | void[]> {
        const queryResult = await this.driver.query(
            `SELECT * FROM users WHERE email = $1`,
            [name]
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
