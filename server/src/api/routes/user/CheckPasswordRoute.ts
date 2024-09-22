import { NextFunction, Request, Response } from 'express'
import { BaseRoute } from '@/api/routes/BaseRoute.ts'
import { InitializeMiddleware } from '@/api/core/InitializeMiddleware.ts'
import { CheckPasswordController } from '@/api/controllers/user/CheckPasswordController.ts'

export class CheckPasswordRoute extends BaseRoute {
    private controller: CheckPasswordController

    constructor() {
        super()
        this.path = '/check-password'
        this.method = 'POST'
        this.middlewares = [
            InitializeMiddleware.InitializeAuthMiddleware(),
            InitializeMiddleware.InitializeValidationMiddleware(),
            InitializeMiddleware.InitializeValidationDbKeysMiddleware(['password']),
        ]
        this.InitializeRouteController()
        this.controller = new CheckPasswordController()
    }

    public async startService(req: Request, res: Response, next: NextFunction) {
        await this.controller.execute(req, res, next)
    }
}
