import database from '@/config/DatabaseConfig.js'
import { GeneratedTokenModel, TokenModel } from '@/api/models/TokenModel.js'

export class TokenRepository {
    public static async createToken(userId: number, tokens: GeneratedTokenModel): Promise<void> {
        const { accessToken, refreshToken, accessTokenExpire, refreshTokenExpire } = tokens

        await database.query('INSERT INTO '
        + 'tokens (user_id, refresh_token, access_token, access_token_expires_at, refresh_token_expires_at) '
        + 'VALUES ($1, $2, $3, $4, $5)',
        [userId, refreshToken, accessToken, accessTokenExpire, refreshTokenExpire])
    }

    public static async getTokenByUserId(userId: number): Promise<TokenModel | null> {
        const token = await database.query('SELECT * FROM tokens WHERE user_id = $1',
            [userId])

        return token.rows[0] || null
    }

    public static async updateToken(userId: number, refreshToken: string): Promise<void> {
        await database.query('UPDATE tokens SET refresh_token = $1 WHERE user_id = $2', [refreshToken, userId])
    }
}
