import type { Action, EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit'
import type { UserSchema } from '@/entities/user'
import type { LoginSchema, RegistrationSchema } from '@/features/auth-user'

export interface StateSchema {
    user: UserSchema

    // Async
    loginForm?: LoginSchema
    registrationForm?: RegistrationSchema
}

export type StateSchemaKey = keyof StateSchema
export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager?: ReducerManager
}

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>
    reduce: (state: any, action: Action) => StateSchema
    add: (key: StateSchemaKey, reducer: Reducer) => void
    remove: (key: StateSchemaKey) => void
}
