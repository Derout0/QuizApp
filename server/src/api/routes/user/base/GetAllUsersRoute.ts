import { BaseRoute } from '@/api/routes/BaseRoute.ts'
import { NextFunction, Request, Response } from 'express'
import { GetAllUsersController } from '@/api/controllers/user/base/GetAllUsersController.js'

export class GetAllUsersRoute extends BaseRoute {
    private controller: GetAllUsersController

    constructor() {
        super()
        this.path = '/users'
        this.InitializeController()
        this.controller = new GetAllUsersController()
    }

    public async startService(req: Request, res: Response, next: NextFunction) {
        await this.controller.execute(req, res, next)
    }
}
