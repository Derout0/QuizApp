import { NextFunction, Request, Response } from 'express'
import { BaseRoute } from '@/api/routes/BaseRoute.ts'
import { InitializeMiddleware } from '@/api/core/InitializeMiddleware.js'
import { GetUserModuleController } from '@/api/controllers/modules/GetUserModuleController.ts'

export class GetUserModuleRoute extends BaseRoute {
    private controller: GetUserModuleController

    constructor() {
        super()
        this.path = '/modules/:id'
        this.method = 'GET'
        this.middlewares = [
            InitializeMiddleware.InitializeAuthMiddleware(),
        ]
        this.InitializeRouteController()
        this.controller = new GetUserModuleController()
    }

    public async startService(req: Request, res: Response, next: NextFunction) {
        await this.controller.execute(req, res, next)
    }
}
