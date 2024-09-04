import type { ReducersMapObject } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'

import { userReducer } from '@/entities/user'
import { loginReducer } from '@/features/auth-user'

import type { StateSchema } from './StateSchema'

export function createReduxStore(initialState?: StateSchema) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        user: userReducer,
        loginForm: loginReducer,
    }

    return configureStore<StateSchema>({
        reducer: rootReducers,
        devTools: __IS_DEV__,
        preloadedState: initialState,
    })
}

export type AppState = ReturnType<typeof createReduxStore>['getState']
export type AppStore = ReturnType<typeof createReduxStore>
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
