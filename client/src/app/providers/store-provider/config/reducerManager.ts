import type { Action, Reducer, ReducersMapObject } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'

import type { StateSchemaKey, StateSchema, ReducerManager, MountedReducers } from './StateSchema'

export function createReducerManager(initialReducers: ReducersMapObject<StateSchema>): ReducerManager {
    const reducers = { ...initialReducers }

    let combinedReducer = combineReducers(reducers)

    let keysToRemove: StateSchemaKey[] = []
    const mountedReducers: MountedReducers = {}

    return {
        getReducerMap: () => reducers,

        reduce: (state: any, action: Action) => {
            if (keysToRemove.length > 0) {
                state = { ...state }

                for (const key of keysToRemove) {
                    delete state[key]
                }

                keysToRemove = []
            }

            return combinedReducer(state, action)
        },

        add: (key: StateSchemaKey, reducer: Reducer) => {
            if (!key || reducers[key]) {
                return
            }

            reducers[key] = reducer
            mountedReducers[key] = true

            combinedReducer = combineReducers(reducers)
        },

        remove: (key: StateSchemaKey) => {
            if (!key || !reducers[key]) {
                return
            }

            delete reducers[key]
            keysToRemove.push(key)
            mountedReducers[key] = false

            combinedReducer = combineReducers(reducers)
        },
    }
}
