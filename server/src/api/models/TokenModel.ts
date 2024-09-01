export interface TokenModel {
    tokenId: number
    userId: number
    refreshToken: string
    refreshTokenExpires: Date
}

export type GeneratedTokenModel = Omit<TokenModel, 'tokenId' | 'userId'>
