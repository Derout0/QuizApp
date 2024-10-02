import { NextFunction, Request, Response } from 'express'
import { BaseRoute } from '@/api/routes/BaseRoute.ts'
import { InitializeMiddleware } from '@/api/core/InitializeMiddleware.js'
import { GetAvatarsController } from '@/api/controllers/files/GetAvatarsController.ts'

export class GetAvatarsRoute extends BaseRoute {
    private controller: GetAvatarsController

    constructor() {
        super()
        this.path = '/avatars'
        this.method = 'GET'

        this.middlewares = [
            InitializeMiddleware.InitializeAuthMiddleware(),
        ]
        this.InitializeRouteController()
        this.controller = new GetAvatarsController()
    }

    public async startService(req: Request, res: Response, next: NextFunction) {
        await this.controller.execute(req, res, next)
    }
}
