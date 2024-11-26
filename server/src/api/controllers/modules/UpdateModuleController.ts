import { NextFunction, Response } from 'express'
import { BaseController } from '@/api/controllers/BaseController.ts'
import { TypedRequestBody } from '@/api/types/types.ts'
import { RequestModuleModel } from '@/api/models/ModuleModel.ts'
import { ModuleService } from '@/api/services/ModuleService.ts'

export class UpdateModuleController extends BaseController {
    private moduleService: ModuleService

    constructor() {
        super()
        this.moduleService = new ModuleService()
    }

    protected async executeImplement(req: TypedRequestBody<RequestModuleModel>, res: Response, next: NextFunction) {
        try {
            const { userId } = res.locals.user
            const moduleId = Number(req.params.id)
            const updateData = req.body

            const updatedModule = await this.moduleService.updateModule(userId, moduleId, updateData)

            return this.ok(res, updatedModule)
        } catch (error: any) {
            next(error)
        }
    }
}
