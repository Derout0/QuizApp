import type { EntityState } from '@reduxjs/toolkit'
import type { ModuleDisplay, ModuleEntity } from '@/entities/module'

export interface ModulesSchema extends EntityState<ModuleEntity, string | number> {
    display: ModuleDisplay
    page: number
    limit?: number
    hasMore: boolean
    isLoading: boolean
    error?: string
}
