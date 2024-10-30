import type { AxiosInstance } from 'axios'
import type { Action, EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit'
import type { LoginSchema, RegistrationSchema } from '@/features/auth-user'
import type { CheckPasswordSchema } from '@/features/check-password'
import type { UserSchema } from '@/entities/user'
import type { ProfileSchema } from '@/entities/profile'
import type { UpdateSettingsSchema } from '@/features/update-settings'
import type { UpdateAvatarSchema } from '@/features/update-avatar'

export interface StateSchema {
    user: UserSchema
    profile: ProfileSchema

    // Async
    loginForm?: LoginSchema
    registrationForm?: RegistrationSchema
    updateSettings?: UpdateSettingsSchema
    updateAvatar?: UpdateAvatarSchema
    checkPasswordForm?: CheckPasswordSchema
}

export type StateSchemaKey = keyof StateSchema

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>
    reduce: (state: any, action: Action) => StateSchema
    add: (key: StateSchemaKey, reducer: Reducer) => void
    remove: (key: StateSchemaKey) => void
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager?: ReducerManager
}

interface ThunkExtraArguments {
    api: AxiosInstance
}

export interface ThunkConfig<T> {
    rejectValue: T
    state: StateSchema
    extra: ThunkExtraArguments
}
