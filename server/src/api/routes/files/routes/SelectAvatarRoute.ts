import { NextFunction, Request, Response } from 'express'
import { BaseRoute } from '@/api/routes/BaseRoute.ts'
import { InitializeMiddleware } from '@/api/core/InitializeMiddleware.js'
import { validation } from '@/api/validation/validation.ts'
import { profileValidation } from '@/api/validation/profileValidation.ts'
import { SelectAvatarController } from '@/api/controllers/files/SelectAvatarController.ts'

export class SelectAvatarRoute extends BaseRoute {
    private controller: SelectAvatarController

    constructor() {
        super()
        this.path = '/avatar/select'
        this.method = 'POST'

        this.middlewares = [
            InitializeMiddleware.InitializeAuthMiddleware(),
            InitializeMiddleware.InitializeValidationMiddleware(),
            InitializeMiddleware.InitializeValidationDbKeysMiddleware(['avatarUrl']),
        ]
        this.validationChains = validation(profileValidation)
        this.InitializeRouteController()
        this.controller = new SelectAvatarController()
    }

    public async startService(req: Request, res: Response, next: NextFunction) {
        await this.controller.execute(req, res, next)
    }
}
