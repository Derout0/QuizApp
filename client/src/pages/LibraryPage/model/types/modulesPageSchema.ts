import type { EntityState } from '@reduxjs/toolkit'
import type { ModuleDisplay, ModuleEntity } from '@/entities/module'

export interface ModulesPageSchema extends EntityState<ModuleEntity, string | number> {
    display: ModuleDisplay
    page: number
    limit?: number
    hasMore: boolean
    search: string
    isLoading: boolean
    error?: string
}
