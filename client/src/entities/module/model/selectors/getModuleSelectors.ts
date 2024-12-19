import type { StateSchema } from '@/app/providers/store-provider'

export const getModuleError = (state: StateSchema) => state.modules?.error || undefined
export const getModuleIsLoading = (state: StateSchema) => state.modules?.isLoading || false
