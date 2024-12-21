import { RequestTermModel, TermModel } from '@/api/models/TermModel.ts'

export interface BaseModuleModel {
    userId: string | number
    folderId: string | number
    name: string
    description?: string
    isPublic: boolean
}

export interface RequestModuleModel extends BaseModuleModel {
    terms: RequestTermModel[]
}

export interface ModuleModel extends BaseModuleModel {
    moduleId: string | number
    author: string
    terms: TermModel[]
    createdAt: Date
    updatedAt: Date
}
