import { NextFunction, Response, Request } from 'express'
import { BaseController } from '@/api/controllers/BaseController.ts'
import { ModuleService } from '@/api/services/ModuleService.ts'

export class GetUserModuleController extends BaseController {
    private service: ModuleService

    constructor() {
        super()
        this.service = new ModuleService()
    }

    protected async executeImplement(req: Request, res: Response, next: NextFunction) {
        const { userId } = res.locals.user
        const { id } = req.params

        try {
            const module = await this.service.getUserModule(userId, id)

            return this.ok(res, module)
        }

        catch (error: any) {
            next(error)
        }
    }
}
