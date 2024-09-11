import { BaseRoute } from '@/api/routes/BaseRoute.ts'
import { NextFunction, Request, Response } from 'express'
import { RefreshTokenController } from '@/api/controllers/auth/RefreshTokenController.ts'

export class RefreshTokenRoute extends BaseRoute {
    private controller: RefreshTokenController

    constructor() {
        super()
        this.path = '/refresh'
        this.method = 'GET'

        this.InitializeController()
        this.controller = new RefreshTokenController()
    }

    public async startService(req: Request, res: Response, next: NextFunction) {
        await this.controller.execute(req, res, next)
    }
}
