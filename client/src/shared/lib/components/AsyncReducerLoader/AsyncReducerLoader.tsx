import type { ReactNode } from 'react'
import { useStore } from 'react-redux'
import type { Reducer } from '@reduxjs/toolkit'
import { useEffectOnce } from '@/shared/lib/hooks'
import type { ReduxStoreWithManager, StateSchemaKey } from '@/app/providers/store-provider'

export type ReducersList = {
    [reducerKey in StateSchemaKey]?: Reducer
}

interface AsyncReducerLoaderProps {
    children?: ReactNode
    reducers: ReducersList
    removeAfterUnmount?: boolean
}

export const AsyncReducerLoader = (props: AsyncReducerLoaderProps) => {
    const {
        children,
        reducers,
        removeAfterUnmount = true,
    } = props

    const store = useStore() as ReduxStoreWithManager

    useEffectOnce(() => {
        const mountedReducers = store.reducerManager.getReducerMap()

        Object.entries(reducers).forEach(([reducerKey, reducer]) => {
            const mounted = mountedReducers[reducerKey as StateSchemaKey]

            if (!mounted) {
                store?.reducerManager?.add(reducerKey as StateSchemaKey, reducer)
            }
        })

        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([reducerKey]) => {
                    store.reducerManager?.remove(reducerKey as StateSchemaKey)
                })
            }
        }
    })

    return (
        <>
            {children}
        </>
    )
}
