import { NextFunction, Response, Request } from 'express'
import { StatusConstants } from '@/api/constants/StatusConstants.ts'
import { BaseController } from '@/api/controllers/BaseController.ts'
import { ApiError } from '@/api/utils/ApiError.ts'
import { ModuleService } from '@/api/services/ModuleService.ts'

export class GetUserModulesController extends BaseController {
    private service: ModuleService

    constructor() {
        super()
        this.service = new ModuleService()
    }

    protected async executeImplement(req: Request, res: Response, next: NextFunction) {
        const { userId } = res.locals.user

        try {
            const result = await this.service.getUserModules(userId)

            if (!result) {
                return next(ApiError.NotFound(StatusConstants.NOT_FOUND_RESOURCE_MSG))
            }

            return this.ok(res, result)
        }

        catch (error: any) {
            next(error)
        }
    }
}
