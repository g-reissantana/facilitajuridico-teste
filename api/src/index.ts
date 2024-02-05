import express from 'express'
import dotenv from 'dotenv'
import Pg from './database'
import UserPg from '../core/adapters/UserPg'
import UserFilter, { TypeFilter } from '../core/useCase/user/UserFilter'
import UserCreate from '../core/useCase/user/UserCreate'
import User from '../core/domain/User'
import CalculateBestRoute from '../core/useCase/CalculateBestRoute'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.listen(PORT, async () => {
    console.log(`Server is running at PORT: ${PORT}`)
    try {
        const client = await Pg.connect()
        const repo = new UserPg(client)

        const userFilter = new UserFilter(repo)
        const userCreate = new UserCreate(repo)
        const calculateRoute = new CalculateBestRoute(repo)
        const usr = new User('gabriel', 'gabriel@teste.com', '7999851620', [
            '1',
            '2',
        ])

        await userFilter.exec({
            name: "gabriel",
            email: "gabriel@teste.com",
            phone: ""
        })

    } catch (err: any) {
        console.error(err)
    }
})