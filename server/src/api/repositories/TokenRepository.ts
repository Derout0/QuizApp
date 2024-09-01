import { TokenModel } from '@/api/models/TokenModel.js'
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
}
