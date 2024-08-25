import { NextFunction, Response } from 'express'
import { BaseController } from '@/api/controllers/BaseController.js'
import { TypedRequestBody } from '@/api/types/types.js'
import { UserService } from '@/api/services/UserService.js'

export class RegistrationController extends BaseController {
    constructor() {
        super()
    }

    protected async executeImplement(req: TypedRequestBody<{ email: string, password: string, username: string }>, res: Response, next: NextFunction) {
        try {
            const { email, password, username } = req.body
            const userData = await UserService.registrationUser(email, password, username)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 1000, httpOnly: true })

            return this.ok(res, userData)
        }
        catch (error: any) {
            next(error)
        }
    }
}
