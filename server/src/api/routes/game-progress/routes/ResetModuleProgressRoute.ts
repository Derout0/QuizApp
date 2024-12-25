import { NextFunction, Request, Response } from 'express'
import { BaseRoute } from '@/api/routes/BaseRoute.ts'
import { InitializeMiddleware } from '@/api/core/InitializeMiddleware.js'
import { ResetModuleProgressController } from '@/api/controllers/game-progress/ResetModuleProgressController.ts'

export class ResetModuleProgressRoute extends BaseRoute {
    private controller: ResetModuleProgressController

    constructor() {
        super()
        this.path = '/modules/:moduleId/progress'
        this.method = 'DELETE'
        this.middlewares = [
            InitializeMiddleware.InitializeAuthMiddleware(),
        ]
        this.InitializeRouteController()
        this.controller = new ResetModuleProgressController()
    }

    public async startService(req: Request, res: Response, next: NextFunction) {
        await this.controller.execute(req, res, next)
    }
}
