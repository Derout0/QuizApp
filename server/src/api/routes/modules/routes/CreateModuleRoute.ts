import { NextFunction, Request, Response } from 'express'
import { BaseRoute } from '@/api/routes/BaseRoute.ts'
import { InitializeMiddleware } from '@/api/core/InitializeMiddleware.js'
import { CreateModuleController } from '@/api/controllers/modules/CreateModuleController.ts'
import { moduleFieldClientKeys } from '@/api/repositories/ModuleRepository.ts'
import { moduleValidation } from '@/api/validation/moduleValidation.ts'
import { validation } from '@/api/validation/validation.ts'

export class CreateModuleRoute extends BaseRoute {
    private controller: CreateModuleController

    constructor() {
        super()
        this.path = '/module/:id'
        this.method = 'POST'
        this.middlewares = [
            InitializeMiddleware.InitializeAuthMiddleware(),
            InitializeMiddleware.InitializeValidationMiddleware(),
            InitializeMiddleware.InitializeValidationDbKeysMiddleware(moduleFieldClientKeys),
        ]
        this.validationChains = validation(moduleValidation)
        this.InitializeRouteController()
        this.controller = new CreateModuleController()
    }

    public async startService(req: Request, res: Response, next: NextFunction) {
        await this.controller.execute(req, res, next)
    }
}
