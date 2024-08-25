import { BaseRoute } from '@/api/routes/BaseRoute.ts'
import { NextFunction, Request, Response } from 'express'
import { RegistrationController } from '@/api/controllers/user/auth/RegistrationController.js'

export class RegistrationRoute extends BaseRoute {
    private controller: RegistrationController

    constructor() {
        super()
        this.path = '/registration'
        this.InitializeController()
        this.controller = new RegistrationController()
    }

    public async startService(req: Request, res: Response, next: NextFunction) {
        await this.controller.execute(req, res, next)
    }
}
