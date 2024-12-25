import { NextFunction, Request, Response } from 'express'
import { BaseRoute } from '@/api/routes/BaseRoute.ts'
import { InitializeMiddleware } from '@/api/core/InitializeMiddleware.js'
import { GetModuleProgressController } from '@/api/controllers/game-progress/GetModuleProgressController.ts'

export class GetModuleProgressRoute extends BaseRoute {
    private controller: GetModuleProgressController

    constructor() {
        super()
        this.path = '/modules/:moduleId/progress'
        this.method = 'GET'
        this.middlewares = [
            InitializeMiddleware.InitializeAuthMiddleware(),
        ]
        this.InitializeRouteController()
        this.controller = new GetModuleProgressController()
    }

    public async startService(req: Request, res: Response, next: NextFunction) {
        await this.controller.execute(req, res, next)
    }
}
