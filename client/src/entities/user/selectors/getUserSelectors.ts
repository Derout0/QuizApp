import type { StateSchema } from '@/app/providers/store-provider'

export const getUserData = (state: StateSchema) => state.user.data
export const getUserAuthorized = (state: StateSchema) => state.user.authorized || false
