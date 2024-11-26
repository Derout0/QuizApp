import { BaseRepository, FieldMapping } from '@/api/repositories/BaseRepository.ts'
import { ModuleModel, RequestModuleModel } from '@/api/models/ModuleModel.ts'

export const moduleFieldMapping: FieldMapping<RequestModuleModel> = {
    folderId: 'folder_id',
    name: 'name',
    description: 'description',
    isPublic: 'is_public',
    terms: 'terms',
}

export const moduleFieldClientKeys = Object.keys(moduleFieldMapping)

export class ModuleRepository extends BaseRepository<ModuleModel> {
    constructor() {
        super('modules', moduleFieldMapping)
    }
}
