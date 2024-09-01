import jwt, { JwtPayload } from 'jsonwebtoken'
import { TokenRepository } from '@/api/repositories/TokenRepository.js'
import { GeneratedTokenModel } from '@/api/models/TokenModel.js'

export class TokenService {
    private tokenRepository: TokenRepository

    constructor() {
        this.tokenRepository = new TokenRepository()
    }

    generateTokens(payload: string | Buffer | object) {
        const accessToken = jwt.sign(payload, String(process.env.JWT_ACCESS_KEY), { expiresIn: '30m' })
        const refreshToken = jwt.sign(payload, String(process.env.JWT_REFRESH_KEY), { expiresIn: '30d' })

        const decodedAccessToken = jwt.decode(accessToken, { complete: true }) as { payload: JwtPayload }
        const decodedRefreshToken = jwt.decode(refreshToken, { complete: true }) as { payload: JwtPayload }

        const accessTokenExpires = new Date(decodedAccessToken.payload.exp! * 1000)
        const refreshTokenExpires = new Date(decodedRefreshToken.payload.exp! * 1000)

        return { accessToken, refreshToken, accessTokenExpires, refreshTokenExpires }
    }

    async saveToken(userId: number, tokens: GeneratedTokenModel) {
        const { refreshToken, refreshTokenExpires } = tokens

        const tokenData = await this.tokenRepository.findBy({ userId })

        if (tokenData) {
            await this.tokenRepository.update({ refreshToken }, { userId })
            return
        }

        return await this.tokenRepository.create({ userId, refreshToken, refreshTokenExpires })
    }

    async getToken(token: string) {
        return await this.tokenRepository.findBy({ refreshToken: token })
    }

    async deleteToken(token: string) {
        return await this.tokenRepository.delete({ refreshToken: token })
    }

    async validateAccessToken(token: string) {
        try {
            return jwt.verify(token, String(process.env.JWT_ACCESS_KEY))
        }
        catch (error) {
            return null
        }
    }

    async validateRefreshToken(token: string) {
        try {
            return jwt.verify(token, String(process.env.JWT_REFRESH_KEY))
        }
        catch (error) {
            return null
        }
    }
}
