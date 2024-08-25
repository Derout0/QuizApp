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

    public static async findUserByEmail(email: string): Promise<UserModel | null> {
        const user = await database.query('SELECT * FROM users WHERE email = $1',
            [email])

        return user.rows[0] || null
    }

    public static async findUserByUsername(username: string): Promise<UserModel | null> {
        const user = await database.query('SELECT * FROM users WHERE username = $1',
            [username])

        if (user.rows.length > 0) {
            return user.rows[0]
        }

        return null
    }

    public static async getAllUsers(): Promise<UserModel[]> {
        const users = await database.query('SELECT * FROM users')
        return users.rows
    }
}
