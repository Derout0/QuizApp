import database from '@/config/DatabaseConfig.js'
import { GeneratedTokenModel, TokenModel } from '@/api/models/TokenModel.js'

export class TokenRepository {
    public static async createToken(userId: number, tokens: GeneratedTokenModel): Promise<void> {
        const { refreshToken, refreshTokenExpire } = tokens

        await database.query('INSERT INTO '
        + 'tokens (user_id, refresh_token, refresh_token_expires_at) '
        + 'VALUES ($1, $2, $3)',
        [userId, refreshToken, refreshTokenExpire])
    }

    public static async getTokenByUserId(userId: number): Promise<TokenModel | null> {
        const token = await database.query('SELECT * FROM tokens WHERE user_id = $1',
            [userId])

        return token.rows[0] || null
    }

    public static async getToken(refreshToken: string) {
        const result = await database.query('SELECT * FROM tokens = WHERE refresh_token = $1', [refreshToken])
        return result.rows[0]
    }

    public static async updateToken(userId: number, refreshToken: string) {
        const result = await database.query('UPDATE tokens SET refresh_token = $1 WHERE user_id = $2 RETURNING *', [refreshToken, userId])
        return result.rows[0]
    }

    public static async deleteToken(refreshToken: string) {
        const result = await database.query('DELETE FROM tokens WHERE refresh_token = $1 RETURNING *', [refreshToken])
        return result.rows[0]
    }
}
