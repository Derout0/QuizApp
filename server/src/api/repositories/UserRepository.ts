import { UserModel } from '@/api/models/UserModel.js'
import database from '@/config/DatabaseConfig.js'

export class UserRepository {
    public static async createUser(user: Omit<UserModel, 'user_id'>): Promise<UserModel> {
        const { email, password, username } = user

        const result
            = await database.query('INSERT INTO users (email, password, username) VALUES ($1, $2, $3) RETURNING *',
                [email, password, username])

        return result.rows[0]
    }

    public static async findUser(conditions: Partial<UserModel>): Promise<UserModel | null> {
        const keys = Object.keys(conditions) // ['email']
        const values = Object.values(conditions) // ['test@gmail.com']

        if (keys.length === 0) return null

        const query = `SELECT * FROM users WHERE ${keys.map((key, index) => `${key} = $${index + 1}`).join(' AND ')}`
        const user = await database.query(query, values)

        return user.rows[0] || null
    }

    public static async getAllUsers(): Promise<UserModel[]> {
        const users = await database.query('SELECT * FROM users')
        return users.rows
    }
}
