import bcrypt from 'bcrypt'
import { UserRepository } from '@/api/repositories/UserRepository.ts'
import { TokenService } from '@/api/services/TokenService.ts'
import { UserDTO } from '@/api/dtos/UserDTO.ts'
import { ApiError } from '@/api/utils/ApiError.ts'

export class UserService {
    public static async getAllUsers() {
        return await UserRepository.getAllUsers()
    }

    public static async registrationUser(email: string, password: string, username: string) {
        const existingUserByEmail = await UserRepository.findUserByEmail(email)
        const existingUserByUsername = await UserRepository.findUserByUsername(username)

        if (existingUserByEmail) {
            throw ApiError.Conflict(`The user with the email ${email} already exists!`)
        }

        if (existingUserByUsername) {
            throw ApiError.Conflict(`The user with the username ${username} already exists`)
        }

        const hashPassword = await bcrypt.hash(password, 3)
        const user = await UserRepository.createUser({ email, password: hashPassword, username })

        const userDTO = new UserDTO(user) // ID, Email, Username
        const tokens = TokenService.generateTokens({ ...userDTO })
        await TokenService.saveToken(userDTO.id, tokens)

        return {
            ...tokens,
            user: userDTO,
        }
    }
}
