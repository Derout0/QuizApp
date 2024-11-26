import { NextFunction, Response } from 'express'
import { BaseController } from '@/api/controllers/BaseController.ts'
import { TypedRequestBody } from '@/api/types/types.ts'
import { FolderService } from '@/api/services/FolderService.ts'

export class CreateFolderController extends BaseController {
    private folderService: FolderService

    constructor() {
        super()
        this.folderService = new FolderService()
    }

    protected async executeImplement(req: TypedRequestBody<{ name: string, parentFolderId: number }>, res: Response, next: NextFunction) {
        try {
            const { userId } = res.locals.user
            const { name, parentFolderId = null } = req.body

            const result = await this.folderService.createFolder({ name, parentFolderId, userId })

            return this.ok(res, result)
        }
        catch (error: any) {
            next(error)
        }
    }
}
