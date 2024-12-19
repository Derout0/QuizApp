import type { StateSchema } from '@/app/providers/store-provider'
import { ModuleDisplay } from '@/entities/module'

export const getModulesPageIsLoading = (state: StateSchema) => state.modules?.isLoading || false
export const getModulesPageError = (state: StateSchema) => state.modules?.error || undefined
export const getModulesPageDisplay = (state: StateSchema) => state.modules?.display || ModuleDisplay.SINGLE
