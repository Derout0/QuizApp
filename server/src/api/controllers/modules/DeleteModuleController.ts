import { NextFunction, Response } from 'express'
import { BaseController } from '@/api/controllers/BaseController.ts'
import { TypedRequestBody } from '@/api/types/types.ts'
import { RequestModuleModel } from '@/api/models/ModuleModel.ts'
import { ModuleService } from '@/api/services/ModuleService.ts'
import { ApiError } from '@/api/utils/ApiError.ts'
import { StatusConstants } from '@/api/constants/StatusConstants.ts'

export class DeleteModuleController extends BaseController {
    private moduleService: ModuleService

    constructor() {
        super()
        this.moduleService = new ModuleService()
    }

    protected async executeImplement(req: TypedRequestBody<RequestModuleModel>, res: Response, next: NextFunction) {
        const { userId } = res.locals.user
        const moduleId = Number(req.params.id)

        try {
            if (!moduleId) {
                next(ApiError.BadRequest(StatusConstants.ID_NOT_FOUND_MSG))
            }

            const result = await this.moduleService.deleteModule(userId, moduleId)

            return this.ok(res, result)
        }
        catch (error: any) {
            next(error)
        }
    }
}
