import { NextFunction, Request, Response } from 'express'
import { BaseRoute } from '@/api/routes/BaseRoute.ts'
import { InitializeMiddleware } from '@/api/core/InitializeMiddleware.js'
import { DeleteModuleController } from '@/api/controllers/modules/DeleteModuleController.ts'

export class DeleteModuleRoute extends BaseRoute {
    private controller: DeleteModuleController

    constructor() {
        super()
        this.path = '/module/:id'
        this.method = 'DELETE'
        this.middlewares = [
            InitializeMiddleware.InitializeAuthMiddleware(),
        ]
        this.InitializeRouteController()
        this.controller = new DeleteModuleController()
    }

    public async startService(req: Request, res: Response, next: NextFunction) {
        await this.controller.execute(req, res, next)
    }
}
