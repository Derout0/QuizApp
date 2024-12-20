import type { ModuleEntity } from '@/entities/module'

export interface FetchModulesByUserResponse {
    data: ModuleEntity[]
    count: number
    limit: number
    currentPage: number
    totalPages: number
    hasMore: boolean
}

// TODO: Remove?
export interface FetchModulesByUserParams {
    page: number
    limit?: number
    search?: string
}
