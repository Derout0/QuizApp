import { BaseRoute } from '@/api/routes/BaseRoute.ts'
import { NextFunction, Request, Response } from 'express'
import { InitializeMiddleware } from '@/api/core/InitializeMiddleware.ts'
import { validation } from '@/api/validation/validation.ts'
import { UpdateUserController } from '@/api/controllers/user/UpdateUserController.ts'
import { userValidation } from '@/api/validation/userValidation.ts'
import { userFieldClientKeys } from '@/api/repositories/UserRepository.ts'

export class UpdateUserRoute extends BaseRoute {
    private controller: UpdateUserController

    constructor() {
        super()
        this.path = '/user'
        this.method = 'POST'
        this.middlewares = [
            InitializeMiddleware.InitializeAuthMiddleware(),
            InitializeMiddleware.InitializeValidationMiddleware(),
            InitializeMiddleware.InitializeValidationDbKeysMiddleware(userFieldClientKeys),
        ]
        this.validationChains = validation(userValidation)
        this.InitializeRouteController()
        this.controller = new UpdateUserController()
    }

    public async startService(req: Request, res: Response, next: NextFunction) {
        await this.controller.execute(req, res, next)
    }
}
