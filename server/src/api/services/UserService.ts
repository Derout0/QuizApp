import bcrypt from 'bcrypt'
import { ApiError } from '@/api/utils/ApiError.ts'
import { StatusConstants } from '@/api/constants/StatusConstants.ts'
import { UserModel } from '@/api/models/UserModel.ts'
import { UserRepository } from '@/api/repositories/UserRepository.ts'

export class UserService {
    private repository: UserRepository

    constructor() {
        this.repository = new UserRepository()
    }

    async encryptPassword(password: string, salt: number = 3) {
        return await bcrypt.hash(password, salt)
    }

    async checkPassword(password: string) {
        // const isPasswordEquals = await bcrypt.compare()
    }

    async updateUser(data: Partial<UserModel>, id: number) {
        return await this.repository.update(data, { userId: id })
    }

    async getUserByUserId(id: number) {
        if (!id) {
            throw ApiError.BadRequest(StatusConstants.ID_NOT_FOUND_MSG)
        }

        return await this.repository.findBy({ userId: id })
    }
}
