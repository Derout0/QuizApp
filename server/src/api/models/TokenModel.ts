export interface TokenModel {
    tokenId: number
    userId: number
    accessToken: string
    refreshToken: string
    accessTokenExpire: Date
    refreshTokenExpire: Date
}

export type GeneratedTokenModel = Omit<TokenModel, 'tokenId' | 'userId'>
