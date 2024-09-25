export interface CheckPasswordSchema {
    password: string
    isPasswordCorrect: boolean
    isLoading: boolean
    error?: string
}
