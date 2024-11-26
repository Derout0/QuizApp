import { NextFunction, Response } from 'express'
import { BaseController } from '@/api/controllers/BaseController.ts'
import { TypedRequestBody } from '@/api/types/types.ts'
import { RequestModuleModel } from '@/api/models/ModuleModel.ts'
import { ModuleService } from '@/api/services/ModuleService.ts'

export class CreateModuleController extends BaseController {
    private moduleService: ModuleService

    constructor() {
        super()
        this.moduleService = new ModuleService()
    }

    protected async executeImplement(req: TypedRequestBody<RequestModuleModel>, res: Response, next: NextFunction) {
        try {
            const { userId } = res.locals.user
            const {
                name,
                description,
                isPublic = true,
                folderId,
                terms,
            } = req.body

            const result = await this.moduleService.createModule({
                name,
                description,
                isPublic,
                terms,
                folderId,
                userId,
            })

            return this.ok(res, result)
        }
        catch (error: any) {
            next(error)
        }
    }
}
