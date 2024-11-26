import { BaseRepository, FieldMapping } from '@/api/repositories/BaseRepository.ts'
import { FolderModel } from '@/api/models/FolderModel.ts'

export const foldersFieldMapping: FieldMapping<FolderModel> = {
    folderId: 'folder_id',
    userId: 'user_id',
    name: 'name',
    parentFolderId: 'parent_folder_id',
    createdAt: 'created_at',
}

export const foldersFieldClientKeys = Object.keys(foldersFieldMapping)

export class FolderRepository extends BaseRepository<FolderModel> {
    constructor() {
        super('folders', foldersFieldMapping)
    }
}
