import PathFabric from '../adapters/SetPath'
import User from '../domain/User'
import UserRepository from '../repositories/UserRepository'
import UseCase from './UseCase'

type returnObject = {
    order: User[]
    totalDistance: number
}

type Output = returnObject | void[]

export default class CalculateBestRoute implements UseCase<void, Output> {
    private readonly repository: UserRepository

    constructor(repository: UserRepository) {
        this.repository = repository
    }

    async exec(input: void): Promise<Output> {
        const users = await this.repository.getAll()

        if (users.length < 1) return []

        const { orderVisitUsr, calculateDistance } = PathFabric(users as User[])

        return {
            order: orderVisitUsr,
            totalDistance: calculateDistance(),
        }
    }
}
