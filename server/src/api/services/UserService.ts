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

    async checkPassword(password: string, userId: number) {
        const user = await this.repository.findBy({ userId })

        if (!user) {
            throw ApiError.NotFound(StatusConstants.USER_NOT_FOUND_MSG)
        }

        const isPasswordEquals = await bcrypt.compare(password, user.password)

        if (!isPasswordEquals) {
            throw ApiError.BadRequest('Wrong password!')
        }

        return isPasswordEquals
    }

    async updateUser(data: Partial<UserModel>, userId: number) {
        const { username, email } = data

        if (username) {
            const existingUsername = await this.repository.findBy({ username })

            if (existingUsername) {
                throw ApiError.Conflict(`Username ${username} is already taken!`)
            }
        }

        if (email) {
            const existingEmail = await this.repository.findBy({ email })

            if (existingEmail) {
                throw ApiError.Conflict(`Email ${email} is already taken!`)
            }
        }

        return await this.repository.update(data, { userId }, { exclude: ['password'] })
    }

    async getUserByUserId(id: string | number) {
        if (!id) {
            throw ApiError.BadRequest(StatusConstants.ID_NOT_FOUND_MSG)
        }

        return await this.repository.findBy({ userId: id }, { exclude: ['password'] })
    }
}
