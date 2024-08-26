import bcrypt from 'bcrypt'
import { UserRepository } from '@/api/repositories/UserRepository.ts'
import { TokenService } from '@/api/services/TokenService.ts'
import { UserDTO } from '@/api/dtos/UserDTO.ts'
import { ApiError } from '@/api/utils/ApiError.ts'

export class UserService {
    public static async getAllUsers() {
        return await UserRepository.getAllUsers()
    }

    public static async registration(email: string, password: string, username: string) {
        const existingUser = await UserRepository.findUser({ email, username })

        if (existingUser) {
            throw ApiError.Conflict(`The user already exists!`)
        }

        const hashPassword = await bcrypt.hash(password, 3)
        const user = await UserRepository.createUser({ email, password: hashPassword, username })

        const userDTO = new UserDTO(user) // ID, Email, Username
        const tokens = TokenService.generateTokens({ ...userDTO })
        await TokenService.saveToken(userDTO.id, tokens)

        return { ...tokens, user: userDTO }
    }

    public static async login(email: string, password: string) {
        const user = await UserRepository.findUser({ email })

        if (!user) {
            throw ApiError.BadRequest(`User with email ${email} not found!`)
        }

        const isPasswordEquals = await bcrypt.compare(password, user.password)

        if (!isPasswordEquals) {
            throw ApiError.BadRequest(`Wrong password`)
        }

        const userDTO = new UserDTO(user)
        const tokens = TokenService.generateTokens({ ...userDTO })
        await TokenService.saveToken(userDTO.id, tokens)

        return { ...tokens, user: userDTO }
    }

    public static async logout(refreshToken: string) {
        return await TokenService.deleteToken(refreshToken)
    }

    public static async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw ApiError.Unauthorized()
        }

        const userData = await TokenService.validateRefreshToken(refreshToken)
        const tokenFromDB = await TokenService.getToken(refreshToken)

        if (!userData || !tokenFromDB) {
            throw ApiError.Unauthorized()
        }

        const user = await UserRepository.findUser(tokenFromDB.id)

        if (!user) {
            throw ApiError.BadRequest(`User not found!`)
        }

        const userDTO = new UserDTO(user)
        const tokens = TokenService.generateTokens({ ...userDTO })
        await TokenService.saveToken(userDTO.id, tokens)

        return { ...tokens, user: userDTO }
    }
}
