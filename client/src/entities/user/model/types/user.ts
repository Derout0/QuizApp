export interface AuthResponse {
    user: UserEntity
    tokens: TokenEntity
}

export interface TokenEntity {
    accessToken: string
    refreshToken: string
    accessTokenExpires: Date | null
    refreshTokenExpires: Date | null
}

export interface UserEntity {
    userId: number
    email: string
    username: string
}

export interface UserSchema {
    data?: UserEntity
    authorized: boolean
    inited: boolean
    isLoading: boolean
    error?: string
}
