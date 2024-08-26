export interface TokenModel {
    tokenId: number
    userId: number
    refreshToken: string
    refreshTokenExpire: Date
}

export type GeneratedTokenModel = Omit<TokenModel, 'tokenId' | 'userId'>
