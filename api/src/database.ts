import { Client } from 'pg'

export default class Pg {
    private readonly client: Client

    private constructor() {
        this.client = new Client({
            port: 5432,
            host: process.env.POSTGRES_HOST,
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DATABASE,
        })

        Object.freeze(this)
    }

    static async connect() {
        const pg = new Pg()
        pg.client.connect()

        return pg.client
    }

    async close() {
        this.client.end()
    }
}
