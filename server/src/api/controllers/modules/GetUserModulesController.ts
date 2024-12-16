import { NextFunction, Response } from 'express'
import { StatusConstants } from '@/api/constants/StatusConstants.ts'
import { BaseController } from '@/api/controllers/BaseController.ts'
import { ApiError } from '@/api/utils/ApiError.ts'
import { ModuleService } from '@/api/services/ModuleService.ts'
import { TypedRequestQuery } from '@/api/types/types.ts'
import { getPagingData } from '@/api/utils/pagination.ts'

export class GetUserModulesController extends BaseController {
    private service: ModuleService

    constructor() {
        super()
        this.service = new ModuleService()
    }

    protected async executeImplement(req: TypedRequestQuery<{ page: string, size: string, search: string }>, res: Response, next: NextFunction) {
        const { userId } = res.locals.user
        const size = parseInt(req.query.size, 10) || 10
        const page = parseInt(req.query.page, 10) || 0
        const search = req.query.search || ''

        try {
            const data = await this.service.getUserModules(userId, page, size, search)

            if (!data) {
                return next(ApiError.NotFound(StatusConstants.NOT_FOUND_RESOURCE_MSG))
            }

            const result = getPagingData(data, page, size)

            return this.ok(res, result)
        }

        catch (error: any) {
            next(error)
        }
    }
}
