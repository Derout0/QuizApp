import type { StateSchema } from '@/app/providers/store-provider'

export const getUserData = (state: StateSchema) => state.user.data
export const getUserAuthorized = (state: StateSchema) => state.user.authorized || false
export const getUserInited = (state: StateSchema) => state.user.inited
export const getUserIsLoading = (state: StateSchema) => state.user.isLoading || false
export const getUserError = (state: StateSchema) => state.user.error || undefined
