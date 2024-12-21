import type { StateSchema } from '@/app/providers/store-provider'

export const getModuleDetailsData = (state: StateSchema) => state.moduleDetails?.data
export const getModuleDetailsError = (state: StateSchema) => state.moduleDetails?.error ?? undefined
export const getModuleDetailsIsLoading = (state: StateSchema) => state.moduleDetails?.isLoading ?? false
