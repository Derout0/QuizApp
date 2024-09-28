import { BaseRoute } from '@/api/routes/BaseRoute.ts'
import { NextFunction, Request, Response } from 'express'
import { LogoutController } from '@/api/controllers/auth/LogoutController.ts'

export class LogoutRoute extends BaseRoute {
    private controller: LogoutController

    constructor() {
        super()
        this.path = '/logout'
        this.method = 'POST'

        this.InitializeRouteController()
        this.controller = new LogoutController()
    }

    public async startService(req: Request, res: Response, next: NextFunction) {
        await this.controller.execute(req, res, next)
    }
}
