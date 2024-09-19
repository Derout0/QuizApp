import { UserModel } from '@/api/models/UserModel.js'
import { BaseRepository, FieldMapping } from '@/api/repositories/BaseRepository.ts'

const userFieldMapping: FieldMapping<UserModel> = {
    userId: 'user_id',
    email: 'email',
    password: 'password',
    username: 'username',
}

export const userFieldClientKeys = Object.keys(userFieldMapping)

export class UserRepository extends BaseRepository<UserModel> {
    constructor() {
        super('users', userFieldMapping)
    }
}
