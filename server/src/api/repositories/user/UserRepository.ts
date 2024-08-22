import { User } from '@/api/models/User.js'
import database from '@/config/DatabaseConfig.js'

export class UserRepository {
    public static async getAllUsers(): Promise<User[]> {
        const users = await database.query('SELECT * FROM users')
        console.log(users)
        return users.rows
    }
}
