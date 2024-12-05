import { RequestTermModel, TermModel } from '@/api/models/TermModel.ts'

export interface BaseModuleModel {
    userId: number
    folderId: number
    name: string
    description?: string
    isPublic: boolean
}

export interface RequestModuleModel extends BaseModuleModel {
    terms: RequestTermModel[]
}

export interface ModuleModel extends BaseModuleModel {
    moduleId: number
    author: string
    terms: TermModel[]
    createdAt: Date
    updatedAt: Date
}
