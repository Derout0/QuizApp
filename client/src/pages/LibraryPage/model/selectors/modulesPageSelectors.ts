import type { StateSchema } from '@/app/providers/store-provider'
import { ModuleDisplay } from '@/entities/module'

export const getModulesPageIsLoading = (state: StateSchema) => state.modulesPage?.isLoading ?? false
export const getModulesPageError = (state: StateSchema) => state.modulesPage?.error ?? undefined
export const getModulesPageDisplay = (state: StateSchema) => state.modulesPage?.display ?? ModuleDisplay.SINGLE
export const getModulesPageSearch = (state: StateSchema) => state.modulesPage?.search ?? ''
export const getModulesPagePaginationPage = (state: StateSchema) => state.modulesPage?.page ?? 0
export const getModulesPagePaginationLimit = (state: StateSchema) => state.modulesPage?.limit ?? 10
export const getModulesPagePaginationHasMore = (state: StateSchema) => state.modulesPage?.hasMore ?? false
