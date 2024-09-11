import { NextFunction, Request, Response } from 'express'
import { BaseRoute } from '@/api/routes/BaseRoute.ts'
import { InitializeMiddleware } from '@/api/core/InitializeMiddleware.ts'
import { GetAllUsersController } from '@/api/controllers/user/GetAllUsersController.ts'

export class GetAllUsersRoute extends BaseRoute {
    private controller: GetAllUsersController

    constructor() {
        super()
        this.path = '/users'
        this.middlewares = [InitializeMiddleware.InitializeAuthMiddleware()]
        this.InitializeController()
        this.controller = new GetAllUsersController()
    }

    public async startService(req: Request, res: Response, next: NextFunction) {
        await this.controller.execute(req, res, next)
    }
}
