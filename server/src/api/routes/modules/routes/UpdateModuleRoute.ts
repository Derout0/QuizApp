import { BaseRoute } from '@/api/routes/BaseRoute.ts'
import { NextFunction, Request, Response } from 'express'
import { InitializeMiddleware } from '@/api/core/InitializeMiddleware.ts'
import { moduleFieldClientKeys } from '@/api/repositories/ModuleRepository.ts'
import { validation } from '@/api/validation/validation.ts'
import { moduleValidation } from '@/api/validation/moduleValidation.ts'
import { UpdateModuleController } from '@/api/controllers/modules/UpdateModuleController.ts'

export class UpdateModuleRoute extends BaseRoute {
    private controller: UpdateModuleController

    constructor() {
        super()
        this.path = '/module/:id'
        this.method = 'PUT'
        this.middlewares = [
            InitializeMiddleware.InitializeAuthMiddleware(),
            InitializeMiddleware.InitializeValidationMiddleware(),
            InitializeMiddleware.InitializeValidationDbKeysMiddleware(moduleFieldClientKeys),
        ]
        this.validationChains = validation(moduleValidation)
        this.InitializeRouteController()
        this.controller = new UpdateModuleController()
    }

    public async startService(req: Request, res: Response, next: NextFunction) {
        await this.controller.execute(req, res, next)
    }
}
