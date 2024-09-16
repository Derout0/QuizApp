import bcrypt from 'bcrypt'
import { UserRepository } from '@/api/repositories/UserRepository.ts'
import { TokenService } from '@/api/services/TokenService.ts'
import { ProfileService } from '@/api/services/ProfileService.ts'
import { UserDTO } from '@/api/dtos/UserDTO.ts'
import { ApiError } from '@/api/utils/ApiError.ts'
import { RequestProfileModel } from '@/api/models/ProfileModel.ts'
import { StatusConstants } from '@/api/constants/StatusConstants.ts'

// TODO: Вынести повтор логики аутентификации в отдельный метод!
export class AuthService {
    private userRepository: UserRepository
    private tokenService: TokenService
    private profileService: ProfileService

    constructor() {
        this.userRepository = new UserRepository()
        this.tokenService = new TokenService()
        this.profileService = new ProfileService()
    }

    public async registration(email: string, password: string, username: string, profileData?: RequestProfileModel) {
        const existingUser = await this.userRepository.findBy({ email, username })

        if (existingUser) {
            throw ApiError.Conflict(`The user already exists!`)
        }

        const hashPassword = await bcrypt.hash(password, 3)

        const user = await this.userRepository.create({ email, password: hashPassword, username })

        const userDTO = new UserDTO(user)
        const tokens = this.tokenService.generateTokens({ ...userDTO })

        const defaultProfileData = {
            userId: userDTO.userId,
            firstName: profileData?.firstName || undefined,
            lastName: profileData?.lastName || undefined,
            age: profileData?.age || undefined,
            country: profileData?.country || undefined,
        }

        await this.tokenService.saveToken(userDTO.userId, tokens)
        await this.profileService.createProfile(defaultProfileData)

        return { tokens, user: userDTO }
    }

    public async login(email: string, password: string) {
        const user = await this.userRepository.findBy({ email })

        if (!user) {
            throw ApiError.BadRequest(`User with email ${email} not found!`)
        }

        const isPasswordEquals = await bcrypt.compare(password, user.password)

        if (!isPasswordEquals) {
            throw ApiError.BadRequest(`Wrong password!`)
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
            throw ApiError.BadRequest(StatusConstants.USER_NOT_FOUND_MSG)
        }

        const userDTO = new UserDTO(user)
        const tokens = this.tokenService.generateTokens({ ...userDTO })

        await this.tokenService.saveToken(userDTO.userId, tokens)

        return { tokens, user: userDTO }
    }
}
