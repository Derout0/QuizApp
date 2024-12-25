import { NextFunction, Request, Response } from 'express'
import { BaseRoute } from '@/api/routes/BaseRoute.ts'
import { InitializeMiddleware } from '@/api/core/InitializeMiddleware.js'
import { UpdateModuleProgressController } from '@/api/controllers/game-progress/UpdateModuleProgressController.ts'
import { userGameProgressFieldClientKeys } from '@/api/repositories/GameProgressRepository.ts'

export class UpdateModuleProgress extends BaseRoute {
    private controller: UpdateModuleProgressController

    constructor() {
        super()
        this.path = '/modules/:moduleId/progress'
        this.method = 'PUT'
        this.middlewares = [
            InitializeMiddleware.InitializeAuthMiddleware(),
            InitializeMiddleware.InitializeValidationMiddleware(),
            InitializeMiddleware.InitializeValidationDbKeysMiddleware(userGameProgressFieldClientKeys),
        ]
        this.InitializeRouteController()
        this.controller = new UpdateModuleProgressController()
    }

    public async startService(req: Request, res: Response, next: NextFunction) {
        await this.controller.execute(req, res, next)
    }
}
