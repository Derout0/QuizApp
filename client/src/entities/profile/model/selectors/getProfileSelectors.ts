import type { StateSchema } from '@/app/providers/store-provider'

export const getProfileData = (state: StateSchema) => state.profile?.data || undefined
export const getProfileIsLoading = (state: StateSchema) => state.profile?.isLoading || false
export const getProfileError = (state: StateSchema) => state.profile?.error || undefined
