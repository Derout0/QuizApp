import { BaseRoute } from '@/api/routes/BaseRoute.ts'
import { NextFunction, Request, Response } from 'express'
import { body } from 'express-validator'
import { LoginController } from '@/api/controllers/user/auth/LoginController.ts'

export class LoginRoute extends BaseRoute {
    private controller: LoginController

    constructor() {
        super()
        this.path = '/login'
        this.method = 'POST'
        this.validationChains = [
            body('email').isEmail(),
            body('password').isLength({ min: 3, max: 32 }),
        ]

        this.InitializeController()
        this.controller = new LoginController()
    }

    public async startService(req: Request, res: Response, next: NextFunction) {
        await this.controller.execute(req, res, next)
    }
}
