import { NextFunction, Request, Response } from 'express'
import { BaseRoute } from '@/api/routes/BaseRoute.ts'
import { InitializeMiddleware } from '@/api/core/InitializeMiddleware.js'
import { GetUserModulesController } from '@/api/controllers/modules/GetUserModulesController.ts'

export class GetUserModulesRoute extends BaseRoute {
    private controller: GetUserModulesController

    constructor() {
        super()
        this.path = '/modules'
        this.method = 'GET'
        this.middlewares = [
            InitializeMiddleware.InitializeAuthMiddleware(),
        ]
        this.InitializeRouteController()
        this.controller = new GetUserModulesController()
    }

    public async startService(req: Request, res: Response, next: NextFunction) {
        await this.controller.execute(req, res, next)
    }
}
