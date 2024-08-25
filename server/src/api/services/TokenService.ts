import jwt, { JwtPayload } from 'jsonwebtoken'
import { TokenRepository } from '@/api/repositories/TokenRepository.js'
import { GeneratedTokenModel } from '@/api/models/TokenModel.js'

export class TokenService {
    static generateTokens(payload: string | Buffer | object): GeneratedTokenModel {
        const accessToken = jwt.sign(payload, String(process.env.JWT_ACCESS_KEY), { expiresIn: '30m' })
        const refreshToken = jwt.sign(payload, String(process.env.JWT_REFRESH_KEY), { expiresIn: '30d' })

        const decodedAccessToken = jwt.decode(accessToken, { complete: true }) as { payload: JwtPayload }
        const decodedRefreshToken = jwt.decode(refreshToken, { complete: true }) as { payload: JwtPayload }

        const accessTokenExpire = new Date(decodedAccessToken.payload.exp! * 1000)
        const refreshTokenExpire = new Date(decodedRefreshToken.payload.exp! * 1000)

        console.log('Access Token Expire', accessTokenExpire)
        console.log('Refresh Token Expire', refreshTokenExpire)

        return { accessToken, refreshToken, accessTokenExpire, refreshTokenExpire }
    }

    static async saveToken(userId: number, tokens: GeneratedTokenModel) {
        const { refreshToken } = tokens

        const tokenData = await TokenRepository.getTokenByUserId(userId)

        if (tokenData) {
            await TokenRepository.updateToken(userId, refreshToken) // ACCESS???
            return
        }

        return await TokenRepository.createToken(userId, tokens)
    }
}
