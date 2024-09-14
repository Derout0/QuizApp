import type { Action, EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit'
import type { UserSchema } from '@/entities/user'
import type { LoginSchema, RegistrationSchema } from '@/features/auth-user'
import type { ProfileSchema } from '@/entities/profile'
import type { AxiosInstance } from 'axios'

export interface StateSchema {
    user: UserSchema

    // Async
    loginForm?: LoginSchema
    registrationForm?: RegistrationSchema
    profile?: ProfileSchema
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

export interface ThunkConfig {
    extra: ThunkExtraArguments
}
