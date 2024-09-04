import bcrypt from 'bcrypt'
import { UserRepository } from '@/api/repositories/UserRepository.ts'
import { TokenService } from '@/api/services/TokenService.ts'
import { UserDTO } from '@/api/dtos/UserDTO.ts'
import { ApiError } from '@/api/utils/ApiError.ts'

export class UserService {
    private userRepository: UserRepository
    private tokenService: TokenService

    constructor() {
        this.userRepository = new UserRepository()
        this.tokenService = new TokenService()
    }

    public async getAllUsers() {
        return await this.userRepository.getAll()
    }

    public async registration(email: string, password: string, username: string) {
        const existingUser = await this.userRepository.findBy({ email, username })

        if (existingUser) {
            throw ApiError.Conflict(`The user already exists!`)
        }

        const hashPassword = await bcrypt.hash(password, 3)

        const user = await this.userRepository.create({ email, password: hashPassword, username })

        const userDTO = new UserDTO(user) // ID, Email, Username
        const tokens = this.tokenService.generateTokens({ ...userDTO })

        await this.tokenService.saveToken(userDTO.userId, tokens)

        return { tokens, user: userDTO }
    }

    public async login(email: string, password: string) {
        const user = await this.userRepository.findBy({ email })

        if (!user) {
            throw ApiError.BadRequest(`User with email ${email} not found!`)
        }

        const isPasswordEquals = await bcrypt.compare(password, user.password)

        if (!isPasswordEquals) {
            throw ApiError.BadRequest(`Wrong password`)
        }

        const userDTO = new UserDTO(user)

        const tokens = this.tokenService.generateTokens({ ...userDTO })

        await this.tokenService.saveToken(userDTO.userId, tokens)

        return { tokens, user: userDTO }
    }

    public async logout(refreshToken: string) {
        return await this.tokenService.deleteToken(refreshToken)
    }

    public async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw ApiError.Unauthorized()
        }

        const userData = await this.tokenService.validateRefreshToken(refreshToken)
        const tokenFromDB = await this.tokenService.getToken(refreshToken)

        if (!userData || !tokenFromDB) {
            throw ApiError.Unauthorized()
        }

        const user = await this.userRepository.findBy({ userId: tokenFromDB.userId })

        if (!user) {
            throw ApiError.BadRequest(`User not found!`)
        }

        const userDTO = new UserDTO(user)
        const tokens = this.tokenService.generateTokens({ ...userDTO })

        await this.tokenService.saveToken(userDTO.userId, tokens)

        return { tokens, user: userDTO }
    }
}
