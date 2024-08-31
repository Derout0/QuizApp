import database from '@/config/DatabaseConfig.js'
import { UserModel } from '@/api/models/UserModel.js'
import { BaseRepository, FieldMapping } from '@/api/repositories/BaseRepository.ts'

const userFieldMapping: FieldMapping<UserModel> = {
    userId: 'user_id',
}

export class UserRepository extends BaseRepository<UserModel> {
    constructor() {
        super('users', userFieldMapping)
    }

    public async getAllUsers(): Promise<UserModel[]> {
        const users = await database.query('SELECT * FROM users')
        return users.rows
    }
}
