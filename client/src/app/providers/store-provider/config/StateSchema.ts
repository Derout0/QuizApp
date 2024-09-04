import type { UserSchema } from '@/entities/user'
import type { LoginSchema } from '@/features/auth-user'

export interface StateSchema {
    user: UserSchema
    loginForm: LoginSchema
}
