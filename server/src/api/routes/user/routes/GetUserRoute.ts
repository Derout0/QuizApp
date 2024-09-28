import { BaseRoute } from '@/api/routes/BaseRoute.ts'
import { NextFunction, Request, Response } from 'express'
import { GetUserController } from '@/api/controllers/user/GetUserController.ts'
import { InitializeMiddleware } from '@/api/core/InitializeMiddleware.ts'

export class GetUserRoute extends BaseRoute {
    private controller: GetUserController

    constructor() {
        super()
        this.path = '/user'
        this.method = 'GET'

        this.middlewares = [
            InitializeMiddleware.InitializeAuthMiddleware(),
        ]
        this.controller = new GetUserController()
        this.InitializeRouteController()
    }

    public async startService(req: Request, res: Response, next: NextFunction) {
        await this.controller.execute(req, res, next)
    }
}
