import { FolderRepository } from '@/api/repositories/FolderRepository.ts'
import { FolderModel, RequestFolderModel } from '@/api/models/FolderModel.ts'

export class FolderService {
    private folderRepository: FolderRepository

    constructor() {
        this.folderRepository = new FolderRepository()
    }

    async createFolder(data: RequestFolderModel): Promise<FolderModel> {
        return await this.folderRepository.create(data)
    }
}
