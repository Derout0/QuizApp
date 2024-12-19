import type { EntityState } from '@reduxjs/toolkit'

export interface TermEntity {
    termId: string | number
    term: string
    definition: string
}

export interface ModuleEntity {
    moduleId: string | number
    userId: string | number
    folderId: string | number | null
    name: string
    description?: string
    isPublic: boolean
    terms: TermEntity[]
    author: string
    createdAt: Date
    updatedAt: Date
}

export interface ModuleSchema extends EntityState<ModuleEntity, string | number> {
    isLoading: boolean
    error?: string
}
