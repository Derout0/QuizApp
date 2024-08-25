import { BaseRoute } from '@/api/routes/BaseRoute.ts'
import { NextFunction, Request, Response } from 'express'
import { body } from 'express-validator'
import { RegistrationController } from '@/api/controllers/user/auth/RegistrationController.js'

export class RegistrationRoute extends BaseRoute {
    private controller: RegistrationController

    constructor() {
        super()
        this.path = '/registration'
        this.method = 'POST'
        this.validationChains = [
            body('email').isEmail(),
            body('password').isLength({ min: 3, max: 32 }),
        ]

        this.InitializeController()
        this.controller = new RegistrationController()
    }

    public async startService(req: Request, res: Response, next: NextFunction) {
        await this.controller.execute(req, res, next)
    }
}
