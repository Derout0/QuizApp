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

export interface ModuleDetailsSchema {
    data?: ModuleEntity
    isLoading: boolean
    error?: string
}
