import { NextFunction, Request, Response } from 'express'
import { BaseRoute } from '@/api/routes/BaseRoute.ts'
import { UpdateProfileController } from '@/api/controllers/profile/UpdateProfileController.ts'
import { InitializeMiddleware } from '@/api/core/InitializeMiddleware.ts'
import { profileFieldClientKeys } from '@/api/repositories/ProfileRepository.ts'
import { validation } from '@/api/validation/validation.ts'
import { profileValidation } from '@/api/validation/profileValidation.ts'

export class UpdateProfileRoute extends BaseRoute {
    private controller: UpdateProfileController

    constructor() {
        super()
        this.path = '/profile'
        this.method = 'POST'
        this.middlewares = [
            InitializeMiddleware.InitializeAuthMiddleware(),
            InitializeMiddleware.InitializeValidationMiddleware(),
            InitializeMiddleware.InitializeValidationDbKeysMiddleware(profileFieldClientKeys),
        ]
        this.validationChains = validation(profileValidation)
        this.InitializeRouteController()
        this.controller = new UpdateProfileController()
    }

    public async startService(req: Request, res: Response, next: NextFunction) {
        await this.controller.execute(req, res, next)
    }
}
