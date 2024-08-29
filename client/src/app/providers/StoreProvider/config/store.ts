import { configureStore } from '@reduxjs/toolkit'
import type { StateSchema } from './StateSchema'

export function createReduxStore(initialState?: StateSchema) {
    return configureStore<StateSchema>({
        reducer: {},
        devTools: __IS_DEV__,
        preloadedState: initialState,
    })
}

export type AppState = ReturnType<typeof createReduxStore>['getState']
export type AppStore = ReturnType<typeof createReduxStore>
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
