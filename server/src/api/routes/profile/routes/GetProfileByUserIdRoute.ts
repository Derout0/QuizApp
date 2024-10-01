import { NextFunction, Request, Response } from 'express'
import { BaseRoute } from '@/api/routes/BaseRoute.ts'
import { GetProfileByUserIdController } from '@/api/controllers/profile/GetProfileByUserIdController.js'

export class GetProfileByUserIdRoute extends BaseRoute {
    private controller: GetProfileByUserIdController

    constructor() {
        super()
        this.path = '/profile/:id'
        this.method = 'GET'

        this.InitializeRouteController()
        this.controller = new GetProfileByUserIdController()
    }

    public async startService(req: Request, res: Response, next: NextFunction) {
        await this.controller.execute(req, res, next)
    }
}
