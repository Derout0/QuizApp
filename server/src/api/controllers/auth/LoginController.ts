import { NextFunction, Response } from 'express'
import { TypedRequestBody } from '@/api/types/types.ts'
import { BaseController } from '@/api/controllers/BaseController.ts'
import { AuthService } from '@/api/services/AuthService.ts'

export class LoginController extends BaseController {
    private authService: AuthService

    constructor() {
        super()
        this.authService = new AuthService()
    }

    protected async executeImplement(req: TypedRequestBody<{ email: string, password: string }>, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body
            const userData = await this.authService.login(email, password)

            res.cookie('refreshToken', userData.tokens.refreshToken, { maxAge: 30 * 24 * 60 * 1000, httpOnly: true })
            return this.ok(res, userData)
        }
        catch (error: any) {
            next(error)
        }
    }
}
