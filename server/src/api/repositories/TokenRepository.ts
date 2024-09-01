import database from '@/config/DatabaseConfig.js'
import { GeneratedTokenModel, TokenModel } from '@/api/models/TokenModel.js'
import { BaseRepository, FieldMapping } from '@/api/repositories/BaseRepository.ts'

const tokenFieldMapping: FieldMapping<TokenModel> = {
    userId: 'user_id',
    tokenId: 'token_id',
    refreshToken: 'refresh_token',
    refreshTokenExpires: 'refresh_token_expires_at',
}

export class TokenRepository extends BaseRepository<TokenModel> {
    constructor() {
        super('tokens', tokenFieldMapping)
    }

    public async createToken(userId: number, tokens: GeneratedTokenModel): Promise<void> {
        const { refreshToken, refreshTokenExpires } = tokens

        await database.query('INSERT INTO '
        + 'tokens (user_id, refresh_token, refresh_token_expires_at) '
        + 'VALUES ($1, $2, $3)',
        [userId, refreshToken, refreshTokenExpires])
    }
}
